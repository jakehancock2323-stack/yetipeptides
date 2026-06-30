import type { Product } from '@/data/products';

/**
 * Parse a stockBadge string for a numeric "left" count.
 * Returns the number if found (e.g. "6 vials left" → 6, "30 left" → 30),
 * or null if the badge is non-numeric (e.g. "Coming Soon", "In Stock").
 */
export function parseStockCount(badge?: string | null): number | null {
  if (!badge) return null;
  const m = badge.match(/(\d+)\s*(?:vials?\s*)?(?:left|remaining|in stock)?/i);
  if (!m) return null;
  const n = parseInt(m[1], 10);
  return Number.isFinite(n) ? n : null;
}

/**
 * A product is "low stock" when a numeric badge says 5 or fewer units remain
 * and the product isn't fully out of stock / coming soon / pre-order.
 */
export function isLowStock(product: Product): { low: boolean; count: number | null } {
  if (product.outOfStock || product.comingSoon || product.preOrder) {
    return { low: false, count: null };
  }
  const count = parseStockCount(product.stockBadge);
  if (count === null) return { low: false, count: null };
  return { low: count > 0 && count <= 5, count };
}
