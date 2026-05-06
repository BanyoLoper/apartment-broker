function ListingsTable() {
  const rows = [
    { name: 'Penthouse + roof privado', colonia: 'Roma Norte', price: 25000, status: 'Publicada', visits: 12, image: '../../assets/placeholder-apt-1.svg', tour: ['3D', '360°'] },
    { name: '150 m² Amueblados',         colonia: 'Coyoacán',  price: 35500, status: 'Publicada', visits: 21, image: '../../assets/placeholder-apt-2.svg', tour: ['3D'] },
    { name: 'A 8 min de Polanco',        colonia: 'Anáhuac',   price: 26500, status: 'Borrador',  visits: 0,  image: '../../assets/placeholder-apt-3.svg', tour: ['360°'] },
    { name: 'Parque de los Venados',     colonia: 'Del Valle', price: 26500, status: 'Publicada', visits: 6,  image: '../../assets/placeholder-apt-4.svg', tour: ['3D'] },
    { name: '100 m² en Escandón II',     colonia: 'Escandón',  price: 28000, status: 'Reservada', visits: 18, image: '../../assets/placeholder-apt-5.svg', tour: [] },
    { name: 'Residencial Carso',         colonia: 'Granada',   price: 35000, status: 'Retirada',  visits: 4,  image: '../../assets/placeholder-apt-1.svg', tour: ['3D'] },
  ];

  const statusStyle = (s) => {
    const map = {
      'Publicada': { dot: '#FFFFFF', fg: '#FFFFFF' },
      'Borrador':  { dot: 'rgba(255,255,255,0.4)', fg: 'rgba(255,255,255,0.55)' },
      'Reservada': { dot: '#A8896B', fg: '#A8896B' },
      'Retirada':  { dot: 'rgba(255,255,255,0.3)', fg: 'rgba(255,255,255,0.4)' },
    };
    const c = map[s];
    return (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 500, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.fg }}>
        <span style={{ width: 6, height: 6, background: c.dot, borderRadius: 999 }}/>{s}
      </span>
    );
  };

  const head = { fontSize: 10, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', textAlign: 'left', padding: '18px 20px', borderBottom: '1px solid rgba(255,255,255,0.18)', background: 'transparent' };
  const cell = { padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 14, fontWeight: 300, color: '#FFFFFF', verticalAlign: 'middle' };

  const filters = ['Todas (84)', 'Publicadas (62)', 'Borradores (8)', 'Reservadas (12)', 'Retiradas (2)'];

  return (
    <section style={{ padding: '32px 40px 80px' }}>
      <div style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid rgba(255,255,255,0.12)', borderBottom: '1px solid rgba(255,255,255,0.12)', marginBottom: 24 }}>
        {filters.map((f, i) => (
          <button key={f} style={{
            padding: '14px 22px', fontSize: 11, fontWeight: i === 0 ? 600 : 300, letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer',
            background: 'transparent', color: i === 0 ? '#FFFFFF' : 'rgba(255,255,255,0.55)',
            border: 'none', borderBottom: `2px solid ${i === 0 ? '#FFFFFF' : 'transparent'}`, marginBottom: -1,
            fontFamily: 'inherit',
          }}>{f}</button>
        ))}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', borderLeft: '1px solid rgba(255,255,255,0.12)' }}>
          <input placeholder="Buscar por nombre o colonia" style={{
            padding: '12px 18px', border: 'none', outline: 'none',
            fontFamily: 'inherit', fontSize: 13, fontWeight: 300, background: 'transparent',
            color: '#FFFFFF', minWidth: 280,
          }}/>
        </div>
      </div>

      <div style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ ...head, width: 36 }}><input type="checkbox"/></th>
              <th style={head}>Departamento</th>
              <th style={head}>Colonia</th>
              <th style={head}>Renta</th>
              <th style={head}>Estado</th>
              <th style={head}>Tour</th>
              <th style={head}>Visitas</th>
              <th style={{ ...head, width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} style={{ transition: 'background 120ms' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={cell}><input type="checkbox"/></td>
                <td style={cell}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 56, height: 56, backgroundImage: `url(${r.image})`, backgroundSize: 'cover', backgroundPosition: 'center', flexShrink: 0 }}/>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14, color: '#FFF' }}>{r.name}</div>
                      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', fontFamily: 'JetBrains Mono, monospace', marginTop: 4, letterSpacing: '0.08em' }}>EZ-{1000 + i}</div>
                    </div>
                  </div>
                </td>
                <td style={cell}>{r.colonia}</td>
                <td style={{ ...cell, fontWeight: 500 }}>
                  <span style={{ fontWeight: 300, marginRight: 4, color: 'rgba(255,255,255,0.5)' }}>$</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>{r.price.toLocaleString()}</span>
                </td>
                <td style={cell}>{statusStyle(r.status)}</td>
                <td style={cell}>
                  <div style={{ display: 'flex', gap: 6 }}>
                    {r.tour.length === 0 && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)' }}>—</span>}
                    {r.tour.map(t => (
                      <span key={t} style={{
                        padding: '3px 8px', border: '1px solid rgba(255,255,255,0.22)',
                        fontSize: 10, fontWeight: 500, color: '#FFF', letterSpacing: '0.12em',
                      }}>{t}</span>
                    ))}
                  </div>
                </td>
                <td style={{ ...cell, fontFamily: 'JetBrains Mono, monospace', fontSize: 13 }}>{r.visits}</td>
                <td style={cell}>
                  <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 6, color: 'rgba(255,255,255,0.5)', fontSize: 18 }}>⋯</button>
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
