# ApartmentBroker — Design System

ApartmentBroker is a Mexico City rental broker that **owns and operates its own portfolio** of apartments across CDMX. It rents directly to tenants — there is no intermediary landlord behind the scenes — and pairs that operating model with a modern, tech-forward product:

- **Map-first listings** powered by Google Maps with neighborhood overlays.
- **3D showroom** — explore each apartment as a navigable 3D model before visiting.
- **360° photo viewer** — panoramic walkthroughs of every room.
- **A new way to display images** — cinematic, scroll-driven photo journeys instead of the standard real-estate gallery grid.
- **Commodities map** — one tap reveals nearby OXXOs, Metro/Metrobús stops, parks, supermarkets, gyms, cafés.
- **Admin console** — internal tool for the ApartmentBroker team to publish, edit, and retire listings.

The brand voice sits at the intersection of two CDMX moods: the calm, sun-bleached minimalism of a Roma-Norte courtyard, and the precision of a modern tech product. Warm but exact. Spanish-first, English-second.

---

## Sources

> No external assets, codebase, or Figma file was attached for this build. The system was authored from the brief alone. **All visual decisions below are proposals**, intended to be ratified or revised by the ApartmentBroker team. When real source materials become available, replace the placeholder logos and imagery, then re-derive `colors_and_type.css` from canonical brand tokens.

---

## Index

```
README.md                    ← you are here
SKILL.md                     ← agent skill manifest (Claude Code compatible)
colors_and_type.css          ← color + type tokens, single source of truth
fonts/                       ← (uses Google Fonts CDN; see Caveats)
assets/
  logo-mark.svg              ← geometric monogram
  logo-wordmark.svg          ← horizontal logo lockup
  logo-stack.svg             ← stacked lockup for square placements
  pattern-talavera.svg       ← decorative tile pattern (subtle backgrounds)
  placeholder-apt-*.svg      ← apartment photo stand-ins
preview/                     ← Design System cards (rendered in the DS tab)
ui_kits/
  web/                       ← public-facing rental site (listings, detail, 3D, 360)
  admin/                     ← internal admin console for managing publications
```

---

## Content Fundamentals

**Language.** Primary: **Spanish (Mexican).** Secondary: **English** (toggle in header). Spanish copy never reads as a translation — it is written native-first by someone who lives in the city. Use *chilango* warmth without slang that dates quickly.

**Voice.** Confident, plainspoken, a little dry. We are the landlord and the broker; we know the buildings because we run them. Skip the hyperbole real-estate marketing leans on ("luxurious," "stunning," "dream home"). State what's there.

**Address.** Use **tú** with prospective tenants in marketing copy ("encuentra tu próximo depa"). Switch to **usted** in legal / contract surfaces. In English, use plain second person ("you").

**Casing.** Sentence case for headlines and buttons. **Never Title Case.** Eyebrows and small labels are UPPERCASE with letterspacing. Numbers are typeset (e.g. `2 rec · 1 baño · 78 m²`), not spelled out.

**Punctuation.** Em-dashes and middle dots (`·`) over commas for stat strings. Spanish quotation marks `«»` in long-form editorial; straight quotes elsewhere. Never use exclamation marks in product UI.

**Currency.** `MXN $24,500 / mes` with the currency code first. Always show the period (`/ mes`, `/ noche`). For bilingual surfaces, render once in MXN and optionally show USD in muted secondary text.

**Emoji.** Not used. Ever. Iconography is line-based and consistent (see ICONOGRAPHY).

**Specific examples.**

| Surface | Spanish | English |
| --- | --- | --- |
| Hero headline | Vive en una colonia que ya conoces. | Live in a neighborhood you already love. |
| CTA primary | Reserva una visita | Book a viewing |
| CTA secondary | Ver en 3D | Tour in 3D |
| Empty state | Aún no hay depas en esta zona. Activa alertas y te avisamos. | No apartments here yet. Turn on alerts and we'll let you know. |
| Stat string | 2 rec · 1 baño · 78 m² · Roma Norte | 2 bed · 1 bath · 78 m² · Roma Norte |
| Microcopy (toggle) | Mostrar comercios cercanos | Show what's nearby |
| Error | No pudimos cargar el recorrido 3D. Reintentar. | We couldn't load the 3D tour. Try again. |

**Don't say:** "luxury living," "your dream home awaits," "premium amenities," "world-class," "stunning views."
**Do say:** what the apartment actually has, in what colonia, on what floor, facing which direction, with what light.

---

## Visual Foundations

