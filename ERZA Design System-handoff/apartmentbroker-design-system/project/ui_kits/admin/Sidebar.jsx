function Sidebar({ active, onNav }) {
  const items = [
    { k: 'listings', label: 'Publicaciones', icon: 'M3 21 V8 L12 3 L21 8 V21 Z M9 21 V14 H15 V21' },
    { k: 'visits', label: 'Visitas', icon: 'M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0Z' },
    { k: 'tenants', label: 'Inquilinos', icon: 'M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z M5 21v-1a7 7 0 0 1 14 0v1' },
    { k: 'contracts', label: 'Contratos', icon: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z M14 2v6h6 M9 13h6 M9 17h6' },
    { k: 'metrics', label: 'Métricas', icon: 'M3 3v18h18 M7 14l4-4 4 4 5-5' },
  ];
  return (
    <nav style={{
      width: 240, height: '100vh', position: 'sticky', top: 0,
      background: 'var(--ezra-ink-950)', color: '#FFFFFF', padding: '32px 24px',
      borderRight: '1px solid rgba(255,255,255,0.08)',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ marginBottom: 48, lineHeight: 1 }}>
        <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 400, fontSize: 26, letterSpacing: 6, color: '#FFF' }}>EZRA</div>
        <div style={{ fontSize: 8, fontWeight: 300, letterSpacing: 3.5, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>REAL ESTATE</div>
        <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 14 }}>Admin Console</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {items.map(it => {
          const isActive = active === it.k;
          return (
            <button key={it.k} onClick={() => onNav && onNav(it.k)} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '13px 0', border: 'none', background: 'transparent',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
              fontFamily: 'inherit', fontSize: 11, fontWeight: isActive ? 500 : 300,
              letterSpacing: '0.18em', textTransform: 'uppercase',
              cursor: 'pointer', textAlign: 'left', position: 'relative',
            }}>
              {isActive && <span style={{ position: 'absolute', left: -24, top: 0, bottom: 0, width: 2, background: '#FFFFFF' }}/>}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d={it.icon}/>
              </svg>
              {it.label}
            </button>
          );
        })}
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 500, fontSize: 12, letterSpacing: '0.08em' }}>MR</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 500, color: '#FFF' }}>María Reyes</div>
          <div style={{ fontSize: 10, fontWeight: 300, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.08em', marginTop: 2 }}>operaciones@ezra</div>
        </div>
      </div>
    </nav>
  );
}

window.Sidebar = Sidebar;
