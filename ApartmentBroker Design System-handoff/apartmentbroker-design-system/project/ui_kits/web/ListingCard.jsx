function ListingCard({ listing, onOpen, compact }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen && onOpen(listing)}
      style={{
        background: '#FFFFFF', border: '1px solid var(--ab-border)',
        borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
        boxShadow: hover ? 'var(--ab-shadow-2)' : 'var(--ab-shadow-1)',
        transform: hover ? 'translateY(-1px)' : 'translateY(0)',
        transition: 'box-shadow 180ms cubic-bezier(0.2,0.7,0.2,1), transform 180ms cubic-bezier(0.2,0.7,0.2,1)',
      }}
    >
      <div style={{
        aspectRatio: compact ? '16 / 10' : '4 / 3',
        backgroundImage: `url(${listing.image})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          {listing.badges.map((b, i) => (
            <span key={i} style={{
              padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 600,
              background: b === '3D' ? 'var(--ab-terracotta-500)' : 'rgba(255,255,255,0.88)',
              color: b === '3D' ? '#FFFFFF' : 'var(--ab-ink-900)',
              backdropFilter: 'blur(10px)',
            }}>{b}</span>
          ))}
        </div>
        <button style={{
          position: 'absolute', top: 12, right: 12, width: 32, height: 32, borderRadius: 999,
          background: 'rgba(255,255,255,0.88)', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(10px)',
        }} onClick={(e) => e.stopPropagation()}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.6a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.85a5.5 5.5 0 0 0 0-7.78Z"/>
          </svg>
        </button>
      </div>
      <div style={{ padding: '14px 16px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h3 style={{ font: 'var(--ab-text-h4)', color: 'var(--ab-ink-900)', margin: 0 }}>{listing.name}</h3>
          <span style={{ font: 'var(--ab-text-caption)', color: 'var(--ab-stone-600)' }}>piso {listing.floor}</span>
        </div>
        <div style={{ font: 'var(--ab-text-caption)', color: 'var(--ab-stone-600)', marginTop: 2 }}>{listing.colonia}</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--ab-font-mono)', fontSize: 14, fontWeight: 500, color: 'var(--ab-ink-900)' }}>
            MXN ${listing.price.toLocaleString()} <span style={{ color: 'var(--ab-stone-400)', fontWeight: 400 }}>/ mes</span>
          </span>
          <span style={{ font: 'var(--ab-text-caption)', color: 'var(--ab-stone-600)', fontFamily: 'var(--ab-font-mono)' }}>
            {listing.beds} rec · {listing.baths} baño · {listing.m2} m²
          </span>
        </div>
      </div>
    </article>
  );
}

window.ListingCard = ListingCard;
