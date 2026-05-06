function App() {
  const [route, setRoute] = React.useState('home'); // home | listings | detail
  const [activeId, setActiveId] = React.useState(null);
  const detail = window.LISTINGS.find(l => l.id === activeId);

  return (
    <div className="ezra-base">
      <Header active={route} onNav={setRoute}/>

      {route === 'home' && (
        <>
          <Hero onSearch={() => setRoute('listings')}/>
          <FeaturedRow onOpen={(l) => { setActiveId(l.id); setRoute('detail'); }}/>
          <FeatureBlock/>
          <Footer/>
        </>
      )}

      {route === 'listings' && (
        <ListingsScreen onOpen={(l) => { setActiveId(l.id); setRoute('detail'); }}/>
      )}

      {route === 'detail' && detail && (
        <ListingDetail listing={detail} onBack={() => setRoute('listings')}/>
      )}
    </div>
  );
}

function FeaturedRow({ onOpen }) {
  return (
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px 96px', background: 'var(--ezra-ink-900)' }} data-screen-label="Home · Featured">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
        <div>
          <span className="ezra-eyebrow-wide">Recién publicados</span>
          <h2 className="ezra-h2" style={{ marginTop: 10, color: '#FFF' }}>Departamentos disponibles esta semana</h2>
        </div>
        <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#FFF' }}>Ver los 84 →</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {window.LISTINGS.slice(0, 6).map(l => <ListingCard key={l.id} listing={l} onOpen={onOpen}/>)}
      </div>
    </section>
  );
}

function FeatureBlock() {
  const features = [
    { icon: '../../assets/icon-3d-room.svg', title: 'Tour 3D antes de venir', body: 'Recorre cada habitación como si estuvieras dentro. Mide ventanas, mira los acabados.' },
    { icon: '../../assets/icon-360.svg', title: 'Vista 360° por habitación', body: 'Arrastra para mirar alrededor. Sin gafas, sin descargas.' },
    { icon: null, custom: 'map', title: 'Comodidades a un toque', body: 'Metro, Metrobús, parques, súpers, cafés, gimnasios. Filtra el mapa por categoría.' },
  ];
  return (
    <section style={{ background: 'var(--ezra-ink-950)', padding: '120px 32px' }} data-screen-label="Home · Features">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <span className="ezra-eyebrow-wide">Por qué EZRA</span>
        <h2 style={{ marginTop: 14, maxWidth: 720, fontFamily: 'Inter', fontSize: 56, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.0, color: '#FFF' }}>
          Toda la información <span style={{ fontWeight: 200 }}>antes de pisar la banqueta.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginTop: 64 }}>
          {features.map((f, i) => (
            <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.18)', paddingTop: 28 }}>
              <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', color: '#FFF' }}>
                {f.icon
                  ? <img src={f.icon} style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }}/>
                  : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>}
              </div>
              <h3 style={{ fontFamily: 'Inter', fontSize: 22, fontWeight: 700, color: '#FFF', marginTop: 24, marginBottom: 10, letterSpacing: '-0.005em' }}>{f.title}</h3>
              <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.55, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ListingsScreen({ onOpen }) {
  const [activeId, setActiveId] = React.useState(window.LISTINGS[0].id);
  const [filter, setFilter] = React.useState('Todas');
  const filters = ['Todas', 'Roma Norte', 'Condesa', 'Juárez', 'Polanco'];
  const visible = filter === 'Todas' ? window.LISTINGS : window.LISTINGS.filter(l => l.colonia === filter);
  return (
    <main data-screen-label="Listings · Map split" style={{ display: 'grid', gridTemplateColumns: '480px 1fr', height: 'calc(100vh - 73px)', gap: 0, background: 'var(--ezra-ink-900)' }}>
      <section style={{ overflow: 'auto', padding: '32px 28px 32px', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ margin: 0, fontFamily: 'Inter', fontSize: 30, fontWeight: 800, letterSpacing: '-0.015em', color: '#FFF' }}>{visible.length} <span style={{ fontWeight: 200 }}>departamentos</span></h2>
          <span className="ezra-eyebrow-wide">CDMX</span>
        </div>
        <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', marginTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '14px 16px', fontSize: 11, fontWeight: filter === f ? 600 : 300, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer',
              background: 'transparent',
              color: filter === f ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
              border: 'none', borderBottom: `2px solid ${filter === f ? '#FFFFFF' : 'transparent'}`, marginBottom: -1,
              fontFamily: 'inherit',
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
          {visible.map(l => (
            <div key={l.id}
                 onMouseEnter={() => setActiveId(l.id)}
                 style={{ outline: activeId === l.id ? '1px solid #FFFFFF' : 'none', outlineOffset: 2, borderRadius: 4 }}>
              <ListingCard listing={l} onOpen={onOpen} compact/>
            </div>
          ))}
        </div>
      </section>
      <section style={{ padding: 16 }}>
        <MapView listings={visible} activeId={activeId} onPin={setActiveId}/>
      </section>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
