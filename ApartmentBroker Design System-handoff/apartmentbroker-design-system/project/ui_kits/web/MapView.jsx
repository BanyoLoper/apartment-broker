function MapView({ listings, activeId, onPin }) {
  // Stylized "Google Maps"-feel illustrated map. Pins positioned arbitrarily.
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: '#E8E1D3', overflow: 'hidden', borderRadius: 14,
      boxShadow: 'inset 0 0 0 1px var(--ab-border)',
    }}>
      {/* Roads + parks illustrated */}
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="800" height="600" fill="#F4EFE6"/>
        {/* parks (Parque México etc) */}
        <ellipse cx="320" cy="280" rx="80" ry="50" fill="#DAEBE5"/>
        <ellipse cx="600" cy="180" rx="60" ry="40" fill="#DAEBE5"/>
        <rect x="120" y="420" width="120" height="80" rx="14" fill="#DAEBE5"/>
        {/* major avenues */}
        <path d="M-20 180 L820 220" stroke="#FAF7F2" strokeWidth="14"/>
        <path d="M-20 380 L820 420" stroke="#FAF7F2" strokeWidth="14"/>
        <path d="M180 -20 L240 620" stroke="#FAF7F2" strokeWidth="12"/>
        <path d="M520 -20 L580 620" stroke="#FAF7F2" strokeWidth="12"/>
        {/* secondary streets */}
        <g stroke="#FAF7F2" strokeWidth="4" opacity="0.9">
          <path d="M-20 80 L820 110"/>
          <path d="M-20 280 L820 310"/>
          <path d="M-20 480 L820 510"/>
          <path d="M80 -20 L130 620"/>
          <path d="M340 -20 L400 620"/>
          <path d="M680 -20 L740 620"/>
        </g>
        {/* labels */}
        <text x="320" y="280" textAnchor="middle" fontFamily="Inter" fontSize="11" fontWeight="600" fill="#5C564C" letterSpacing="0.1em">PARQUE MÉXICO</text>
        <text x="100" y="80" fontFamily="Inter" fontSize="10" fontWeight="500" fill="#8B8377" letterSpacing="0.08em">AV. ÁLVARO OBREGÓN</text>
        <text x="100" y="160" fontFamily="Fraunces" fontSize="22" fontWeight="500" fill="#2A2722">Roma Norte</text>
        <text x="500" y="60" fontFamily="Fraunces" fontSize="22" fontWeight="500" fill="#2A2722">Juárez</text>
        <text x="280" y="540" fontFamily="Fraunces" fontSize="22" fontWeight="500" fill="#2A2722">Condesa</text>
      </svg>

      {/* Listing pins */}
      {listings.map((l) => (
        <button key={l.id} onClick={() => onPin(l.id)} style={{
          position: 'absolute', left: `${l.mapX}%`, top: `${l.mapY}%`,
          transform: 'translate(-50%, -100%)',
          padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
          background: activeId === l.id ? 'var(--ab-terracotta-500)' : '#FFFFFF',
          color: activeId === l.id ? '#FFFFFF' : 'var(--ab-ink-900)',
          fontFamily: 'var(--ab-font-mono)', fontSize: 12, fontWeight: 500,
          boxShadow: activeId === l.id ? 'var(--ab-shadow-3)' : 'var(--ab-shadow-2)',
          whiteSpace: 'nowrap', zIndex: activeId === l.id ? 10 : 1,
        }}>
          ${(l.price / 1000).toFixed(1)}k
        </button>
      ))}

      {/* Map controls */}
      <div style={{
        position: 'absolute', right: 12, top: 12, display: 'flex', flexDirection: 'column',
        background: '#FFFFFF', borderRadius: 8, boxShadow: 'var(--ab-shadow-2)', overflow: 'hidden',
      }}>
        <button style={mapBtn}>+</button>
        <div style={{ height: 1, background: 'var(--ab-border)' }}/>
        <button style={mapBtn}>−</button>
      </div>
      <div style={{
        position: 'absolute', left: 12, bottom: 12, padding: '6px 10px',
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
        borderRadius: 999, fontFamily: 'var(--ab-font-mono)', fontSize: 11, color: 'var(--ab-stone-600)',
      }}>
        Google · Datos del mapa © 2026
      </div>
    </div>
  );
}

const mapBtn = {
  width: 32, height: 32, border: 'none', background: '#FFFFFF', cursor: 'pointer',
  fontSize: 18, color: 'var(--ab-ink-900)', fontFamily: 'var(--ab-font-body)',
};

window.MapView = MapView;
