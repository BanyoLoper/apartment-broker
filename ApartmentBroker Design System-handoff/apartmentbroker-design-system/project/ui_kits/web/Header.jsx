function Header({ onNav, active }) {
  const linkBase = {
    background: 'transparent', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--ab-font-body)', fontSize: 14, fontWeight: 500,
    color: 'var(--ab-fg)', padding: '8px 12px', borderRadius: 8,
  };
  const linkActive = { ...linkBase, color: 'var(--ab-ink-900)', background: 'var(--ab-bone-100)' };
  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(250, 247, 242, 0.85)', backdropFilter: 'blur(20px) saturate(1.2)',
      borderBottom: '1px solid var(--ab-border)',
    }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '14px 32px',
        display: 'flex', alignItems: 'center', gap: 32,
      }}>
        <button onClick={() => onNav('home')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
          <img src="../../assets/logo-wordmark.svg" alt="ApartmentBroker" style={{ height: 28 }} />
        </button>
        <nav style={{ display: 'flex', gap: 4, marginLeft: 24 }}>
          <button style={active === 'listings' ? linkActive : linkBase} onClick={() => onNav('listings')}>Departamentos</button>
          <button style={linkBase}>Colonias</button>
          <button style={linkBase}>Cómo funciona</button>
          <button style={linkBase}>Para inquilinos</button>
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ab-fg-soft)' }}>ES · EN</span>
          <button style={{
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: '8px 14px',
            background: 'transparent', border: '1px solid var(--ab-border-strong)',
            borderRadius: 8, cursor: 'pointer', color: 'var(--ab-ink-900)',
          }}>Iniciar sesión</button>
          <button style={{
            fontFamily: 'inherit', fontSize: 13, fontWeight: 600, padding: '8px 14px',
            background: 'var(--ab-terracotta-500)', border: 'none', borderRadius: 8,
            cursor: 'pointer', color: '#FFFFFF',
          }}>Reservar visita</button>
        </div>
      </div>
    </header>
  );
}

window.Header = Header;
