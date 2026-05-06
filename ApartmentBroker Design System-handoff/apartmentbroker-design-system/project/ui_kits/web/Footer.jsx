function Footer() {
  const col = { display: 'flex', flexDirection: 'column', gap: 10 };
  const heading = { font: 'var(--ab-text-eyebrow)', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ab-fg-soft)' };
  const link = { font: 'var(--ab-text-body-sm)', color: 'var(--ab-ink-900)', textDecoration: 'none' };
  return (
    <footer style={{
      background: 'var(--ab-ink-900)', color: 'var(--ab-bone-50)', marginTop: 96,
      padding: '64px 32px 32px',
      backgroundImage: 'url(../../assets/pattern-talavera.svg)',
      backgroundSize: 200, backgroundBlendMode: 'soft-light',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}>
        <div>
          <img src="../../assets/logo-mark.svg" alt="" style={{ width: 48, height: 48 }} />
          <p style={{ font: 'var(--ab-text-body)', maxWidth: 320, marginTop: 16, color: 'rgba(250,247,242,0.7)' }}>
            Departamentos curados en Roma, Condesa, Juárez y Polanco. Somos el dueño y el broker — sin intermediarios.
          </p>
        </div>
        <div style={col}>
          <span style={heading}>Producto</span>
          <a style={link}>Departamentos</a>
          <a style={link}>Colonias</a>
          <a style={link}>Tour 3D</a>
        </div>
        <div style={col}>
          <span style={heading}>Empresa</span>
          <a style={link}>Sobre nosotros</a>
          <a style={link}>Prensa</a>
          <a style={link}>Contacto</a>
        </div>
        <div style={col}>
          <span style={heading}>Legal</span>
          <a style={link}>Términos</a>
          <a style={link}>Privacidad</a>
          <a style={link}>Cookies</a>
        </div>
      </div>
      <div style={{ maxWidth: 1280, margin: '48px auto 0', paddingTop: 24, borderTop: '1px solid rgba(250,247,242,0.12)', display: 'flex', justifyContent: 'space-between', font: 'var(--ab-text-caption)', color: 'rgba(250,247,242,0.5)' }}>
        <span>© 2026 ApartmentBroker · Ciudad de México</span>
        <span style={{ fontFamily: 'var(--ab-font-mono)' }}>RFC ABK260101 · CDMX</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
