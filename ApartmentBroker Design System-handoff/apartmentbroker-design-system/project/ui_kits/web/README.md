# ApartmentBroker — Web UI Kit

The public-facing rental product. Demonstrates the four product pillars:
1. **Map-first listings** — Google-Maps-style split view with price pins.
2. **Listing detail** — cinematic image journey, 3D showroom, 360° viewer.
3. **What's nearby** — commodities map (transit, parks, stores, cafés).
4. **Booking** — quick "reserve a viewing" flow.

## Files
- `index.html` — the runnable kit. Click between the home, listings (map split), and detail screens.
- `Header.jsx`, `Footer.jsx`
- `Hero.jsx`, `ListingCard.jsx`, `MapView.jsx`
- `ListingDetail.jsx` — orchestrates `ImageJourney`, `Showroom3D`, `Viewer360`, `NearbyMap`
- `BookingPanel.jsx`

## Caveats
- The 3D showroom and 360° viewer are visual mocks (chrome only — no real engine).
- Google Maps is illustrated. Replace with the real Maps JS SDK in production.
