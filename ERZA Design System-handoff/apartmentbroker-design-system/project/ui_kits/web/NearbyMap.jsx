// "What's nearby" — commodities map. Shows the listing pin centered,
// with category-toggleable POIs (transit, parks, stores, cafés, gyms).
function NearbyMap() {
  const categories = [
    { key: 'transit', label: 'Transporte', color: 'var(--ezra-info)', count: 8 },
    { key: 'parks', label: 'Parques', color: 'var(--ezra-jade-600)', count: 3 },
    { key: 'stores', label: 'Súper · OXXO', color: 'var(--ezra-accent-500)', count: 12 },
    { key: 'cafes', label: 'Cafés', color: 'var(--ezra-accent-500)', count: 14 },
    { key: 'gyms', label: 'Gimnasios', color: 'var(--ezra-rosa-500)', count: 4 },
  ];
  const [active, setActive] = React.useState(['transit', 'parks', 'cafes']);
  const toggle = (k) => setActive((a) => a.includes(k) ? a.filter(x => x !== k) : [...a, k]);

  // Hard-coded POI positions
  const pois = [
    { cat: 'transit', x: 25, y: 42, label: 'Insurgentes', sub: 'Metro · L1' },
    { cat: 'transit', x: 70, y: 30, label: 'Sonora', sub: 'Metrobús · L1' },
    { cat: 'transit', x: 80, y: 70, label: 'Álvaro Obregón', sub: 'Metrobús' },
    { cat: 'parks', x: 45, y: 65, label: 'Parque México', sub: '4 min a pie' },
    { cat: 'parks', x: 32, y: 22, label: 'Plaza Río de Janeiro', sub: '7 min' },
    { cat: 'stores', x: 60, y: 50, label: 'OXXO', sub: '2 min' },
    { cat: 'stores', x: 38, y: 78, label: 'La Comer', sub: '9 min' },
    { cat: 'cafes', x: 52, y: 42, label: 'Café Avellaneda', sub: '3 min' },
    { cat: 'cafes', x: 64, y: 60, label: 'Buna 42', sub: '5 min' },
    { cat: 'cafes', x: 28, y: 58, label: 'Tomás', sub: '4 min' },
  ];

  const catColor = (k) => categories.find(c => c.key === k).color;

  return (
    <section style={{ marginTop: 64 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <span className="ezra-eyebrow-wide">Comodidades cercanas</span>
          <h2 className="ezra-h2" style={{ marginTop: 8, marginBottom: 0 }}>El barrio, a pie</h2>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {categories.map(c => (
            <button key={c.key} onClick={() => toggle(c.key)} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '8px 14px', borderRadius: 999,
              background: active.includes(c.key) ? 'var(--ezra-ink-900)' : '#FFFFFF',
              border: `1px solid ${active.includes(c.key) ? 'var(--ezra-ink-900)' : 'var(--ezra-border-strong)'}`,
              color: active.includes(c.key) ? '#FAF7F2' : 'var(--ezra-ink-900)',
              cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: c.color }}/>
              {c.label}
              <span style={{ fontFamily: 'var(--ezra-font-mono)', fontSize: 11, opacity: 0.7 }}>{c.count}</span>
            </button>
          ))}
        </div>
      </div>

      <div style={{
        position: 'relative', marginTop: 24, height: 480, borderRadius: 22, overflow: 'hidden',
        boxShadow: 'var(--ezra-shadow-2)',
      }}>
        {/* Background "map" */}
        <svg viewBox="0 0 800 480" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <rect width="800" height="480" fill="#F4EFE6"/>
          <ellipse cx="360" cy="312" rx="60" ry="36" fill="#DAEBE5"/>
          <text x="360" y="312" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="600" fill="#5C564C" letterSpacing="0.1em">PARQUE MÉXICO</text>
          <path d="M-20 120 L820 150" stroke="#FAF7F2" strokeWidth="14"/>
          <path d="M-20 280 L820 310" stroke="#FAF7F2" strokeWidth="10"/>
          <path d="M180 -20 L240 500" stroke="#FAF7F2" strokeWidth="12"/>
          <path d="M540 -20 L600 500" stroke="#FAF7F2" strokeWidth="10"/>
          <g stroke="#FAF7F2" strokeWidth="3" opacity="0.9">
            <path d="M-20 60 L820 80"/>
            <path d="M-20 200 L820 230"/>
            <path d="M-20 380 L820 410"/>
            <path d="M80 -20 L130 500"/>
            <path d="M340 -20 L400 500"/>
            <path d="M680 -20 L740 500"/>
          </g>
        </svg>

        {/* Walking radius circle around listing */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
          width: 280, height: 280, borderRadius: 999,
          background: 'rgba(200,85,61,0.06)', border: '1.5px dashed rgba(200,85,61,0.5)',
        }}/>
        <div style={{
          position: 'absolute', left: '50%', top: 'calc(50% + 142px)', transform: 'translateX(-50%)',
          padding: '4px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(10px)', font: 'var(--ezra-text-caption)', fontWeight: 600,
          color: 'var(--ezra-accent-600)',
        }}>
          10 min a pie · 750 m
        </div>

        {/* Listing pin (center) */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -100%)', zIndex: 5,
        }}>
          <div style={{
            padding: '8px 14px', borderRadius: 999, background: 'var(--ezra-accent-500)',
            color: '#FFFFFF', fontFamily: 'var(--ezra-font-mono)', fontSize: 13, fontWeight: 600,
            boxShadow: 'var(--ezra-shadow-3)',
          }}>Casa Sonora</div>
        </div>

        {/* POIs */}
        {pois.filter(p => active.includes(p.cat)).map((p, i) => (
          <div key={i} style={{
            position: 'absolute', left: `${p.x}%`, top: `${p.y}%`, transform: 'translate(-50%, -50%)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <div style={{
              width: 14, height: 14, borderRadius: 999, background: catColor(p.cat),
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)', border: '2px solid #FFFFFF',
            }}/>
            <div style={{
              padding: '2px 8px', borderRadius: 6, background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(10px)', fontSize: 11, color: 'var(--ezra-ink-900)',
              whiteSpace: 'nowrap', boxShadow: 'var(--ezra-shadow-1)',
            }}>
              <span style={{ fontWeight: 600 }}>{p.label}</span>
              <span style={{ color: 'var(--ezra-stone-500)', marginLeft: 6, fontFamily: 'var(--ezra-font-mono)', fontSize: 10 }}>{p.sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

window.NearbyMap = NearbyMap;
