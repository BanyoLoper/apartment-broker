function BookingPanel({ listing }) {
  const [date, setDate] = React.useState('Sáb 9 mayo · 11:00');
  const [stage, setStage] = React.useState('idle'); // idle | confirmed
  return (
    <aside style={{
      position: 'sticky', top: 96, alignSelf: 'start',
      background: '#FFFFFF', border: '1px solid var(--ab-border)', borderRadius: 22,
      padding: 24, boxShadow: 'var(--ab-shadow-2)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontFamily: 'var(--ab-font-mono)', fontSize: 22, color: 'var(--ab-ink-900)', fontWeight: 500 }}>
          MXN ${listing.price.toLocaleString()}
        </span>
        <span style={{ font: 'var(--ab-text-caption)', color: 'var(--ab-stone-600)' }}>/ mes</span>
      </div>
      <div style={{ font: 'var(--ab-text-caption)', color: 'var(--ab-stone-600)', marginTop: 4 }}>
        Renta directa con el dueño · sin comisión a inquilino
      </div>

      {stage === 'idle' && (
        <>
          <div style={{ marginTop: 20, padding: 14, border: '1px solid var(--ab-border)', borderRadius: 12 }}>
            <div className="ab-eyebrow" style={{ marginBottom: 8 }}>Reservar visita</div>
            <select value={date} onChange={(e) => setDate(e.target.value)} style={{
              width: '100%', padding: 8, border: 'none', background: 'transparent',
              fontFamily: 'inherit', fontSize: 15, color: 'var(--ab-ink-900)', outline: 'none',
            }}>
              <option>Sáb 9 mayo · 11:00</option>
              <option>Sáb 9 mayo · 13:00</option>
              <option>Dom 10 mayo · 10:00</option>
              <option>Lun 11 mayo · 18:00</option>
            </select>
          </div>

          <button onClick={() => setStage('confirmed')} style={{
            width: '100%', marginTop: 12, padding: '14px',
            background: 'var(--ab-terracotta-500)', color: '#FFFFFF',
            border: 'none', borderRadius: 10, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 15, fontWeight: 600,
          }}>Reservar visita</button>

          <button style={{
            width: '100%', marginTop: 8, padding: '14px',
            background: '#FFFFFF', color: 'var(--ab-ink-900)',
            border: '1px solid var(--ab-border-strong)', borderRadius: 10, cursor: 'pointer',
            fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
          }}>Hablar con un asesor</button>
        </>
      )}

      {stage === 'confirmed' && (
        <div style={{
          marginTop: 20, padding: 16, borderRadius: 12,
          background: 'var(--ab-jade-100)', border: '1px solid var(--ab-jade-600)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ab-jade-600)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 L9 17 L4 12"/></svg>
            <span style={{ fontWeight: 600, fontSize: 14 }}>Visita confirmada</span>
          </div>
          <div style={{ font: 'var(--ab-text-body-sm)', marginTop: 8, color: 'var(--ab-stone-600)' }}>
            Te esperamos el <strong style={{ color: 'var(--ab-ink-900)' }}>{date}</strong>. Recibirás un recordatorio por WhatsApp.
          </div>
          <button onClick={() => setStage('idle')} style={{
            marginTop: 12, padding: '6px 12px', background: 'transparent',
            border: '1px solid var(--ab-jade-600)', color: 'var(--ab-jade-600)',
            borderRadius: 6, cursor: 'pointer', fontSize: 12, fontWeight: 600,
          }}>Cambiar horario</button>
        </div>
      )}

      <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--ab-border)', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Row k="Depósito" v="1 mes"/>
        <Row k="Contrato mín." v="12 meses"/>
        <Row k="Mantenimiento" v="Incluido"/>
        <Row k="Mascotas" v="Permitidas"/>
      </div>
    </aside>
  );
}

function Row({ k, v }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', font: 'var(--ab-text-body-sm)' }}>
      <span style={{ color: 'var(--ab-stone-600)' }}>{k}</span>
      <span style={{ color: 'var(--ab-ink-900)', fontWeight: 500 }}>{v}</span>
    </div>
  );
}

window.BookingPanel = BookingPanel;
