export interface ProductVariant {
  specification: string;
  price: number;
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
  stockBadge?: string;
  image?: string;
  currency?: 'USD' | 'GBP';
  popular?: boolean;
}

export const categories = [
  "All",
  "Weight Loss",
  "Cognitive Enhancement",
  "Muscle Growth & Recovery",
  "Sexual Health",
  "General Health",
  "Other / Speciality"
];

export const domesticCategories = [
  "All",
  "Peptides",
  "Peptide Supplies"
];

export const products: Product[] = [
  // WEIGHT LOSS
  {
    id: "lc526",
    name: "LC526 (Fat Blaster)",
    category: "Weight Loss",
    variants: [
      { specification: "10ml ×10 vials", price: 170 }
    ],
    ingredients: [
      "L-Carnitine – 300 mg",
      "Methionine – 25 mg",
      "Inositol – 50 mg",
      "Choline – 50 mg",
      "Vitamin B12 – 1 mg",
      "Vitamin B6 – 50 mg",
      "NADH – 50 mg"
    ]
  },
  {
    id: "adipotide-2mg",
    name: "Adipotide",
    category: "Weight Loss",
    variants: [
      { specification: "2mg ×10 vials", price: 121 },
      { specification: "5mg ×10 vials", price: 208 }
    ]
  },
  {
    id: "cagrilintide",
    popular: true,
    name: "Cagrilintide",
    category: "Weight Loss",
    variants: [
      { specification: "5mg ×10 vials", price: 158 },
      { specification: "10mg ×10 vials", price: 260 }
    ]
  },
  {
    id: "cagrilintide-semaglutide",
    popular: true,
    name: "Cagrilintide + Semaglutide",
    category: "Weight Loss",
    variants: [
      { specification: "10mg ×10 vials", price: 205 }
    ]
  },
  {
    id: "retatrutide",
    popular: true,
    name: "Retatrutide",
    category: "Weight Loss",
    variants: [
      { specification: "5mg ×10 vials", price: 114 },
      { specification: "10mg ×10 vials", price: 155 },
      { specification: "15mg ×10 vials", price: 162 },
      { specification: "20mg ×10 vials", price: 169 },
      { specification: "30mg ×10 vials", price: 228 },
      { specification: "40mg ×10 vials", price: 265 },
      { specification: "50mg ×10 vials", price: 312 },
      { specification: "60mg ×10 vials", price: 359 }
    ]
  },
  {
    id: "lemon-bottle",
    name: "Lemon Bottle",
    category: "Weight Loss",
    variants: [
      { specification: "10mg ×10 vials", price: 109 }
    ]
  },
  {
    id: "semaglutide",
    popular: true,
    name: "Semaglutide",
    category: "Weight Loss",
    variants: [
      { specification: "5mg ×10 vials", price: 83 },
      { specification: "10mg ×10 vials", price: 105 },
      { specification: "15mg ×10 vials", price: 112 },
      { specification: "20mg ×10 vials", price: 125 },
      { specification: "30mg ×10 vials", price: 140 }
    ]
  },
  {
    id: "survodutide",
    popular: true,
    name: "Survodutide",
    category: "Weight Loss",
    variants: [
      { specification: "10mg ×10 vials", price: 335 }
    ]
  },
  {
    id: "tirzepatide",
    popular: true,
    name: "Tirzepatide",
    category: "Weight Loss",
    variants: [
      { specification: "5mg ×10 vials", price: 86 },
      { specification: "10mg ×10 vials", price: 104 },
      { specification: "15mg ×10 vials", price: 119 },
      { specification: "20mg ×10 vials", price: 129 },
      { specification: "30mg ×10 vials", price: 145 },
      { specification: "40mg ×10 vials", price: 169 },
      { specification: "50mg ×10 vials", price: 193 },
      { specification: "60mg ×10 vials", price: 206 }
    ]
  },
  {
    id: "aod9604",
    name: "AOD9604",
    category: "Weight Loss",
    variants: [
      { specification: "2mg ×10 vials", price: 102 },
      { specification: "5mg ×10 vials", price: 142 },
      { specification: "10mg ×10 vials", price: 220 }
    ]
  },

  // COGNITIVE ENHANCEMENT
  {
    id: "dsip",
    name: "DSIP",
    category: "Cognitive Enhancement",
    variants: [
      { specification: "5mg ×10", price: 92 },
      { specification: "10mg ×10", price: 128 }
    ]
  },
  {
    id: "epithalon",
    name: "Epithalon",
    category: "Cognitive Enhancement",
    variants: [
      { specification: "10mg ×10", price: 88 },
      { specification: "50mg ×10", price: 208 }
    ]
  },
  {
    id: "selank",
    name: "Selank",
    category: "Cognitive Enhancement",
    variants: [
      { specification: "5mg ×10", price: 99 },
      { specification: "10mg ×10", price: 123 }
    ]
  },
  {
    id: "semax",
    name: "Semax",
    category: "Cognitive Enhancement",
    outOfStock: true,
    variants: [
      { specification: "5mg ×10", price: 99, outOfStock: true },
      { specification: "11mg ×10", price: 123, outOfStock: true }
    ]
  },

  // MUSCLE GROWTH & RECOVERY
  {
    id: "bpc157",
    popular: true,
    name: "BPC157",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "5mg ×10", price: 88 },
      { specification: "10mg ×10", price: 114 }
    ]
  },
  {
    id: "bpc157-tb500",
    popular: true,
    name: "BPC157 + TB500",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "10mg ×10", price: 158 },
      { specification: "20mg ×10", price: 257 }
    ]
  },
  {
    id: "cjc1295-nodac",
    name: "CJC-1295 no DAC",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "2mg ×10", price: 89 },
      { specification: "5mg ×10", price: 129 },
      { specification: "10mg ×10", price: 197 }
    ]
  },
  {
    id: "cjc1295-nodac-ipamorelin",
    popular: true,
    name: "CJC-1295 no DAC + Ipamorelin",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "10mg ×10", price: 154 }
    ]
  },
  {
    id: "cjc1295-dac",
    name: "CJC-1295 with DAC",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "2mg ×10", price: 123 },
      { specification: "5mg ×10", price: 208 }
    ]
  },
  {
    id: "foxo4-dri",
    name: "FOXO4-DRI",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "10mg ×10", price: 387 }
    ]
  },
  {
    id: "ghrp-2",
    name: "GHRP-2",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "5mg ×10", price: 78 },
      { specification: "10mg ×10", price: 102 },
      { specification: "15mg ×10", price: 114 }
    ]
  },
  {
    id: "ghrp-6",
    name: "GHRP-6",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "5mg ×10", price: 78 },
      { specification: "10mg ×10", price: 102 }
    ]
  },
  {
    id: "glow",
    name: "Glow",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "70mg ×10", price: 243 }
    ]
  },
  {
    id: "hexarelin",
    name: "Hexarelin",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "2mg ×10", price: 97 },
      { specification: "5mg ×10", price: 135 },
      { specification: "10mg ×10", price: 195 }
    ]
  },
  {
    id: "hgh-somatropin",
    popular: true,
    name: "HGH Somatropin",
    category: "Muscle Growth & Recovery",
    outOfStock: true,
    variants: [
      { specification: "10iu ×10", price: 99 },
      { specification: "12iu ×10", price: 110 },
      { specification: "15iu ×10", price: 123 },
      { specification: "24iu ×10", price: 166 }
    ]
  },
  {
    id: "hgh-frag",
    name: "HGH Frag 176-191",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "5mg ×10", price: 140 }
    ]
  },
  {
    id: "igf1-lr3",
    name: "IGF-1 LR3",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "0.1mg ×10", price: 92 },
      { specification: "1mg ×10", price: 236 }
    ]
  },
  {
    id: "ipamorelin",
    name: "Ipamorelin",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "5mg ×10", price: 88 },
      { specification: "10mg ×10", price: 114 }
    ]
  },
  {
    id: "kisspeptin-10",
    name: "Kisspeptin-10",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "5mg ×10", price: 111 },
      { specification: "10mg ×10", price: 147 }
    ]
  },
  {
    id: "klow",
    popular: true,
    name: "Klow",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "80mg ×10", price: 267 }
    ]
  },
  {
    id: "mots-c",
    popular: true,
    name: "MOTS-c",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "10mg ×10", price: 114 },
      { specification: "40mg ×10", price: 279, outOfStock: true }
    ]
  },
  {
    id: "sermorelin",
    name: "Sermorelin",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "5mg ×10", price: 118 },
      { specification: "10mg ×10", price: 184 }
    ]
  },
  {
    id: "slu-pp-332",
    name: "SLU-PP-332",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "5mg ×10", price: 135 }
    ]
  },
  {
    id: "tb500",
    name: "TB500",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "2mg ×10", price: 95 },
      { specification: "5mg ×10", price: 130 },
      { specification: "10mg ×10", price: 204 }
    ]
  },
  {
    id: "tesamorelin",
    popular: true,
    name: "Tesamorelin",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "2mg ×10", price: 109 },
      { specification: "10mg ×10", price: 236 }
    ]
  },
  {
    id: "thymalin",
    name: "Thymalin",
    category: "Muscle Growth & Recovery",
    variants: [
      { specification: "10mg ×10", price: 116 }
    ]
  },
  {
    id: "thymosin-alpha1",
    name: "Thymosin Alpha-1",
    category: "Muscle Growth & Recovery",
    outOfStock: true,
    variants: [
      { specification: "5mg ×10", price: 137 },
      { specification: "10mg ×10", price: 208 }
    ]
  },

  // SEXUAL HEALTH
  {
    id: "melanotan-1",
    name: "Melanotan 1",
    category: "Sexual Health",
    outOfStock: true,
    variants: [
      { specification: "10mg ×10", price: 99 }
    ]
  },
  {
    id: "melanotan-2",
    name: "Melanotan 2",
    category: "Sexual Health",
    outOfStock: true,
    variants: [
      { specification: "10mg ×10", price: 99 }
    ]
  },
  {
    id: "oxytocin",
    name: "Oxytocin",
    category: "Sexual Health",
    variants: [
      { specification: "2mg ×10", price: 76 },
      { specification: "5mg ×10", price: 95 }
    ]
  },
  {
    id: "pt-141",
    name: "PT-141",
    category: "Sexual Health",
    variants: [
      { specification: "10mg ×10", price: 111 }
    ]
  },

  // GENERAL HEALTH
  {
    id: "shb",
    name: "SHB (Super Human Blend)",
    category: "General Health",
    variants: [
      { specification: "10ml ×10 vials", price: 123 }
    ],
    ingredients: [
      "L-Arginine – 110 mg",
      "L-Ornithine – 110 mg",
      "L-Citrulline – 120 mg",
      "L-Lysine – 70 mg",
      "L-Glutamine – 40 mg",
      "L-Proline – 60 mg",
      "L-Taurine – 60 mg",
      "L-Carnitine – 220 mg",
      "NAC – 75 mg"
    ]
  },
  {
    id: "29000-ara",
    name: "29000 ARA",
    category: "General Health",
    variants: [
      { specification: "10mg ×10", price: 116 }
    ]
  },
  {
    id: "acetic-acid",
    name: "Acetic Acid 0.6%",
    category: "General Health",
    variants: [
      { specification: "3ml ×10", price: 10 },
      { specification: "10ml ×10", price: 19 }
    ]
  },
  {
    id: "bacteriostatic-water",
    name: "Bacteriostatic Water",
    category: "General Health",
    variants: [
      { specification: "3ml ×10", price: 10 },
      { specification: "10ml ×10", price: 15 }
    ]
  },
  {
    id: "ghk-cu",
    popular: true,
    name: "GHK-Cu",
    category: "General Health",
    variants: [
      { specification: "50mg ×10", price: 81 },
      { specification: "100mg ×10", price: 104 }
    ]
  },
  {
    id: "hyaluronic-acid",
    name: "Hyaluronic Acid",
    category: "General Health",
    variants: [
      { specification: "5mg ×10", price: 220 }
    ]
  },
  {
    id: "lip-c-b12",
    name: "Lip-C + B12",
    category: "General Health",
    variants: [
      { specification: "10ml ×10", price: 111 }
    ]
  },
  {
    id: "nad-plus",
    popular: true,
    name: "NAD+",
    category: "General Health",
    outOfStock: true,
    variants: [
      { specification: "100mg ×10 vials", price: 88, outOfStock: true },
      { specification: "500mg ×10 vials", price: 135, outOfStock: true },
      { specification: "1000mg ×10 vials", price: 210, outOfStock: true }
    ]
  },
  {
    id: "snap-8",
    name: "SNAP-8",
    category: "General Health",
    variants: [
      { specification: "10mg ×10", price: 92 }
    ]
  },
  {
    id: "vip",
    name: "VIP",
    category: "General Health",
    variants: [
      { specification: "10mg ×10", price: 217 }
    ]
  },

  // OTHER / SPECIALITY
  {
    id: "5-amino-1mq",
    name: "5-Amino-1MQ",
    category: "Other / Speciality",
    variants: [
      { specification: "5mg ×10", price: 99 },
      { specification: "50mg ×10", price: 146, outOfStock: true }
    ]
  },
  {
    id: "aicar",
    name: "AICAR",
    category: "Other / Speciality",
    variants: [
      { specification: "50mg ×10", price: 114 }
    ]
  },
  {
    id: "cerebrolysin",
    name: "Cerebrolysin",
    category: "Other / Speciality",
    variants: [
      { specification: "60mg ×6", price: 83 }
    ]
  },
  {
    id: "gonadorelin",
    name: "Gonadorelin",
    category: "Other / Speciality",
    variants: [
      { specification: "2mg ×10", price: 85 }
    ]
  },
  {
    id: "hcg",
    name: "HCG",
    category: "Other / Speciality",
    variants: [
      { specification: "5000iu ×10", price: 130 },
      { specification: "10000iu ×10", price: 196 }
    ]
  },
  {
    id: "hmg",
    name: "HMG",
    category: "Other / Speciality",
    variants: [
      { specification: "75iu ×10", price: 111 }
    ]
  },
  {
    id: "kpv",
    name: "KPV",
    category: "Other / Speciality",
    variants: [
      { specification: "×10", price: 116 }
    ]
  },
  {
    id: "l-carnitine",
    name: "L-Carnitine",
    category: "Other / Speciality",
    variants: [
      { specification: "10ml ×10", price: 89 }
    ]
  },
  {
    id: "ll37",
    name: "LL37",
    category: "Other / Speciality",
    variants: [
      { specification: "5mg ×10", price: 142 }
    ]
  },
  {
    id: "melatonin",
    name: "Melatonin",
    category: "Other / Speciality",
    variants: [
      { specification: "10mg ×10", price: 110 }
    ]
  },
  {
    id: "ss-31",
    name: "SS-31",
    category: "Other / Speciality",
    variants: [
      { specification: "10mg ×10", price: 142 },
      { specification: "50mg ×10", price: 451 }
    ]
  },

  // UK DOMESTIC
  {
    id: "v1-pen",
    name: "V1 Injection Pen",
    category: "Peptide Supplies",
    region: "UK Domestic",
    currency: "GBP",
    outOfStock: true,
    variants: [
      { specification: "Tiffany Blue", price: 15, outOfStock: true },
      { specification: "Red", price: 15, outOfStock: true },
      { specification: "Deep Purple", price: 15, outOfStock: true }
    ]
  },
  {
    id: "3ml-pen-cartridge",
    name: "3mL Pen Cartridge",
    category: "Peptide Supplies",
    region: "UK Domestic",
    currency: "GBP",
    stockBadge: "60 left",
    variants: [
      { specification: "1 cartridge", price: 1 }
    ]
  },
  {
    id: "frostskin-serum",
    name: "FrostSkin Serum",
    category: "Peptides",
    region: "UK Domestic",
    currency: "GBP",
    variants: [
      { specification: "GHK-Cu Facial Serum • 30ml dropper", price: 25 }
    ],
    ingredients: [
      "GHK-Cu (Copper Peptide)",
      "Cosmetic-grade carrier base"
    ]
  },
  {
    id: "hospira-bac-water",
    name: "Hospira Bacteriostatic Water",
    category: "Peptide Supplies",
    region: "UK Domestic",
    currency: "GBP",
    outOfStock: true,
    variants: [
      { specification: "30mL Multidose Sterile Solution • USP Grade", price: 12, outOfStock: true }
    ],
    image: "hospira-bac-water"
  }
];
