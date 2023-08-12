import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url, params, locals: { db, getSession } }) => {
  const session = await getSession();
  const { data: website } = await db
    .from('websites')
    .select('id,name, domain,website_users!inner(role)')
    .eq('id', params.id)
    .eq('website_users.user_id', session?.user.id)
    .single();

  if (!website) {
    throw error(404, {
      message: 'Website not found'
    });
  }

  return { website };
}) satisfies LayoutServerLoad;
