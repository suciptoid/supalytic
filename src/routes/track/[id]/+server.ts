import type { RequestHandler } from '@sveltejs/kit';
import { browserName, detectOS } from 'detect-browser';

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

const getDeviceType = (width: number, os: string) => {
  // TODO: get device type
  return 'desktop';
};

export const POST = (async ({ url, params, request, locals: { db } }) => {
  let session_id = null;
  try {
    const data = await request.json();
    const values = {
      ...data,
      website_id: params.id
    };

    const ua = request.headers.get('user-agent') ?? data?.data?.ua;
    const browser = browserName(ua);
    const os = detectOS(ua);

    const ip = getIp(request.headers);

    // sessions
    const session = await db.rpc('get_session', {
      p_ip: ip || '',
      p_website_id: params.id!,
      p_ua: data?.data?.ua,
      p_browser: browser || 'Unknown',
      p_device: getDeviceType(data?.data?.sw, os || 'Other'),
      p_os: os || 'Unknown',
      p_screen: data?.data?.sw,
      p_lang: data?.data?.loc
    });
    session_id = session.data?.id;

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
  return new Response(JSON.stringify({ ok: '😜', session: session_id }), {
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
