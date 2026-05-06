import { defineMiddleware } from 'astro:middleware';
import { SESSION_COOKIE, verifySession } from './lib/auth';

export const onRequest = defineMiddleware(async (context, next) => {
  const env = (context.locals as App.Locals).runtime?.env;
  const url = new URL(context.request.url);

  // Verifica cookie de sesión y la deja en locals para uso de páginas/APIs
  if (env?.SESSION_SECRET) {
    const cookie = context.request.headers.get('cookie') || '';
    const match = cookie.match(new RegExp(`${SESSION_COOKIE}=([^;]+)`));
    if (match) {
      const session = await verifySession(match[1], env.SESSION_SECRET);
      if (session) {
        (context.locals as App.Locals).session = {
          brokerId: session.brokerId,
          email: session.email,
          name: session.name,
        };
      }
    }
  }

  // Protege /admin/* — redirige a /login si no hay sesión válida
  if (url.pathname.startsWith('/admin') && !(context.locals as App.Locals).session) {
    return context.redirect('/login?redirect=' + encodeURIComponent(url.pathname));
  }

  return next();
});
