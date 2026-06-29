import { Product } from '@/data/products';

// UK-only site — kept as a stable export so older callers don't break.
export type CartRegion = 'UK Domestic';

export const getProductRegion = (_product: Product): CartRegion => 'UK Domestic';

export const hasMixedProductRegions = (_items: Array<{ product: Product }>) => false;
