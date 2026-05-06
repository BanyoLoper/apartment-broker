-- EZRA Real Estate — agrega los dos campos clave del modelo amueblado.
-- furnished:           1 = depto. amueblado / 0 = sin amueblar
-- utilities_included:  texto libre con servicios incluidos en la renta,
--                       p.ej. "mtto + gas + luz + agua + internet"
-- tagline:             frase corta editorial para la tarjeta Hamburgo,
--                       p.ej. "Estilo hotel boutique"

ALTER TABLE listings ADD COLUMN furnished INTEGER NOT NULL DEFAULT 0;
ALTER TABLE listings ADD COLUMN utilities_included TEXT;
ALTER TABLE listings ADD COLUMN tagline TEXT;
