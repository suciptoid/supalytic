import type { RequestHandler } from '@sveltejs/kit';

export const POST = (async ({ url, params, request, locals: { db } }) => {
  try {
    const data = await request.json();
    console.log('track', { params, url, data });

    const values = {
      ...data,
      website_id: params.id
    };

    const insert = await db.from('website_events').insert(values).select().single();
    console.log('insert', insert);
  } catch (e) {
    console.log('error receiveing track data');
  }
  return new Response('ok', {
    status: 201
  });
}) satisfies RequestHandler;

export const OPTIONS = (async () => {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Methods': 'GET, PUT, PATCH, POST, OPTIONS, HEAD',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    }
  });
}) satisfies RequestHandler;

export const HEAD = OPTIONS;
export const GET = OPTIONS;
