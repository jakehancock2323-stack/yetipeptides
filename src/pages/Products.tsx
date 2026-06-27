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
    const productId = searchParams.get('product');
    if (!productId) return;
    const target = products.find(p => p.id === productId);
    if (target?.region === 'UK Domestic' && region !== 'UK Domestic') {
      setRegion('UK Domestic');
    }
    // Wait for render, then scroll
    const t = setTimeout(() => {
      const el = document.getElementById(`product-${productId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-ice-blue');
        setTimeout(() => el.classList.remove('ring-2', 'ring-ice-blue'), 2500);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [searchParams, region, setRegion]);

  useEffect(() => {
    if (!searchParams.get('product')) {
      setSelectedCategory('All');
    }
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
        title="Buy Research Peptides Online – UK & Worldwide"
        description="Shop research-grade peptides: Semaglutide, Tirzepatide, Retatrutide, BPC-157, TB-500 & GLP-1s. UK supplier, worldwide shipping, COA verified."
        keywords="buy peptides online, research peptides, peptide shop UK, GLP-1 peptides, Semaglutide research peptide, Retatrutide for sale, Tirzepatide peptide, Cagrilintide, BPC-157, TB-500, laboratory peptides, research chemicals, peptide supplier worldwide, UK peptide vendor"
        canonical="https://yetipeptides.com/products"
        schema={productsSchema}
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28 pb-20">
        {/* Magazine header */}
        <AnimateOnScroll>
          <div className="mb-8 md:mb-10 grid md:grid-cols-12 gap-6 items-end border-b border-border/30 pb-6">
            <div className="md:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-3">Catalogue · 2026</div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">Research Peptides</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-xl">
                Laboratory-grade compounds · 99%+ purity · COA verified
              </p>
            </div>
            <div className="md:col-span-5 grid grid-cols-2 gap-3 text-center">
              <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm py-3">
                <div className="text-xl font-bold text-ice-blue">{products.filter(p => p.region !== 'UK Domestic').length}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">Worldwide</div>
              </div>
              <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm py-3">
                <div className="text-xl font-bold text-aurora">{products.filter(p => p.region === 'UK Domestic').length}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">UK Domestic</div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Sidebar + Grid */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sidebar (sticky on desktop) */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start space-y-4">
            {/* Region switch */}
            <AnimateOnScroll delay={50}>
              <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm p-1.5 flex lg:flex-col gap-1.5">
                <button
                  onClick={() => setRegion('International')}
                  className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-left ${
                    region === 'International'
                      ? 'bg-ice-blue text-background shadow-md shadow-ice-blue/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                  }`}
                >
                  <Globe className="w-4 h-4 flex-shrink-0" />
                  <div className="flex flex-col leading-tight">
                    <span>International</span>
                    <span className={`text-[10px] font-normal ${region === 'International' ? 'text-background/70' : 'text-muted-foreground/70'}`}>
                      USD · worldwide
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => setRegion('UK Domestic')}
                  className={`flex-1 flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 text-left ${
                    region === 'UK Domestic'
                      ? 'bg-aurora text-background shadow-md shadow-aurora/20'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'
                  }`}
                >
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <div className="flex flex-col leading-tight">
                    <span>UK Domestic</span>
                    <span className={`text-[10px] font-normal ${region === 'UK Domestic' ? 'text-background/70' : 'text-muted-foreground/70'}`}>
                      GBP · UK only
                    </span>
                  </div>
                </button>
              </div>
            </AnimateOnScroll>

            {/* Search */}
            <AnimateOnScroll delay={100}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search compounds..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 bg-secondary/20 border-border/40 h-10 text-sm"
                />
              </div>
            </AnimateOnScroll>

            {/* Categories */}
            <AnimateOnScroll delay={150}>
              <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2.5 px-1">Categories</div>
                <div className="flex flex-wrap lg:flex-col gap-1.5">
                  {activeCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-medium transition-all duration-200 lg:text-left ${
                        selectedCategory === category
                          ? 'bg-ice-blue/15 text-ice-blue border border-ice-blue/30'
                          : 'bg-secondary/20 text-muted-foreground hover:text-foreground hover:bg-secondary/40 border border-transparent'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </AnimateOnScroll>

            <p className="text-xs text-muted-foreground px-1">
              {filteredProducts.length} compound{filteredProducts.length !== 1 ? 's' : ''} shown
            </p>
          </aside>

          {/* Main column */}
          <div className="lg:col-span-9 space-y-4">
            {region === 'International' && (
              <AnimateOnScroll animation="fade-in">
                <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 backdrop-blur-sm px-4 py-3.5 flex items-start gap-3">
                  <Globe className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-semibold text-amber-300 mb-0.5">International Orders Temporarily Closed</p>
                    <p className="text-amber-100/80 text-xs leading-relaxed">
                      New international orders are paused from <span className="font-semibold">10th</span> through <span className="font-semibold">29th</span> of this month. Service resumes on the 29th — orders already placed are unaffected and continue to ship as normal.
                    </p>
                  </div>
                </div>
              </AnimateOnScroll>
            )}

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
              {filteredProducts.map((product, i) => (
                <AnimateOnScroll key={product.id} delay={i * 40} animation="scale-in">
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
              <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground border-t border-border/30 pt-6">
                <FlaskConical className="w-3.5 h-3.5 text-ice-blue" />
                <span>All products are intended for laboratory research use only. Not for human consumption.</span>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}
