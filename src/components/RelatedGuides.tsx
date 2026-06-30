import { Link } from 'react-router-dom';
import { RELATED_GUIDES } from '@/data/relatedGuides';
import { guides } from '@/data/guides';
import { BookOpen, ArrowRight } from 'lucide-react';

interface Props {
  productId: string;
}

export default function RelatedGuides({ productId }: Props) {
  const slugs = RELATED_GUIDES[productId] ?? [];
  const items = slugs
    .map((slug) => guides.find((g) => g.slug === slug))
    .filter(Boolean) as typeof guides;

  if (items.length === 0) return null;

  return (
    <section className="mt-14 border-t border-border/30 pt-10">
      <div className="flex items-center gap-2 mb-5">
        <BookOpen className="w-4 h-4 text-ice-blue" />
        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Related Research Guides
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {items.map((g) => (
          <Link
            key={g.slug}
            to={`/guides/${g.slug}`}
            className="group rounded-xl border border-border/30 bg-card/30 hover:border-ice-blue/40 hover:bg-card/60 transition-all p-4 flex flex-col h-full"
          >
            <span className="text-[10px] uppercase tracking-wider text-aurora mb-2">
              {g.category} · {g.readTime}
            </span>
            <h3 className="text-sm font-bold leading-tight mb-2 group-hover:text-ice-blue transition-colors">
              {g.title}
            </h3>
            <p className="text-xs text-muted-foreground line-clamp-3 mb-3">{g.excerpt}</p>
            <span className="text-xs text-ice-blue font-semibold flex items-center gap-1 mt-auto">
              Read guide <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
