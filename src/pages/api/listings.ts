import type { APIRoute } from 'astro';
import { fuzzyOffset } from '../../lib/geo';

function s(v: FormDataEntryValue | null): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t.length > 0 ? t : null;
}
function n(v: FormDataEntryValue | null): number | null {
  if (typeof v !== 'string' || v === '') return null;
  const x = Number(v);
  return Number.isFinite(x) ? x : null;
}
function b(v: FormDataEntryValue | null): number {
  if (v === 'on' || v === 'true' || v === '1') return 1;
  return 0;
}

export const POST: APIRoute = async ({ request, locals, redirect }) => {
  const env = locals.runtime?.env;
  const session = (locals as App.Locals).session;
  if (!env?.DB || !session) return new Response('No autorizado', { status: 401 });

  const fd = await request.formData();
  const slug = s(fd.get('slug'));
  const name = s(fd.get('name'));
  const colonia = s(fd.get('colonia'));
  const beds = n(fd.get('beds'));
  const baths = n(fd.get('baths'));
  const area = n(fd.get('area_m2'));
  const price = n(fd.get('price_mxn'));

  if (!slug || !name || !colonia || beds == null || baths == null || area == null || price == null) {
    return new Response('Campos requeridos faltan', { status: 400 });
  }

  const latReal = n(fd.get('lat_real'));
  const lngReal = n(fd.get('lng_real'));
  let latFuzzy: number | null = null;
  let lngFuzzy: number | null = null;
  if (latReal != null && lngReal != null) {
    const fuzzy = fuzzyOffset(latReal, lngReal, Number(env.PUBLIC_FUZZY_RADIUS_M || 150));
    latFuzzy = fuzzy.lat; lngFuzzy = fuzzy.lng;
  }

  await env.DB.prepare(`
    INSERT INTO listings
      (slug, name, colonia, street, floor, beds, baths, area_m2, price_mxn,
       description, lat_real, lng_real, lat_fuzzy, lng_fuzzy, status, model_glb_url,
       furnished, utilities_included, tagline, broker_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'borrador', ?, ?, ?, ?, ?)
  `).bind(
    slug, name, colonia,
    s(fd.get('street')), n(fd.get('floor')),
    beds, baths, area, price,
    s(fd.get('description')),
    latReal, lngReal, latFuzzy, lngFuzzy,
    s(fd.get('model_glb_url')),
    b(fd.get('furnished')), s(fd.get('utilities_included')), s(fd.get('tagline')),
    session.brokerId,
  ).run();

  return redirect('/admin/publicaciones');
};
