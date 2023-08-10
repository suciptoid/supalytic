import { error, fail } from '@sveltejs/kit';
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

  const { data: stats } = await db
    .from('website_stats_hourly')
    .select('hour,unique_visitors,page_views')
    .eq('website_id', params.id)
    .gte('hour', start)
    .lte('hour', end);

  const { data: browsers } = await db.rpc('get_metrics', {
    website_id: params.id,
    metric_name: 'browser',
    range: '1 hour'
  });

  return {
    website,
    browsers,
    stats
  };
}) satisfies PageServerLoad;
