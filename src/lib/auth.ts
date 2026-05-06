// Autenticación de brokers (mock para fase de venta).
// PBKDF2 SHA-256 con 100k iteraciones para hashing.
// Sesión = cookie HttpOnly firmada con HMAC-SHA-256.

const enc = new TextEncoder();
const dec = new TextDecoder();

function toB64(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let str = '';
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i]);
  return btoa(str);
}

function fromB64(s: string): Uint8Array {
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

export async function hashPassword(password: string, saltB64?: string): Promise<{ hash: string; salt: string }> {
  const salt = saltB64 ? fromB64(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt, iterations: 100_000, hash: 'SHA-256' }, keyMaterial, 256);
  return { hash: toB64(bits), salt: toB64(salt) };
}

export async function verifyPassword(password: string, expectedHash: string, saltB64: string): Promise<boolean> {
  const { hash } = await hashPassword(password, saltB64);
  // Comparación constante para evitar timing attacks
  if (hash.length !== expectedHash.length) return false;
  let diff = 0;
  for (let i = 0; i < hash.length; i++) diff |= hash.charCodeAt(i) ^ expectedHash.charCodeAt(i);
  return diff === 0;
}

interface SessionPayload {
  brokerId: number;
  email: string;
  name: string;
  exp: number; // epoch seconds
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(message));
  return toB64(sig);
}

export async function signSession(payload: Omit<SessionPayload, 'exp'>, secret: string, ttlSeconds = 60 * 60 * 12): Promise<string> {
  const full: SessionPayload = { ...payload, exp: Math.floor(Date.now() / 1000) + ttlSeconds };
  const body = btoa(JSON.stringify(full)).replace(/=+$/, '');
  const sig = await hmac(secret, body);
  return `${body}.${sig}`;
}

export async function verifySession(token: string | undefined, secret: string): Promise<SessionPayload | null> {
  if (!token) return null;
  const [body, sig] = token.split('.');
  if (!body || !sig) return null;
  const expected = await hmac(secret, body);
  if (sig !== expected) return null;
  try {
    const payload = JSON.parse(dec.decode(fromB64(body + '==='.slice((body.length + 3) % 4)))) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = 'ab_session';

export function buildSessionCookie(value: string, maxAgeSeconds = 60 * 60 * 12): string {
  return `${SESSION_COOKIE}=${value}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${maxAgeSeconds}; Secure`;
}

export function buildClearSessionCookie(): string {
  return `${SESSION_COOKIE}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0; Secure`;
}
