# Supalytic

Supalytic is a website analytic tracking alternative to Google Analytics. It is built with SvelteKit, Supabase auth, database (with timescale plugin for timeseries data) and deployed on Cloudflare pages.

> Tis project is a hackaton project for [Supabase Launch Week 8](https://supabase.com/blog/supabase-lw8-hackathon) and [win as runner up](https://supabase.com/blog/launch-week-8-hackathon-winners) for **Most technically impressive** category.



## Developing

Once you've clone this project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), 

Create `.env` file and put your supabase credentials:

```
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
```

> `SUPABASE_SERVICE_KEY` is required only for server side code

Database schema available under: `supabase/schema.sql`, we dont use migration for now.

start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
