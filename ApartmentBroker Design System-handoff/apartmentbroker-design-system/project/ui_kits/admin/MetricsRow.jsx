function MetricsRow() {
  const metrics = [
    { k: 'Activas', v: '84', delta: '+3 esta semana', tone: 'jade' },
    { k: 'Visitas agendadas', v: '47', delta: 'próximos 7 días', tone: 'neutral' },
    { k: 'Ocupación', v: '92%', delta: '+1.4 pts vs mes anterior', tone: 'jade' },
    { k: 'Renta media', v: 'MXN $26,420', delta: 'mediana del portfolio', tone: 'neutral' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, padding: '24px 32px 0' }}>
      {metrics.map(m => (
        <div key={m.k} style={{
          background: '#FFFFFF', border: '1px solid var(--ab-border)',
          borderRadius: 14, padding: 20,
        }}>
          <div style={{ font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ab-fg-soft)' }}>{m.k}</div>
          <div style={{ fontFamily: 'var(--ab-font-display)', fontSize: 28, fontWeight: 500, color: 'var(--ab-ink-900)', marginTop: 6, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{m.v}</div>
          <div style={{ font: 'var(--ab-text-caption)', color: m.tone === 'jade' ? 'var(--ab-jade-600)' : 'var(--ab-stone-600)', marginTop: 4 }}>
            {m.delta}
          </div>
        </div>
      ))}
    </div>
  );
}

window.MetricsRow = MetricsRow;
