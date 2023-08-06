// src/hooks.server.ts
// Read more : https://supabase.com/docs/guides/getting-started/tutorials/with-sveltekit#supabase-auth-helpers
import { env } from '$env/dynamic/public';
import { env as privEnv } from '$env/dynamic/private';
import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import { createClient } from '@supabase/supabase-js';
import type { Handle } from '@sveltejs/kit';
import type { Database } from '$lib/server/schema';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: env.PUBLIC_SUPABASE_URL,
    supabaseKey: env.PUBLIC_SUPABASE_ANON_KEY,
    event
  });

  event.locals.db = createClient<Database>(env.PUBLIC_SUPABASE_URL, privEnv.SUPABASE_SERVICE_KEY, {
    auth: {
      persistSession: false
    }
  });

  /**
   * A convenience helper so we can just call await getSession() instead const { data: { session } } = await supabase.auth.getSession()
   */
  event.locals.getSession = async () => {
    const {
      data: { session }
    } = await event.locals.supabase.auth.getSession();
    return session;
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === 'content-range';
    }
  });
};
