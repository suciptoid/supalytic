import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// if the user is already logged in return them to the account page
	if (!session) {
		throw redirect(303, '/auth/login');
	}

	return { url: url.origin, session };
}) satisfies LayoutServerLoad;
