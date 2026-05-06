// EZRA editorial listing card — pure white-on-photo treatment.
// Bold white for emphasis (name, price digits). Thin white for meta.
// No chromatic accent. The photograph is the only color.
function ListingCard({ listing, onOpen, compact }) {
  const [hover, setHover] = React.useState(false);
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => onOpen && onOpen(listing)}
      style={{
        position: 'relative',
        borderRadius: 4, overflow: 'hidden', cursor: 'pointer',
        aspectRatio: '4 / 5',
        backgroundImage: `url(${listing.image})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        boxShadow: hover ? '0 24px 48px -16px rgba(0,0,0,0.5)' : '0 12px 32px -16px rgba(0,0,0,0.4)',
        transform: hover ? 'translateY(-2px)' : 'translateY(0)',
        transition: 'all 280ms var(--ezra-ease-standard)',
      }}
    >
      {/* Editorial scrim — heavier on the upper-third where copy lives, light bottom for watermark */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(20,20,20,0.72) 0%, rgba(20,20,20,0.45) 28%, rgba(20,20,20,0.10) 50%, rgba(20,20,20,0.0) 70%, rgba(20,20,20,0.32) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Top-right: minimal stack indicator (matches reference image) */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        width: 18, height: 18, opacity: 0.85,
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="2" width="14" height="14" rx="1"/>
          <path d="M16 18v2a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2"/>
        </svg>
      </div>

      {/* Editorial overlay copy — top-left, the EZRA way */}
      <div style={{
        position: 'absolute', left: 22, right: 22, top: 22,
        color: '#FFFFFF',
        fontFamily: 'var(--ezra-font-body)',
      }}>
        {listing.eyebrow && (
          <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 300, opacity: 0.92, letterSpacing: '-0.005em' }}>
            {listing.eyebrow}
          </p>
        )}
        <h3 style={{
          margin: 0, fontSize: 26, fontWeight: 800, lineHeight: 1.0,
          letterSpacing: '-0.015em',
        }}>{listing.name}</h3>

        {listing.tagline && (
          <p style={{ margin: '6px 0 0', fontSize: 14, fontWeight: 300, lineHeight: 1.35, opacity: 0.95 }}>
            {listing.tagline}
          </p>
        )}

        {/* m² + specs row, mixed weight */}
        <p style={{ margin: '14px 0 0', fontSize: 15, fontWeight: 300, lineHeight: 1.3 }}>
          <strong style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.01em' }}>{listing.m2} m²</strong>
          <span style={{ margin: '0 6px', opacity: 0.45 }}>·</span>
          <span style={{ opacity: 0.92 }}>
            {listing.beds} rec · {listing.baths} {listing.baths === 1 ? 'baño' : 'baños'} · 1 estac · amenidades
          </span>
        </p>

        {/* Price row — bold "Renta" word + bold $ + bold digits, thin sub-caption */}
        <p style={{ margin: '16px 0 0', fontSize: 28, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em' }}>
          <span style={{ fontWeight: 300, marginRight: 8 }}>Renta</span>
          ${listing.price.toLocaleString()}
        </p>
        {listing.priceNote && (
          <p style={{ margin: '6px 0 0', fontSize: 12, fontWeight: 300, opacity: 0.7, letterSpacing: '0.01em' }}>
            {listing.priceNote}
          </p>
        )}
      </div>

      {/* EZRA watermark — bottom-center, low opacity */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 22, textAlign: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          fontFamily: 'var(--ezra-font-display)', fontSize: 24, fontWeight: 400,
          letterSpacing: 6, color: 'rgba(255,255,255,0.55)',
        }}>EZRA</div>
        <div style={{
          fontFamily: 'var(--ezra-font-body)', fontSize: 7, fontWeight: 300,
          letterSpacing: 3, color: 'rgba(255,255,255,0.42)', marginTop: 3,
        }}>REAL ESTATE</div>
      </div>
    </article>
  );
}

window.ListingCard = ListingCard;
