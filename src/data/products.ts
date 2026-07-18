export interface ProductVariant {
  specification: string;
  price: number;
  originalPrice?: number;
  outOfStock?: boolean;
}

export type Region = "International" | "UK Domestic";

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
  currency?: "USD" | "GBP";
  popular?: boolean;
  badges?: string[];
  usage?: string;
}

// We currently ship UK Domestic only. The international catalog is preserved
// in `src/data/internationalCatalogArchive.ts` for later restoration.
export const categories = ["All", "Pep", "Peptide Supplies", "Cosmetics"];

// Kept for backwards-compatible imports.
export const domesticCategories = categories;

export const products: Product[] = [
  {
    id: "v1-pen",
    name: "V1 Injection Pen",
    category: "Peptide Supplies",
    region: "UK Domestic",
    currency: "GBP",
    stockBadge: "30 left",
    variants: [
      { specification: "Tiffany Blue", price: 15 },
      { specification: "Red", price: 15 },
      { specification: "Deep Purple", price: 15, outOfStock: true },
      { specification: "Green", price: 15 },
    ],
  },
  {
    id: "3ml-pen-cartridge",
    name: "3mL Pen Cartridge",
    category: "Peptide Supplies",
    region: "UK Domestic",
    currency: "GBP",
    stockBadge: "60 left",
    variants: [{ specification: "1 cartridge", price: 1 }],
  },
  {
    id: "frostskin-serum",
    name: "Ice Elixir",
    category: "Cosmetics",
    region: "UK Domestic",
    currency: "GBP",
    popular: true,
    badges: ["Cruelty Free Standards", "Small Batch Clinical Purity"],
    usage: "Apply 1-2 full droppers to face & massage in.",
    variants: [{ specification: "GHK-Cu 3.33% Facial Serum • 30ml dropper", price: 25 }],
    ingredients: [
      "Aqua",
      "Sodium Hyaluronate",
      "Zemea Propanediol",
      "Copper Tripeptide-1 (GHK-Cu) – 3.33%",
      "Niacinamide",
      "N-Acetyl Glucosamine (NAG)",
      "Panthenol",
      "Hydrolyzed Silk Protein",
      "Ectoin",
      "Transcutol",
      "Phenoxyethanol",
    ],
  },
  {
    id: "bac-water",
    name: "Bacteriostatic Water",
    category: "Peptide Supplies",
    region: "UK Domestic",
    currency: "GBP",
    stockBadge: "28 left",
    variants: [
      { specification: "10mL Multidose Sterile Solution • USP Grade", price: 6 },
    ],
    image: "hospira-bac-water",
  },
  {
    id: "tretinoin-cream",
    name: "Tretinoin Cream",
    category: "Cosmetics",
    region: "UK Domestic",
    currency: "GBP",
    outOfStock: false,
    stockBadge: "In Stock",
    variants: [
      { specification: "0.025%", price: 10, outOfStock: false },
      { specification: "0.5%", price: 12, outOfStock: false },
    ],
  },
  {
    id: "uk-retatrutide",
    name: "Retatrutide",
    category: "Pep",
    region: "UK Domestic",
    currency: "GBP",
    popular: true,
    stockBadge: "In Stock",
    variants: [
      { specification: "30mg × 1 vial", price: 26 },
      { specification: "60mg × 1 vial", price: 31 },
    ],
  },
  {
    id: "uk-tirzepatide-30mg",
    name: "Tirzepatide",
    category: "Pep",
    region: "UK Domestic",
    currency: "GBP",
    popular: true,
    stockBadge: "In Stock",
    variants: [{ specification: "30mg × 1 vial", price: 21 }],
  },

  {
    id: "uk-mt2-10mg",
    name: "MT-2",
    category: "Pep",
    region: "UK Domestic",
    currency: "GBP",
    stockBadge: "6 vials left",
    variants: [{ specification: "10mg × 1 vial", price: 13 }],
  },
  {
    id: "uk-mt1-10mg",
    name: "MT-1",
    category: "Pep",
    region: "UK Domestic",
    currency: "GBP",
    stockBadge: "Coming Soon",
    outOfStock: true,
    comingSoon: true,
    variants: [{ specification: "10mg × 1 vial", price: 13, outOfStock: true }],
  },
  {
    id: "uk-tesamorelin-10mg",
    name: "Tesamorelin",
    category: "Pep",
    region: "UK Domestic",
    currency: "GBP",
    outOfStock: true,
    stockBadge: "Out of stock",
    variants: [{ specification: "10mg × 1 vial", price: 25, outOfStock: true }],
  },
  {
    id: "uk-ghkcu-100mg",
    name: "GHK-Cu",
    category: "Pep",
    region: "UK Domestic",
    currency: "GBP",
    stockBadge: "11 vials left",
    variants: [{ specification: "100mg × 1 vial", price: 16 }],
  },
  {
    id: "uk-klow",
    name: "KLOW",
    category: "Pep",
    region: "UK Domestic",
    currency: "GBP",
    stockBadge: "In Stock",
    popular: true,
    variants: [{ specification: "Blend × 1 vial", price: 28 }],
    ingredients: ["TB-500 – 10mg", "BPC-157 – 10mg", "KPV – 10mg", "GHK-Cu – 50mg"],
  },
  {
    id: "uk-cjc-ipamorelin-10mg",
    name: "CJC-1295 No DAC + Ipamorelin",
    category: "Pep",
    region: "UK Domestic",
    currency: "GBP",
    stockBadge: "Coming Soon",
    outOfStock: true,
    comingSoon: true,
    variants: [
      { specification: "10mg blend (5mg CJC-1295 No DAC + 5mg Ipamorelin) × 1 vial", price: 19, outOfStock: true },
    ],
    ingredients: ["CJC-1295 No DAC – 5mg", "Ipamorelin – 5mg"],
  },

  {
    id: "uk-motsc-10mg",
    name: "MOTS-c",
    category: "Pep",
    region: "UK Domestic",
    stockBadge: "Coming Soon",
    outOfStock: true,
    comingSoon: true,
    currency: "GBP",
    variants: [{ specification: "10mg × 1 vial", price: 15 }],
  },
];
