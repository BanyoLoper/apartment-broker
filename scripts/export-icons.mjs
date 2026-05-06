// Exporta los iconos de amenidades y comodidades cercanas como archivos SVG
// independientes en /public/icons/. La fuente de verdad sigue siendo
// src/lib/amenity-icons.ts y src/lib/nearby-icons.ts — este script solo los
// materializa en disco para inspección, design tokens y compartir externamente.
//
// Uso:  node scripts/export-icons.mjs
//
// Lee los archivos TS como texto y extrae los paths con regex simple para no
// introducir un build step. Los SVG resultantes son línea, currentColor.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(here, '..');
const OUT_AMENITIES = resolve(ROOT, 'public', 'icons', 'amenities');
const OUT_NEARBY = resolve(ROOT, 'public', 'icons', 'nearby');

if (!existsSync(OUT_AMENITIES)) mkdirSync(OUT_AMENITIES, { recursive: true });
if (!existsSync(OUT_NEARBY)) mkdirSync(OUT_NEARBY, { recursive: true });

const wrap = (inner) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\n  ${inner}\n</svg>\n`;

function extractRecord(source, recordName) {
  // Busca: export const NAME: ... = { ... };
  const re = new RegExp(`export const ${recordName}[^=]*=\\s*({[\\s\\S]*?\\n};)`, 'm');
  const m = source.match(re);
  if (!m) return [];
  const body = m[1];
  // Encuentra entries: key: { ... svg: '...' ... }
  const entryRe = /(\w+)\s*:\s*\{[^}]*?svg:\s*'([^']*)'/gs;
  const entries = [];
  let e;
  while ((e = entryRe.exec(body)) !== null) {
    entries.push({ key: e[1], svg: e[2] });
  }
  return entries;
}

function extractNearbyArray(source) {
  // Para NEARBY_CATEGORIES (array de objetos)
  const entryRe = /key:\s*'([^']+)'[^}]*?svg:\s*'([^']*)'/gs;
  const entries = [];
  let e;
  while ((e = entryRe.exec(source)) !== null) {
    entries.push({ key: e[1], svg: e[2] });
  }
  return entries;
}

const amenitySrc = readFileSync(resolve(ROOT, 'src', 'lib', 'amenity-icons.ts'), 'utf8');
const amenities = extractRecord(amenitySrc, 'ICONS');

const nearbySrc = readFileSync(resolve(ROOT, 'src', 'lib', 'nearby-icons.ts'), 'utf8');
const nearby = extractNearbyArray(nearbySrc);

let count = 0;
for (const { key, svg } of amenities) {
  writeFileSync(resolve(OUT_AMENITIES, `${key}.svg`), wrap(svg), 'utf8');
  count++;
}
for (const { key, svg } of nearby) {
  writeFileSync(resolve(OUT_NEARBY, `${key}.svg`), wrap(svg), 'utf8');
  count++;
}

console.log(`✔ Exportados ${amenities.length} iconos de amenidades en public/icons/amenities/`);
console.log(`✔ Exportados ${nearby.length} iconos de cercanías en public/icons/nearby/`);
console.log(`Total: ${count}`);
