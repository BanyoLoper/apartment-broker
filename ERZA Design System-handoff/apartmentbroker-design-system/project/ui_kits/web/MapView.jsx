function MapView({ listings, activeId, onPin }) {
  // Stylized "Google Maps"-feel illustrated map. Pins positioned arbitrarily.
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: '#1F1F1F', overflow: 'hidden', borderRadius: 4,
      boxShadow: 'inset 0 0 0 1px var(--ezra-border)',
    }}>
      {/* Roads + parks illustrated */}
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect width="800" height="600" fill="#1F1F1F"/>
        <ellipse cx="320" cy="280" rx="80" ry="50" fill="#2A302C"/>
        <ellipse cx="600" cy="180" rx="60" ry="40" fill="#2A302C"/>
        <rect x="120" y="420" width="120" height="80" rx="14" fill="#2A302C"/>
        <path d="M-20 180 L820 220" stroke="#0F0F0F" strokeWidth="14"/>
        <path d="M-20 380 L820 420" stroke="#0F0F0F" strokeWidth="14"/>
        <path d="M180 -20 L240 620" stroke="#0F0F0F" strokeWidth="12"/>
        <path d="M520 -20 L580 620" stroke="#0F0F0F" strokeWidth="12"/>
        <g stroke="#181818" strokeWidth="4">
          <path d="M-20 80 L820 110"/><path d="M-20 280 L820 310"/><path d="M-20 480 L820 510"/>
          <path d="M80 -20 L130 620"/><path d="M340 -20 L400 620"/><path d="M680 -20 L740 620"/>
        </g>
        <text x="320" y="280" textAnchor="middle" fontFamily="Inter" fontSize="10" fontWeight="300" fill="rgba(255,255,255,0.5)" letterSpacing="0.18em">PARQUE MÉXICO</text>
        <text x="100" y="80" fontFamily="Inter" fontSize="9" fontWeight="300" fill="rgba(255,255,255,0.4)" letterSpacing="0.18em">AV. ÁLVARO OBREGÓN</text>
        <text x="100" y="160" fontFamily="Inter" fontSize="22" fontWeight="800" fill="#FFF" letterSpacing="-0.01em">Roma Norte</text>
        <text x="500" y="60" fontFamily="Inter" fontSize="22" fontWeight="800" fill="#FFF" letterSpacing="-0.01em">Juárez</text>
        <text x="280" y="540" fontFamily="Inter" fontSize="22" fontWeight="800" fill="#FFF" letterSpacing="-0.01em">Condesa</text>
      </svg>

      {/* Listing pins */}
      {listings.map((l) => (
        <button key={l.id} onClick={() => onPin(l.id)} style={{
          position: 'absolute', left: `${l.mapX}%`, top: `${l.mapY}%`,
          transform: 'translate(-50%, -100%)',
          padding: '6px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
          background: activeId === l.id ? '#FFFFFF' : 'rgba(20,20,20,0.92)',
          color: activeId === l.id ? '#141414' : '#FFFFFF',
          border: activeId === l.id ? 'none' : '1px solid rgba(255,255,255,0.4)',
          fontFamily: 'var(--ezra-font-mono)', fontSize: 12, fontWeight: 500,
          boxShadow: activeId === l.id ? 'var(--ezra-shadow-3)' : 'var(--ezra-shadow-2)',
          whiteSpace: 'nowrap', zIndex: activeId === l.id ? 10 : 1,
        }}>
          ${(l.price / 1000).toFixed(1)}k
        </button>
      ))}

      {/* Map controls */}
      <div style={{
        position: 'absolute', right: 12, top: 12, display: 'flex', flexDirection: 'column',
        background: 'rgba(20,20,20,0.92)', borderRadius: 2, border: '1px solid rgba(255,255,255,0.18)', overflow: 'hidden',
      }}>
        <button style={mapBtn}>+</button>
        <div style={{ height: 1, background: 'rgba(255,255,255,0.12)' }}/>
        <button style={mapBtn}>−</button>
      </div>
      <div style={{
        position: 'absolute', left: 12, bottom: 12, padding: '6px 10px',
        background: 'rgba(20,20,20,0.92)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 999, fontFamily: 'var(--ezra-font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.6)',
      }}>
        Google · Datos del mapa © 2026
      </div>
    </div>
  );
}

const mapBtn = {
  width: 32, height: 32, border: 'none', background: 'transparent', cursor: 'pointer',
  fontSize: 18, fontWeight: 300, color: '#FFFFFF', fontFamily: 'var(--ezra-font-body)',
};

window.MapView = MapView;
