import type { APIRoute } from 'astro';
import { fuzzyOffset } from '../../../lib/geo';

function s(v: FormDataEntryValue | null | undefined): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  return t.length > 0 ? t : null;
}
function n(v: FormDataEntryValue | null | undefined): number | null {
  if (typeof v !== 'string' || v === '') return null;
  const x = Number(v);
  return Number.isFinite(x) ? x : null;
}
function b(v: FormDataEntryValue | null | undefined): number {
  if (v === 'on' || v === 'true' || v === '1') return 1;
  return 0;
}

const VALID_STATUS = ['borrador', 'publicada', 'reservada', 'retirada'] as const;
type Status = (typeof VALID_STATUS)[number];

export const POST: APIRoute = async ({ params, request, locals, redirect }) => {
  const env = locals.runtime?.env;
  const session = (locals as App.Locals).session;
  if (!env?.DB || !session) return new Response('No autorizado', { status: 401 });

  const id = Number(params.id);
  if (!Number.isInteger(id)) return new Response('id inválido', { status: 400 });

  const fd = await request.formData();
  const action = s(fd.get('_action')) || 'update';

  if (action === 'status') {
    const status = s(fd.get('status')) as Status | null;
    if (!status || !VALID_STATUS.includes(status)) {
      return new Response('estado inválido', { status: 400 });
    }
    await env.DB.prepare(
      "UPDATE listings SET status = ?, updated_at = datetime('now') WHERE id = ?",
    ).bind(status, id).run();

    if (request.headers.get('accept')?.includes('application/json')) {
      return new Response(JSON.stringify({ ok: true, status }), {
        headers: { 'content-type': 'application/json' },
      });
    }
    return redirect('/admin/publicaciones');
  }

  if (action === 'delete') {
    await env.DB.prepare(
      "UPDATE listings SET status = 'retirada', updated_at = datetime('now') WHERE id = ?",
    ).bind(id).run();
    return redirect('/admin/publicaciones');
  }

  if (action === 'hard-delete') {
    await env.DB.prepare('DELETE FROM listings WHERE id = ?').bind(id).run();
    return redirect('/admin/publicaciones');
  }

  // action === 'update'
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

  const status = s(fd.get('status')) as Status | null;
  if (status && !VALID_STATUS.includes(status)) {
    return new Response('estado inválido', { status: 400 });
  }

  const latReal = n(fd.get('lat_real'));
  const lngReal = n(fd.get('lng_real'));
  let latFuzzy: number | null = null;
  let lngFuzzy: number | null = null;
  if (latReal != null && lngReal != null) {
    const fuzzy = fuzzyOffset(latReal, lngReal, Number(env.PUBLIC_FUZZY_RADIUS_M || 150));
    latFuzzy = fuzzy.lat; lngFuzzy = fuzzy.lng;
  }

  const amenitiesRaw = s(fd.get('amenities'));
  let amenitiesJson: string | null = null;
  if (amenitiesRaw) {
    const list = amenitiesRaw.split('\n').map((l) => l.trim()).filter(Boolean);
    amenitiesJson = JSON.stringify(list);
  }

  await env.DB.prepare(`
    UPDATE listings SET
      slug = ?, name = ?, colonia = ?, street = ?, floor = ?,
      beds = ?, baths = ?, area_m2 = ?, price_mxn = ?,
      description = ?, lat_real = ?, lng_real = ?, lat_fuzzy = ?, lng_fuzzy = ?,
      status = COALESCE(?, status),
      cover_image = ?,
      has_3d = ?, has_360 = ?, model_glb_url = ?,
      amenities = ?, pet_friendly = ?, parking = ?, available_at = ?,
      furnished = ?, utilities_included = ?, tagline = ?,
      updated_at = datetime('now')
    WHERE id = ?
  `).bind(
    slug, name, colonia,
    s(fd.get('street')), n(fd.get('floor')),
    beds, baths, area, price,
    s(fd.get('description')),
    latReal, lngReal, latFuzzy, lngFuzzy,
    status,
    s(fd.get('cover_image')),
    b(fd.get('has_3d')), b(fd.get('has_360')), s(fd.get('model_glb_url')),
    amenitiesJson, b(fd.get('pet_friendly')), b(fd.get('parking')), s(fd.get('available_at')),
    b(fd.get('furnished')), s(fd.get('utilities_included')), s(fd.get('tagline')),
    id,
  ).run();

  return redirect('/admin/publicaciones');
};
