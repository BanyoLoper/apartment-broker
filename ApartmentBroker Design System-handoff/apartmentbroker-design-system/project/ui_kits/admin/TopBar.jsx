function TopBar({ title, subtitle, onNew }) {
  return (
    <header style={{
      display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      padding: '24px 32px', borderBottom: '1px solid var(--ab-border)',
      background: 'var(--ab-bg)',
    }}>
      <div>
        <span className="ab-eyebrow">{subtitle}</span>
        <h1 className="ab-h1" style={{ marginTop: 6, marginBottom: 0 }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          padding: '10px 16px', borderRadius: 8, background: '#FFFFFF',
          border: '1px solid var(--ab-border-strong)', color: 'var(--ab-ink-900)',
          fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}>Exportar CSV</button>
        <button onClick={onNew} style={{
          padding: '10px 16px', borderRadius: 8, background: 'var(--ab-terracotta-500)',
          border: 'none', color: '#FFFFFF',
          fontFamily: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14 M5 12h14"/></svg>
          Nueva publicación
        </button>
      </div>
    </header>
  );
}

window.TopBar = TopBar;
