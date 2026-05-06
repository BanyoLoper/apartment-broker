import type { APIRoute } from 'astro';
import { verifyPassword, signSession, buildSessionCookie } from '../../../lib/auth';
import type { Broker } from '../../../lib/db';

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const env = locals.runtime?.env;
  if (!env) {
    return new Response('locals.runtime.env undefined — el adapter de Cloudflare no está inyectando bindings. Verifica que el deploy sea con Astro adapter cloudflare 12.x.', { status: 500 });
  }
  const missing: string[] = [];
  if (!env.DB) missing.push('DB (binding D1)');
  if (!env.SESSION_SECRET) missing.push('SESSION_SECRET (secret)');
  if (missing.length) {
    return new Response(`Faltan en este deploy: ${missing.join(', ')}. Revisa Settings → Variables and Secrets / Bindings, y que estén scoped a Production. Luego haz un deploy nuevo (no retry).`, { status: 500 });
  }

  const fd = await request.formData();
  const email = String(fd.get('email') || '').trim().toLowerCase();
  const password = String(fd.get('password') || '');
  const next = String(fd.get('redirect') || '/admin');

  if (!email || !password) {
    return redirect('/login?error=campos');
  }

  const broker = await env.DB.prepare(
    'SELECT * FROM brokers WHERE email = ? AND active = 1',
  ).bind(email).first() as Broker | null;

  let ok = false;
  if (broker) {
    // Si el seed dejó un hash placeholder ("placeholder-..."), aceptamos
    // la contraseña de env. Esto permite arrancar la demo sin correr el
    // script de hash. En producción real, el hash es PBKDF2 y este branch
    // no aplica.
    if (broker.password_hash.startsWith('placeholder-') && env.ADMIN_PASSWORD) {
      ok = password === env.ADMIN_PASSWORD;
    } else {
      ok = await verifyPassword(password, broker.password_hash, broker.password_salt);
    }
  } else if (email === 'broker@example.com' && env.ADMIN_PASSWORD && password === env.ADMIN_PASSWORD) {
    // Fallback completo: ni siquiera hay broker en DB todavía.
    ok = true;
  }
  if (!ok) return redirect('/login?error=credenciales');

  const session = await signSession({
    brokerId: broker?.id ?? 1,
    email: broker?.email ?? email,
    name: broker?.name ?? 'Broker',
  }, env.SESSION_SECRET);

  return new Response(null, {
    status: 302,
    headers: {
      'location': next.startsWith('/') ? next : '/admin',
      'set-cookie': buildSessionCookie(session),
    },
  });
};
