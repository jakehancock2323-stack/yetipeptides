import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { getRecentlyViewed } from '@/lib/recentlyViewed';
import { getProductImage } from '@/lib/productImages';
import { History } from 'lucide-react';

interface Props {
  excludeId?: string;
  limit?: number;
}

export default function RecentlyViewed({ excludeId, limit = 6 }: Props) {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getRecentlyViewed());
  }, []);

  const items = ids
    .filter((id) => id !== excludeId)
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean)
    .slice(0, limit) as typeof products;

  if (items.length === 0) return null;

  return (
    <section className="mt-12 border-t border-border/30 pt-8">
      <div className="flex items-center gap-2 mb-4">
        <History className="w-4 h-4 text-ice-blue" />
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Recently Viewed
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {items.map((p) => (
          <Link
            key={p.id}
            to={`/products/${p.id}`}
            className="group rounded-xl border border-border/30 bg-card/30 hover:border-ice-blue/40 hover:bg-card/60 transition-all p-3 flex flex-col items-center text-center"
          >
            <img
              src={getProductImage(p)}
              alt={p.name}
              className="h-16 w-16 object-contain mb-2 group-hover:scale-105 transition-transform"
              loading="lazy"
            />
            <p className="text-xs font-semibold leading-tight line-clamp-2">{p.name}</p>
            <p className="text-[11px] text-ice-blue font-bold mt-1">
              £{Math.min(...p.variants.map((v) => v.price))}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
