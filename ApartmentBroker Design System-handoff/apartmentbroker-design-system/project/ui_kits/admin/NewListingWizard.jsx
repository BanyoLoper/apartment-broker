function NewListingWizard({ onClose }) {
  const [step, setStep] = React.useState(1);
  const steps = ['Datos', 'Imágenes · 3D · 360°', 'Publicar'];
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(22,20,15,0.4)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 880, maxHeight: '90vh', overflow: 'auto',
        background: 'var(--ab-bg)', borderRadius: 22, boxShadow: 'var(--ab-shadow-3)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--ab-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="ab-eyebrow">Nueva publicación</span>
            <h2 className="ab-h2" style={{ marginTop: 4, marginBottom: 0 }}>{steps[step - 1]}</h2>
          </div>
          <button onClick={onClose} style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid var(--ab-border-strong)', background: 'transparent', cursor: 'pointer', fontSize: 16 }}>×</button>
        </div>

        <div style={{ display: 'flex', gap: 12, padding: '16px 28px', borderBottom: '1px solid var(--ab-border)' }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, color: i + 1 === step ? 'var(--ab-ink-900)' : 'var(--ab-stone-400)' }}>
              <div style={{
                width: 24, height: 24, borderRadius: 999,
                background: i + 1 <= step ? 'var(--ab-terracotta-500)' : 'transparent',
                border: `1.5px solid ${i + 1 <= step ? 'var(--ab-terracotta-500)' : 'var(--ab-border-strong)'}`,
                color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700,
              }}>{i + 1}</div>
              <span style={{ fontSize: 13, fontWeight: 600 }}>{s}</span>
              {i < steps.length - 1 && <div style={{ width: 32, height: 1, background: 'var(--ab-border-strong)' }}/>}
            </div>
          ))}
        </div>

        <div style={{ padding: 28, flex: 1, minHeight: 380 }}>
          {step === 1 && <StepOne/>}
          {step === 2 && <StepTwo/>}
          {step === 3 && <StepThree/>}
        </div>

        <div style={{ padding: '16px 28px', borderTop: '1px solid var(--ab-border)', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => step > 1 ? setStep(step - 1) : onClose()} style={{
            padding: '10px 16px', borderRadius: 8, background: '#FFFFFF',
            border: '1px solid var(--ab-border-strong)', color: 'var(--ab-ink-900)',
            cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
          }}>{step === 1 ? 'Cancelar' : 'Atrás'}</button>
          <button onClick={() => step < 3 ? setStep(step + 1) : onClose()} style={{
            padding: '10px 18px', borderRadius: 8, background: 'var(--ab-terracotta-500)',
            border: 'none', color: '#FFFFFF',
            cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: 13,
          }}>{step === 3 ? 'Publicar' : 'Continuar'}</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ab-fg-soft)' }}>{label}</span>
      {children}
    </label>
  );
}
const inputStyle = { padding: '10px 12px', borderRadius: 8, border: '1px solid var(--ab-border-strong)', fontFamily: 'inherit', fontSize: 14, background: '#FFFFFF', color: 'var(--ab-ink-900)' };

