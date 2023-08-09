import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params, locals: { db, getSession } }) => {
  const session = await getSession();
  const { data: website } = await db
    .from('website_users')
    .select('role,websites!inner(id,domain)')
    .eq('website_id', params.id)
    .eq('user_id', session?.user.id)
    .single();

  if (!website) {
    throw error(404, {
      message: 'Website not found'
    });
  }

  console.log('website data', website);
  const { data: browsers } = await db.rpc('get_metrics', {
    website_id: params.id,
    metric_name: 'browser',
    range: '1 hour'
  });

  // console.log('site browsers', browsers);

  return {
    browsers
  };
}) satisfies PageServerLoad;
