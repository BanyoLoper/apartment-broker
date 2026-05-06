function TopBar({ title, subtitle, onNew }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '36px 40px 28px', borderBottom: '1px solid rgba(255,255,255,0.08)',
      background: 'var(--ezra-ink-900)',
    }}>
      <div>
        <span style={{ fontSize: 11, fontWeight: 300, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{subtitle}</span>
        <h1 style={{ margin: '14px 0 0', fontFamily: 'Inter, sans-serif', fontSize: 44, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFF', lineHeight: 1, whiteSpace: 'nowrap' }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', gap: 0 }}>
        <button style={{
          padding: '13px 22px', background: 'transparent',
          border: '1px solid rgba(255,255,255,0.22)', borderRight: 'none', color: '#FFF',
          fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}>Exportar CSV</button>
        <button onClick={onNew} style={{
          padding: '13px 24px', background: '#FFFFFF',
          border: '1px solid #FFFFFF', color: '#141414',
          fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
          cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 10,
          whiteSpace: 'nowrap',
        }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14 M5 12h14"/></svg>
          Nueva publicación
        </button>
      </div>
    </header>
  );
}

window.TopBar = TopBar;
