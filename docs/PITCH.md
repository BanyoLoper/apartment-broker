# Propuesta comercial — ApartmentBroker

> Documento para presentar al cliente. Justifica precio frente al paquete "Business" de BNY ($7,500 MXN) y deja claro por qué este proyecto está fuera de esa categoría.

---

## 1. ¿Por qué este proyecto NO es un sitio Business?

El paquete **Business** de BNY ($7,500 MXN pago único) cubre:
- Sitio multi-página (hasta 5 páginas)
- Blog estático
- Páginas: inicio, servicios, nosotros, blog, contacto
- Multiidioma básico ES/EN
- Panel admin **solo para editar textos**
- Formulario de contacto con múltiples destinos
- Entrega 7–10 días

Lo que ApartmentBroker requiere:
- ✗ **No es un sitio de contenido**, es una **aplicación web con base de datos** (catálogo dinámico, búsquedas, filtros, mapa interactivo).
- ✗ **No edita textos** — el broker sube **inmuebles completos** con fotos, videos, modelos 3D, panorámicas 360°, ubicación geográfica, amenidades, etc.
- ✗ **Multi-broker**, con autenticación, roles y datos privados (notas internas, leads, agenda de visitas).
- ✗ **Geolocalización** con ubicación difusa, mapa de amenidades cercanas.
- ✗ **Visores inmersivos** (3D y 360°) — categoría "PropTech" no "sitio web".
- ✗ **CRM-lite de leads** con pipeline (nuevo → contactado → visita → cerrado).

→ Esto **no se cobra como sitio web**. Se cobra como **producto digital a la medida**. La referencia del mercado mexicano para PropTech custom va de **$45,000 a $180,000 MXN** dependiendo del alcance.

---

## 2. Tiers propuestos

### **MVP — Mock para fase de venta** (lo que estás recibiendo ahora)

**$28,000 MXN — pago único**
*Entrega: 5–7 días desde aprobación*

Incluye:
- Catálogo público con búsqueda y filtros
- Mapa interactivo con pins difusos (radio 150m)
- Página de detalle con galería cinematográfica
- Visor 360° (Pannellum) — listo para subir panorámicas
- Visor 3D (model-viewer) — listo para subir GLB
- Mapa de amenidades cercanas (transporte, parques, OXXO, cafés, gimnasios, escuelas)
- Botón "Ver en Google Maps" gratuito
- Captura de leads con correo + WhatsApp directo
- Agenda de visitas
- Panel admin con login: tabla de inmuebles, métricas, wizard de alta de 3 pasos
- Panel de leads con pipeline visual
- Bilingüe ES/EN (toggle, copy en español, EN en fase 2)
- Diseño según el design system entregado (paleta CDMX, Fraunces + Inter)
- Stack Cloudflare con $0/mes de infra durante fase de venta
- Dominio + SSL incluidos
- 1 mes de soporte post-lanzamiento

Lo que NO incluye:
- Subida real de fotos por wizard (los assets se cargan vía panel manual o CLI durante la demo)
- Firma electrónica
- Pagos online
- App móvil
- Bilingüe completo (solo toggle, traducción en fase 2)

---

### **Producción — Post-venta cerrada** (cuando ya hay revenue del broker)

**$78,000 MXN — pago único** + **$3,500 MXN/mes** mantenimiento

Suma sobre el MVP:
- Subida real de fotos al storage con redimensión automática
- Edición y archivado de inmuebles
- Bilingüe ES/EN completo
- Comentarios internos por inmueble
- Captcha (Cloudflare Turnstile)
- Recordatorios automáticos por WhatsApp para visitas
- Dashboard de métricas: ocupación, tiempo en mercado, conversión por colonia
- Reset de contraseña, 2FA opcional
- 6 meses de soporte
- SLA 99.5% uptime

---

### **Migración AWS — Cuando crezca la operación**

**$58,000 MXN — pago único** + **$5,500 MXN/mes** mantenimiento + costos de infra (≈ $2,000–4,000 MXN/mes)

Suma sobre Producción:
- Migración a AWS (RDS Postgres, S3, CloudFront, Lambda)
- Procesamiento de pagos (Stripe / Conekta)
- Firma electrónica de contratos (Mifiel / DocuSign)
- App móvil ligera (PWA o React Native)
- API pública para integraciones (portales inmobiliarios externos)
- 12 meses de soporte
- SLA 99.9% uptime

