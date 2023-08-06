import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals: { getSession, db } }) => {
  const session = await getSession();

  const query = await db
    .from('websites')
    .select('*,website_users(user_id,role)')
    .eq('website_users.user_id', session!.user.id);

  const websites = query.data;

  return { session, websites };
}) satisfies PageServerLoad;
