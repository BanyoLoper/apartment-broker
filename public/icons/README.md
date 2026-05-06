# EZRA — Iconos de referencia

Iconos minimalistas line-art (24x24, stroke 1.5, currentColor) usados a lo largo de la plataforma.

## Estructura

```
icons/
├── amenities/   31 iconos para servicios e infraestructura del depa
└── nearby/      6 iconos de comodidades cercanas (mapa)
```

## Fuente de verdad

Los SVG en esta carpeta son **derivados**, no la fuente. Editar:

- `src/lib/amenity-icons.ts` — catálogo + matcher por keywords
- `src/lib/nearby-icons.ts` — categorías de POIs (transit, parks, stores, cafes, gyms, schools)

Tras editar las libs, regenera los archivos:

```bash
node scripts/export-icons.mjs
```

## Uso en componentes Astro

```astro
---
import AmenityIcon from '../components/public/AmenityIcon.astro';
---
<!-- Por texto libre (matcheo automático) -->
<AmenityIcon text="Wi-Fi 1 Gbps" />

<!-- Por key explícita -->
<AmenityIcon iconKey="gym" size={24} />
```

## Dónde aparecen

| Lugar | Iconos | Componente |
|---|---|---|
| Detalle del depa — sección amenidades | `amenities/*` | `AmenityIcon.astro` |
| Mapa "El barrio, a pie" — botones de categoría | `nearby/*` | `NearbyMap.astro` |
| Mapa "El barrio, a pie" — pins POI | `nearby/*` | `NearbyMap.astro` (Leaflet divIcon) |
| Form de contacto — selector "Imprescindibles" | `amenities/*` | `LeadForm.astro` |
