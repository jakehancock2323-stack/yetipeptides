import { Product } from '@/data/products';

export type CartRegion = 'UK Domestic' | 'International';

export const getProductRegion = (product: Product): CartRegion =>
  product.region === 'UK Domestic' ? 'UK Domestic' : 'International';

export const hasMixedProductRegions = (items: Array<{ product: Product }>) => {
  const regions = new Set(items.map((item) => getProductRegion(item.product)));
  return regions.size > 1;
};