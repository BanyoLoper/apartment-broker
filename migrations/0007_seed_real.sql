-- EZRA Real Estate — seed con el inventario REAL publicado en
-- https://www.ezrarealestate.com.mx/ (Pedregal y Reforma 77).
-- Reemplaza por completo el seed de demostración anterior.
-- Self-contained: crea el broker, las propiedades y su galería de fotos.

PRAGMA foreign_keys = ON;

-- Broker para que el panel /admin y /login sigan funcionando.
-- Password: 'demo123' (hash/salt generados con scripts/hash-password.mjs).
INSERT OR IGNORE INTO brokers (id, email, name, password_hash, password_salt, role) VALUES
  (1, 'broker@example.com', 'EZRA Real Estate',
   'T7F90uvCy9sM/D/vZRKUWwUlBvBSIEvHvBNQuOCxqRA=',
   'QFPGSp0a+9N1/KdNlSNjMQ==',
   'admin');

-- Limpia cualquier dato previo (mock / demo).
DELETE FROM bookings;
DELETE FROM leads;
DELETE FROM broker_notes;
DELETE FROM listing_media;
DELETE FROM listings;
DELETE FROM sqlite_sequence WHERE name IN ('listings', 'listing_media', 'bookings', 'leads', 'broker_notes');

-- ───────────────────────────── Propiedades ─────────────────────────────
INSERT INTO listings
  (slug, name, colonia, street, floor, beds, baths, area_m2, price_mxn,
   description, lat_real, lng_real, lat_fuzzy, lng_fuzzy,
   status, cover_image, has_3d, has_360, model_glb_url,
   amenities, pet_friendly, parking, available_at,
   furnished, utilities_included, tagline,
   broker_id)
VALUES
  ('pedregal-progreso-tizapan', 'Pedregal', 'Progreso Tizapán', 'Álvaro Obregón, CDMX', 6, 2, 3, 150, 35500,
   'Departamento amueblado a 8 minutos de C.U., con vistas abiertas hacia áreas verdes y el skyline universitario. 150 m² muy bien distribuidos: 2 recámaras amplias, estudio independiente (ideal para home office o consultorio, adaptable como tercera recámara), cuarto de servicio con baño completo, sala y comedor de gran tamaño con excelente entrada de luz natural y cocina integral equipada. Área de lavado, acceso principal y acceso independiente de servicio, y un lugar de estacionamiento más estacionamiento para visitas dentro del condominio. Ubicado en piso 6 con orientación oriente–sur–poniente, lo que permite iluminación natural durante todo el día. Mantenimiento incluido y disponible para ocupación inmediata.',
   19.3445, -99.1975, 19.3454, -99.1968,
   'publicada', '/photos/pedregal/estudio.png', 0, 0, NULL,
   '["Cancha de tenis","Cancha de fútbol","Gimnasio","Salón de eventos","Salón de lectura","Áreas jardinadas amplias","Área de juegos infantiles","Vigilancia 24/7","Elevador principal y de servicio","Estacionamiento para visitas"]',
   0, 1, NULL,
   1, 'Mantenimiento incluido', 'Amueblado, listo para habitar',
   1),

  ('reforma-77', 'Reforma 77', 'Tabacalera', 'Paseo de la Reforma 77, Cuauhtémoc, CDMX', 20, 2, 2, 112, 56500,
   'Departamento en piso 20 sobre Paseo de la Reforma, en la Tabacalera. 112 m² con sala amueblada con muebles italianos, comedor, cocina equipada de lujo y cuarto de lavado. Dos recámaras completas con clóset y dos baños completos con tina. Un cajón de estacionamiento. Vista panorámica de la ciudad desde el piso 20.',
   19.4365, -99.1535, 19.4373, -99.1528,
   'publicada', '/photos/reforma77/sala.jpg', 0, 0, NULL,
   '["Gimnasio","Alberca","Salón de eventos","Terraza con asador","Jacuzzi","Cine","1 cajón de estacionamiento"]',
   0, 1, NULL,
   1, NULL, 'Piso 20 · vista panorámica',
   1);

-- ────────────────────────── Galería de fotos ──────────────────────────
-- Pedregal
INSERT INTO listing_media (listing_id, kind, url, caption, position) VALUES
  ((SELECT id FROM listings WHERE slug = 'pedregal-progreso-tizapan'), 'photo', '/photos/pedregal/estudio.png',  'Estudio / home office',  0),
  ((SELECT id FROM listings WHERE slug = 'pedregal-progreso-tizapan'), 'photo', '/photos/pedregal/comedor.png',  'Comedor',                1),
  ((SELECT id FROM listings WHERE slug = 'pedregal-progreso-tizapan'), 'photo', '/photos/pedregal/cocina.png',   'Cocina integral',        2),
  ((SELECT id FROM listings WHERE slug = 'pedregal-progreso-tizapan'), 'photo', '/photos/pedregal/recamara.png', 'Recámara',               3),
  ((SELECT id FROM listings WHERE slug = 'pedregal-progreso-tizapan'), 'photo', '/photos/pedregal/bano.jpg',     'Baño',                   4),
  ((SELECT id FROM listings WHERE slug = 'pedregal-progreso-tizapan'), 'photo', '/photos/pedregal/bano-2.png',   'Baño de servicio',       5),
  ((SELECT id FROM listings WHERE slug = 'pedregal-progreso-tizapan'), 'photo', '/photos/pedregal/plano.png',    'Plano de distribución',  6),
  ((SELECT id FROM listings WHERE slug = 'pedregal-progreso-tizapan'), 'photo', '/photos/pedregal/tenis.jpg',    'Cancha de tenis',        7);

-- Reforma 77
INSERT INTO listing_media (listing_id, kind, url, caption, position) VALUES
  ((SELECT id FROM listings WHERE slug = 'reforma-77'), 'photo', '/photos/reforma77/sala.jpg',     'Sala · muebles italianos', 0),
  ((SELECT id FROM listings WHERE slug = 'reforma-77'), 'photo', '/photos/reforma77/sala-2.png',   'Sala-comedor',             1),
  ((SELECT id FROM listings WHERE slug = 'reforma-77'), 'photo', '/photos/reforma77/comedor.jpg',  'Comedor',                  2),
  ((SELECT id FROM listings WHERE slug = 'reforma-77'), 'photo', '/photos/reforma77/cocina.jpg',   'Cocina equipada',          3),
  ((SELECT id FROM listings WHERE slug = 'reforma-77'), 'photo', '/photos/reforma77/recamara.jpg', 'Recámara principal',       4),
  ((SELECT id FROM listings WHERE slug = 'reforma-77'), 'photo', '/photos/reforma77/vanity.jpg',   'Baño · doble lavabo',      5),
  ((SELECT id FROM listings WHERE slug = 'reforma-77'), 'photo', '/photos/reforma77/regadera.jpg', 'Regadera',                 6),
  ((SELECT id FROM listings WHERE slug = 'reforma-77'), 'photo', '/photos/reforma77/jacuzzi.jpg',  'Jacuzzi',                  7);