function StepOne() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
      <Field label="Nombre interno"><input style={inputStyle} defaultValue="Casa Sonora"/></Field>
      <Field label="Colonia"><select style={inputStyle}><option>Roma Norte</option><option>Condesa</option></select></Field>
      <Field label="Calle y número"><input style={inputStyle} defaultValue="Sonora 134"/></Field>
      <Field label="Piso"><input style={inputStyle} defaultValue="3"/></Field>
      <Field label="Recámaras"><input style={inputStyle} defaultValue="2"/></Field>
      <Field label="Baños"><input style={inputStyle} defaultValue="1"/></Field>
      <Field label="Superficie (m²)"><input style={inputStyle} defaultValue="78"/></Field>
      <Field label="Renta mensual (MXN)"><input style={inputStyle} defaultValue="24500"/></Field>
      <div style={{ gridColumn: '1 / -1' }}>
        <Field label="Descripción">
          <textarea style={{ ...inputStyle, minHeight: 110, fontFamily: 'inherit', resize: 'vertical' }} defaultValue="Departamento de 78 m² en un edificio art déco restaurado. Pisos de duela original, cocina abierta con barra de mármol, dos recámaras orientadas al norte y un balcón a Álvaro Obregón."/>
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
          <div key={i} style={{ aspectRatio: '4/3', borderRadius: 10, backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
            {i === 0 && <span style={{ position: 'absolute', top: 8, left: 8, padding: '3px 8px', background: 'var(--ab-ink-900)', color: '#FAF7F2', borderRadius: 4, fontSize: 10, fontWeight: 600 }}>PORTADA</span>}
          </div>
        ))}
        <div style={{ aspectRatio: '4/3', borderRadius: 10, border: '1.5px dashed var(--ab-border-strong)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 4, color: 'var(--ab-stone-600)', cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 5v14 M5 12h14"/></svg>
          <span style={{ fontSize: 12, fontWeight: 600 }}>Subir foto</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
        <UploadCard icon="../../assets/icon-3d-room.svg" title="Tour 3D" sub="Vincula un escaneo Matterport o sube .glb" status="vinculado"/>
        <UploadCard icon="../../assets/icon-360.svg" title="Vistas 360°" sub="Una panorámica por habitación" status="3 de 6 cargadas"/>
      </div>
    </div>
  );
}

function UploadCard({ icon, title, sub, status }) {
  return (
    <div style={{ padding: 16, border: '1px solid var(--ab-border-strong)', borderRadius: 12, display: 'flex', gap: 14, alignItems: 'center' }}>
      <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--ab-terracotta-100)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={icon} style={{ width: 22, height: 22 }}/>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ font: 'var(--ab-text-h4)', color: 'var(--ab-ink-900)' }}>{title}</div>
        <div style={{ font: 'var(--ab-text-caption)', color: 'var(--ab-stone-600)', marginTop: 2 }}>{sub}</div>
      </div>
      <span style={{ font: 'var(--ab-text-caption)', color: 'var(--ab-jade-600)', fontWeight: 600 }}>{status}</span>
    </div>
  );
}

function StepThree() {
  return (
    <div>
      <div style={{ padding: 18, background: 'var(--ab-jade-100)', borderRadius: 12, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--ab-jade-600)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 L9 17 L4 12"/></svg>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--ab-jade-600)' }}>Listo para publicar</div>
          <div style={{ font: 'var(--ab-text-body-sm)', color: 'var(--ab-stone-600)', marginTop: 4 }}>
            Casa Sonora · Roma Norte · MXN $24,500 / mes. La publicación será visible en el sitio público en menos de 5 minutos.
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Toggle label="Permitir reserva de visitas inmediata" def/>
        <Toggle label="Aparecer en la página de inicio" def/>
        <Toggle label="Notificar a inquilinos en lista de espera (Roma Norte · 2 rec)"/>
      </div>
    </div>
  );
}

function Toggle({ label, def }) {
  const [on, setOn] = React.useState(!!def);
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', border: '1px solid var(--ab-border)', borderRadius: 10, background: '#FFFFFF' }}>
      <span style={{ font: 'var(--ab-text-body-sm)', color: 'var(--ab-ink-900)' }}>{label}</span>
      <button onClick={() => setOn(!on)} style={{
        width: 40, height: 22, borderRadius: 999, border: 'none', cursor: 'pointer',
        background: on ? 'var(--ab-terracotta-500)' : 'var(--ab-bone-300)', position: 'relative', padding: 0,
      }}>
        <div style={{ width: 18, height: 18, borderRadius: 999, background: '#FFFFFF', position: 'absolute', top: 2, left: on ? 20 : 2, transition: 'left 140ms cubic-bezier(0.2,0.7,0.2,1)' }}/>
      </button>
    </div>
  );
}

window.NewListingWizard = NewListingWizard;
