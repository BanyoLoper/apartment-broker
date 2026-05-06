# Arquitectura

## Stack y por qué

```
┌─────────────────────────────────────────────────────────────┐
│  Browser (móvil + desktop)                                  │
│  - Astro SSR HTML                                           │
│  - JS islands: Leaflet (mapas), Pannellum (360),            │
│    <model-viewer> (3D), formularios                         │
└────────────┬────────────────────────────────────────────────┘
             │ HTTPS edge
             ▼
┌─────────────────────────────────────────────────────────────┐
│  Cloudflare Pages + Workers (edge global)                   │
│  - Astro adapter @astrojs/cloudflare                        │
│  - Middleware: verifica cookie de sesión, protege /admin/*  │
│  - Rutas /api: leads, auth, overpass-proxy                  │
└─────┬─────────────────┬──────────────────┬──────────────────┘
      │                 │                  │
      ▼                 ▼                  ▼
┌──────────┐      ┌──────────┐      ┌──────────────────┐
│ D1       │      │ R2       │      │ Overpass API     │
│ (SQLite) │      │ (storage)│      │ (OpenStreetMap)  │
│ inmuebles│      │ fotos    │      │ POIs cercanos    │
│ leads    │      │ GLB      │      │ — gratuito       │
│ brokers  │      │ pano 360 │      │                  │
└──────────┘      └──────────┘      └──────────────────┘
```

Razones de stack:
- **Astro** — SSR rápido, hidratación parcial (islands). El catálogo se renderiza en HTML estático en el edge — Lighthouse ~95+ sin esfuerzo. Los componentes pesados (mapa, 360, 3D) se cargan en el cliente solo cuando hacen falta.
- **Cloudflare** — free tier permite operar 100 inmuebles con $0/mes. El día que tráfico crezca o se necesite contrato/firma electrónica, migramos a AWS (ver [ROADMAP_AWS.md](./ROADMAP_AWS.md)).

## Esquema de datos (D1 / SQLite)

| Tabla | Filas esperadas | Propósito |
|---|---|---|
| `brokers` | 1–10 | Login + auditoría |
| `listings` | 20–500 | Inmuebles con metadata, ubicación real + difusa, flags 3D/360 |
| `listing_media` | 1k–10k | Fotos/videos/GLB/360 enlazados a inmuebles |
| `broker_notes` | 100–5k | Notas internas por inmueble (no visibles al público) |
| `leads` | 100–10k | Contactos del formulario público |
| `bookings` | 50–5k | Solicitudes de visita |

Las queries son SQL estándar — al migrar a Postgres en AWS, solo cambia el cliente (`@cloudflare/workers` → `pg`).

## Privacidad de ubicación

El requerimiento pidió "zona aproximada sin revelar la ubicación final". Implementación:

1. El broker captura `lat_real`, `lng_real` al crear el inmueble (admin).
2. En el insert, el server calcula un **punto difuso** desplazado aleatoriamente dentro de un radio configurable (default 150m) y lo guarda como `lat_fuzzy`, `lng_fuzzy`.
3. El sitio público **solo lee `lat_fuzzy`/`lng_fuzzy`**. Nunca expone el punto real.
4. Se dibuja un círculo punteado del mismo radio para que el visitante entienda que es aproximada.
5. La ubicación exacta se entrega tras agendar visita (correo/WhatsApp con dirección real).

Por qué precalcular: si recalculábamos el offset en cada request, la distribución de puntos alrededor de la posición real filtraba el centro vía promedio. Cachear evita esa fuga.

## Mapas y POIs sin billing

- **Leaflet + OpenStreetMap tiles** — gratis, sin key. Tile usage policy permite uso comercial moderado; si un día llegamos a millones de tiles, contratamos un proveedor (Mapbox $5 USD por 1000 cargas, MapTiler gratis hasta 100k/mes).
- **Overpass API** para POIs (parques, transporte, OXXOs, cafés, gimnasios, escuelas) — gratis, sin key, rate limit ~10k req/día por IP.
  - Cacheamos en CDN con `Cache-Control: s-maxage=3600`. Para 100 inmuebles × 6 categorías = 600 queries únicas, cacheadas 1h. En la práctica nunca tocamos el rate limit.
- **Botón "Ver en Google Maps"** — link `https://www.google.com/maps/search/?api=1&query=…`. Gratis, sin SDK, sin key.

## Visores inmersivos

- **Pannellum** (360°) — CDN jsDelivr, ~30KB. Carga lazy: solo cuando el usuario abre el viewer. Acepta cualquier panorama equirectangular (formato estándar de cámaras 360 o stitching de fotos panorámicas).
- **`<model-viewer>` de Google** (3D) — web component sobre Three.js, ~150KB minified. AR en iOS/Android out-of-the-box (modo Quick Look y Scene Viewer). Acepta GLB/GLTF.

Para producción real, los GLB se generan con escaneo Matterport, fotogrametría (RealityCapture), o se modelan a partir de planos en Blender + scripted bake.

## Auth (mock)

- Hash PBKDF2 SHA-256, 100k iteraciones — equivalente al baseline de OWASP 2023.
- Cookie firmada HMAC-SHA-256, `HttpOnly + SameSite=Lax + Secure`, 12h TTL.
- Middleware `src/middleware.ts` rechaza `/admin/*` sin sesión válida.

Para producción, sumar:
- Rate limiting en `/api/auth/login` (KV-based o Turnstile)
- Reset de contraseña por correo
- 2FA (TOTP) — librería `otplib` corre nativa en Workers
- Pasar a OAuth (Google) si el equipo crece

## Lead capture

```
Visitante      Form (BookingPanel o LeadForm)
   │
   ▼
   POST /api/leads {name, email, phone, message, listing_id?, scheduled_at?}
   │
   ├──> INSERT INTO leads
   ├──> INSERT INTO bookings (si scheduled_at)
   └──> Resend.send() — fire-and-forget, no bloquea respuesta
        │
        ▼
        Correo a broker@apartmentbroker.com con detalles
```

WhatsApp: links `wa.me/<número>?text=<msg>` directos sin API. Para producción con respuestas automáticas, integrar con WhatsApp Business API (~$0.05 USD por conversación iniciada).

## Performance budget

- Home / listado: HTML SSR + 1 imagen optimizada por card. **<100KB** sin contar tiles del mapa.
- Detalle: HTML + Leaflet (40KB) + tiles. **<200KB** sin abrir 360/3D.
- 360 viewer: lazy. Solo carga al primer click. ~80KB de Pannellum + el panorama (típico ~2MB).
- 3D viewer: lazy. ~150KB de model-viewer + el GLB (puede ser de 5MB a 50MB).

## Observabilidad

- Cloudflare Pages logs + Workers analytics (gratis hasta cierto volumen).
- Para producción: agregar Sentry (5k events/mes free) o Cloudflare Workers Logs ($5/mes).