Trigger para activar este tier: > 1,000 inmuebles activos o > 100k visitas/mes.

---

## 3. Cómo lo justificas en la conversación

| Si pregunta | Respondes |
|---|---|
| "¿Por qué no es Business?" | "Business es para sitios de contenido. Lo tuyo es una **aplicación con base de datos**, multiusuario, con visores 3D y mapa. Es categoría PropTech, no website." |
| "¿No es muy caro?" | "Mira lo que viene incluido: panel admin custom, geolocalización con privacidad, dos visores inmersivos, captura de leads con CRM ligero. Construir esto de cero a un freelancer le toma 80–120 horas. A $400/h promedio del mercado, va de $32k a $48k MXN solo de mano de obra." |
| "¿Por qué no usar un portal como Inmuebles24?" | "Esos te listan junto a 50,000 más. Aquí tu sitio es **tu marca**, capturas leads directos, controlas la conversión. Y los visores 360/3D son diferenciador real — los portales no los tienen." |
| "¿Qué pasa si crece?" | "Migramos a AWS — está planeado, hay un roadmap. Tu inversión inicial no se pierde, el código viaja." |
| "¿Cuánto pago de infra?" | "Durante la fase de venta, **$20 MXN al mes**. Todo en free tiers de Cloudflare. Cuando crezcas, escalamos por consumo." |
| "¿Por qué no Wix o Wordpress?" | "Wix no soporta wizard custom de subida con 3D y 360. Wordpress sí, pero el panel para 3D requiere plugins de pago, mantenimiento mensual, y el frontend pesa 4× más → SEO y conversión sufren." |

---

## 4. Comparativo visual del valor

```
                    Business (BNY)        ApartmentBroker MVP
                    $7,500 MXN            $28,000 MXN
                    ─────────────────     ───────────────────
Páginas             5 estáticas           Aplicación dinámica
Base de datos       —                     Cloudflare D1
Catálogo            Lista manual          Búsqueda + filtros
Mapa                —                     Leaflet + amenidades
Visor 3D            —                     model-viewer
Visor 360           —                     Pannellum
Multi-usuario       —                     Auth + roles
Captura leads       Form básico           CRM-lite + WhatsApp
Wizard de carga     —                     3 pasos (datos+media+pub)
Tiempo entrega      7–10 días             5–7 días
Soporte             1 semana              1 mes
```

ApartmentBroker MVP entrega **~5× la funcionalidad** por **~3.7× el precio**. El cliente paga 3.7× más por algo que vale 5× más en terreno técnico — y que además es la única vía para diferenciarse en un mercado saturado.

---

## 5. Términos sugeridos

- **Forma de pago**: 50% al firmar, 50% al cierre del MVP (5–7 días).
- **Aceptación**: documento de scope firmado antes de empezar.
- **Cambios de scope**: cualquier funcionalidad fuera de la lista MVP cotiza por separado a $400 MXN/hora.
- **Hosting fase 1**: incluido en mantenimiento durante 6 meses (free tier Cloudflare). A partir del mes 7, factura aparte si pasa de free tier.
- **Propiedad del código**: del cliente al pago final. Repositorio entregado en GitHub o GitLab.
- **Garantía**: 30 días post-entrega para fixes de bugs sin costo (excluye cambios de scope).

---

## 6. Anti-paquetes que descartamos

- **No subcontratar a un freelancer pagado por horas sin contrato fijo** — el cliente pierde control de costo.
- **No reusar tema Wordpress** — el upfront es barato pero el mantenimiento mensual y la dependencia de plugins lo hace más caro a 12 meses.
- **No Webflow** — su Designer no soporta visores 3D ni captura compleja de inmuebles. Llegaría a $1,500 MXN/mes en su plan Business y aún así requeriría custom code que sale del soporte.

---

## Resumen

> "Por **$28,000 MXN** te entregamos en una semana una plataforma propia, con visores 3D y 360°, mapa con amenidades, panel admin para tu equipo y captura de leads que te llegan por correo y WhatsApp. Infraestructura $20 MXN/mes. Cuando crezcas, migramos a AWS — el plan ya está escrito."
