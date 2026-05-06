import type { APIRoute } from 'astro';

interface LeadPayload {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  listing_id?: number;
  scheduled_at?: string;
}

function sanitize(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t.length > 0 ? t.slice(0, 1000) : null;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const env = locals.runtime?.env;
  if (!env?.DB) return new Response('DB no configurada', { status: 500 });

  let body: LeadPayload;
  try { body = await request.json() as LeadPayload; }
  catch { return new Response('JSON inválido', { status: 400 }); }

  const name = sanitize(body.name);
  if (!name) return new Response('name requerido', { status: 400 });
  const email = sanitize(body.email);
  const phone = sanitize(body.phone);
  if (!email && !phone) return new Response('correo o teléfono requerido', { status: 400 });
  const message = sanitize(body.message);
  const listingId = Number.isInteger(body.listing_id) ? body.listing_id : null;

  const result = await env.DB.prepare(
    'INSERT INTO leads (listing_id, name, email, phone, message, channel) VALUES (?, ?, ?, ?, ?, ?) RETURNING id',
  ).bind(listingId, name, email, phone, message, 'web').first<{ id: number }>();

  if (body.scheduled_at && listingId && result?.id) {
    await env.DB.prepare(
      'INSERT INTO bookings (listing_id, lead_id, scheduled_at) VALUES (?, ?, ?)',
    ).bind(listingId, result.id, sanitize(body.scheduled_at)).run();
  }

  // Notificación por correo (Resend) — opcional
  if (env.RESEND_API_KEY && env.LEAD_NOTIFY_EMAIL) {
    const subject = listingId ? `Nuevo lead para inmueble #${listingId}` : 'Nuevo lead';
    const html = `<h2>${subject}</h2>
      <p><strong>${name}</strong></p>
      <p>${email ?? ''}<br/>${phone ?? ''}</p>
      ${message ? `<p>${message}</p>` : ''}
      ${body.scheduled_at ? `<p><em>Visita solicitada: ${body.scheduled_at}</em></p>` : ''}`;
    // No bloqueamos la respuesta si Resend falla
    sendResend(env.RESEND_API_KEY, env.LEAD_NOTIFY_EMAIL, subject, html).catch(() => {});
  }

  return new Response(JSON.stringify({ ok: true, id: result?.id }), {
    headers: { 'content-type': 'application/json' },
  });
};

async function sendResend(apiKey: string, to: string, subject: string, html: string) {
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'authorization': `Bearer ${apiKey}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: 'ApartmentBroker <onboarding@resend.dev>',
      to, subject, html,
    }),
  });
}
