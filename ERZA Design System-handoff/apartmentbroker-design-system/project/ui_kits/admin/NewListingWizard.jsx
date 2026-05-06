function NewListingWizard({ onClose }) {
  const [step, setStep] = React.useState(1);
  const steps = ['Datos', 'Imágenes · 3D · 360°', 'Publicar'];
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.78)', backdropFilter: 'blur(8px)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 920, maxHeight: '92vh', overflow: 'auto',
        background: 'var(--ezra-ink-900)', border: '1px solid rgba(255,255,255,0.18)',
        display: 'flex', flexDirection: 'column', color: '#FFF',
      }}>
        <div style={{ padding: '28px 36px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span style={{ fontSize: 11, fontWeight: 300, letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>Nueva publicación</span>
            <h2 style={{ margin: '12px 0 0', fontFamily: 'Inter', fontSize: 32, fontWeight: 800, letterSpacing: '-0.02em', color: '#FFF', lineHeight: 1 }}>{steps[step - 1]}</h2>
          </div>
          <button onClick={onClose} style={{ width: 40, height: 40, border: '1px solid rgba(255,255,255,0.22)', background: 'transparent', cursor: 'pointer', fontSize: 16, color: '#FFF' }}>×</button>
        </div>

        <div style={{ display: 'flex', padding: '0 36px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {steps.map((s, i) => {
            const isCurrent = i + 1 === step;
            const isDone = i + 1 < step;
            return (
              <button key={s} onClick={() => setStep(i + 1)} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '18px 24px 18px 0', marginRight: 32,
                border: 'none', background: 'transparent', cursor: 'pointer',
                color: isCurrent ? '#FFF' : 'rgba(255,255,255,0.5)',
                borderBottom: `2px solid ${isCurrent ? '#FFF' : 'transparent'}`, marginBottom: -1,
              }}>
                <span style={{
                  width: 22, height: 22, borderRadius: 999, fontSize: 10, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isDone || isCurrent ? '#FFF' : 'transparent',
                  color: isDone || isCurrent ? '#141414' : 'rgba(255,255,255,0.5)',
                  border: `1px solid ${isDone || isCurrent ? '#FFF' : 'rgba(255,255,255,0.3)'}`,
                }}>{i + 1}</span>
                <span style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{s}</span>
              </button>
            );
          })}
        </div>

        <div style={{ padding: 36, flex: 1, minHeight: 420 }}>
          {step === 1 && <StepOne/>}
          {step === 2 && <StepTwo/>}
          {step === 3 && <StepThree/>}
        </div>

        <div style={{ padding: '20px 36px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => step > 1 ? setStep(step - 1) : onClose()} style={{
            padding: '13px 22px', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.22)', color: '#FFF',
            cursor: 'pointer', fontFamily: 'inherit', fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>{step === 1 ? 'Cancelar' : 'Atrás'}</button>
          <button onClick={() => step < 3 ? setStep(step + 1) : onClose()} style={{
            padding: '13px 28px', background: '#FFFFFF', border: '1px solid #FFFFFF', color: '#141414',
            cursor: 'pointer', fontFamily: 'inherit', fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase',
          }}>{step === 3 ? 'Publicar' : 'Continuar'}</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>{label}</span>
      {children}
    </label>
  );
}
const inputStyle = {
  padding: '12px 0', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.22)',
  fontFamily: 'inherit', fontSize: 14, fontWeight: 300, background: 'transparent',
  color: '#FFFFFF', outline: 'none',
};

function StepOne() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 40px' }}>
      <Field label="Nombre interno"><input style={inputStyle} defaultValue="Penthouse + roof privado"/></Field>
      <Field label="Colonia"><select style={inputStyle}><option>Roma Norte</option><option>Condesa</option></select></Field>
      <Field label="Calle y número"><input style={inputStyle} defaultValue="Sonora 134"/></Field>
      <Field label="Piso"><input style={inputStyle} defaultValue="3"/></Field>
      <Field label="Recámaras"><input style={inputStyle} defaultValue="3"/></Field>
      <Field label="Baños"><input style={inputStyle} defaultValue="2.5"/></Field>
      <Field label="Superficie (m²)"><input style={inputStyle} defaultValue="105"/></Field>
      <Field label="Renta mensual (MXN)"><input style={inputStyle} defaultValue="25000"/></Field>
      <div style={{ gridColumn: '1 / -1' }}>
        <Field label="Descripción">
          <textarea style={{ ...inputStyle, minHeight: 90, resize: 'vertical' }} defaultValue="Penthouse de 80 m² interiores con 25 m² de terraza privada. Pisos de duela original, cocina abierta con barra de mármol, dos recámaras orientadas al norte y un balcón a Álvaro Obregón."/>
        </Field>
      </div>
    </div>
  );
}

