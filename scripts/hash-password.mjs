// Genera un hash PBKDF2 SHA-256 (100k iteraciones) compatible con src/lib/auth.ts.
// Uso:
//   node scripts/hash-password.mjs <password>
//
// Por defecto, escribe `migrations/0003_set_password.sql` que actualiza al broker demo.
// Aplícalo con:  npx wrangler d1 execute apartmentbroker --local --file=./migrations/0003_set_password.sql

import { webcrypto } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const password = process.argv[2];
if (!password) {
  console.error('Uso: node scripts/hash-password.mjs <password>');
  process.exit(1);
}

const enc = new TextEncoder();
const saltBytes = webcrypto.getRandomValues(new Uint8Array(16));

const keyMaterial = await webcrypto.subtle.importKey(
  'raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveBits']
);
const derivedBits = await webcrypto.subtle.deriveBits(
  { name: 'PBKDF2', salt: saltBytes, iterations: 100_000, hash: 'SHA-256' },
  keyMaterial, 256
);
const toB64 = (buf) => Buffer.from(buf).toString('base64');
const hash = toB64(derivedBits);
const salt = toB64(saltBytes);

const sql = `-- Generado por scripts/hash-password.mjs el ${new Date().toISOString()}
UPDATE brokers
SET password_hash = '${hash}', password_salt = '${salt}'
WHERE email = 'broker@example.com';
`;

const here = dirname(fileURLToPath(import.meta.url));
const target = resolve(here, '..', 'migrations', '0003_set_password.sql');
writeFileSync(target, sql, 'utf8');

console.log('password_hash:', hash);
console.log('password_salt:', salt);
console.log('\nArchivo escrito:', target);
console.log('\nAplica con:');
console.log('  npx wrangler d1 execute apartmentbroker --local  --file=./migrations/0003_set_password.sql');
console.log('  npx wrangler d1 execute apartmentbroker --remote --file=./migrations/0003_set_password.sql');
