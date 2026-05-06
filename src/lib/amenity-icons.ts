// Catálogo de iconos minimalistas (line-art 24x24, stroke 1.5, currentColor)
// para amenidades del depa y servicios incluidos.
//
// Cada SVG es solo el contenido interno (paths/circles), sin el wrapper <svg>.
// Para renderearlo, usa el componente <AmenityIcon /> que aplica el wrapper.
//
// Keywords matchean por substring case-insensitive. El primer match gana, así que
// el orden importa: pon los más específicos arriba.

export type IconKey =
  | 'gym' | 'jacuzzi' | 'terrace' | 'roof' | 'elevator' | 'security'
  | 'cowork' | 'lounge' | 'concierge' | 'parking' | 'wifi' | 'ac'
  | 'laundry' | 'kitchen' | 'dishes' | 'desk' | 'bed' | 'closet'
  | 'blackout' | 'soundproof' | 'heater' | 'pets' | 'garden' | 'bike'
  | 'camera' | 'view' | 'furniture' | 'balcony' | 'lobby' | 'boutique'
  | 'check';

export interface IconDef {
  label: string;
  svg: string;
}

/** SVG content (no wrapper). Para renderear:
 *    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
 *         stroke-linecap="round" stroke-linejoin="round" set:html={icon.svg} />
 */
