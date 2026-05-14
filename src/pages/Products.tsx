import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SEO from '@/components/SEO';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Input } from '@/components/ui/input';
import { products, categories, domesticCategories } from '@/data/products';
import { Search, FlaskConical, MapPin, Globe } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const { region, setRegion } = useRegion();
  const activeCategories = region === 'UK Domestic' ? domesticCategories : categories;

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  useEffect(() => {
    setSelectedCategory('All');
  }, [region]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesRegion = region === 'UK Domestic' ? product.region === 'UK Domestic' : product.region !== 'UK Domestic';
    return matchesSearch && matchesCategory && matchesRegion;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSearchParams({ category });
  };

  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": products.map((product, index) => ({
      "@type": "Product",
      "position": index + 1,
      "name": product.name,
      "description": `Research-grade ${product.name} peptide for laboratory use`,
      "category": product.category,
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "USD",
        "lowPrice": Math.min(...product.variants.map(v => v.price)),
        "highPrice": Math.max(...product.variants.map(v => v.price))
      }
    }))
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Buy Research Peptides Online – Premium Laboratory-Grade Compounds UK & Worldwide"
        description="Shop premium research-grade peptides for laboratory use. Semaglutide, Retatrutide, Tirzepatide, Cagrilintide, BPC-157, TB-500 & GLP-1 compounds. UK-based supplier with worldwide shipping. COA verified, 99%+ purity. Secure crypto payments."
        keywords="buy peptides online, research peptides, peptide shop UK, GLP-1 peptides, Semaglutide research peptide, Retatrutide for sale, Tirzepatide peptide, Cagrilintide, BPC-157, TB-500, laboratory peptides, research chemicals, peptide supplier worldwide, UK peptide vendor"
        canonical="https://yetipeptides.com/products"
        schema={productsSchema}
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-20">
        {/* Compact Header */}
        <AnimateOnScroll>
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Research Peptides</h1>
            <p className="text-sm text-muted-foreground">
              Laboratory-grade compounds · 99%+ purity
            </p>
          </div>
        </AnimateOnScroll>

        {/* Prominent Region Switcher */}
        <AnimateOnScroll delay={50}>
          <div className="mb-6 rounded-xl border border-border/30 bg-card/40 backdrop-blur-sm p-1.5 flex flex-col sm:flex-row gap-1.5">
            <button
              onClick={() => setRegion('International')}
              className={`flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                region === 'International'
                  ? 'bg-ice-blue text-background shadow-md shadow-ice-blue/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
              }`}
            >
              <Globe className="w-4 h-4" />
              <div className="flex flex-col items-start leading-tight">
                <span>International Catalog</span>
                <span className={`text-[10px] font-normal ${region === 'International' ? 'text-background/70' : 'text-muted-foreground/70'}`}>
                  Ships worldwide · USD pricing
                </span>
              </div>
            </button>
            <button
              onClick={() => setRegion('UK Domestic')}
              className={`flex-1 flex items-center justify-center gap-2.5 px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
                region === 'UK Domestic'
                  ? 'bg-ice-blue text-background shadow-md shadow-ice-blue/20'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <div className="flex flex-col items-start leading-tight">
                <span>UK Domestic Only</span>
                <span className={`text-[10px] font-normal ${region === 'UK Domestic' ? 'text-background/70' : 'text-muted-foreground/70'}`}>
                  Ships within UK · GBP pricing
                </span>
              </div>
            </button>
          </div>
        </AnimateOnScroll>

        {/* Active region indicator strip */}
        <AnimateOnScroll animation="fade-in" delay={100}>
          <div className={`mb-6 flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg border ${
            region === 'UK Domestic'
              ? 'bg-ice-blue/10 border-ice-blue/30'
              : 'bg-secondary/20 border-border/30'
          }`}>
            <div className="flex items-center gap-2 text-xs">
              {region === 'UK Domestic' ? (
                <MapPin className="w-3.5 h-3.5 text-ice-blue" />
              ) : (
                <Globe className="w-3.5 h-3.5 text-ice-blue" />
              )}
              <span className="font-medium">
                Viewing: <span className="text-ice-blue">{region === 'UK Domestic' ? 'UK Domestic Stock' : 'International Catalog'}</span>
              </span>
            </div>
            <a
              href="https://discord.gg/seDb5c9XkM"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-[11px] font-medium text-[#5865F2] hover:text-[#5865F2]/80 transition-colors"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Join Discord
            </a>
          </div>
        </AnimateOnScroll>

        {/* Search + Filters Row */}
        <AnimateOnScroll delay={150}>
          <div className="flex flex-col gap-3 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search compounds..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary/20 border-border/30 h-10 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {activeCategories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    selectedCategory === category 
                      ? 'bg-ice-blue text-background' 
                      : 'bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Results count */}
        <p className="text-xs text-muted-foreground mb-5">
          {filteredProducts.length} compound{filteredProducts.length !== 1 ? 's' : ''}
        </p>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {filteredProducts.map((product, i) => (
            <AnimateOnScroll key={product.id} delay={i * 60} animation="scale-in">
              <ProductCard product={product} />
            </AnimateOnScroll>
          ))}
        </div>

        {filteredProducts.length === 0 && region === 'UK Domestic' ? (
          <AnimateOnScroll animation="fade-in">
            <div className="text-center py-24">
              <MapPin className="w-10 h-10 text-ice-blue mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                UK Domestic stock is not yet available. Check back soon for updates.
              </p>
            </div>
          </AnimateOnScroll>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No compounds found matching your search.</p>
          </div>
        ) : null}

        {/* Disclaimer */}
        <AnimateOnScroll animation="fade-in" delay={200}>
          <div className="mt-16 flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <FlaskConical className="w-3.5 h-3.5 text-ice-blue" />
            <span>All products are intended for laboratory research use only. Not for human consumption.</span>
          </div>
        </AnimateOnScroll>
      </div>

      <Footer />
    </div>
  );
}
