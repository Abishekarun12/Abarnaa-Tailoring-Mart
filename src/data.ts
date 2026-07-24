/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SewingProduct, InstagramShowcaseItem, BranchDetails } from './types';

export interface StaticBlouse {
  id: string;
  name: string;
  collection: string;
  imageUrl: string;
  description: string;
  specs: string[];
}

export const DEFAULT_BLOUSES: StaticBlouse[] = [
  {
    id: 'b1',
    name: 'Royal Crimson Bridal Aari Blouse',
    collection: 'Bridal Couture',
    imageUrl: '/images/bridal_blouse_aari_1780409427966.png',
    description: 'Expertly hand-embroidered royal crimson blouse featuring premium gold Aari craftsmanship with intricate zari lining and heavy zardosi details. Crafted to complete the ultimate traditional bridal look.',
    specs: ['100% Hand-crafted Aari Work', 'Pure South Indian Silk Base', 'Zardosi & Bead Embellishments', 'Sweat-proof Cotton Lining']
  },
  {
    id: 'b2',
    name: 'Emerald Floral Pearl Cutwork Blouse',
    collection: 'High Fashion Designer',
    imageUrl: '/images/designer_blouse_cutwork_1780409469229.png',
    description: 'Breathtaking emerald green designer blouse highlighting complex back neck cutwork with soft hand-sewn freshwater pearl details and subtle lace borders. Perfect for wedding receptions.',
    specs: ['Raw Silk Fabric Base', 'Intricate Cut-work Borders', 'Individually Knot-stitched Pearls', 'Modern Zero-gap Side Zipper']
  }
];

export const SEWING_PRODUCTS: SewingProduct[] = [
  {
    id: 'p1',
    name: 'Usha Janome Dream Stitch',
    brand: 'Usha Janome',
    type: 'machine',
    imageUrl: '/images/sewing_machine_catalog_1780409491706.png',
    description: 'Automatic compact sewing machine with 7 built-in stitches and 14 applications. Fully Japanese engineering in a lightweight, high-precision casing.',
    priceRange: '₹11,500 - ₹12,800',
    specs: ['7 Built-in Stitches', 'Auto-tripping Bobbin System', 'Compact & Portable', 'Free Arm Sewing']
  },
  {
    id: 'p2',
    name: 'Singer Promise 1408 Commercial',
    brand: 'Singer',
    type: 'machine',
    imageUrl: '/images/sewing_machine_catalog_1780409491706.png',
    description: 'Highly robust multi-stitch mechanical household and commercial machine. Delivers super fast, heavy-duty fabric penetration with whisper quiet operations.',
    priceRange: '₹9,800 - ₹11,200',
    specs: ['8 Built-in Stitches', 'Easy Stitch Selection', 'Heavy Duty Metal Frame', '4-Step Buttonhole']
  },
  {
    id: 'p3',
    name: 'Genuine High-Speed Rotary Hooks',
    brand: 'SewKRAFT',
    type: 'spare',
    imageUrl: '/images/sewing_machine_catalog_1780409491706.png',
    description: 'Premium carbon-steel finished high-efficiency rotary shuttle hook sets designed for industrial and standard domestic tailors. Maximizes thread flow.',
    priceRange: '₹450 - ₹600',
    specs: ['High-Carbon Steel', 'Zero-skip Stitch Flow', 'Oil-tempered Surface', 'Matches Domestic/Industrial']
  },
  {
    id: 'p4',
    name: '15-Piece Multi-Pattern Presser Foot Kit',
    brand: 'Singer Genuine Spares',
    type: 'spare',
    imageUrl: '/images/sewing_machine_catalog_1780409491706.png',
    description: 'All-inclusive premium accessory steel attachments set containing piping foot, blind-stitch foot, quilting guide, ruffler, and zipper pressers.',
    priceRange: '₹1,200 - ₹1,550',
    specs: ['Full Snap-On Steel Body', 'Includes Wooden Organizer Case', 'Perfect for Quilting & Ruffles', 'Anti-corrosion Plating']
  }
];

