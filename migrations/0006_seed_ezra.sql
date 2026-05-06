-- EZRA Real Estate — replace mock seed.
-- Inventario amueblado boutique con servicios incluidos, hospitality-grade.
-- El primero es el del .md de referencia (Hamburgo 32 Capitalia Juárez).

DELETE FROM bookings;
DELETE FROM leads;
DELETE FROM broker_notes;
DELETE FROM listing_media;
DELETE FROM listings;

-- Reset autoincrement so AB-1001 vuelve a empezar limpio
DELETE FROM sqlite_sequence WHERE name IN ('listings', 'listing_media', 'bookings', 'leads', 'broker_notes');

INSERT INTO listings
  (slug, name, colonia, street, floor, beds, baths, area_m2, price_mxn,
   description, lat_real, lng_real, lat_fuzzy, lng_fuzzy,
   status, cover_image, has_3d, has_360, model_glb_url,
   amenities, pet_friendly, parking, available_at,
   furnished, utilities_included, tagline,
   broker_id)
VALUES
  ('hamburgo-32', 'Hamburgo 32', 'Juárez', 'Hamburgo 32, Capitalia', 8, 1, 1, 60, 34500,
   'Suite boutique en torre Capitalia. Recámara king con guardado completo y home office, baño con acabados tipo hotel en travertino, sala-comedor-cocina abierta y balcón con mobiliario. Ventanas con cancelación de ruido, persianas blackout + screen. Listo para mudarte.',
   19.4252, -99.1626, 19.4243, -99.1635,
   'publicada', '/photos/hamburgo-sala.jpg', 1, 1, NULL,
   '["Cocina equipada (refri, estufa/horno, microondas, centro de lavado)","Vajilla, blancos y accesorios","Escritorio home office","Mobiliario en balcón","Persianas blackout + screen","Ventanas con cancelación de ruido","Terraza panorámica con vista a Insurgentes y Reforma","Gimnasio","Jacuzzi","Salas lounge","Área de cowork","Elevador","Seguridad 24/7","Lobby","1 cajón de estacionamiento"]',
   0, 1, '2026-05-15',
   1, 'mtto + gas + luz + agua + internet', 'Estilo hotel boutique',
   1),

  ('alvaro-obregon-roof', 'Álvaro Obregón Roof', 'Condesa', 'Álvaro Obregón 290', 11, 1, 1, 64, 42800,
   'Penthouse amueblado con terraza privada de 25 m² sobre Álvaro Obregón. Vista poniente, luz toda la tarde. Acabados de concreto pulido, carpintería nueva y dotación completa de blancos.',
   19.4118, -99.1722, 19.4127, -99.1715,
   'publicada', '/photos/hamburgo-sala-2.jpg', 1, 1, NULL,
   '["Terraza privada 25 m²","Cocina equipada","Wi-Fi 1 Gbps","Aire acondicionado","Persianas eléctricas","Lavadora · secadora","Roof común","Gym","Elevador","Concierge"]',
   0, 1, '2026-06-01',
   1, 'mtto + servicios incluidos', 'Penthouse con terraza privada',
   1),

  ('colima-184', 'Colima 184', 'Roma Norte', 'Colima 184', 4, 1, 1, 52, 28900,
   'Estudio amueblado en edificio renovado de la Roma. Doble altura, mobiliario tipo nórdico, kitchenette completa. Pensado para una persona o pareja sin pretensiones.',
   19.4170, -99.1620, 19.4178, -99.1614,
   'publicada', '/photos/hamburgo-comedor.jpg', 0, 1, NULL,
   '["Wi-Fi 1 Gbps","Cocineta equipada","Cama queen + blancos","Escritorio","Cámara en lobby","Elevador"]',
   1, 0, '2026-05-20',
   1, 'mtto + agua + internet', 'Estudio Roma con luz norte',
   1),

  ('durango-217', 'Durango 217', 'Juárez', 'Durango 217', 6, 2, 2, 84, 46500,
   'Dos recámaras con dotación completa, walk-in closet, vista a Reforma desde la sala. Sala-comedor-cocina abierta con isla. Recién entregado.',
   19.4262, -99.1633, 19.4270, -99.1640,
   'publicada', '/photos/hamburgo-sala.jpg', 1, 0, NULL,
   '["Lavadora · secadora","Wi-Fi 1 Gbps","Estacionamiento techado","Aire acondicionado","Cocina con isla","Walk-in closet","Gym","Roof"]',
   0, 1, '2026-06-15',
   1, 'mtto + servicios incluidos', 'Dos recámaras con vista a Reforma',
   1),

  ('amsterdam-76', 'Amsterdam 76', 'Condesa', 'Amsterdam 76', 1, 1, 1, 56, 32300,
   'Planta baja con jardín privado de 12 m². Tranquilo, dentro del óvalo de Amsterdam. Mobiliario boutique, perfecto para quien busca silencio y árboles.',
   19.4104, -99.1708, 19.4113, -99.1715,
   'publicada', '/photos/hamburgo-sala-2.jpg', 0, 0, NULL,
   '["Jardín privado 12 m²","Cocina equipada","Mobiliario boutique","Mascotas grandes ok","Lavadora · secadora"]',
   1, 0, '2026-07-01',
   1, 'mtto + servicios incluidos', 'Planta baja con jardín privado',
   1),

  ('oaxaca-230', 'Oaxaca 230', 'Roma Norte', 'Oaxaca 230', 3, 2, 1, 72, 38800,
   'Esquinero con luz toda la mañana. Roma Norte clásica, dos recámaras, oficina home office en alcoba. Amueblado completo.',
   19.4189, -99.1593, 19.4197, -99.1601,
   'borrador', '/photos/hamburgo-comedor.jpg', 1, 0, NULL,
   '["Lavadora · secadora","Wi-Fi 1 Gbps","Cocina equipada","Alcoba para home office","Elevador"]',
   1, 0, '2026-06-01',
   1, 'mtto + servicios incluidos', 'Esquinero con luz norte',
   1);
