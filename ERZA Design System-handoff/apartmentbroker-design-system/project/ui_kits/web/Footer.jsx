function Footer() {
  const col = { display: 'flex', flexDirection: 'column', gap: 12 };
  const heading = { fontSize: 11, fontWeight: 500, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#FFF', marginBottom: 4 };
  const link = { fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', cursor: 'pointer' };
  return (
    <footer style={{ background: 'var(--ezra-ink-950)', color: '#FFF', marginTop: 0, padding: '96px 32px 40px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 64 }}>
        <div>
          <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, fontWeight: 400, letterSpacing: 8, color: '#FFF' }}>EZRA</div>
          <div style={{ fontSize: 9, fontWeight: 300, letterSpacing: 4, color: 'rgba(255,255,255,0.55)', marginTop: 4 }}>REAL ESTATE</div>
          <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.6, maxWidth: 340, marginTop: 24, color: 'rgba(255,255,255,0.65)' }}>
            Departamentos amueblados curados en Roma, Condesa, Juárez y Polanco. Somos el dueño y el broker — sin intermediarios.
          </p>
        </div>
        <div style={col}><span style={heading}>Producto</span><a style={link}>Departamentos</a><a style={link}>Colonias</a><a style={link}>Tour 3D</a></div>
        <div style={col}><span style={heading}>Empresa</span><a style={link}>Sobre nosotros</a><a style={link}>Prensa</a><a style={link}>Contacto</a></div>
        <div style={col}><span style={heading}>Legal</span><a style={link}>Términos</a><a style={link}>Privacidad</a><a style={link}>Cookies</a></div>
      </div>
      <div style={{ maxWidth: 1280, margin: '64px auto 0', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 300, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>
        <span>© 2026 EZRA Real Estate · Ciudad de México</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace', letterSpacing: 0, textTransform: 'none' }}>RFC EZR260101 · CDMX</span>
      </div>
    </footer>
  );
}

window.Footer = Footer;
