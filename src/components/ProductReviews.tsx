import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Star, ShieldCheck } from 'lucide-react';

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  title: string | null;
  body: string;
  verified_purchase: boolean;
  created_at: string;
}

interface Props {
  productId: string;
  productName: string;
}

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'md' }) {
  const cls = size === 'md' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`${cls} ${i <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`}
        />
      ))}
    </div>
  );
}

export default function ProductReviews({ productId, productName }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('product_reviews' as never)
        .select('*')
        .eq('product_id', productId)
        .eq('published', true)
        .order('created_at', { ascending: false });
      if (!cancelled) {
        setReviews((data ?? []) as unknown as Review[]);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  if (loading) return null;
  if (reviews.length === 0) return null;

  const avg =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  const rounded = Math.round(avg * 10) / 10;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rounded.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 10).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.customer_name },
      datePublished: r.created_at,
      reviewBody: r.body,
      name: r.title ?? undefined,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
    })),
  };

  return (
    <section className="mt-14 border-t border-border/30 pt-10">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="flex flex-wrap items-baseline gap-4 mb-6">
        <h2 className="text-xl md:text-2xl font-bold">Verified Customer Reviews</h2>
        <div className="flex items-center gap-2">
          <Stars rating={Math.round(avg)} size="md" />
          <span className="text-sm font-semibold">{rounded.toFixed(1)}</span>
          <span className="text-xs text-muted-foreground">({reviews.length})</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <article
            key={r.id}
            className="rounded-xl border border-border/30 bg-card/30 p-4 space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <Stars rating={r.rating} />
              {r.verified_purchase && (
                <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-ice-blue">
                  <ShieldCheck className="w-3 h-3" /> Verified
                </span>
              )}
            </div>
            {r.title && <h3 className="text-sm font-semibold">{r.title}</h3>}
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {r.body}
            </p>
            <div className="text-[11px] text-muted-foreground pt-1 border-t border-border/20">
              {r.customer_name} ·{' '}
              {new Date(r.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