export const ICONS: Record<IconKey, IconDef> = {
  gym: {
    label: 'Gimnasio',
    svg: '<path d="M6.5 6.5v11M17.5 6.5v11M6.5 12h11M3 9.5v5M21 9.5v5"/>',
  },
  jacuzzi: {
    label: 'Jacuzzi',
    svg: '<path d="M3 13h18M5 13V8.5a2.5 2.5 0 0 1 5 0v.5M14 9V7a2 2 0 0 1 4 0v2M3 17c1 0 1-1 2.5-1S7 17 9 17s2-1 3.5-1S15 17 17 17s2-1 3-1M3 20c1 0 1-1 2.5-1S7 20 9 20s2-1 3.5-1S15 20 17 20s2-1 3-1"/>',
  },
  terrace: {
    label: 'Terraza',
    svg: '<path d="M3 21V9.5l9-6.5 9 6.5V21M9 21v-5h6v5M3 13h2M19 13h2"/>',
  },
  roof: {
    label: 'Roof',
    svg: '<path d="M2 11.5L12 4l10 7.5M5 11v10h14V11M3 14h18"/>',
  },
  elevator: {
    label: 'Elevador',
    svg: '<rect x="5" y="3" width="14" height="18" rx="0.5"/><path d="M5 12h14M9.5 7.5L12 5l2.5 2.5M9.5 16.5L12 19l2.5-2.5"/>',
  },
  security: {
    label: 'Seguridad 24/7',
    svg: '<path d="M12 2.5l8 3.5v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-3.5z"/><path d="M9 12l2.2 2.2L15 10.5"/>',
  },
  cowork: {
    label: 'Cowork',
    svg: '<rect x="3" y="4" width="18" height="11" rx="0.5"/><path d="M2 19h20M9 19v-4M15 19v-4M7 8h4M7 11h7"/>',
  },
  lounge: {
    label: 'Lounge',
    svg: '<path d="M3 12v6h18v-6M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M3 18v2M21 18v2M7 12V9.5"/>',
  },
  concierge: {
    label: 'Concierge',
    svg: '<path d="M3 21h18M5 21V12a7 7 0 0 1 14 0v9M12 5V3M10 5h4M9 11h6"/>',
  },
  parking: {
    label: 'Estacionamiento',
    svg: '<rect x="3" y="3" width="18" height="18" rx="0.5"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/>',
  },
  wifi: {
    label: 'Wi-Fi',
    svg: '<path d="M2 9.5a16 16 0 0 1 20 0M5 13a10.5 10.5 0 0 1 14 0M8 16.5a5.5 5.5 0 0 1 8 0"/><circle cx="12" cy="20" r="0.5"/>',
  },
  ac: {
    label: 'Aire acondicionado',
    svg: '<path d="M12 3v18M3 12h18M5.5 5.5l13 13M18.5 5.5l-13 13M9 7l3-3 3 3M9 17l3 3 3-3M7 9l-3 3 3 3M17 9l3 3-3 3"/>',
  },
  laundry: {
    label: 'Lavadora · secadora',
    svg: '<rect x="5" y="3" width="14" height="18" rx="0.5"/><circle cx="12" cy="13.5" r="3.5"/><path d="M5 7h14M8 5h.01M11 5h.01"/>',
  },
  kitchen: {
    label: 'Cocina equipada',
    svg: '<rect x="3" y="8" width="18" height="13" rx="0.5"/><path d="M6 8V4h12v4M9 4v4M15 4v4M8 13v5M16 13v5"/>',
  },
  dishes: {
    label: 'Vajilla y blancos',
    svg: '<path d="M5 4h14v6a7 7 0 0 1-14 0z"/><path d="M3 21h18M7 21v-3M17 21v-3M9.5 8h5"/>',
  },
  desk: {
    label: 'Home office',
    svg: '<path d="M3 9h18M3 9V7l3-3h12l3 3v2M5 9v12M19 9v12M3 21h18M9 14h6"/>',
  },
  bed: {
    label: 'Cama queen',
    svg: '<path d="M3 18v-7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v7M3 14h18M3 18h18M7 11h4"/>',
  },
  closet: {
    label: 'Walk-in closet',
    svg: '<rect x="5" y="3" width="14" height="18" rx="0.5"/><path d="M12 3v18M9 9.5L7.5 11 9 12.5M15 9.5l1.5 1.5L15 12.5"/>',
  },
  blackout: {
    label: 'Persianas blackout',
    svg: '<path d="M3 4h18v3H3zM5 7v13M19 7v13M5 10h14M5 13h14M5 16h14M5 19h14"/>',
  },
  soundproof: {
    label: 'Aislamiento de ruido',
    svg: '<path d="M3 12c0-2.5 1.5-4.5 4-5l4-2.5v15L7 17c-2.5-.5-4-2.5-4-5z"/><path d="M16 8c2 1.5 2 6.5 0 8M19 5c4 3 4 11 0 14"/>',
  },
  heater: {
    label: 'Calentador instantáneo',
    svg: '<path d="M5 3h14v18H5z"/><path d="M9 21V8M15 21V8M5 8h14M9 13l3 1 3-1"/>',
  },
  pets: {
    label: 'Mascotas',
    svg: '<circle cx="5" cy="11" r="1.5"/><circle cx="19" cy="11" r="1.5"/><circle cx="9" cy="6" r="1.5"/><circle cx="15" cy="6" r="1.5"/><path d="M12 12c-2.5 0-4 1.5-5 3.5l-1 3a2 2 0 0 0 2 2.5h8a2 2 0 0 0 2-2.5l-1-3c-1-2-2.5-3.5-5-3.5z"/>',
  },
  garden: {
    label: 'Jardín privado',
    svg: '<path d="M12 22V13M9 13h6M5.5 13C5.5 9 8.5 6 12 6s6.5 3 6.5 7M12 6V3M8.5 9c-.5-1 0-2.5 1.5-3M15.5 9c.5-1 0-2.5-1.5-3M3 22h18"/>',
  },
  bike: {
    label: 'Bici-estacionamiento',
    svg: '<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="3"/><path d="M6 17l3-7h6l3 7M9 10h7M11 10l3 7"/>',
  },
  camera: {
    label: 'Cámara en lobby',
    svg: '<path d="M3 8h4l2-3h6l2 3h4v11H3z"/><circle cx="12" cy="13" r="3.5"/>',
  },
  view: {
    label: 'Vista panorámica',
    svg: '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  },
  furniture: {
    label: 'Mobiliario boutique',
    svg: '<path d="M5 5h14v6a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5z"/><path d="M5 21v-7M19 21v-7M3 14h18"/>',
  },
  balcony: {
    label: 'Balcón',
    svg: '<path d="M5 21V11M19 21V11M5 11h14M3 21h18M5 6v5M9 6v5M13 6v5M17 6v5M5 6h14"/>',
  },
  lobby: {
    label: 'Lobby',
    svg: '<path d="M3 21h18M5 21V8.5L12 3l7 5.5V21M9 21v-7h6v7"/><circle cx="9" cy="11" r="0.5"/><circle cx="15" cy="11" r="0.5"/>',
  },
  boutique: {
    label: 'Estilo boutique',
    svg: '<path d="M5 6V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2M3 6h18l-1.2 14a2 2 0 0 1-2 2H6.2a2 2 0 0 1-2-2z"/><circle cx="9" cy="11" r="0.5"/><circle cx="15" cy="11" r="0.5"/>',
  },
  check: {
    label: 'Incluido',
    svg: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  },
};

interface Matcher { keys: string[]; icon: IconKey; }

// Más específico arriba (longest keywords first, brand-words explicit).
const MATCHERS: Matcher[] = [
  { keys: ['ventana', 'cancelación', 'cancelacion', 'ruido', 'aislamiento'], icon: 'soundproof' },
  { keys: ['blackout', 'persiana'], icon: 'blackout' },
  { keys: ['walk-in', 'closet', 'vestidor'], icon: 'closet' },
  { keys: ['cámara', 'camara', 'cctv'], icon: 'camera' },
  { keys: ['bici'], icon: 'bike' },
  { keys: ['cocineta', 'cocina', 'refri', 'estufa', 'horno', 'microondas'], icon: 'kitchen' },
  { keys: ['lavadora', 'secadora', 'centro de lavado'], icon: 'laundry' },
  { keys: ['vajilla', 'blanco', 'sábana', 'sabanas', 'platos', 'accesorios'], icon: 'dishes' },
  { keys: ['escritorio', 'home office', 'oficina'], icon: 'desk' },
  { keys: ['balcón', 'balcon'], icon: 'balcony' },
  { keys: ['concierge'], icon: 'concierge' },
  { keys: ['cowork'], icon: 'cowork' },
  { keys: ['lounge'], icon: 'lounge' },
  { keys: ['gimnasio', 'fitness', 'gym'], icon: 'gym' },
  { keys: ['jacuzzi', 'spa', 'sauna'], icon: 'jacuzzi' },
  { keys: ['terraza'], icon: 'terrace' },
  { keys: ['roof', 'azotea'], icon: 'roof' },
  { keys: ['elevador', 'ascensor'], icon: 'elevator' },
  { keys: ['seguridad', '24/7', 'vigilancia'], icon: 'security' },
  { keys: ['lobby'], icon: 'lobby' },
  { keys: ['estacionamiento', 'cajón', 'cajon', 'parking'], icon: 'parking' },
  { keys: ['wi-fi', 'wifi', 'internet'], icon: 'wifi' },
  { keys: ['aire acondicionado', 'a/a', 'a.a.'], icon: 'ac' },
  { keys: ['calentador', 'boiler'], icon: 'heater' },
  { keys: ['cama'], icon: 'bed' },
  { keys: ['mascota'], icon: 'pets' },
  { keys: ['jardín', 'jardin'], icon: 'garden' },
  { keys: ['vista', 'panorámic', 'panoramic'], icon: 'view' },
  { keys: ['mobiliario', 'amueblado', 'amueblada'], icon: 'furniture' },
  { keys: ['boutique'], icon: 'boutique' },
];

export function pickIcon(text: string): { key: IconKey; def: IconDef } {
  const lc = text.toLowerCase();
  for (const m of MATCHERS) {
    if (m.keys.some((k) => lc.includes(k))) return { key: m.icon, def: ICONS[m.icon] };
  }
  return { key: 'check', def: ICONS.check };
}

/** Lista curada de amenidades para selector (chips en LeadForm) */
export const COMMON_AMENITIES: { key: IconKey; label: string }[] = [
  { key: 'furniture', label: 'Amueblado' },
  { key: 'wifi', label: 'Wi-Fi' },
  { key: 'kitchen', label: 'Cocina equipada' },
  { key: 'laundry', label: 'Lavadora · secadora' },
  { key: 'ac', label: 'Aire acondicionado' },
  { key: 'gym', label: 'Gimnasio' },
  { key: 'jacuzzi', label: 'Jacuzzi' },
  { key: 'cowork', label: 'Área cowork' },
  { key: 'roof', label: 'Acceso roof' },
  { key: 'terrace', label: 'Terraza privada' },
  { key: 'parking', label: 'Estacionamiento' },
  { key: 'elevator', label: 'Elevador' },
  { key: 'security', label: 'Seguridad 24/7' },
  { key: 'concierge', label: 'Concierge' },
  { key: 'pets', label: 'Pet-friendly' },
  { key: 'garden', label: 'Jardín privado' },
];
