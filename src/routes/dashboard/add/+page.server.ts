import { fail, type Actions } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { website, websiteUsers } from '$lib/server/db/schema';

export const actions = {
	default: async ({ request, locals: { getSession, supabase } }) => {
		try {
			const session = await getSession();

			const form = await request.formData();
			const data = {
				name: form.get('name')!.toString(),
				domain: form.get('domain')!.toString()
			};

			// const insert = await supabase.from('websites').insert(website);
			await db.transaction(async (tx) => {
				const insert = await tx.insert(website).values(data).returning({ id: website.id });

				await tx.insert(websiteUsers).values({
					userId: session!.user.id,
					websiteId: insert[0].id
				});
			});

			console.log('default actions', { website });
			return { success: true };
		} catch (e) {
			console.log('error', e);
			return fail(400, { success: false });
		}
	}
} satisfies Actions;
