import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import SEO from '@/components/SEO';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Input } from '@/components/ui/input';
import { products, categories } from '@/data/products';
import { Search, FlaskConical, Package, Truck, Flame } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const [bestSellersOnly, setBestSellersOnly] = useState<boolean>(
    searchParams.get('filter') === 'best-sellers'
  );

  useEffect(() => {
    setBestSellersOnly(searchParams.get('filter') === 'best-sellers');
  }, [searchParams]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  useEffect(() => {
    const productId = searchParams.get('product');
    if (!productId) return;
    const t = setTimeout(() => {
      const el = document.getElementById(`product-${productId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('ring-2', 'ring-ice-blue');
        setTimeout(() => el.classList.remove('ring-2', 'ring-ice-blue'), 2500);
      }
    }, 250);
    return () => clearTimeout(t);
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesBestSellers = !bestSellersOnly || product.popular;
    return matchesSearch && matchesCategory && matchesBestSellers;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const params: Record<string, string> = { category };
    if (bestSellersOnly) params.filter = 'best-sellers';
    setSearchParams(params);
  };

  const toggleBestSellers = () => {
    const next = !bestSellersOnly;
    setBestSellersOnly(next);
    const params: Record<string, string> = { category: selectedCategory };
    if (next) params.filter = 'best-sellers';
    setSearchParams(params);
  };

  const productsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': products.map((product, index) => ({
      '@type': 'Product',
      'position': index + 1,
      'name': product.name,
      'description': `UK domestic research-grade ${product.name}`,
      'category': product.category,
      'offers': {
        '@type': 'AggregateOffer',
        'priceCurrency': 'GBP',
        'lowPrice': Math.min(...product.variants.map(v => v.price)),
        'highPrice': Math.max(...product.variants.map(v => v.price)),
      },
    })),
  };

  const inStockCount = products.filter(p => !p.outOfStock && p.variants.some(v => !v.outOfStock)).length;

  return (
    <div className="min-h-screen">
      <SEO
        title="UK Research Peptides – Royal Mail 24 & InPost | Yeti Peptides"
        description="UK domestic research peptides. Shipped same-day via Royal Mail 24 Tracked (typically 2 days) or anonymous InPost lockers. GBP pricing, crypto checkout."
        keywords="UK peptides, research peptides UK, royal mail peptides, inpost peptides, GHK-Cu UK, MT-2 UK, tretinoin UK, domestic peptide supplier"
        canonical="https://yetipeptides.com/products"
        schema={productsSchema}
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28 pb-20">
        {/* Editorial header */}
        <AnimateOnScroll>
          <div className="mb-8 md:mb-10 grid md:grid-cols-12 gap-6 items-end border-b border-border/30 pb-6">
            <div className="md:col-span-7">
              <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-3">UK Catalogue · 2026 · 🇬🇧</div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">The Despatch List</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-xl">
                Every line below ships from the UK · Royal Mail 24 Tracked (typically 2 days) or anonymous InPost lockers.
              </p>
            </div>
            <div className="md:col-span-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm py-3">
                <div className="text-xl font-bold text-ice-blue">{inStockCount}</div>
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">In Stock</div>
              </div>
              <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm py-3">
                <div className="text-xl font-bold text-aurora">£6</div>
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">Royal Mail 24</div>
              </div>
              <div className="rounded-xl border border-border/40 bg-card/40 backdrop-blur-sm py-3">
                <div className="text-xl font-bold text-foreground">InPost</div>
                <div className="text-[9px] uppercase tracking-widest text-muted-foreground mt-1">Anonymous</div>
              </div>
            </div>
          </div>
          </AnimateOnScroll>


        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Sticky sidebar */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24 lg:self-start space-y-4">
            <AnimateOnScroll delay={50}>
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

            <AnimateOnScroll delay={110}>
              <button
                onClick={toggleBestSellers}
                className={`w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 border ${
                  bestSellersOnly
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-background border-amber-400 shadow-[0_0_18px_-6px] shadow-amber-500/60'
                    : 'bg-card/30 text-amber-300 border-amber-500/30 hover:bg-amber-500/10'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                {bestSellersOnly ? 'Showing Best Sellers' : 'Best Sellers Only'}
              </button>

            <AnimateOnScroll delay={100}>
              <div className="rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm p-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2.5 px-1">Categories</div>
                <div className="flex flex-wrap lg:flex-col gap-1.5">
                  {categories.map(category => (
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

            <AnimateOnScroll delay={150}>
              <div className="rounded-xl border border-aurora/25 bg-aurora/[0.04] p-4 space-y-3">
                <div className="text-[10px] uppercase tracking-[0.25em] text-aurora">Despatch</div>
                <div className="flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-ice-blue mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold">Royal Mail 24</p>
                    <p className="text-[11px] text-muted-foreground">Tracked · ~2 days · £6 flat</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Package className="w-4 h-4 text-aurora mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-semibold">InPost Locker</p>
                    <p className="text-[11px] text-muted-foreground">Anonymous · paid separately</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>

            <p className="text-xs text-muted-foreground px-1">
              {filteredProducts.length} compound{filteredProducts.length !== 1 ? 's' : ''} shown
            </p>
          </aside>

          {/* Grid */}
          <div className="lg:col-span-9 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 items-start">
              {filteredProducts.map((product, i) => (
                <AnimateOnScroll key={product.id} delay={i * 40} animation="scale-in">
                  <ProductCard product={product} />
                </AnimateOnScroll>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-muted-foreground">No compounds found matching your search.</p>
              </div>
            )}

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
