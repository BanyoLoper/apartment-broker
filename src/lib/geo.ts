// Genera un punto difuso desplazado aleatoriamente alrededor de un centro real.
// Usado al guardar un inmueble — el punto difuso se cachea en DB para no
// generar uno distinto cada request (lo que sería un canal de fuga de info).

export function fuzzyOffset(lat: number, lng: number, radiusMeters = 150): { lat: number; lng: number } {
  const r = (radiusMeters / 111_320) * Math.sqrt(Math.random());
  const t = 2 * Math.PI * Math.random();
  const dlat = r * Math.cos(t);
  const dlng = (r * Math.sin(t)) / Math.cos((lat * Math.PI) / 180);
  return { lat: lat + dlat, lng: lng + dlng };
}

export function googleMapsLink(lat: number, lng: number, label?: string): string {
  const q = label ? encodeURIComponent(label) : `${lat},${lng}`;
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}