export const INSTAGRAM_ITEMS: InstagramShowcaseItem[] = [
  {
    id: 'i1',
    imageUrl: '/images/bridal_blouse_aari_1780409427966.png',
    caption: 'Pure royal red zardosi silk blouse hand-embroidered by our master artisans at Abarnaa. Aari stitching at its finest. #BridalBlouse #AariWork #AbarnaaTailoring',
    likes: 342,
    comments: 41,
    date: '2 Days ago'
  },
  {
    id: 'i2',
    imageUrl: '/images/designer_blouse_cutwork_1780409469229.png',
    caption: 'Intricate cut-work designs highlighted with custom pearls. Designing dreams, one stitch at a time. Book your bridal consult today! #TTPMoms #BlouseInspiration',
    likes: 512,
    comments: 67,
    date: '5 Days ago'
  },
  {
    id: 'i3',
    imageUrl: '/images/aari1.png',
    caption: 'Heavy designer sleeves that make heads turn. Custom fit and tailor-stitched only for you. DM us for pricing details. #AariClass #IndianBoutique',
    likes: 219,
    comments: 18,
    date: '1 Week ago'
  }
];

export const BRANCHES_DATA: BranchDetails[] = [
  {
    city: 'Thiruthuraipoondi - Town Main',
    name: 'Abarnaa Tailoring Mart & Designer Studio',
    address: '96B, Jawulikadai Street,Vedai Road, Tamil Nadu - 625001',
    phone: '+91 73971 33105',
    hours: 'Mon - Sat: 9:00 AM - 9:00 PM | Sun: 11:30 AM - 6:00 PM',
    mapsUrl: 'https://maps.app.goo.gl/SvY3QVUXd8eyfHg27'
  },
  {
    city: 'Thiruthuraipoondi - Town Main',
    name: 'Abarnaa Sewing machinery & Executive Fitting Center',
    address: '96B, Jawulikadai Street,Vedai Road, Tamil Nadu - 625001',
    phone: '+91 73971 33105',
    hours: 'Mon - Sat: 9:00 AM - 8:30 PM | Sun: Closed (Fitting bookings accepted)',
    mapsUrl: 'https://maps.app.goo.gl/SvY3QVUXd8eyfHg27'
  },
  {
    city: 'Thiruthuraipoondi - Town Main',
    name: 'Abi Stationery & Paperworks',
    address: '96B, Jawulikadai Street,Vedai Road, Tamil Nadu - 625001',
    phone: '+91 73971 33105',
    hours: 'Mon - Sat: 9:00 AM - 8:30 PM | Sun: Closed (Fitting bookings accepted)',
    mapsUrl: 'https://maps.app.goo.gl/SvY3QVUXd8eyfHg27'
  },
  {
    city: 'Thiruthuraipoondi - Town Main',
    name: 'Abarnaa Couching for Tailoring & Aari Design',
    address: 'Samiyappa nagar, Thiruthuraipoondi, Tamil Nadu - 625001',
    phone: '+91 73971 33105',
    hours: 'Mon - Sat: 9:00 AM - 8:30 PM | Sun: Closed (Fitting bookings accepted)',
    mapsUrl: 'https://maps.app.goo.gl/SvY3QVUXd8eyfHg27'
  },
  {
    city: 'Kariyappatinam - Town Main',
    name: 'Abarnaa Sewing machinery & Aari Coching Centre',
    address: 'Kariyapattinam, Tamil Nadu - 625001',
    phone: '+91 73971 33105',
    hours: 'Mon - Sat: 9:00 AM - 8:30 PM | Sun: Closed (Fitting bookings accepted)',
    mapsUrl: 'https://maps.app.goo.gl/DMZjdoCBjdfmuLe3A'
  }
];
