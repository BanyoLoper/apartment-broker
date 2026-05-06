# ApartmentBroker

Plataforma para un broker de departamentos en CDMX. Catálogo público con mapa, viewer 3D, viewer 360°, captura de leads y panel admin para los brokers.

Construido con **Astro + Cloudflare** (Pages, Workers, D1, R2). Listo para migrar a AWS cuando se cierre la fase de venta — ver [docs/ROADMAP_AWS.md](./docs/ROADMAP_AWS.md).

## Documentación

- **[docs/ARQUITECTURA.md](./docs/ARQUITECTURA.md)** — stack, decisiones técnicas, diagrama de servicios
- **[docs/COSTOS.md](./docs/COSTOS.md)** — costo interno de infra (Cloudflare) y proyecciones
- **[docs/PITCH.md](./docs/PITCH.md)** — propuesta comercial al cliente con tiers y justificación
- **[docs/ROADMAP_AWS.md](./docs/ROADMAP_AWS.md)** — plan de migración cuando crezca la operación

## Quickstart local

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno locales
cp .dev.vars.example .dev.vars

# 3. Crear DB local y migrar
npx wrangler d1 create apartmentbroker
# (copia el database_id que imprime al wrangler.toml)
npm run db:migrate:local

# 4. Generar hash de la contraseña demo (opcional pero recomendado)
node scripts/hash-password.mjs demo123
# (pega los valores en migrations/0002_seed.sql)

# 5. Cargar seed con 6 inmuebles de demo
npm run db:seed:local

# 6. Levantar dev server
npm run dev
```

Abre `http://localhost:4321/`. El admin vive en `/admin` (redirige a `/login`).

Login demo: `broker@example.com` / contraseña en `.dev.vars` (`ADMIN_PASSWORD`, default `demo123`).

## Despliegue en Cloudflare Pages

```bash
# Una sola vez:
npx wrangler d1 create apartmentbroker
npx wrangler r2 bucket create apartmentbroker-media
# pega el database_id en wrangler.toml

npx wrangler secret put SESSION_SECRET     # > openssl rand -hex 32
npx wrangler secret put ADMIN_PASSWORD     # contraseña inicial del broker
npx wrangler secret put RESEND_API_KEY     # opcional

# Migrar la DB remota
npm run db:migrate:remote
npm run db:seed:remote

# Desplegar
npm run deploy
```

## Stack

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | Astro 5 (SSR) | Server-rendered con islands para JS dinámico |
| Hosting | Cloudflare Pages + Workers | Free tier generoso, edge global |
| DB | Cloudflare D1 (SQLite) | Migrable a Postgres en AWS sin reescribir queries |
| Storage | Cloudflare R2 | Fotos, GLB, panoramas 360. Egress gratis. |
| Mapa base | Leaflet + OpenStreetMap | Sin API key, sin billing |
| POIs cercanos | Overpass API (OSM) | Sin API key, sin billing |
| Viewer 360° | Pannellum | MIT, ~30KB, equirectangular |
| Viewer 3D | `<model-viewer>` (Google) | GLB/GLTF, soporta AR en móvil |
| Auth | PBKDF2 + cookie HMAC | Sin dependencias externas |
| Email | Resend (opcional) | 3k correos gratis/mes |

## Estructura

```
src/
├── components/
│   ├── admin/         Sidebar, TopBar, MetricsRow, ListingsTable, Field, Toggle
│   └── public/        Header, Footer, Hero, ListingCard, ListingsMap,
│                      ImageJourney, BookingPanel, NearbyMap, Viewer360,
│                      Showroom3D, LeadForm, Feat
├── layouts/           PublicLayout, AdminLayout
├── lib/               db, auth, geo, overpass
├── middleware.ts      Verifica sesión, protege /admin/*
├── pages/
│   ├── index.astro    Home
│   ├── departamentos/ Listado y detalle
│   ├── login.astro
│   ├── admin/         Console privada
│   └── api/           Endpoints (auth, leads, listings, overpass)
└── styles/tokens.css  Design system tokens
```

## Decisiones que valen explicación

- **Sin Cloudflare Images** — $5/mes mínimo no se justifica para 100 inmuebles. R2 + transformaciones por Worker cuando crezca.
- **Sin Google Maps** — sin billing activo, OSM cumple para CDMX. Botón "Ver en Google Maps" gratis vía URL pública.
- **Punto difuso precalculado** — el offset aleatorio se guarda en DB. Si lo recalculábamos en cada request, la distribución filtraría la ubicación real.
- **`model-viewer` en lugar de Three.js puro** — menos código, AR gratis, una línea de HTML.

## Faltantes conscientes (para fase 2)

- Subida real de fotos al R2 desde el wizard
- Edición / archivado de inmuebles desde admin
- Bilingüe ES/EN (toggle ya está en el header como mock)
- Comentarios internos por inmueble (schema listo: `broker_notes`)
- Multi-broker real (schema listo, falta UI de invitación)
- Verificación de captcha en lead form (Turnstile)
- CRM-lite para mover leads entre estados
