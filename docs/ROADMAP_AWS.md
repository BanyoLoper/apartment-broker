# Migración a AWS — Roadmap

> Activar cuando se cumpla **al menos uno** de estos triggers:
>
> - \> 1,000 inmuebles activos
> - \> 100k visitas/mes sostenidas
> - Necesidad de pagos online (Stripe + webhooks de Conekta)
> - Firma electrónica de contratos (Mifiel, requiere endpoint estable)
> - Procesamiento batch (reportes mensuales, ingesta nocturna)
> - Compliance (auditorías, retención de logs > 30 días)
> - Equipo de >3 brokers + 1 dev interno

Si no se cumple ninguno, **NO migrar**. Cloudflare aguanta más de lo que la gente cree.

---

## Por qué AWS y no quedarse en Cloudflare

Cloudflare es excelente como edge runtime. Limitaciones reales que aparecen al crecer:
- **D1**: 10GB por DB, sin replicación cross-region propia, queries limitadas a 30s.
- **Workers**: CPU time 50ms (free) / 30s (paid). Para batch / cron pesado se queda corto.
- **Sin servicios maduros para pagos / firma / mensajería** que requieran orquestación stateful.
- **Logs**: retención 24h en free, 7 días en paid. Compliance requiere 90+ días.

AWS resuelve esto a costa de:
- Mayor costo base ($80–200 USD/mes vs ~$5 USD/mes en Cloudflare paid).
- Más superficie operativa (IAM, VPC, security groups).
- Latencia ligeramente mayor (us-east-1 → CDMX ~50ms vs Cloudflare edge ~5ms).

Mitigamos latencia con **CloudFront** delante.

---

## Mapeo de servicios

| Hoy en Cloudflare | Mañana en AWS | Por qué |
|---|---|---|
| Pages + Workers (Astro SSR) | **Lambda** + **CloudFront** | Astro tiene adapter `@astrojs/aws-amplify` y `@astrojs/node` (en EC2/ECS). Adapter Lambda funciona con CloudFront delante. |
| D1 (SQLite) | **RDS Aurora Serverless v2 (Postgres)** | Postgres es el formato natural para crecer. Aurora Serverless escala a cero en idle (paga por ACUs activas). |
| R2 | **S3** + CloudFront | Drop-in. R2 ya usa S3 API; cambia el cliente y el bucket. |
| KV (rate limit) | **DynamoDB on-demand** | NoSQL key-value, escala automática. |
| Resend | **SES** o seguir con Resend | SES es más barato pero requiere setup DKIM. Si funciona Resend, no muevas. |
| Workers Cron | **EventBridge** + Lambda | Cron sin restricciones de tiempo. |
| Turnstile | **WAF + reCAPTCHA** | WAF + Cloudflare en frente sigue siendo opción híbrida. |

---

## Plan de migración (4 sprints, ~6 semanas)

### Sprint 1 — Preparación (1 sem)
- [ ] Provisionar cuenta AWS con SSO + budget alerts ($300 USD/mes inicial).
- [ ] Terraform o Pulumi para infra como código desde el día 1.
- [ ] Crear VPC con subnets públicas/privadas.
- [ ] RDS Postgres (Aurora Serverless v2, 0.5–4 ACU).
- [ ] S3 bucket con CloudFront distribution + Origin Access Control.
- [ ] Route53 hosted zone, dominio listo.

### Sprint 2 — Code parity (2 sem)
- [ ] Migrar `lib/db.ts` a usar `pg` en lugar de `D1Database` (interfaz compatible).
- [ ] Refactor de queries: SQLite → Postgres (typecast `INTEGER` ↔ `BIGINT`, `TEXT` ↔ `VARCHAR`, `datetime('now')` → `NOW()`).
- [ ] Reescribir `auth.ts` para usar `bcrypt` o `argon2` (Lambda soporta nativo, ya no estamos limitados a Web Crypto).
- [ ] Migrar lógica de R2 a S3 (cambiar SDK, mismo flujo).
- [ ] Sumar adapter de Astro Lambda. Probar SSR localmente con `serverless-http`.
- [ ] CI: GitHub Actions → SAM o CDK deploy a AWS.

### Sprint 3 — Migración de datos (1 sem)
- [ ] Export D1 → SQL via `wrangler d1 export`.
- [ ] Import a Postgres con script de transformación de tipos.
- [ ] Sync de R2 a S3 con `rclone` (preserva metadata).
- [ ] Validar count + checksums por tabla.
- [ ] Setup de réplica de lectura para reportes (RDS read replica, +30%).

### Sprint 4 — Cutover (1 sem)
- [ ] Modo lectura en Cloudflare durante el switch (banner en admin).
- [ ] Apuntar Route53 a CloudFront (TTL bajo durante el cutover).
- [ ] Smoke tests: login, crear inmueble, capturar lead, agendar visita.
- [ ] Monitorear errores 24h.
- [ ] Apagar Cloudflare DB writes (mantener Pages como mirror estático 30 días por si hay rollback).

---

## Costos AWS estimados (post-migración)

| Servicio | Configuración | $ USD/mes |
|---|---|---|
| RDS Aurora Serverless v2 | 0.5 ACU min, 4 ACU max | $40–120 |
| Lambda (Astro SSR) | ~5M invocations, 256MB, 200ms avg | $5–15 |
| CloudFront | 100GB transfer, 5M requests | $9 |
| S3 storage + requests | 100GB + 1M PUTs + 5M GETs | $5 |
| Route53 hosted zone | 1 zona | $0.50 |
| Backup automático RDS | 7 días | incluido |
| CloudWatch logs | 30 días retención | $5–10 |
| Data transfer out | ~50GB | $5 |
| EventBridge + Lambda crons | 100k invoc | $0.20 |
| **Total** | | **$70–165 USD/mes** |

A 18 MXN/USD: **$1,260–2,970 MXN/mes**.

Compara con Cloudflare paid: **$50–250 MXN/mes**. Diferencia ~10×, justificada solo cuando los triggers se cumplan.

---

## Lo que NO cambiamos en la migración

- **Astro como framework**. El código de páginas y componentes se queda igual.
- **Design system**. Tokens, componentes — todos iguales.
- **Schema de DB**. Solo cambia el dialecto.
- **APIs públicas**. Mismas rutas `/api/*`.
- **Frontend** — tile servers de OSM, Pannellum, model-viewer siguen siendo CDN externos.

---

## Plan B: si AWS sale más caro de lo esperado

Después de 90 días de operación en AWS, evaluar:

- **Reservar instancias**: 1 año compromiso → 30–40% descuento.
- **Aurora Serverless → Aurora Provisioned**: si el patrón de carga es predecible.
- **Lambda → ECS Fargate**: para SSR alto volumen, Fargate es más barato a partir de ~10M invocations/mes.
- **CloudFront → BunnyCDN**: si el costo de CDN domina ($0.005/GB vs $0.085/GB).

---

## Anti-decisiones a evitar

- ❌ Migrar a EKS ("Kubernetes en AWS"). Para 1 servicio, es overhead innecesario.
- ❌ Migrar a "AWS Amplify Hosting". Más caro y más cerrado que Lambda + CloudFront directo.
- ❌ DynamoDB como DB principal. Para datos relacionales (inmuebles, leads, brokers, contratos) Postgres gana 10×.
- ❌ Multi-region desde día 1. Caro y complejo. CDMX está cerca de us-east-1, eso basta.
- ❌ Microservicios. La app cabe en un monolito Astro + 1 DB. Microservicios cuando el equipo sea 4+ devs.
