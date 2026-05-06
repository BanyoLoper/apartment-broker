function MetricsRow() {
  const metrics = [
    { k: 'Activas', v: '84', delta: '+3 esta semana' },
    { k: 'Visitas agendadas', v: '47', delta: 'próximos 7 días' },
    { k: 'Ocupación', v: '92%', delta: '+1.4 pts vs mes anterior' },
    { k: 'Renta media', v: '$26,420', delta: 'mediana del portfolio' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, padding: '32px 40px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      {metrics.map((m, i) => (
        <div key={m.k} style={{
          padding: '0 28px 28px',
          borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
        }}>
          <div style={{ fontSize: 10, fontWeight: 300, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{m.k}</div>
          <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 36, fontWeight: 800, color: '#FFF', marginTop: 12, letterSpacing: '-0.02em', lineHeight: 1, whiteSpace: 'nowrap' }}>{m.v}</div>
          <div style={{ fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginTop: 10 }}>{m.delta}</div>
        </div>
      ))}
    </div>
  );
}

window.MetricsRow = MetricsRow;
