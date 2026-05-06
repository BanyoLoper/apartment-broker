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
      background: 'var(--ab-ink-900)', color: 'var(--ab-bone-50)', padding: 24,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
        <img src="../../assets/logo-mark.svg" style={{ width: 32, height: 32 }}/>
        <div>
          <div style={{ font: 'var(--ab-text-h4)', color: '#FAF7F2' }}>Admin</div>
          <div style={{ font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.4)' }}>Console</div>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {items.map(it => (
          <button key={it.k} onClick={() => onNav && onNav(it.k)} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '10px 12px', borderRadius: 8, border: 'none',
            background: active === it.k ? 'rgba(200,85,61,0.2)' : 'transparent',
            color: active === it.k ? '#FFFFFF' : 'rgba(250,247,242,0.7)',
            fontFamily: 'inherit', fontSize: 14, fontWeight: active === it.k ? 600 : 500,
            cursor: 'pointer', textAlign: 'left',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d={it.icon}/>
            </svg>
            {it.label}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(250,247,242,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 999, background: 'var(--ab-ochre-500)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ab-ink-900)', fontWeight: 700, fontSize: 13 }}>MR</div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600 }}>María Reyes</div>
          <div style={{ fontSize: 11, color: 'rgba(250,247,242,0.5)' }}>operaciones@</div>
        </div>
      </div>
    </nav>
  );
}

window.Sidebar = Sidebar;
