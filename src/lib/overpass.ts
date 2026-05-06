// Overpass API (OpenStreetMap) — POIs cercanos a un punto.
// Sin API key. Usamos varios mirrors públicos con failover automático.

export type Category = 'transit' | 'parks' | 'stores' | 'cafes' | 'gyms' | 'schools';

interface OverpassNode {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat: number;
  lon: number;
  center?: { lat: number; lon: number };
  tags?: Record<string, string>;
}

interface OverpassResponse {
  elements: OverpassNode[];
}

const QUERIES: Record<Category, (lat: number, lng: number, radius: number) => string> = {
  transit: (lat, lng, r) =>
    `[out:json][timeout:25];(node["public_transport"="station"](around:${r},${lat},${lng});node["railway"="station"](around:${r},${lat},${lng});node["highway"="bus_stop"](around:${r},${lat},${lng}););out center 50;`,
  parks: (lat, lng, r) =>
    `[out:json][timeout:25];(way["leisure"="park"](around:${r},${lat},${lng});way["leisure"="garden"](around:${r},${lat},${lng}););out center 30;`,
  stores: (lat, lng, r) =>
    `[out:json][timeout:25];(node["shop"="convenience"](around:${r},${lat},${lng});node["shop"="supermarket"](around:${r},${lat},${lng});way["shop"="supermarket"](around:${r},${lat},${lng}););out center 50;`,
  cafes: (lat, lng, r) =>
    `[out:json][timeout:25];(node["amenity"="cafe"](around:${r},${lat},${lng});node["amenity"="restaurant"](around:${r},${lat},${lng}););out 50;`,
  gyms: (lat, lng, r) =>
    `[out:json][timeout:25];(node["leisure"="fitness_centre"](around:${r},${lat},${lng});way["leisure"="fitness_centre"](around:${r},${lat},${lng}););out center 30;`,
  schools: (lat, lng, r) =>
    `[out:json][timeout:25];(node["amenity"="school"](around:${r},${lat},${lng});way["amenity"="school"](around:${r},${lat},${lng});node["amenity"="university"](around:${r},${lat},${lng}););out center 30;`,
};

export interface NearbyPoi {
  id: number;
  category: Category;
  lat: number;
  lng: number;
  name: string;
  detail?: string;
}

// Mirrors públicos de Overpass. Probamos en orden hasta que uno responda.
const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
];

async function fetchWithFailover(query: string): Promise<OverpassResponse> {
  let lastError = '';
  for (const endpoint of ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          'accept': 'application/json',
          'user-agent': 'ApartmentBroker/0.1 (contacto: broker@apartmentbroker.example)',
        },
        body: 'data=' + encodeURIComponent(query),
      });
      if (!res.ok) {
        lastError = `${endpoint} → ${res.status}`;
        continue;
      }
      return (await res.json()) as OverpassResponse;
    } catch (err) {
      lastError = `${endpoint} → ${String(err)}`;
    }
  }
  throw new Error(`todos los mirrors de Overpass fallaron: ${lastError}`);
}

export async function fetchNearby(
  lat: number,
  lng: number,
  category: Category,
  radiusMeters = 1000,
): Promise<NearbyPoi[]> {
  const query = QUERIES[category](lat, lng, radiusMeters);
  const data = await fetchWithFailover(query);
  return data.elements.map((el) => {
    const center = el.center ?? { lat: el.lat, lon: el.lon };
    return {
      id: el.id,
      category,
      lat: center.lat,
      lng: center.lon,
      name: el.tags?.name || el.tags?.brand || labelFor(category),
      detail: detailFor(el.tags),
    };
  });
}

function labelFor(c: Category): string {
  return ({
    transit: 'Estación', parks: 'Parque', stores: 'Tienda',
    cafes: 'Café', gyms: 'Gimnasio', schools: 'Escuela',
  } as const)[c];
}

function detailFor(tags?: Record<string, string>): string | undefined {
  if (!tags) return undefined;
  if (tags['public_transport'] === 'station') return tags['network'] || 'Metro/Metrobús';
  if (tags['amenity'] === 'cafe') return 'Café';
  if (tags['shop']) return tags['shop'];
  return undefined;
}
