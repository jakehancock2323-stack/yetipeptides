const KEY = 'yeti:recently-viewed';
const MAX = 8;

export function pushRecentlyViewed(productId: string) {
  try {
    const raw = localStorage.getItem(KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    const next = [productId, ...list.filter((id) => id !== productId)].slice(0, MAX);
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

export function getRecentlyViewed(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
