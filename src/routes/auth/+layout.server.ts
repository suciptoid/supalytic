import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	return { url: url.origin, session };
}) satisfies LayoutServerLoad;
