function Hero({ onSearch }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '96px 32px 64px',
        display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'center',
      }}>
        <div>
          <span className="ab-eyebrow">Renta directa con el dueño · CDMX</span>
          <h1 className="ab-display-1" style={{ marginTop: 16, marginBottom: 24, maxWidth: 560 }}>
            Vive en una colonia que ya conoces.
          </h1>
          <p style={{ font: 'var(--ab-text-body)', fontSize: 18, color: 'var(--ab-stone-600)', maxWidth: 520, marginBottom: 32 }}>
            Curamos cada departamento que rentamos. Recórrelos en 3D antes de venir, mira el barrio en mapa, agenda una visita en dos toques.
          </p>
          <div style={{
            display: 'flex', gap: 0, padding: 6, background: '#FFFFFF',
            border: '1px solid var(--ab-border-strong)', borderRadius: 14,
            boxShadow: 'var(--ab-shadow-2)', maxWidth: 560,
          }}>
            <div style={{ flex: 1.4, padding: '8px 14px', borderRight: '1px solid var(--ab-border)' }}>
              <div style={{ font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ab-fg-soft)' }}>Colonia</div>
              <div style={{ font: 'var(--ab-text-body)', color: 'var(--ab-ink-900)' }}>Roma Norte</div>
            </div>
            <div style={{ flex: 1, padding: '8px 14px', borderRight: '1px solid var(--ab-border)' }}>
              <div style={{ font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ab-fg-soft)' }}>Recámaras</div>
              <div style={{ font: 'var(--ab-text-body)', color: 'var(--ab-ink-900)' }}>2 +</div>
            </div>
            <div style={{ flex: 1.2, padding: '8px 14px' }}>
              <div style={{ font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ab-fg-soft)' }}>Renta máx</div>
              <div style={{ font: 'var(--ab-text-body)', color: 'var(--ab-ink-900)' }}>$30,000</div>
            </div>
            <button onClick={onSearch} style={{
              fontFamily: 'inherit', fontWeight: 600, fontSize: 14,
              background: 'var(--ab-terracotta-500)', color: '#FFFFFF',
              border: 'none', borderRadius: 10, padding: '0 22px', cursor: 'pointer',
            }}>Buscar</button>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 32, alignItems: 'center' }}>
            <Stat n="84" l="depas activos"/>
            <Stat n="11" l="colonias"/>
            <Stat n="100%" l="renta directa"/>
          </div>
        </div>
        <div style={{
          position: 'relative', aspectRatio: '4/5', borderRadius: 22, overflow: 'hidden',
          backgroundImage: 'url(../../assets/placeholder-apt-2.svg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          boxShadow: 'var(--ab-shadow-3)',
        }}>
          <div style={{
            position: 'absolute', left: 20, bottom: 20, padding: '14px 18px',
            background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px) saturate(1.2)',
            borderRadius: 14, maxWidth: 280,
          }}>
            <div style={{ font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ab-fg-soft)' }}>Roof Álvaro Obregón</div>
            <div style={{ font: 'var(--ab-text-h4)', color: 'var(--ab-ink-900)', marginTop: 4 }}>Condesa · terraza privada</div>
            <div style={{ fontFamily: 'var(--ab-font-mono)', fontSize: 13, color: 'var(--ab-ink-900)', marginTop: 6 }}>MXN $32,000 / mes</div>
          </div>
          <div style={{
            position: 'absolute', right: 20, top: 20, display: 'flex', gap: 8,
          }}>
            <span style={badgePill('var(--ab-terracotta-500)', '#FFFFFF')}>3D</span>
            <span style={badgePill('rgba(255,255,255,0.85)', 'var(--ab-ink-900)')}>360°</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily: 'var(--ab-font-display)', fontSize: 28, fontWeight: 500, color: 'var(--ab-ink-900)', letterSpacing: '-0.01em' }}>{n}</div>
      <div style={{ font: 'var(--ab-text-caption)', color: 'var(--ab-stone-600)' }}>{l}</div>
    </div>
  );
}

function badgePill(bg, fg) {
  return {
    padding: '4px 10px', borderRadius: 999, fontSize: 12, fontWeight: 600,
    background: bg, color: fg, backdropFilter: 'blur(10px)',
  };
}

window.Hero = Hero;
