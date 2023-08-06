import { fail, type Actions, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals: { getSession, supabase, db } }) => {
    const session = await getSession();

    const form = await request.formData();
    const data = {
      name: form.get('name')!.toString(),
      domain: form.get('domain')!.toString()
    };

    try {
      const insert = await db.from('websites').insert(data).select().single();
      const uw = await db
        .from('website_users')
        .insert({
          user_id: session!.user.id,
          website_id: insert.data!.id
        })
        .select()
        .single();
    } catch (e) {
      console.log('error', e);
      return fail(400, { success: false });
    }

    throw redirect(303, '/dashboard');
  }
} satisfies Actions;
