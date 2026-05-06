-- Seed de demostración. Genera un broker `demo` y 6 inmuebles en CDMX.
-- Password del broker: 'demo123' (PBKDF2 SHA-256, 100k iter, salt incluido).
-- Hash y salt fueron generados en local con scripts/hash-password.mjs.

INSERT OR IGNORE INTO brokers (id, email, name, password_hash, password_salt, role) VALUES
  (1, 'broker@example.com', 'María Reyes',
   'placeholder-rellenar-tras-correr-script',
   'placeholder-salt',
   'admin');

INSERT OR IGNORE INTO listings (slug, name, colonia, street, floor, beds, baths, area_m2, price_mxn, description, lat_real, lng_real, lat_fuzzy, lng_fuzzy, status, cover_image, has_3d, has_360, model_glb_url, amenities, pet_friendly, available_at, broker_id) VALUES
  ('casa-sonora', 'Casa Sonora', 'Roma Norte', 'Sonora 134', 3, 2, 1, 78, 24500,
   'Departamento de 78 m² en un edificio art déco restaurado. Pisos de duela original, cocina abierta con barra de mármol, dos recámaras orientadas al norte y un balcón a Álvaro Obregón. Mantenimiento incluido.',
   19.4148, -99.1675, 19.4161, -99.1668,
   'publicada', '/assets/placeholder-apt-1.svg', 1, 1, NULL,
   '["Lavadora · secadora","Wi-Fi 1 Gbps","Calentador instantáneo","Cocina equipada","Closet vestidor","Persianas blackout","Acceso roof","Cámara en lobby","Bici-estacionamiento"]',
   1, '2026-06-01', 1),

  ('roof-alvaro-obregon', 'Roof Álvaro Obregón', 'Condesa', 'Álvaro Obregón 290', 4, 1, 1, 64, 32000,
   'Penthouse con terraza privada de 25 m² sobre Álvaro Obregón. Vista poniente, sol toda la tarde. Acabados de concreto pulido y carpintería nueva.',
   19.4118, -99.1722, 19.4131, -99.1710,
   'publicada', '/assets/placeholder-apt-2.svg', 1, 1, NULL,
   '["Terraza privada","Wi-Fi 1 Gbps","Cocina equipada","Aire acondicionado","Persianas eléctricas"]',
   0, '2026-05-15', 1),

  ('colima-184', 'Colima 184', 'Roma Norte', 'Colima 184', 2, 1, 1, 52, 18200,
   'Estudio luminoso en edificio antiguo con doble altura. Ideal para una persona, perfecto para trabajar desde casa.',
   19.4170, -99.1620, 19.4179, -99.1612,
   'publicada', '/assets/placeholder-apt-3.svg', 0, 1, NULL,
   '["Wi-Fi 1 Gbps","Cocineta","Cámara en lobby"]',
   1, '2026-05-01', 1),

  ('casa-durango', 'Casa Durango', 'Juárez', 'Durango 217', 5, 2, 2, 84, 28900,
   'Recién remodelado. Doble baño, walk-in closet, vista a Reforma desde la sala.',
   19.4262, -99.1633, 19.4253, -99.1641,
   'publicada', '/assets/placeholder-apt-4.svg', 1, 0, NULL,
   '["Lavadora · secadora","Wi-Fi 1 Gbps","Estacionamiento","Aire acondicionado"]',
   0, '2026-06-15', 1),

  ('amsterdam-76', 'Amsterdam 76', 'Condesa', 'Amsterdam 76', 1, 1, 1, 56, 22300,
   'Planta baja con jardín privado de 12 m². Tranquilo, dentro del óvalo de Amsterdam.',
   19.4104, -99.1708, 19.4112, -99.1714,
   'publicada', '/assets/placeholder-apt-5.svg', 0, 0, NULL,
   '["Jardín privado","Cocina equipada","Mascotas grandes ok"]',
   1, '2026-07-01', 1),

  ('oaxaca-230', 'Oaxaca 230', 'Roma Norte', 'Oaxaca 230', 3, 2, 1, 72, 26800,
   'Departamento esquinero con luz toda la mañana. Roma Norte clásica.',
   19.4189, -99.1593, 19.4180, -99.1601,
   'borrador', '/assets/placeholder-apt-1.svg', 1, 0, NULL,
   '["Lavadora · secadora","Wi-Fi 1 Gbps","Cocina equipada"]',
   1, '2026-06-01', 1);
