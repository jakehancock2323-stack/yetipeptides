import yetiVial from '@/assets/yeti-vial.png';
import v1PenImage from '@/assets/v1-pen.png';
import penCartridgeImage from '@/assets/pen-cartridge.png';
import hospiraBacWaterImage from '@/assets/bac-water-hospira.png';
import frostSkinImage from '@/assets/ice-elixir.png';
import tretinoinCreamImage from '@/assets/tretinoin-cream.png';
import type { Product } from '@/data/products';

export function getProductImage(product: Pick<Product, 'id'>): string {
  switch (product.id) {
    case 'v1-pen':
      return v1PenImage;
    case '3ml-pen-cartridge':
      return penCartridgeImage;
    case 'hospira-bac-water':
      return hospiraBacWaterImage;
    case 'frostskin-serum':
      return frostSkinImage;
    case 'tretinoin-cream':
      return tretinoinCreamImage;
    default:
      return yetiVial;
  }
}
