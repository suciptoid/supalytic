
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "timescaledb" WITH SCHEMA "extensions";

CREATE SCHEMA "drizzle";

ALTER SCHEMA "drizzle" OWNER TO "postgres";

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

CREATE FUNCTION "public"."calculate_metrics"("website_id" "uuid", "start_time" timestamp without time zone, "end_time" timestamp without time zone, "filters" "jsonb") RETURNS TABLE("metrics" character varying, "name" character varying, "unique_visitor" bigint, "page_view" bigint, "time_interval" timestamp with time zone)
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    where_clause text := '';
    os_filter text;
    device_filter text;
    browser_filter text;
    country_filter text;
    url_filter text;
    referer_filter text;
BEGIN
    -- Extract filter values from the JSONB object
    os_filter := filters->>'os';
    device_filter := filters->>'device';
    browser_filter := filters->>'browser';
    country_filter := filters->>'country';
    url_filter := filters->>'url';
    referer_filter := filters->>'referer';

    -- Construct the WHERE clause based on the filters provided
    IF os_filter IS NOT NULL THEN
        where_clause := where_clause || ' AND s.os = ''' || os_filter || '''';
    END IF;

    IF device_filter IS NOT NULL THEN
        where_clause := where_clause || ' AND s.device = ''' || device_filter || '''';
    END IF;

    IF browser_filter IS NOT NULL THEN
        where_clause := where_clause || ' AND s.browser = ''' || browser_filter || '''';
    END IF;

    IF country_filter IS NOT NULL THEN
        where_clause := where_clause || ' AND s.country = ''' || country_filter || '''';
    END IF;
    
    IF url_filter IS NOT NULL THEN
        where_clause := where_clause || ' AND we.data->>''path'' = ''' || url_filter || '''';
    END IF;
    
      IF referer_filter IS NOT NULL THEN
        where_clause := where_clause || ' AND we.data->>''ref'' = ''' || referer_filter || '''';
    END IF;

    -- Repeat the above pattern for other filter options

    RETURN QUERY EXECUTE '
        WITH common_data AS (
            SELECT
                we.session_id,
                s.browser,
                s.device,
                s.os,
                s.country,
                we.data->>''path'' AS url,
                we.data->>''ref'' AS referer,
                we.created_at
            FROM website_events AS we
            JOIN sessions AS s ON we.session_id = s.id
            WHERE we.website_id = ''' || website_id || '''
            AND we.event_name = ''page_view''
            AND we.created_at >= ''' || start_time || '''
            AND we.created_at <= ''' || end_time || ''' ' || where_clause || '
        )
        SELECT
            ''all''::varchar AS metrics,
            ''hourly''::varchar AS name,
            count(distinct cd.session_id) AS unique_visitor,
            count(*) AS page_view,
            time_bucket(''1 hour'', cd.created_at) AS time_interval
        FROM common_data AS cd
        GROUP BY time_interval

        UNION ALL
        

		-- unique visitor
		SELECT
		    ''all''::varchar AS metrics,
		    ''unique_visitor''::varchar AS name,
		    count(*) AS unique_visitor,
		    count(*) AS page_view,
		    NOW() AS time_interval
		FROM (
		    SELECT
		        cd.session_id
		    FROM common_data AS cd
		    GROUP BY cd.session_id
		) AS subquery

        UNION ALL

        SELECT
            ''browser''::varchar AS metrics,
            cd.browser AS name,
            count(distinct cd.session_id) AS unique_visitor,
            count(*) AS page_view,
            NOW() AS time_interval
        FROM common_data AS cd
        GROUP BY name

		UNION ALL

        SELECT
            ''url''::varchar AS metrics,
            cd.url AS name,
            count(distinct cd.session_id) AS unique_visitor,
            count(*) AS page_view,
            NOW() AS time_interval
        FROM common_data AS cd
        GROUP BY name
        
		UNION ALL

        SELECT
            ''device''::varchar AS metrics,
            cd.device AS name,
            count(distinct cd.session_id) AS unique_visitor,
            count(*) AS page_view,
            NOW() AS time_interval
        FROM common_data AS cd
        GROUP BY name
        
        UNION ALL

        SELECT
            ''os''::varchar AS metrics,
            cd.os AS name,
            count(distinct cd.session_id) AS unique_visitor,
            count(*) AS page_view,
            NOW() AS time_interval
        FROM common_data AS cd
        GROUP BY name
        
        UNION ALL

        SELECT
            ''country''::varchar AS metrics,
            cd.country AS name,
            count(distinct cd.session_id) AS unique_visitor,
            count(*) AS page_view,
            NOW() AS time_interval
        FROM common_data AS cd
        GROUP BY name
        
        UNION ALL

        
        SELECT
            ''referer''::varchar AS metrics,
            cd.referer AS name,
            count(distinct cd.session_id) AS unique_visitor,
            count(*) AS page_view,
            NOW() AS time_interval
        FROM common_data AS cd
        GROUP BY name    ';
END;
$$;

ALTER FUNCTION "public"."calculate_metrics"("website_id" "uuid", "start_time" timestamp without time zone, "end_time" timestamp without time zone, "filters" "jsonb") OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE "public"."sessions" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "website_id" "uuid",
    "ua" character varying,
    "browser" character varying,
    "device" character varying,
    "os" character varying,
    "screen" smallint,
    "lang" character varying,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "country" character varying
);

ALTER TABLE "public"."sessions" OWNER TO "postgres";

CREATE FUNCTION "public"."get_session"("p_ip" character varying, "p_website_id" "uuid", "p_ua" character varying, "p_browser" character varying DEFAULT NULL::character varying, "p_device" character varying DEFAULT NULL::character varying, "p_os" character varying DEFAULT NULL::character varying, "p_screen" smallint DEFAULT NULL::smallint, "p_lang" character varying DEFAULT NULL::character varying, "p_country" character varying DEFAULT NULL::character varying) RETURNS "public"."sessions"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    session_record sessions%ROWTYPE;
    combined_text TEXT;
    combined_hash UUID;
BEGIN
    -- Concatenate the parameters that contribute to UUID generation
    combined_text := p_ip || p_website_id::TEXT || p_ua;

    -- Attempt to fetch the session record based on the generated UUID
    SELECT *
    INTO session_record
    FROM sessions
    WHERE id = uuid_generate_v5('00000000-0000-0000-0000-000000000000', combined_text);

    -- If no record was found, insert a new session record and return it
    IF session_record IS NULL THEN
        INSERT INTO sessions (id, website_id, ua, browser, device, os, screen, lang, country)
        VALUES (
            uuid_generate_v5('00000000-0000-0000-0000-000000000000', combined_text),
            p_website_id,
            p_ua,
            p_browser,
            p_device,
            p_os,
            p_screen,
            p_lang,
            p_country
        )
        RETURNING * INTO session_record;
    END IF;

    -- Return the fetched or inserted session record
    RETURN session_record;
END;
$$;

ALTER FUNCTION "public"."get_session"("p_ip" character varying, "p_website_id" "uuid", "p_ua" character varying, "p_browser" character varying, "p_device" character varying, "p_os" character varying, "p_screen" smallint, "p_lang" character varying, "p_country" character varying) OWNER TO "postgres";

CREATE TABLE "public"."website_events" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "website_id" "uuid",
    "event_name" character varying DEFAULT 'custom'::character varying,
    "data" "jsonb",
    "created_at" timestamp without time zone DEFAULT "now"() NOT NULL,
    "session_id" "uuid"
);

ALTER TABLE "public"."website_events" OWNER TO "postgres";

CREATE TABLE "public"."website_users" (
    "user_id" "uuid" NOT NULL,
    "website_id" "uuid" NOT NULL,
    "role" smallint DEFAULT '1'::smallint NOT NULL,
    "created_at" timestamp without time zone DEFAULT "now"()
);

ALTER TABLE "public"."website_users" OWNER TO "postgres";

CREATE TABLE "public"."websites" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "name" character varying,
    "domain" character varying,
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."websites" OWNER TO "postgres";

ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."website_users"
    ADD CONSTRAINT "website_users_pkey" PRIMARY KEY ("user_id", "website_id");

ALTER TABLE ONLY "public"."websites"
    ADD CONSTRAINT "websites_pkey" PRIMARY KEY ("id");

CREATE INDEX "website_events_created_at_idx" ON "public"."website_events" USING "btree" ("created_at" DESC);

CREATE TRIGGER "ts_insert_blocker" BEFORE INSERT ON "public"."website_events" FOR EACH ROW EXECUTE FUNCTION "_timescaledb_internal"."insert_blocker"();

ALTER TABLE ONLY "public"."sessions"
    ADD CONSTRAINT "sessions_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."website_events"
    ADD CONSTRAINT "website_events_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."website_events"
    ADD CONSTRAINT "website_events_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."website_users"
    ADD CONSTRAINT "website_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."website_users"
    ADD CONSTRAINT "website_users_website_id_fkey" FOREIGN KEY ("website_id") REFERENCES "public"."websites"("id") ON DELETE CASCADE;

ALTER TABLE "public"."sessions" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."website_events" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."website_users" ENABLE ROW LEVEL SECURITY;

ALTER TABLE "public"."websites" ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."calculate_metrics"("website_id" "uuid", "start_time" timestamp without time zone, "end_time" timestamp without time zone, "filters" "jsonb") TO "anon";
GRANT ALL ON FUNCTION "public"."calculate_metrics"("website_id" "uuid", "start_time" timestamp without time zone, "end_time" timestamp without time zone, "filters" "jsonb") TO "authenticated";
GRANT ALL ON FUNCTION "public"."calculate_metrics"("website_id" "uuid", "start_time" timestamp without time zone, "end_time" timestamp without time zone, "filters" "jsonb") TO "service_role";

GRANT ALL ON TABLE "public"."sessions" TO "anon";
GRANT ALL ON TABLE "public"."sessions" TO "authenticated";
GRANT ALL ON TABLE "public"."sessions" TO "service_role";

GRANT ALL ON FUNCTION "public"."get_session"("p_ip" character varying, "p_website_id" "uuid", "p_ua" character varying, "p_browser" character varying, "p_device" character varying, "p_os" character varying, "p_screen" smallint, "p_lang" character varying, "p_country" character varying) TO "anon";
GRANT ALL ON FUNCTION "public"."get_session"("p_ip" character varying, "p_website_id" "uuid", "p_ua" character varying, "p_browser" character varying, "p_device" character varying, "p_os" character varying, "p_screen" smallint, "p_lang" character varying, "p_country" character varying) TO "authenticated";
GRANT ALL ON FUNCTION "public"."get_session"("p_ip" character varying, "p_website_id" "uuid", "p_ua" character varying, "p_browser" character varying, "p_device" character varying, "p_os" character varying, "p_screen" smallint, "p_lang" character varying, "p_country" character varying) TO "service_role";

GRANT ALL ON TABLE "public"."website_events" TO "anon";
GRANT ALL ON TABLE "public"."website_events" TO "authenticated";
GRANT ALL ON TABLE "public"."website_events" TO "service_role";

GRANT ALL ON TABLE "public"."website_users" TO "anon";
GRANT ALL ON TABLE "public"."website_users" TO "authenticated";
GRANT ALL ON TABLE "public"."website_users" TO "service_role";

GRANT ALL ON TABLE "public"."websites" TO "anon";
GRANT ALL ON TABLE "public"."websites" TO "authenticated";
GRANT ALL ON TABLE "public"."websites" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
