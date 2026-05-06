import type { APIRoute } from 'astro';
import { buildClearSessionCookie } from '../../../lib/auth';

export const POST: APIRoute = () => {
  return new Response(null, {
    status: 302,
    headers: { 'location': '/', 'set-cookie': buildClearSessionCookie() },
  });
};

export const GET = POST;
