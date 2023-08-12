import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { day } from '$lib/day';
import type { ArrayElement } from '$lib/utils';

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
  const all = metrics?.filter((f) => f.metrics == 'all' && f.name == 'hourly') ?? [];
  const visitor = metrics?.filter((f) => f.metrics == 'all' && f.name == 'unique_visitor') ?? [];

  const pageview_count = all.reduce((count, item) => count + item.page_view, 0);
  const visitor_count = visitor.reduce((count, item) => count + item.unique_visitor, 0);

  // table metrics
  type Metric = ArrayElement<typeof metrics>;
  const sortView = (a: Metric, b: Metric) => {
    return b.page_view - a.page_view;
  };
  const browsers = (metrics?.filter((f) => f.metrics == 'browser') ?? []).sort(sortView);
  const os = (metrics?.filter((f) => f.metrics == 'os') ?? []).sort(sortView);
  const referer = (metrics?.filter((f) => f.metrics == 'referer') ?? []).sort(sortView);
  const pages = (metrics?.filter((f) => f.metrics == 'url') ?? []).sort(sortView);
  const devices = (metrics?.filter((f) => f.metrics == 'device') ?? []).sort(sortView);
  const countries = (metrics?.filter((f) => f.metrics == 'country') ?? []).sort(sortView);

  return {
    pageview_count,
    visitor_count,
    website,
    start,
    end,
    all,
    browsers,
    os,
    referer,
    pages,
    devices,
    countries
  };
}) satisfies PageServerLoad;
