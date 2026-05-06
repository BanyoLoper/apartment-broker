function ListingsTable() {
  const rows = [
    { name: 'Casa Sonora', colonia: 'Roma Norte', price: 24500, status: 'Publicada', visits: 12, image: '../../assets/placeholder-apt-1.svg', tour: ['3D', '360°'] },
    { name: 'Roof Álvaro Obregón', colonia: 'Condesa', price: 32000, status: 'Publicada', visits: 21, image: '../../assets/placeholder-apt-2.svg', tour: ['3D', '360°'] },
    { name: 'Colima 184', colonia: 'Roma Norte', price: 18200, status: 'Borrador', visits: 0, image: '../../assets/placeholder-apt-3.svg', tour: ['360°'] },
    { name: 'Casa Durango', colonia: 'Juárez', price: 28900, status: 'Publicada', visits: 6, image: '../../assets/placeholder-apt-4.svg', tour: ['3D'] },
    { name: 'Amsterdam 76', colonia: 'Condesa', price: 22300, status: 'Reservada', visits: 18, image: '../../assets/placeholder-apt-5.svg', tour: [] },
    { name: 'Oaxaca 230', colonia: 'Roma Norte', price: 26800, status: 'Retirada', visits: 4, image: '../../assets/placeholder-apt-1.svg', tour: ['3D'] },
  ];

  const statusStyle = (s) => {
    const map = {
      'Publicada': { bg: 'var(--ab-jade-100)', fg: 'var(--ab-jade-600)' },
      'Borrador':  { bg: 'var(--ab-bone-200)', fg: 'var(--ab-stone-600)' },
      'Reservada': { bg: 'var(--ab-ochre-100)', fg: '#8B6A1F' },
      'Retirada':  { bg: 'var(--ab-rosa-100)', fg: 'var(--ab-danger)' },
    };
    const c = map[s];
    return { background: c.bg, color: c.fg, padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600 };
  };

  const head = { font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ab-fg-soft)', textAlign: 'left', padding: '12px 16px', borderBottom: '1px solid var(--ab-border)', background: 'var(--ab-bone-100)' };
  const cell = { padding: '14px 16px', borderBottom: '1px solid var(--ab-border)', font: 'var(--ab-text-body-sm)', color: 'var(--ab-ink-900)', verticalAlign: 'middle' };

  return (
    <section style={{ padding: '24px 32px 64px' }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['Todas (84)', 'Publicadas (62)', 'Borradores (8)', 'Reservadas (12)', 'Retiradas (2)'].map((f, i) => (
          <button key={f} style={{
            padding: '6px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background: i === 0 ? 'var(--ab-ink-900)' : '#FFFFFF',
            color: i === 0 ? '#FAF7F2' : 'var(--ab-ink-900)',
            border: `1px solid ${i === 0 ? 'var(--ab-ink-900)' : 'var(--ab-border-strong)'}`,
            fontFamily: 'inherit',
          }}>{f}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <input placeholder="Buscar por nombre o colonia" style={{
            padding: '8px 12px', borderRadius: 8, border: '1px solid var(--ab-border-strong)',
            fontFamily: 'inherit', fontSize: 13, background: '#FFFFFF', minWidth: 280,
          }}/>
        </div>
      </div>

      <div style={{ background: '#FFFFFF', borderRadius: 14, border: '1px solid var(--ab-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...head, width: 40 }}><input type="checkbox"/></th>
              <th style={head}>Departamento</th>
              <th style={head}>Colonia</th>
              <th style={head}>Renta</th>
              <th style={head}>Estado</th>
              <th style={head}>Tour</th>
              <th style={head}>Visitas</th>
              <th style={{ ...head, width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ background: i % 2 === 1 ? 'var(--ab-bone-50)' : '#FFFFFF' }}>
                <td style={cell}><input type="checkbox"/></td>
                <td style={cell}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 8, backgroundImage: `url(${r.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}/>
                    <div>
                      <div style={{ fontWeight: 600 }}>{r.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--ab-stone-600)', fontFamily: 'var(--ab-font-mono)' }}>AB-{1000 + i}</div>
                    </div>
                  </div>
                </td>
                <td style={cell}>{r.colonia}</td>
                <td style={{ ...cell, fontFamily: 'var(--ab-font-mono)' }}>MXN ${r.price.toLocaleString()}</td>
                <td style={cell}><span style={statusStyle(r.status)}>{r.status}</span></td>
                <td style={cell}>
                  <div style={{ display: 'flex', gap: 4 }}>
                    {r.tour.map(t => (
                      <span key={t} style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--ab-bone-100)', fontSize: 10, fontWeight: 600, color: 'var(--ab-ink-900)' }}>{t}</span>
                    ))}
                  </div>
                </td>
                <td style={{ ...cell, fontFamily: 'var(--ab-font-mono)' }}>{r.visits}</td>
                <td style={cell}>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, color: 'var(--ab-stone-600)' }}>⋯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

window.ListingsTable = ListingsTable;
