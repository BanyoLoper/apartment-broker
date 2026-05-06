# ApartmentBroker — Admin UI Kit

Internal console for the ApartmentBroker team to publish, edit, retire, and monitor listings.

## Files
- `index.html` — runnable kit. Default view is the Listings table; click "+ Nueva publicación" for the wizard.
- `Sidebar.jsx`, `TopBar.jsx`
- `ListingsTable.jsx` — sortable, with status pills and bulk actions
- `NewListingWizard.jsx` — three-step publish flow (Datos → Imágenes / 3D / 360 → Publicar)
- `MetricsRow.jsx` — top-of-page KPIs

## Caveats
The wizard is a visual mock — no real upload, no real DB.