The visual system is built around a **paper-and-terracotta** palette inspired by CDMX architecture (Barragán's roses and ochres, the bone of carved cantera stone, deep ink). It is paired with a Swiss-modern grid, a soft serif for display, and a clean grotesque for body — modern but rooted.

### Color
- **Background** is bone (`#FAF7F2`), never pure white. Pure white is reserved for floating cards.
- **Primary** is terracotta (`#C8553D`). One bold action per screen, max.
- **Accents** are Barragán rose, jade, and ochre — used sparingly, often for category chips, map pins, or section dividers.
- **Text** is warm ink, not black. Three weights: `ink-900` for headlines, `ink-800` for body, `stone-600` for secondary.
- Imagery is **warm and natural** — golden-hour light, no heavy filters, no desaturation. A faint film grain is acceptable; no Instagram presets.

### Type
- **Display:** Fraunces — a contemporary serif with optical sizing. Used at large sizes for hero copy, listing names, editorial moments. Slightly tightened tracking (`-0.01em` to `-0.02em`).
- **Body:** Inter, 400 / 500 / 600 / 700.
- **Mono:** JetBrains Mono — for tabular data (price, m², coordinates), never for UI chrome.
- **Eyebrows** are 11px Inter 600, uppercase, with `0.14em` letterspacing.

### Spacing
4-pt base. The most-used steps are `16 / 24 / 32 / 64`. Page gutters on web are 24 px (mobile) and 64 px (desktop ≥ 1280). Sections breathe at 96 px on desktop.

### Backgrounds
The default backdrop is solid bone. **No gradients in chrome.** Two acceptable background treatments:
1. **Full-bleed photography** — apartment interiors, neighborhood scenes, always with a soft scrim only when text sits on top.
2. **Talavera-derived line pattern** — subtle, used at 6–10% opacity behind footers or divider sections. (See `assets/pattern-talavera.svg`.)
No noise textures. No dark-mode-style bluish gradients.

### Animation
- Easing: standard `cubic-bezier(0.2, 0.7, 0.2, 1)`; emphatic `cubic-bezier(0.16, 1, 0.3, 1)` for hero entrances.
- Durations: 140 ms (micro), 220 ms (default), 380 ms (page transitions).
- **Fades + soft slides only.** No bounce. No spring overshoot. Image hovers cross-fade between two photos at 380 ms.
- The 3D viewer uses inertia drag, but the surrounding UI does not.

### States
- **Hover (buttons):** 4% darker fill, no shadow change.
- **Hover (cards):** lift via shadow-2 → shadow-3 over 180 ms; 0.5 px upward translate.
- **Press:** 2 px inward inset shadow flash (no scale/shrink).
- **Focus:** 2 px terracotta ring at `currentColor` with 2 px offset; never a default browser blue.
- **Disabled:** `opacity: 0.45`, `cursor: not-allowed`, no other style changes.

### Borders & shadows
- Borders are **1 px solid** in `--ab-border` (`#E8E1D3`). Borders are preferred over shadows for delineation on bone backgrounds.
- Shadows are warm-tinted, not pure black. Three levels (`shadow-1/2/3`). Used for floating surfaces, modals, the map info card.
- Inset shadow `--ab-shadow-inset` is used inside image frames to give photos a subtle "hung print" feel.

### Capsules vs gradients
Floating UI on top of imagery uses **frosted capsules**, not gradient overlays. `backdrop-filter: blur(20px) saturate(1.2)` with a `rgba(255,255,255,0.6)` fill. Image scrims are flat 30% bone, never a vertical gradient.

### Layout rules
- The header is **not sticky** by default; it pins on scroll-up.
- The map / 3D viewer can pin; the list scrolls independently (split-view convention).
- Maximum content width: 1280 px. Editorial article width: 720 px.
- A single bold action per screen.

### Transparency & blur
Used for:
- Map overlays (info cards floating on Google Maps).
- The "What's nearby" drawer.
- The mobile bottom sheet.
Never for primary content surfaces.

### Imagery vibe
Warm. Daylight. Real apartments — not staged. Plants, light fabric, ceramic, wood. People are present occasionally but never the subject. Avoid wide-angle distortion; prefer 35–50 mm equivalents.

### Corner radii
- Inputs / buttons: 8 px (`--ab-radius-md`).
- Cards: 14 px (`--ab-radius-lg`).
- Hero panels / modals: 22 px (`--ab-radius-xl`).
- Avatars / map pins: full pill (`--ab-radius-pill`).

### Cards
A card is: white surface, 14 px radius, 1 px border in `--ab-border`, `shadow-1` resting → `shadow-2` on hover. No drop shadow at rest unless it floats over imagery. The image inside a card occupies the full top with a hairline 1 px inner border at the photo edge.

---

## Iconography

**Primary set:** [Lucide](https://lucide.dev) (line, 1.5 px stroke, 24 px grid). Linked from the unpkg CDN — see `assets/lucide.html` for usage. Lucide pairs cleanly with Inter and matches the system's "drawn with intent, not flair" aesthetic.

**Custom marks** (in `assets/`) cover ApartmentBroker-specific concepts that Lucide doesn't ship:
- `icon-360.svg` — 360° viewer indicator.
- `icon-3d-room.svg` — 3D showroom indicator.
- `icon-metro.svg` — CDMX Metro lozenge.
- `icon-metrobus.svg` — Metrobús pictogram.

**No emoji** anywhere in product UI. **No unicode-as-icon** (no ▶, ◆, ★ used decoratively — use Lucide's `play`, `diamond`, `star`).

**Stroke and fill rules.** Icons are always line. Filled glyphs are reserved for selection states (e.g. saved → filled heart). Stroke is `currentColor` so icons inherit text color.

**Sizing.** 16 / 20 / 24 / 32 px. Never freely scaled.

---

## UI Kits

| Kit | Path | Surfaces |
| --- | --- | --- |
| **Web** (public marketing + product) | `ui_kits/web/index.html` | Home, Listings + Map, Listing Detail (3D, 360°, gallery, nearby) |
| **Admin** (internal) | `ui_kits/admin/index.html` | Listings table, New listing wizard, Edit listing |

---

## Caveats

- **Logo is a placeholder** — a geometric monogram designed to feel "right" in this palette and type system. Replace with the real ApartmentBroker mark.
- **No source material was provided.** Colors, type pairings, copy tone, and visual motifs are all proposals. Strongly recommend a 30-min review with the brand owner before treating any of this as canonical.
- **Fonts are Google Fonts substitutes.** Fraunces and Inter are loaded from the Google CDN; no `.ttf` files are in `fonts/`. If ApartmentBroker has a licensed brand face (e.g. a custom serif), drop the files in `fonts/` and update `colors_and_type.css`.
- **3D and 360° viewers are visual mocks** in the UI kit — they imitate the chrome of Matterport / Pannellum without the real engines. Production should integrate the real SDK.
- **Google Maps in the kit is illustrated**, not the real Google Maps JS API. Same reasoning — production swaps in the SDK.
