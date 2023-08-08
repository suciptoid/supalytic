import type { RequestHandler } from '@sveltejs/kit';

const corsHeaders = {
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': '*'
};

const getIp = (headers: Headers) => {
  if (headers.has('cf-connecting-ip')) {
    return headers.get('cf-connecting-ip');
  } else if (headers.get('x-forwarded-for')) {
    return headers.get('x-forwarded-for');
  }
  return null;
};

export const POST = (async ({ url, params, request, locals: { db } }) => {
  try {
    const data = await request.json();

    const values = {
      ...data,
      website_id: params.id
    };

    const ip = getIp(request.headers);

    console.log('track from ', { ip, values });

    // sessions
    let session = await db
      .from('sessions')
      .select()
      .eq('ip', ip)
      .eq('website_id', params.id)
      .eq('ua', data.ua)
      .single();

    if (!session.data) {
      session = await db
        .from('sessions')
        .insert({
          ip: ip,
          ua: data.ua,
          website_id: params.id,
          os: null, // TODO: detect os, device, browser
          device: null,
          browser: null,
          screen: data.sw,
          lang: data.loc
        })
        .select()
        .single();
    }

    // insert events
    await db
      .from('website_events')
      .insert({
        ...values,
        session_id: session.data?.id
      })
      .select()
      .single();
  } catch (e) {
    console.log('error receiveing track data');
  }
  return new Response(JSON.stringify({ ok: '😜' }), {
    status: 201,
    headers: {
      ...corsHeaders,
      'Content-Type': 'application/json'
    }
  });
}) satisfies RequestHandler;

export const OPTIONS = (async () => {
  return new Response(null, {
    headers: corsHeaders
  });
}) satisfies RequestHandler;

export const GET = (async ({ request }) => {
  console.log(request.headers.get('host'));
  return new Response(JSON.stringify(request.headers), {
    headers: corsHeaders
  });
}) satisfies RequestHandler;
