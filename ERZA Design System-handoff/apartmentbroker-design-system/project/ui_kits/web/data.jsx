// Data shared across web kit screens.
// Each listing carries the editorial copy for its overlay (eyebrow, tagline, priceNote).
const LISTINGS = [
  { id: 'sonora',    name: 'Penthouse + roof privado', eyebrow: '80 m² interiores · 25 m² terraza', tagline: '', priceNote: 'mtto. incluido ($3,000)', colonia: 'Roma Norte', floor: 3, price: 25000, beds: 3, baths: 2.5, m2: 105, image: '../../assets/placeholder-apt-1.svg', badges: ['3D'], mapX: 32, mapY: 38 },
  { id: 'obregon',   name: '150 m² Amueblados',        eyebrow: 'Frente a C.U.', tagline: 'Listo para habitar', priceNote: 'mantenimiento incluido', colonia: 'Coyoacán', floor: 4, price: 35500, beds: 2, baths: 2, m2: 150, image: '../../assets/placeholder-apt-2.svg', badges: ['3D'], mapX: 56, mapY: 56 },
  { id: 'polanco',   name: 'A 8 min de Polanco',       eyebrow: 'Anáhuac II Sección', tagline: '', priceNote: 'mtto. incluido', colonia: 'Anáhuac', floor: 2, price: 26500, beds: 2, baths: 2, m2: 65, image: '../../assets/placeholder-apt-3.svg', badges: ['360°'], mapX: 26, mapY: 60 },
  { id: 'venados',   name: 'Parque de los Venados',    eyebrow: 'A pasos de', tagline: '', priceNote: 'mtto. incluido', colonia: 'Del Valle', floor: 5, price: 26500, beds: 2, baths: 2, m2: 88, image: '../../assets/placeholder-apt-4.svg', badges: ['3D'], mapX: 70, mapY: 24 },
  { id: 'escandon',  name: '100 m² en Escandón II',    eyebrow: '', tagline: '3 Recámaras + 2 estacionamientos', priceNote: 'mantenimiento incluido', colonia: 'Escandón', floor: 1, price: 28000, beds: 3, baths: 2, m2: 100, image: '../../assets/placeholder-apt-5.svg', badges: [], mapX: 50, mapY: 70 },
  { id: 'carso',     name: 'Residencial Carso',        eyebrow: 'Amenidades premium', tagline: 'Amueblado · Piso 15', priceNote: 'mtto. + internet incluidos', colonia: 'Granada', floor: 15, price: 35000, beds: 2, baths: 2.5, m2: 83, image: '../../assets/placeholder-apt-1.svg', badges: ['3D'], mapX: 42, mapY: 30 },
];

window.LISTINGS = LISTINGS;
