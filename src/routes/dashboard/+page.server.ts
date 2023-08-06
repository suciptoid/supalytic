import type { PageServerLoad } from './$types';

export const load = (async ({ url, locals: { getSession, supabase } }) => {
	const session = await getSession();

	const websites = await supabase.from('websites').select('*');

	console.log('websites');

	return { session, websites };
}) satisfies PageServerLoad;
