import { Link } from 'react-router-dom';
import { products, type Product } from '@/data/products';
import { getProductImage } from '@/lib/productImages';
import { Sparkles } from 'lucide-react';

interface Props {
  current: Product;
  limit?: number;
}

export default function RelatedProducts({ current, limit = 4 }: Props) {
  const related = products
    .filter(
      (p) =>
        p.id !== current.id &&
        p.category === current.category &&
        !p.comingSoon
    )
    .slice(0, limit);

  if (related.length === 0) return null;

  return (
    <section className="mt-14 border-t border-border/30 pt-10">
      <div className="flex items-center gap-2 mb-5">
        <Sparkles className="w-4 h-4 text-ice-blue" />
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
          You Might Also Like
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {related.map((p) => {
          const lowest = Math.min(...p.variants.map((v) => v.price));
          const isOut = p.outOfStock || p.variants.every((v) => v.outOfStock);
          return (
            <Link
              key={p.id}
              to={`/products/${p.id}`}
              className="group rounded-xl border border-border/30 bg-card/30 hover:border-ice-blue/40 hover:bg-card/60 transition-all p-4 flex flex-col items-center text-center"
            >
              <img
                src={getProductImage(p)}
                alt={p.name}
                className={`h-20 w-20 object-contain mb-2 group-hover:scale-105 transition-transform ${isOut ? 'opacity-50 grayscale' : ''}`}
                loading="lazy"
              />
              <p className="text-xs font-semibold leading-tight line-clamp-2">{p.name}</p>
              <p className="text-sm text-ice-blue font-bold mt-1">£{lowest}</p>
              {isOut && (
                <span className="text-[9px] uppercase tracking-wider text-destructive mt-1">
                  Out of stock
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
