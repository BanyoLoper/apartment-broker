import type { APIRoute } from 'astro';
import { fetchNearby, type Category } from '../../lib/overpass';

const VALID: Category[] = ['transit', 'parks', 'stores', 'cafes', 'gyms', 'schools'];

export const GET: APIRoute = async ({ url }) => {
  const lat = Number(url.searchParams.get('lat'));
  const lng = Number(url.searchParams.get('lng'));
  const radius = Number(url.searchParams.get('radius') || 1000);
  const category = url.searchParams.get('category') as Category;

  if (!Number.isFinite(lat) || !Number.isFinite(lng) || !VALID.includes(category)) {
    return new Response(JSON.stringify({ error: 'parámetros inválidos' }), { status: 400 });
  }
  try {
    const results = await fetchNearby(lat, lng, category, Math.min(radius, 1500));
    return new Response(JSON.stringify(results), {
      headers: {
        'content-type': 'application/json',
        // Cache 1 hora en CDN para no martillear Overpass
        'cache-control': 'public, max-age=300, s-maxage=3600',
      },
    });
  } catch (e) {
    const detail = String(e);
    console.error('[overpass]', detail);
    // Devolvemos 200 con array vacío para no romper la UI del mapa
    return new Response(JSON.stringify({ error: 'overpass falló', detail, results: [] }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  }
};
