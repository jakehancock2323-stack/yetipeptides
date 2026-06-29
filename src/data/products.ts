export interface ProductVariant {
  specification: string;
  price: number;
  originalPrice?: number;
  outOfStock?: boolean;
}

export type Region = 'International' | 'UK Domestic';

export interface Product {
  id: string;
  name: string;
  category: string;
  region?: Region;
  variants: ProductVariant[];
  ingredients?: string[];
  outOfStock?: boolean;
  comingSoon?: boolean;
  preOrder?: boolean;
  stockBadge?: string;
  image?: string;
  currency?: 'USD' | 'GBP';
  popular?: boolean;
  badges?: string[];
  usage?: string;
}

// We currently ship UK Domestic only. The international catalog is preserved
// in `src/data/internationalCatalogArchive.ts` for later restoration.
export const categories = [
  'All',
  'Peptides',
  'Peptide Supplies',
  'Cosmetics',
];

// Kept for backwards-compatible imports.
export const domesticCategories = categories;

export const products: Product[] = [
  {
    id: 'v1-pen',
    name: 'V1 Injection Pen',
    category: 'Peptide Supplies',
    region: 'UK Domestic',
    currency: 'GBP',
    stockBadge: '30 left',
    variants: [
      { specification: 'Tiffany Blue', price: 15 },
      { specification: 'Red', price: 15 },
      { specification: 'Deep Purple', price: 15, outOfStock: true },
      { specification: 'Green', price: 15 },
    ],
  },
  {
    id: '3ml-pen-cartridge',
    name: '3mL Pen Cartridge',
    category: 'Peptide Supplies',
    region: 'UK Domestic',
    currency: 'GBP',
    stockBadge: '60 left',
    variants: [{ specification: '1 cartridge', price: 1 }],
  },
  {
    id: 'frostskin-serum',
    name: 'Ice Elixir',
    category: 'Cosmetics',
    region: 'UK Domestic',
    currency: 'GBP',
    stockBadge: 'LIMITED STOCK — Only 13 available',
    badges: ['Cruelty Free Standards', 'Small Batch Clinical Purity'],
    usage: 'Apply 1-2 full droppers to face & massage in.',
    variants: [
      { specification: 'GHK-Cu 3.33% Facial Serum • 30ml dropper', price: 25, originalPrice: 28 },
    ],
    ingredients: [
      'Aqua',
      'Sodium Hyaluronate',
      'Zemea Propanediol',
      'Copper Tripeptide-1 (GHK-Cu) – 3.33%',
      'Niacinamide',
      'N-Acetyl Glucosamine (NAG)',
      'Panthenol',
      'Hydrolyzed Silk Protein',
      'Ectoin',
      'Transcutol',
      'Phenoxyethanol',
    ],
  },
  {
    id: 'hospira-bac-water',
    name: 'Hospira Bacteriostatic Water',
    category: 'Peptide Supplies',
    region: 'UK Domestic',
    currency: 'GBP',
    outOfStock: true,
    variants: [
      { specification: '30mL Multidose Sterile Solution • USP Grade', price: 12, outOfStock: true },
    ],
    image: 'hospira-bac-water',
  },
  {
    id: 'tretinoin-cream',
    name: 'Tretinoin Cream',
    category: 'Cosmetics',
    region: 'UK Domestic',
    currency: 'GBP',
    outOfStock: false,
    stockBadge: 'In Stock',
    variants: [
      { specification: '0.025%', price: 10, outOfStock: false },
      { specification: '0.5%', price: 12, outOfStock: false },
    ],
  },
  {
    id: 'uk-retatrutide-30mg',
    name: 'Retatrutide',
    category: 'Peptides',
    region: 'UK Domestic',
    currency: 'GBP',
    outOfStock: true,
    stockBadge: '30mg: Out of stock',
    variants: [
      { specification: '30mg × 1 vial — Out of stock', price: 28, outOfStock: true },
    ],
  },
  {
    id: 'uk-tirzepatide-30mg',
    name: 'Tirzepatide',
    category: 'Peptides',
    region: 'UK Domestic',
    currency: 'GBP',
    outOfStock: true,
    stockBadge: '30mg: Out of stock',
    variants: [
      { specification: '30mg × 1 vial — Out of stock', price: 23, outOfStock: true },
    ],
  },
  {
    id: 'uk-mt2-10mg',
    name: 'MT-2',
    category: 'Peptides',
    region: 'UK Domestic',
    currency: 'GBP',
    stockBadge: '6 vials left',
    variants: [{ specification: '10mg × 1 vial', price: 18 }],
  },
  {
    id: 'uk-tesamorelin-10mg',
    name: 'Tesamorelin',
    category: 'Peptides',
    region: 'UK Domestic',
    currency: 'GBP',
    outOfStock: true,
    stockBadge: 'Out of stock',
    variants: [
      { specification: '10mg × 1 vial', price: 26, outOfStock: true },
    ],
  },
  {
    id: 'uk-ghkcu-100mg',
    name: 'GHK-Cu',
    category: 'Peptides',
    region: 'UK Domestic',
    currency: 'GBP',
    stockBadge: '11 vials left',
    variants: [{ specification: '100mg × 1 vial', price: 18 }],
  },
];
