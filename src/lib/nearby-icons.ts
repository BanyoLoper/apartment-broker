// Iconos minimalistas para categorías de comodidades cercanas (mapa "El barrio, a pie").
// Mismo formato que amenity-icons.ts: contenido interno SVG, sin wrapper.

import type { Category } from './overpass';

export interface NearbyCategoryDef {
  key: Category;
  label: string;
  svg: string;
  color: string;
}

export const NEARBY_CATEGORIES: NearbyCategoryDef[] = [
  {
    key: 'parks',
    label: 'Parques',
    color: '#5C7A6E',
    svg: '<path d="M12 22v-7M9 15h6M5 13c0-4 3.5-7 7-7s7 3 7 7M12 6V3M9 9c-1-1.5-.5-3 1-3.5M15 9c1-1.5.5-3-1-3.5"/>',
  },
  {
    key: 'cafes',
    label: 'Cafés',
    color: '#C26A3F',
    svg: '<path d="M4 9h13v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM17 11h2a2 2 0 0 1 0 4h-2M8 5c1-1 1-2 0-3M12 5c1-1 1-2 0-3"/>',
  },
  {
    key: 'gyms',
    label: 'Gimnasios',
    color: '#B5B0AC',
    svg: '<path d="M6.5 6.5v11M17.5 6.5v11M6.5 12h11M3 9.5v5M21 9.5v5"/>',
  },
  {
    key: 'schools',
    label: 'Escuelas',
    color: '#8E8987',
    svg: '<path d="M22 9L12 4 2 9l10 5 10-5z"/><path d="M6 11v5c2 1.5 4 2.5 6 2.5s4-1 6-2.5v-5"/><path d="M22 9v5"/>',
  },
];

export function findNearby(key: Category): NearbyCategoryDef | undefined {
  return NEARBY_CATEGORIES.find((c) => c.key === key);
}
