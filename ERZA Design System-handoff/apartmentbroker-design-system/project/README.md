# EZRA Real Estate — Design System

EZRA is a Mexico City rental brokerage with a **boutique-hospitality** sensibility. The product owns and operates its own portfolio of furnished apartments across Roma, Juárez, Condesa, and Polanco, and rents directly to tenants — there is no intermediary landlord.

The visual language is **editorial, monochrome, hospitality-grade**: charcoal and cream as the primary palette, a high-contrast didone serif (Playfair Display) for the wordmark and display moments, Inter Black for caption-style overlays on photography. A single warm copper accent appears for CTAs and KPI deltas. Spanish-first.

The product features:
- **Map-first listings** (Google Maps + price pins).
- **3D showroom** and **360° viewer** per apartment.
- **Editorial photo journey** instead of a gallery grid.
- **Comodidades nearby** — transit, parks, OXXOs, cafés.
- **Admin console** for the EZRA team.

---

## Sources

The system was authored from two reference assets the user provided:
1. The **EZRA wordmark** (didone serif, charcoal/cream).
2. The **Hamburgo · Col. Juárez** listing card (full-bleed photo + heavy-grotesque overlay copy + EZRA watermark).

All other tokens, components, and copy are proposals derived from those references. Replace placeholder photography with real EZRA-shot interiors before launch.

---

## Index

```
README.md, SKILL.md
colors_and_type.css            ← single source of truth for tokens
assets/                        ← logos, custom icons, photo placeholders
preview/                       ← Design System cards
ui_kits/web/                   ← public site (home, listings + map, detail, 3D, 360°)
ui_kits/admin/                 ← internal console
```

---

## Content Fundamentals

**Language.** Spanish-first (Mexican), English secondary. Copy is **plainspoken and confident** — never ad-speak. We are the dueño *and* the broker.

**Address.** *Tú* with prospects, *usted* in legal. English: plain second person.

**Casing.** Sentence case for all UI. **UPPERCASE with `0.32em` tracking** is reserved for eyebrows, micro-labels, and footer markers. Wordmark sets uppercase by default.

**Punctuation.** Middle dots (`·`) between specs: `1 rec · 1 baño · 1 estac · amenidades`. Em-dashes for editorial breaks. Spanish quotation marks `«»` in long-form.

**Currency.** `Renta $34,500` — the word "Renta" doubles as the label, the price is the focal element. Use the `$` glyph at the same heavy weight as the digits in editorial overlays. In tables and lists: `MXN $34,500 / mes`.

**Specific examples** (matching the Hamburgo reference):

| Surface | Spanish | English |
| --- | --- | --- |
| Listing overlay (line 1) | Hamburgo · Col. Juárez | Hamburgo · Col. Juárez |
| Listing overlay (line 2) | **Depto. Amueblado** estilo hotel boutique | **Furnished apt** boutique hotel style |
| Price | Renta **$34,500** | Rent **$34,500** |
| Specs | 60 m² · 1 rec · 1 baño · 1 estac · amenidades | 60 m² · 1 bed · 1 bath · 1 park · amenities |
| Sub-caption | mtto. + servicios incluidos | maint. + utilities incl. |
| CTA primary | Reservar visita | Book a viewing |
| CTA secondary | Ver en 3D | Tour in 3D |

**Don't say:** "luxury living," "your dream home," "stunning views," "world-class amenities." Say what's there.

**Emoji:** never. Iconography is line, 1.5px stroke, Lucide-derived.

---

## Visual Foundations

### Palette
The system is **monochrome with one warm accent**. The page is cream (`#F1ECE2`); the EZRA mark surface is charcoal (`#1A1A1A`); type on cream is near-black, type on charcoal is cream. Copper (`#C26A3F`) appears only on CTA chevrons and positive-delta indicators.

| Role | Token | Hex |
| --- | --- | --- |
| Page bg | `--ezra-cream-100` | `#F1ECE2` |
| Card surface | `--ezra-cream-50` | `#F8F4EC` |
| Mark / dark hero | `--ezra-ink-900` | `#1A1A1A` |
| Body on light | `--ezra-ink-900` | `#1A1A1A` |
| Body on dark | `--ezra-cream-100` | `#F1ECE2` |
| Muted | `--ezra-stone-500` | `#6B6663` |
| Accent (CTA, deltas) | `--ezra-accent-500` | `#C26A3F` |

### Type
- **Display / wordmark:** Playfair Display 500, wide letterspacing (`6` letterunits at 40px). The wordmark is always set with `EZRA` over `REAL ESTATE` in tracked-out small caps.
- **Editorial overlay:** Inter 800 (Black) for the chunky "Hamburgo · Col. Juárez" treatment. Tight line-height (`1.0`–`1.05`).
- **Body:** Inter 400 / 500 / 600.
- **Mono:** JetBrains Mono — for tabular stats only.

### The "EZRA listing card"
The signature unit (matching the Hamburgo reference):
- Full-bleed apartment photograph, portrait or 4:5 aspect.
- Soft top-down scrim only where copy sits.
- Stacked overlay copy in **Inter Black** (heavy grotesque), left-aligned, with mixed weights — bold name, light tagline.
- The `$` price is the largest single glyph on the card.
- A small copper-circle chevron CTA on the right edge for "see more."
- The **EZRA wordmark watermarks the bottom-center** at low opacity.
- Specs separated by middle dots.

### Surfaces & elevation
Cards on cream rest on a 1px hairline border, no shadow. They take a `shadow-2` only when floating over photography. The dark surface (`#1A1A1A`) needs no shadow — its contrast does the work.

### Corner radii
EZRA leans **squarer** than typical real estate UIs:
- Inputs / buttons: `4px`
- Cards: `8px`
- Hero panels: `14px`
- Pills: full radius

### Iconography
Lucide line at 1.5px stroke, plus custom: `icon-360.svg`, `icon-3d-room.svg`, `icon-metro.svg`, `icon-metrobus.svg`. No emoji.

### Imagery
Warm-light, daylight, real interiors. Furnished apartments — EZRA's stock is **always amueblado**, so imagery should always show furnished, lived-in spaces. Avoid wide-angle distortion.

---

## Caveats
- **Replace placeholder SVG photography** with real EZRA-shot interiors. The current placeholders are stylized stand-ins.
- **Fonts are Google Fonts (Playfair Display, Inter, JetBrains Mono).** If EZRA uses a licensed didone (e.g. Bodoni 72, Didot LT), substitute it in `colors_and_type.css`.
- **3D + 360° viewers are visual mocks.** Production needs a real engine (Matterport / Pannellum).
- **Google Maps is illustrated.** Production swaps in the Maps JS SDK.
