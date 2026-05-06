# Costos internos de infraestructura

> Lo que **tú** pagas a los proveedores. Para precios al cliente, ver [PITCH.md](./PITCH.md).

Todos los precios en USD salvo indicación. Conversión MXN ≈ × 18 (mayo 2026).

## Mock / Fase de venta (lo que estás construyendo ahora)

Configuración: 100 inmuebles máximo, 6 fotos cada uno, videos en YouTube/Vimeo embebidos, ~5k visitas/mes.

| Servicio | Free tier | Uso esperado | Costo |
|---|---|---|---|
| Cloudflare Pages (hosting Astro) | 500 builds/mes, requests ilimitados | <50 builds | **$0** |
| Cloudflare Workers (SSR del adapter) | 100k req/día | ~5k req/día | **$0** |
| Cloudflare D1 (DB) | 5GB storage, 5M reads/día, 100k writes/día | <100MB, <50k reads/día | **$0** |
| Cloudflare R2 (storage media) | 10GB storage, egress siempre gratis | ~3GB (100 × 6 fotos × ~5MB) | **$0** |
| Cloudflare Workers KV (rate limit, cache) | 100k reads/día, 1k writes/día | mínimo | **$0** |
| OpenStreetMap tiles | "uso razonable" | ~50k tiles/mes | **$0** |
| Overpass API (POIs) | ~10k queries/día | ~200/día con cache CDN | **$0** |
| Pannellum CDN (jsDelivr) | gratis ilimitado | — | **$0** |
| `<model-viewer>` CDN | gratis ilimitado | — | **$0** |
| Resend (emails de leads) | 3k emails/mes, 100/día | <500/mes | **$0** |
| Dominio `.com` | — | 1 dominio | **~$10/año** = $0.83/mes |
| Cloudflare Turnstile (captcha) | gratis ilimitado | — | **$0** |

**Total mock: ≈ $1/mes (USD), ≈ $20 MXN/mes.**

Solo dominio. Todo lo demás vive en free tiers con margen amplio.

## Producción ligera (post-venta, hasta 1000 inmuebles)

Misma config + tráfico ~50k visitas/mes y 30k panoramas 360 servidos al mes.

| Servicio | Free | Pago | Costo |
|---|---|---|---|
| Cloudflare Workers Paid (límites más altos) | — | $5/mes | **$5** |
| Cloudflare D1 Paid (más writes) | incluido en Workers Paid | — | **$0** |
| R2 storage | 10GB free | ~30GB total → $0.015/GB/mes × 20GB | **$0.30** |
| R2 operaciones | 1M class A free | 5M class A → $4.50/M | **$0.45** |
| Cloudflare Stream (videos propios) | opcional | $1 / 1000 min/mes vistas + $5 / 1000 min almacenados | **$0–15** |
| Mapbox (si saturas OSM) | 50k cargas/mes free | $0.50 / 1000 cargas extra | **$0–10** |
| Resend (correo) | 3k/mes | $20/mes para 50k | **$0** (mientras <3k) |
| Sentry (errores) | 5k events/mes | — | **$0** |
| Dominio `.com` | — | $10/año | **$0.83** |
| Cloudflare Logs | gratis (analytics) | $5/mes para logs detallados | **$5** opcional |

**Producción ligera: ≈ $7–25/mes (USD), ≈ $130–450 MXN/mes.**

## Producción robusta (post-venta, multi-ciudad, 5000 inmuebles)

Cuando cumpla cualquiera de estos triggers, ya no estamos en "mock":
- > 100k visitas/mes sostenido
- Subida masiva de fotos (>500GB en R2)
- Necesidad de procesar pagos (depósitos online)
- Firma electrónica de contratos
- App móvil

→ ahí migramos a AWS. Ver [ROADMAP_AWS.md](./ROADMAP_AWS.md). Costo estimado AWS: $80–200 USD/mes inicial, escala con tráfico.

## Costos de Google Maps si se decide pagar

Si el cliente pide Google Maps en lugar de OSM:

| Producto | Free | Costo después |
|---|---|---|
| Maps JavaScript API | $200 USD crédito/mes (~28k cargas) | $7 / 1000 cargas |
| Places API (Nearby Search) | mismo crédito (~11k queries) | $32 / 1000 queries |
| Places Autocomplete | mismo crédito | $2.83 / 1000 sesiones |

Con 5k visitas/mes × 1 carga de mapa cada una = 5k cargas → **$0** (dentro de crédito).
Si llegamos a 30k visitas/mes con búsqueda de POIs → ~$50–80/mes.

## Línea base recomendada para el pitch

**Mes 1–6 (fase venta + producción inicial):** $20 MXN/mes infra. Pasa al cliente como "incluido en mantenimiento".

**Mes 7–12 (escalando):** $200–500 MXN/mes infra. Empezamos a separar facturación.

**Año 2 (si crece):** evaluar migración AWS. Pasamos de $500 MXN/mes a posiblemente $2,500–4,000 MXN/mes — pero con capacidad de 10× tráfico, firma electrónica, app móvil, etc.
