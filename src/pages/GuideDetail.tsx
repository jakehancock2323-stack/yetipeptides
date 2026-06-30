import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import SEO from '@/components/SEO';
import { getGuide, guides } from '@/data/guides';
import { ChevronLeft, Clock } from 'lucide-react';

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>();
  const guide = slug ? getGuide(slug) : undefined;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [slug]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Snowfall />
        <Navbar />
        <main className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">Guide not found</h1>
          <Link to="/guides" className="text-ice-blue">Back to all guides</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const canonical = `https://yetipeptides.com/guides/${guide.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    datePublished: guide.publishedAt,
    author: { '@type': 'Organization', name: 'Yeti Peptides' },
    publisher: {
      '@type': 'Organization',
      name: 'Yeti Peptides',
      url: 'https://yetipeptides.com',
    },
    mainEntityOfPage: canonical,
    keywords: guide.keywords.join(', '),
  };

  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Snowfall />
      <SEO
        title={guide.title}
        description={guide.description}
        canonical={canonical}
        type="article"
        keywords={guide.keywords.join(', ')}
        schema={articleSchema}
      />
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-16 max-w-3xl">
        <nav className="text-sm text-muted-foreground flex items-center gap-2 mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-ice-blue">Home</Link>
          <span>/</span>
          <Link to="/guides" className="hover:text-ice-blue">Guides</Link>
          <span>/</span>
          <span className="text-foreground line-clamp-1">{guide.title}</span>
        </nav>

        <Link to="/guides" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-ice-blue mb-6">
          <ChevronLeft className="w-4 h-4" /> All guides
        </Link>

        <article>
          <header className="mb-8">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-ice-blue mb-3">
              <span>{guide.category}</span>
              <span className="text-muted-foreground inline-flex items-center gap-1">
                <Clock className="w-3 h-3" /> {guide.readTime}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">{guide.title}</h1>
            <p className="text-lg text-muted-foreground">{guide.excerpt}</p>
          </header>

          <div
            className="prose prose-invert max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground prose-a:text-ice-blue prose-strong:text-foreground"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
          />
        </article>

        {related.length > 0 && (
          <section className="mt-16 pt-10 border-t border-border/20">
            <h2 className="text-xl font-bold mb-4">Keep reading</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {related.map((g) => (
                <Link
                  key={g.slug}
                  to={`/guides/${g.slug}`}
                  className="block rounded-lg border border-border/20 hover:border-ice-blue/50 p-4 bg-card/30 hover:bg-card/60 transition-all"
                >
                  <span className="text-xs uppercase tracking-wider text-ice-blue">{g.category}</span>
                  <h3 className="font-semibold mt-1 mb-1">{g.title}</h3>
                  <p className="text-xs text-muted-foreground">{g.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