function StepTwo() {
  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
        {['../../assets/placeholder-apt-1.svg', '../../assets/placeholder-apt-2.svg', '../../assets/placeholder-apt-3.svg', '../../assets/placeholder-apt-4.svg'].map((src, i) => (
          <div key={i} style={{ aspectRatio: '4/3', backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', border: '1px solid rgba(255,255,255,0.08)' }}>
            {i === 0 && <span style={{ position: 'absolute', top: 10, left: 10, padding: '4px 10px', background: '#FFFFFF', color: '#141414', fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Portada</span>}
          </div>
        ))}
        <div style={{ aspectRatio: '4/3', border: '1px dashed rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8, color: 'rgba(255,255,255,0.55)', cursor: 'pointer' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"><path d="M12 5v14 M5 12h14"/></svg>
          <span style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase' }}>Subir foto</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 28 }}>
        <UploadCard icon="../../assets/icon-3d-room.svg" title="Tour 3D" sub="Vincula un escaneo Matterport o sube .glb" status="Vinculado"/>
        <UploadCard icon="../../assets/icon-360.svg" title="Vistas 360°" sub="Una panorámica por habitación" status="3 de 6 cargadas"/>
      </div>
    </div>
  );
}

function UploadCard({ icon, title, sub, status }) {
  return (
    <div style={{ padding: 20, border: '1px solid rgba(255,255,255,0.18)', display: 'flex', gap: 18, alignItems: 'center' }}>
      <div style={{ width: 44, height: 44, border: '1px solid rgba(255,255,255,0.22)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={icon} style={{ width: 22, height: 22, filter: 'brightness(0) invert(1)' }}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: '#FFF' }}>{title}</div>
        <div style={{ fontSize: 12, fontWeight: 300, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>{sub}</div>
      </div>
      <span style={{ fontSize: 10, fontWeight: 500, color: '#FFF', letterSpacing: '0.18em', textTransform: 'uppercase' }}>{status}</span>
    </div>
  );
}

function StepThree() {
  return (
    <div>
      <div style={{ padding: 24, border: '1px solid rgba(255,255,255,0.22)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}><path d="M20 6 L9 17 L4 12"/></svg>
        <div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#FFF', letterSpacing: '0.04em' }}>Listo para publicar</div>
          <div style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.7)', marginTop: 8, lineHeight: 1.5 }}>
            Penthouse + roof privado · Roma Norte · <span style={{ color: '#FFF', fontWeight: 500 }}>$25,000 / mes</span>. La publicación será visible en el sitio público en menos de 5 minutos.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 0, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <Toggle label="Permitir reserva de visitas inmediata" def/>
        <Toggle label="Aparecer en la página de inicio" def/>
        <Toggle label="Notificar a inquilinos en lista de espera (Roma Norte · 3 rec)"/>
      </div>
    </div>
  );
}

function Toggle({ label, def }) {
  const [on, setOn] = React.useState(!!def);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <span style={{ fontSize: 14, fontWeight: 300, color: '#FFF' }}>{label}</span>
      <button onClick={() => setOn(!on)} style={{
        width: 40, height: 22, border: `1px solid ${on ? '#FFF' : 'rgba(255,255,255,0.3)'}`, cursor: 'pointer',
        background: on ? '#FFFFFF' : 'transparent', position: 'relative', padding: 0, transition: 'all 160ms',
      }}>
        <div style={{ width: 14, height: 14, background: on ? '#141414' : '#FFF', position: 'absolute', top: 3, left: on ? 22 : 3, transition: 'left 160ms cubic-bezier(0.2,0.7,0.2,1)' }}/>
      </button>
    </div>
  );
}

window.NewListingWizard = NewListingWizard;
