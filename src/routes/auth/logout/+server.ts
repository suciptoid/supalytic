import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET = (async ({ locals: { supabase } }) => {
  await supabase.auth.signOut();

  throw redirect(303, '/');
}) satisfies RequestHandler;
