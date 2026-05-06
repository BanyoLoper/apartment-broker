function ListingDetail({ listing, onBack }) {
  const [show3D, setShow3D] = React.useState(false);
  const [show360, setShow360] = React.useState(false);

  const heroImages = [
    listing.image,
    '../../assets/placeholder-apt-3.svg',
    '../../assets/placeholder-apt-4.svg',
    '../../assets/placeholder-apt-2.svg',
    '../../assets/placeholder-apt-5.svg',
  ];

  return (
    <main style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 32px 64px' }}>
      <button onClick={onBack} style={{
        background: 'transparent', border: 'none', cursor: 'pointer',
        font: 'var(--ab-text-body-sm)', color: 'var(--ab-stone-600)',
        display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 0',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
        Volver a resultados
      </button>

      <header style={{ marginTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32 }}>
        <div>
          <span className="ab-eyebrow">{listing.colonia} · piso {listing.floor}</span>
          <h1 className="ab-display-2" style={{ marginTop: 8, marginBottom: 4 }}>{listing.name}</h1>
          <div style={{ font: 'var(--ab-text-body)', color: 'var(--ab-stone-600)', fontFamily: 'var(--ab-font-mono)' }}>
            {listing.beds} rec · {listing.baths} baño · {listing.m2} m² · disponible 1 jun 2026
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={iconBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.85a5.5 5.5 0 0 0 0-7.78Z"/></svg>
            Guardar
          </button>
          <button style={iconBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="12" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="m8 11 8-4 M8 13l8 4"/></svg>
            Compartir
          </button>
        </div>
      </header>

      <ImageJourney
        images={heroImages}
        onOpen3D={() => setShow3D(true)}
        onOpen360={() => setShow360(true)}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 48, marginTop: 64 }}>
        <div>
          <span className="ab-eyebrow">Sobre el departamento</span>
          <h2 className="ab-h2" style={{ marginTop: 8 }}>Una planta luminosa frente a la calle</h2>
          <p style={{ font: 'var(--ab-text-body)', fontSize: 17, color: 'var(--ab-stone-600)', marginTop: 16, maxWidth: 560 }}>
            Departamento de 78 m² en un edificio art déco restaurado. Pisos de duela original, cocina abierta con barra de mármol, dos recámaras orientadas al norte y un balcón a Álvaro Obregón. Mantenimiento incluido. La azotea es compartida con tres unidades más.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, marginTop: 32 }}>
            <Feat label="Recámaras" v="2"/>
            <Feat label="Baños" v="1"/>
            <Feat label="Superficie" v="78 m²"/>
            <Feat label="Piso" v={listing.floor}/>
            <Feat label="Orientación" v="Norte"/>
            <Feat label="Estacionamiento" v="No"/>
            <Feat label="Mascotas" v="Sí"/>
            <Feat label="Disponible" v="1 jun"/>
          </div>

          <div style={{ marginTop: 48 }}>
            <span className="ab-eyebrow">Comodidades del depa</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 12 }}>
              {['Lavadora · secadora', 'Wi-Fi 1 Gbps', 'Calentador instantáneo', 'Cocina equipada', 'Closet vestidor', 'Persianas blackout', 'Acceso roof', 'Cámara en lobby', 'Bici-estacionamiento'].map(f => (
                <div key={f} style={{
                  font: 'var(--ab-text-body-sm)', color: 'var(--ab-ink-900)',
                  display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0',
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--ab-jade-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 L9 17 L4 12"/></svg>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        <BookingPanel listing={listing}/>
      </div>

      <NearbyMap/>

      {show3D && <Showroom3D image={listing.image} onClose={() => setShow3D(false)}/>}
      {show360 && <Viewer360 image={heroImages[0]} onClose={() => setShow360(false)}/>}
    </main>
  );
}

const iconBtn = {
  display: 'inline-flex', alignItems: 'center', gap: 8,
  padding: '8px 14px', borderRadius: 8, background: '#FFFFFF',
  border: '1px solid var(--ab-border-strong)', color: 'var(--ab-ink-900)',
  fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
};

function Feat({ label, v }) {
  return (
    <div style={{ borderTop: '1px solid var(--ab-border)', paddingTop: 12 }}>
      <div style={{ font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ab-fg-soft)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--ab-font-display)', fontSize: 22, fontWeight: 500, color: 'var(--ab-ink-900)', marginTop: 4, letterSpacing: '-0.01em' }}>{v}</div>
    </div>
  );
}

window.ListingDetail = ListingDetail;
