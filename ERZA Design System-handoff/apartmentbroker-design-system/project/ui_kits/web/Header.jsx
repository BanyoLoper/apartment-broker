function Header({ onNav, active }) {
  const linkBase = {
    background: 'transparent', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--ezra-font-body)', fontSize: 12, fontWeight: 300,
    color: 'rgba(255,255,255,0.7)', padding: '8px 0', letterSpacing: '0.18em', textTransform: 'uppercase',
  };
  const linkActive = { ...linkBase, color: '#FFFFFF', fontWeight: 500 };
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(10,10,10,0.78)', backdropFilter: 'blur(24px) saturate(1.1)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '20px 32px',
        display: 'flex', alignItems: 'center', gap: 48,
      }}>
        <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1 }}>
          <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, fontSize: 22, letterSpacing: 5, color: '#FFF' }}>EZRA</span>
          <span style={{ fontSize: 7, fontWeight: 300, letterSpacing: 3, color: 'rgba(255,255,255,0.55)', marginTop: 2 }}>REAL ESTATE</span>
        </button>
        <nav style={{ display: 'flex', gap: 28, marginLeft: 16 }}>
          <button style={active === 'listings' ? linkActive : linkBase} onClick={() => onNav('listings')}>Departamentos</button>
          <button style={linkBase}>Colonias</button>
          <button style={linkBase}>Cómo funciona</button>
          <button style={linkBase}>Contacto</button>
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ fontSize: 11, fontWeight: 300, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>ES · EN</span>
          <button style={{
            fontFamily: 'inherit', fontSize: 11, fontWeight: 500, padding: '11px 22px',
            background: '#FFFFFF', border: 'none', borderRadius: 2,
            cursor: 'pointer', color: '#141414', letterSpacing: '0.16em', textTransform: 'uppercase',
          }}>Reservar visita</button>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
