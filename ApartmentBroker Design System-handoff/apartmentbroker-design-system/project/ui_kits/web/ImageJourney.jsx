// Cinematic image journey — replaces standard gallery grid.
// Photos arranged in a horizontal scroll snap, with one large hero,
// then a few editorial pairings.
function ImageJourney({ images, onOpen360, onOpen3D }) {
  return (
    <section style={{ marginTop: 32 }}>
      <div style={{
        position: 'relative', borderRadius: 22, overflow: 'hidden',
        aspectRatio: '21/9',
        backgroundImage: `url(${images[0]})`, backgroundSize: 'cover', backgroundPosition: 'center',
        boxShadow: 'var(--ab-shadow-inset)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(22,20,15,0.35), transparent 40%)' }}/>
        <div style={{ position: 'absolute', left: 24, bottom: 20, display: 'flex', gap: 8 }}>
          <button onClick={onOpen3D} style={journeyChip('var(--ab-terracotta-500)', '#FFFFFF')}>
            <img src="../../assets/icon-3d-room.svg" style={{ width: 16, height: 16, filter: 'brightness(0) invert(1)' }}/>
            Recorrer en 3D
          </button>
          <button onClick={onOpen360} style={journeyChip('rgba(255,255,255,0.92)', 'var(--ab-ink-900)')}>
            <img src="../../assets/icon-360.svg" style={{ width: 16, height: 16 }}/>
            Vista 360°
          </button>
        </div>
        <div style={{ position: 'absolute', right: 24, bottom: 20, font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.85)' }}>
          01 / Sala
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 18, marginTop: 18 }}>
        <Frame img={images[1]} label="02 / Cocina"/>
        <Frame img={images[2]} label="03 / Recámara"/>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 18, marginTop: 18 }}>
        <Frame img={images[3]} label="04 / Roof"/>
        <Frame img={images[4]} label="05 / Fachada"/>
      </div>
    </section>
  );
}

function Frame({ img, label }) {
  return (
    <div style={{
      position: 'relative', borderRadius: 14, overflow: 'hidden',
      aspectRatio: '4/3',
      backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center',
      boxShadow: 'var(--ab-shadow-inset)',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(22,20,15,0.28), transparent 50%)' }}/>
      <div style={{ position: 'absolute', left: 16, bottom: 14, font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.85)' }}>
        {label}
      </div>
    </div>
  );
}

function journeyChip(bg, fg) {
  return {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    padding: '10px 16px', borderRadius: 999, border: 'none', cursor: 'pointer',
    background: bg, color: fg, fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
    backdropFilter: 'blur(20px) saturate(1.2)', boxShadow: 'var(--ab-shadow-2)',
  };
}

window.ImageJourney = ImageJourney;
