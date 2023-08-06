import { fail, type Actions } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, locals: { getSession, supabase } }) => {
		try {
			const session = await getSession();

			const form = await request.formData();
			const website = {
				name: form.get('name'),
				domain: form.get('domain')
			};

			const insert = await supabase.from('websites').insert(website);

			console.log('default actions', { website, user: session?.user, insert });
			return { success: true };
		} catch {
			return fail(400, { success: false });
		}
	}
} satisfies Actions;
