function Hero({ onSearch }) {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', background: 'var(--ezra-ink-900)' }} data-screen-label="Home · Hero">
      <div style={{
        maxWidth: 1280, margin: '0 auto', padding: '120px 32px 96px',
        display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 80, alignItems: 'center',
      }}>
        <div>
          <span style={{ fontSize: 11, fontWeight: 300, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Renta directa con el dueño · CDMX</span>
          <h1 style={{ margin: '20px 0 28px', maxWidth: 600, fontFamily: 'Inter, sans-serif', fontSize: 72, fontWeight: 800, lineHeight: 0.96, letterSpacing: '-0.025em', color: '#FFF' }}>
            Vivienda <span style={{ fontWeight: 200 }}>curada en </span>CDMX.
          </h1>
          <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.55, color: 'rgba(255,255,255,0.72)', maxWidth: 520, margin: '0 0 40px' }}>
            Departamentos amueblados que rentamos directamente. Recórrelos en 3D antes de venir,
            mira el barrio en mapa, agenda una visita en dos toques.
          </p>
          <div style={{
            display: 'flex', gap: 0, padding: 4, background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.18)', borderRadius: 2,
            maxWidth: 580,
          }}>
            <Field label="Colonia" value="Roma Norte"/>
            <Divider/>
            <Field label="Recámaras" value="2 +"/>
            <Divider/>
            <Field label="Renta máx" value="$30,000"/>
            <button onClick={onSearch} style={{
              fontFamily: 'inherit', fontWeight: 500, fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#FFFFFF', color: '#141414', border: 'none', borderRadius: 2, padding: '0 28px', cursor: 'pointer',
            }}>Buscar</button>
          </div>
          <div style={{ display: 'flex', gap: 40, marginTop: 48, alignItems: 'baseline' }}>
            <Stat n="84" l="depas activos"/>
            <Stat n="11" l="colonias"/>
            <Stat n="100%" l="renta directa"/>
          </div>
        </div>

        <div style={{
          position: 'relative', aspectRatio: '4/5', borderRadius: 4, overflow: 'hidden',
          backgroundImage: 'url(../../assets/placeholder-apt-2.svg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          boxShadow: '0 32px 64px -24px rgba(0,0,0,0.6)',
        }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(20,20,20,0.55) 0%, rgba(20,20,20,0.0) 40%, rgba(20,20,20,0.0) 70%, rgba(20,20,20,0.4) 100%)' }}/>
          <div style={{ position: 'absolute', left: 24, right: 24, top: 28, color: '#FFF' }}>
            <p style={{ margin: '0 0 6px', fontSize: 13, fontWeight: 300, opacity: 0.92 }}>Roof privado · terraza 25 m²</p>
            <h3 style={{ margin: 0, fontSize: 28, fontWeight: 800, letterSpacing: '-0.015em', lineHeight: 1.0 }}>Penthouse Condesa</h3>
            <p style={{ margin: '14px 0 0', fontSize: 15, fontWeight: 300 }}>
              <strong style={{ fontWeight: 800, fontSize: 18 }}>105 m²</strong>
              <span style={{ opacity: 0.45, margin: '0 6px' }}>·</span>3 rec · 2.5 baños
            </p>
            <p style={{ margin: '14px 0 0', fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em' }}>
              <span style={{ fontWeight: 300, marginRight: 8 }}>Renta</span>$32,000
            </p>
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 22, textAlign: 'center', pointerEvents: 'none' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 400, letterSpacing: 6, color: 'rgba(255,255,255,0.55)' }}>EZRA</div>
            <div style={{ fontSize: 7, fontWeight: 300, letterSpacing: 3, color: 'rgba(255,255,255,0.42)', marginTop: 3 }}>REAL ESTATE</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value }) {
  return (
    <div style={{ flex: 1, padding: '12px 16px' }}>
      <div style={{ fontSize: 9, fontWeight: 300, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 400, color: '#FFF', marginTop: 4 }}>{value}</div>
    </div>
  );
}
function Divider() { return <div style={{ width: 1, alignSelf: 'stretch', background: 'rgba(255,255,255,0.12)' }}/>; }

function Stat({ n, l }) {
  return (
    <div>
      <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 32, fontWeight: 800, color: '#FFF', letterSpacing: '-0.02em' }}>{n}</div>
      <div style={{ fontSize: 11, fontWeight: 300, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{l}</div>
    </div>
  );
}

window.Hero = Hero;
