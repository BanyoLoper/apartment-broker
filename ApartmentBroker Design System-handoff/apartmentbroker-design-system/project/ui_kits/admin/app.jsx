function App() {
  const [showWizard, setShowWizard] = React.useState(false);
  return (
    <div className="ab-base" style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active="listings"/>
      <div style={{ flex: 1, minWidth: 0 }} data-screen-label="Admin · Listings">
        <TopBar title="Publicaciones" subtitle="Portfolio · CDMX" onNew={() => setShowWizard(true)}/>
        <MetricsRow/>
        <ListingsTable/>
        {showWizard && <NewListingWizard onClose={() => setShowWizard(false)}/>}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
