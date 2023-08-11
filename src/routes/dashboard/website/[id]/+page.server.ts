import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { day } from '$lib/day';

export const load = (async ({ url, params, locals: { db, getSession } }) => {
  const session = await getSession();
  const { data: website } = await db
    .from('websites')
    .select('id,domain,website_users!inner(role)')
    .eq('id', params.id)
    .eq('website_users.user_id', session?.user.id)
    .single();

  if (!website) {
    throw error(404, {
      message: 'Website not found'
    });
  }

  // query params
  const query = url.searchParams;

  // get hourly stats
  const start = day(query.get('start') ?? undefined)
    .startOf('day')
    .format('YYYY-MM-DD HH:mm:ss');
  const end = day(query.get('end') ?? undefined)
    .endOf('day')
    .format('YYYY-MM-DD HH:mm:ss');

  const { data: metrics } = await db.rpc('calculate_metrics', {
    website_id: params.id,
    start_time: start,
    end_time: end,
    filters: {}
  });

  // page view count
  const all = metrics?.filter((f) => f.metrics == 'all') ?? [];
  const pageview_count = all.reduce((count, item) => count + item.page_view, 0);

  return {
    pageview_count,
    website,
    start,
    end,
    all,
    browsers: metrics?.filter((f) => f.metrics == 'browser') ?? [],
    os: metrics?.filter((f) => f.metrics == 'os') ?? [],
    path: metrics?.filter((f) => f.metrics == 'path') ?? [],
    referer: metrics?.filter((f) => f.metrics == 'referer') ?? [],
    url: metrics?.filter((f) => f.metrics == 'url') ?? [],
    devices: metrics?.filter((f) => f.metrics == 'device') ?? [],
    countries: metrics?.filter((f) => f.metrics == 'country') ?? []
  };
}) satisfies PageServerLoad;
