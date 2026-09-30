import boat1 from '../assets/boats/boat1.png';
import boat2 from '../assets/boats/boat2.png';
import boat3 from '../assets/boats/boat3.png';
import boat4 from '../assets/boats/boat4.png';
import boat5 from '../assets/boats/boat5.png';
import boat6 from '../assets/boats/boat6.png';
import boat7 from '../assets/boats/boat7.png';
import boat8 from '../assets/boats/boat8.png';
import boat9 from '../assets/boats/boat9.png';

export interface BoatImageItem {
  id: number;
  src: string;
  hasBoat: boolean;
  alt: string;
}

export const BOAT_IMAGES: BoatImageItem[] = [
  { id: 0, src: boat1, hasBoat: false, alt: 'Sea shells on sand' },
  { id: 1, src: boat2, hasBoat: false, alt: 'Man standing on pier looking at sea' },
  { id: 2, src: boat3, hasBoat: true, alt: 'Blue boat parked on beach' },
  { id: 3, src: boat4, hasBoat: true, alt: 'Fishermen in boat on ocean waves' },
  { id: 4, src: boat5, hasBoat: true, alt: 'Motorboat in sea at sunset' },
  { id: 5, src: boat6, hasBoat: false, alt: 'Dog playing in ocean water' },
  { id: 6, src: boat7, hasBoat: false, alt: 'Seagull standing on shore rock' },
  { id: 7, src: boat8, hasBoat: true, alt: 'Cargo ship sailing at sunset' },
  { id: 8, src: boat9, hasBoat: true, alt: 'Small boat on horizon at dusk' },
];

export const CORRECT_BOAT_INDEXES = BOAT_IMAGES
  .filter(img => img.hasBoat)
  .map(img => img.id); // [2, 3, 4, 7, 8]
