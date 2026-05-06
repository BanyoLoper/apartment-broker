// Visual mock of a 3D showroom — chrome only, no real engine.
// Imitates Matterport-style UI: floating room dots over an image,
// floor plan toggle, share/measure controls.
function Showroom3D({ image, onClose }) {
  const [view, setView] = React.useState('3d');
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(22,20,15,0.92)', zIndex: 100,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px', color: '#FAF7F2',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="../../assets/icon-3d-room.svg" style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }}/>
          <div>
            <div style={{ font: 'var(--ezra-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.5)' }}>Tour 3D</div>
            <div style={{ font: 'var(--ezra-text-h4)' }}>Casa Sonora · Roma Norte</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <SegBtn active={view === '3d'} onClick={() => setView('3d')}>Vista 3D</SegBtn>
          <SegBtn active={view === 'plan'} onClick={() => setView('plan')}>Planta</SegBtn>
          <SegBtn active={view === 'doll'} onClick={() => setView('doll')}>Casa de muñecas</SegBtn>
          <button onClick={onClose} style={{
            marginLeft: 8, width: 36, height: 36, borderRadius: 999, border: '1px solid rgba(250,247,242,0.2)',
            background: 'transparent', color: '#FAF7F2', cursor: 'pointer', fontSize: 16,
          }}>×</button>
        </div>
      </div>

      {/* Stage */}
      <div style={{ flex: 1, display: 'flex', padding: 24, gap: 16, minHeight: 0 }}>
        <div style={{
          flex: 1, borderRadius: 14, overflow: 'hidden', position: 'relative',
          backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center',
          boxShadow: 'var(--ezra-shadow-3)',
        }}>
          {/* Room navigation dots */}
          {[
            { x: 30, y: 65, label: 'Sala' },
            { x: 60, y: 55, label: 'Cocina' },
            { x: 75, y: 75, label: 'Recámara' },
            { x: 45, y: 80, label: 'Baño' },
          ].map((dot, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${dot.x}%`, top: `${dot.y}%`, transform: 'translate(-50%, -50%)',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: 999,
                background: 'rgba(250,247,242,0.92)', border: '2px solid #FFFFFF',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <div style={{ width: 10, height: 10, borderRadius: 999, background: 'var(--ezra-accent-500)' }}/>
              </div>
              <div style={{
                position: 'absolute', left: '50%', top: 'calc(100% + 6px)', transform: 'translateX(-50%)',
                whiteSpace: 'nowrap', font: 'var(--ezra-text-caption)', fontWeight: 600,
                background: 'rgba(22,20,15,0.7)', color: '#FAF7F2', padding: '2px 8px', borderRadius: 999,
              }}>{dot.label}</div>
            </div>
          ))}

          {/* Bottom toolbar */}
          <div style={{
            position: 'absolute', left: '50%', bottom: 20, transform: 'translateX(-50%)',
            display: 'flex', gap: 4, padding: 4, background: 'rgba(22,20,15,0.7)',
            backdropFilter: 'blur(20px)', borderRadius: 999,
          }}>
            <ToolBtn icon="M"/>
            <ToolBtn icon="H"/>
            <ToolBtn icon="↻"/>
            <ToolBtn icon="↖"/>
          </div>
        </div>

        {/* Side panel */}
        <aside style={{
          width: 260, background: 'rgba(250,247,242,0.06)', borderRadius: 14,
          border: '1px solid rgba(250,247,242,0.1)', padding: 20,
          color: 'rgba(250,247,242,0.85)',
        }}>
          <div style={{ font: 'var(--ezra-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(250,247,242,0.5)' }}>Habitaciones</div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {[
              ['Sala', '24 m²', true],
              ['Cocina · comedor', '18 m²'],
              ['Recámara principal', '16 m²'],
              ['Recámara 2', '12 m²'],
              ['Baño completo', '6 m²'],
              ['Roof privado', '14 m²'],
            ].map(([n, s, active], i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', padding: '10px 12px',
                borderRadius: 8, background: active ? 'rgba(200,85,61,0.2)' : 'transparent',
                color: active ? '#FFFFFF' : 'rgba(250,247,242,0.7)', cursor: 'pointer',
                fontSize: 14, fontWeight: active ? 600 : 400,
              }}>
                <span>{n}</span>
                <span style={{ fontFamily: 'var(--ezra-font-mono)', fontSize: 12 }}>{s}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

function SegBtn({ active, onClick, children }) {
  return (
    <button onClick={onClick} style={{
      padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
      background: active ? '#FAF7F2' : 'transparent', color: active ? 'var(--ezra-ink-900)' : '#FAF7F2',
      fontFamily: 'inherit', fontSize: 13, fontWeight: 600,
    }}>{children}</button>
  );
}

function ToolBtn({ icon }) {
  return (
    <button style={{
      width: 36, height: 36, borderRadius: 999, border: 'none', background: 'transparent',
      color: '#FAF7F2', fontSize: 16, cursor: 'pointer',
    }}>{icon}</button>
  );
}

window.Showroom3D = Showroom3D;
