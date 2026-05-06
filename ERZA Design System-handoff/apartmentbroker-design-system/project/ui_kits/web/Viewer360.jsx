// Visual mock of a 360° panoramic viewer — chrome only.
function Viewer360({ image, onClose }) {
  const [angle, setAngle] = React.useState(0);
  return (
    <div style={{
      position: 'fixed', inset: 0, background: '#000', zIndex: 100,
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', color: '#FAF7F2',
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="../../assets/icon-360.svg" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }}/>
          <div>
            <div style={{ font: 'var(--ezra-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.6)' }}>Vista 360°</div>
            <div style={{ font: 'var(--ezra-text-h4)' }}>Sala · arrastra para mirar alrededor</div>
          </div>
        </div>
        <button onClick={onClose} style={{
          width: 36, height: 36, borderRadius: 999, border: '1px solid rgba(250,247,242,0.2)',
          background: 'transparent', color: '#FAF7F2', cursor: 'pointer', fontSize: 16,
        }}>×</button>
      </div>

      <div style={{
        flex: 1, position: 'relative', overflow: 'hidden',
        backgroundImage: `url(${image})`, backgroundSize: '300% 100%',
        backgroundPosition: `${angle}% center`, transition: 'background-position 220ms cubic-bezier(0.2,0.7,0.2,1)',
      }}/>

      {/* Bottom controls */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0, padding: '24px',
        display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'center',
        background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
      }}>
        {/* Compass */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px',
          background: 'rgba(22,20,15,0.7)', backdropFilter: 'blur(20px)', borderRadius: 999,
          color: '#FAF7F2', fontFamily: 'var(--ezra-font-mono)', fontSize: 12,
        }}>
          <span style={{ color: 'rgba(250,247,242,0.5)' }}>N</span>
          <div style={{ width: 200, height: 4, background: 'rgba(250,247,242,0.15)', borderRadius: 2, position: 'relative' }}>
            <div style={{ position: 'absolute', left: `${angle}%`, top: -3, width: 10, height: 10, borderRadius: 999, background: 'var(--ezra-accent-500)', transform: 'translateX(-50%)' }}/>
          </div>
          <span style={{ color: 'rgba(250,247,242,0.5)' }}>S</span>
          <span style={{ marginLeft: 12 }}>{Math.round(angle * 3.6)}°</span>
        </div>
        {/* Drag bar (functional via slider) */}
        <input
          type="range" min="0" max="100" value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          style={{ width: 320 }}
        />
        {/* Hotspot navigation */}
        <div style={{ display: 'flex', gap: 8 }}>
          {['Sala', 'Cocina', 'Recámara', 'Baño', 'Roof'].map((r, i) => (
            <button key={i} style={{
              padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(250,247,242,0.2)',
              background: i === 0 ? 'var(--ezra-accent-500)' : 'rgba(22,20,15,0.5)',
              color: '#FAF7F2', cursor: 'pointer', backdropFilter: 'blur(20px)',
              fontFamily: 'inherit', fontSize: 12, fontWeight: 600,
            }}>{r}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

window.Viewer360 = Viewer360;
