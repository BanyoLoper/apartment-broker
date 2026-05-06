function App() {
  const [route, setRoute] = React.useState('home'); // home | listings | detail
  const [activeId, setActiveId] = React.useState(null);
  const detail = window.LISTINGS.find(l => l.id === activeId);

  return (
    <div className="ab-base">
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
    <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px' }} data-screen-label="Home · Featured">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 20 }}>
        <div>
          <span className="ab-eyebrow">Recién publicados</span>
          <h2 className="ab-h2" style={{ marginTop: 8 }}>Departamentos disponibles esta semana</h2>
        </div>
        <button style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          font: 'var(--ab-text-body-sm)', fontWeight: 600, color: 'var(--ab-ink-900)',
        }}>Ver los 84 →</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
        {window.LISTINGS.slice(0, 3).map(l => <ListingCard key={l.id} listing={l} onOpen={onOpen}/>)}
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
    <section style={{ background: 'var(--ab-bone-100)', marginTop: 96, padding: '96px 32px' }} data-screen-label="Home · Features">
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <span className="ab-eyebrow">Por qué ApartmentBroker</span>
        <h2 className="ab-h1" style={{ marginTop: 8, maxWidth: 560 }}>Toda la información antes de pisar la banqueta.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 48 }}>
          {features.map((f, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--ab-border-strong)', paddingTop: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 999, background: 'var(--ab-terracotta-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {f.icon
                  ? <img src={f.icon} style={{ width: 20, height: 20, filter: 'brightness(0) invert(1)' }}/>
                  : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>}
              </div>
              <h3 style={{ font: 'var(--ab-text-h3)', color: 'var(--ab-ink-900)', marginTop: 16, marginBottom: 6 }}>{f.title}</h3>
              <p style={{ font: 'var(--ab-text-body)', color: 'var(--ab-stone-600)', margin: 0 }}>{f.body}</p>
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
    <main data-screen-label="Listings · Map split" style={{ display: 'grid', gridTemplateColumns: '460px 1fr', height: 'calc(100vh - 60px)', gap: 0 }}>
      <section style={{ overflow: 'auto', padding: '24px 24px 32px', borderRight: '1px solid var(--ab-border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 className="ab-h2" style={{ margin: 0 }}>{visible.length} departamentos</h2>
          <span className="ab-eyebrow">CDMX</span>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 16 }}>
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              background: filter === f ? 'var(--ab-ink-900)' : '#FFFFFF',
              color: filter === f ? '#FAF7F2' : 'var(--ab-ink-900)',
              border: `1px solid ${filter === f ? 'var(--ab-ink-900)' : 'var(--ab-border-strong)'}`,
              fontFamily: 'inherit',
            }}>{f}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 20 }}>
          {visible.map(l => (
            <div key={l.id}
                 onMouseEnter={() => setActiveId(l.id)}
                 style={{ outline: activeId === l.id ? '2px solid var(--ab-terracotta-500)' : 'none', outlineOffset: 2, borderRadius: 14 }}>
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
