import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Snowfall from '@/components/Snowfall';
import SEO from '@/components/SEO';
import { guides } from '@/data/guides';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function Guides() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Snowfall />
      <SEO
        title="Research Peptide Guides & Articles | Yeti Pep UK"
        description="Plain-English guides for UK peptide researchers. Reconstitution, storage, dosing maths, and peptide-by-peptide research overviews."
        canonical="https://yetipeptides.com/guides"
        keywords="peptide research guides UK, how to reconstitute pep, peptide storage UK, retatrutide tirzepatide, BPC-157 research"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Yeti Pep Research Guides',
          url: 'https://yetipeptides.com/guides',
        }}
      />
      <Navbar />

      <main className="container mx-auto px-4 pt-28 pb-16 max-w-5xl">
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-ice-blue mb-3">
            <BookOpen className="w-4 h-4" /> Research Library
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Peptide Research Guides</h1>
          <p className="text-muted-foreground max-w-2xl">
            Practical, jargon-free guides for UK peptide researchers. Reconstitution, storage, dosing maths, and peptide-by-peptide overviews.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {guides.map((g) => (
            <Link
              key={g.slug}
              to={`/guides/${g.slug}`}
              className="group block rounded-xl border border-border/20 hover:border-ice-blue/50 bg-card/30 hover:bg-card/60 p-6 transition-all"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                <span className="uppercase tracking-wider text-ice-blue">{g.category}</span>
                <span>{g.readTime}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 group-hover:text-ice-blue transition-colors">{g.title}</h2>
              <p className="text-sm text-muted-foreground mb-4">{g.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-ice-blue">
                Read article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
