-- ApartmentBroker — esquema inicial
-- Cloudflare D1 (SQLite). Diseñado para portarse a Postgres en migración a AWS.

PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS brokers (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  email         TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  password_hash TEXT NOT NULL,        -- PBKDF2(SHA-256, 100k iter) en base64
  password_salt TEXT NOT NULL,        -- salt en base64
  role          TEXT NOT NULL DEFAULT 'broker',  -- 'broker' | 'admin'
  active        INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS listings (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT NOT NULL UNIQUE,           -- 'casa-sonora'
  name          TEXT NOT NULL,                  -- 'Casa Sonora'
  colonia       TEXT NOT NULL,
  street        TEXT,
  floor         INTEGER,
  beds          INTEGER NOT NULL,
  baths         INTEGER NOT NULL,
  area_m2       INTEGER NOT NULL,
  price_mxn     INTEGER NOT NULL,               -- renta mensual en MXN
  description   TEXT,
  -- ubicación real (interna, nunca expuesta tal cual al público)
  lat_real      REAL,
  lng_real      REAL,
  -- ubicación difusa precalculada: punto desplazado ~150m
  lat_fuzzy     REAL,
  lng_fuzzy     REAL,
  status        TEXT NOT NULL DEFAULT 'borrador', -- 'borrador'|'publicada'|'reservada'|'retirada'
  cover_image   TEXT,                            -- key en R2 o URL
  -- flags de tour
  has_3d        INTEGER NOT NULL DEFAULT 0,
  has_360       INTEGER NOT NULL DEFAULT 0,
  model_glb_url TEXT,                            -- ruta /models/xxx.glb en R2
  -- amenidades / texto libre
  amenities     TEXT,                            -- JSON array de strings
  pet_friendly  INTEGER NOT NULL DEFAULT 0,
  parking       INTEGER NOT NULL DEFAULT 0,
  available_at  TEXT,                            -- 'YYYY-MM-DD'
  -- auditoría
  broker_id     INTEGER NOT NULL REFERENCES brokers(id),
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_colonia ON listings(colonia);

CREATE TABLE IF NOT EXISTS listing_media (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id  INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  kind        TEXT NOT NULL,           -- 'photo' | 'photo360' | 'video' | 'glb'
  url         TEXT NOT NULL,           -- key en R2 o URL externa (YouTube/Vimeo)
  caption     TEXT,
  position    INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_media_listing ON listing_media(listing_id, position);

-- Notas internas que el broker captura tras una visita o llamada
CREATE TABLE IF NOT EXISTS broker_notes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id  INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  broker_id   INTEGER NOT NULL REFERENCES brokers(id),
  body        TEXT NOT NULL,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_notes_listing ON broker_notes(listing_id, created_at DESC);

-- Captura de leads desde la página pública
CREATE TABLE IF NOT EXISTS leads (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id    INTEGER REFERENCES listings(id) ON DELETE SET NULL,
  name          TEXT NOT NULL,
  email         TEXT,
  phone         TEXT,                  -- formato E.164 sin +
  message       TEXT,
  channel       TEXT NOT NULL DEFAULT 'web',  -- 'web' | 'whatsapp'
  status        TEXT NOT NULL DEFAULT 'nuevo', -- 'nuevo'|'contactado'|'visita'|'cerrado'|'descartado'
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status, created_at DESC);

-- Solicitudes de visita
CREATE TABLE IF NOT EXISTS bookings (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id    INTEGER NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  lead_id       INTEGER REFERENCES leads(id) ON DELETE SET NULL,
  scheduled_at  TEXT NOT NULL,         -- ISO 8601
  status        TEXT NOT NULL DEFAULT 'solicitada',
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);
