// Helpers de tipo para D1.

export interface Listing {
  id: number;
  slug: string;
  name: string;
  colonia: string;
  street: string | null;
  floor: number | null;
  beds: number;
  baths: number;
  area_m2: number;
  price_mxn: number;
  description: string | null;
  lat_real: number | null;
  lng_real: number | null;
  lat_fuzzy: number | null;
  lng_fuzzy: number | null;
  status: 'borrador' | 'publicada' | 'reservada' | 'retirada';
  cover_image: string | null;
  has_3d: number;
  has_360: number;
  model_glb_url: string | null;
  amenities: string | null;
  pet_friendly: number;
  parking: number;
  available_at: string | null;
  furnished: number;
  utilities_included: string | null;
  tagline: string | null;
  broker_id: number;
  created_at: string;
  updated_at: string;
}

export interface ListingMedia {
  id: number;
  listing_id: number;
  kind: 'photo' | 'photo360' | 'video' | 'glb';
  url: string;
  caption: string | null;
  position: number;
}

export interface Broker {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  password_salt: string;
  role: 'broker' | 'admin';
  active: number;
}

export interface Lead {
  id: number;
  listing_id: number | null;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  channel: 'web' | 'whatsapp';
  status: 'nuevo' | 'contactado' | 'visita' | 'cerrado' | 'descartado';
  created_at: string;
}

export function parseAmenities(json: string | null): string[] {
  if (!json) return [];
  try { return JSON.parse(json); } catch { return []; }
}

export const STATUS_LABEL: Record<Listing['status'], string> = {
  borrador: 'Borrador',
  publicada: 'Publicada',
  reservada: 'Reservada',
  retirada: 'Retirada',
};

export function formatMxn(n: number): string {
  return `MXN $${n.toLocaleString('es-MX')}`;
}
