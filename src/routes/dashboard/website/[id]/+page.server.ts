import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { db } }) => {
  const { data: browsers, error } = await db.rpc('get_metrics', {
    website_id: params.id,
    metric_name: 'browser',
    range: '1 hour'
  });

  console.log('site browsers', browsers);

  return {
    browsers
  };
}) satisfies PageServerLoad;
