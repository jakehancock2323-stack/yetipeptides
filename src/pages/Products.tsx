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
import { Search, FlaskConical, MapPin } from 'lucide-react';
import { useRegion } from '@/contexts/RegionContext';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );
  const { region } = useRegion();

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

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
        {/* UK Domestic Banner */}
        {region === 'UK Domestic' && (
          <AnimateOnScroll animation="fade-in">
            <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-ice-blue/10 border border-ice-blue/20">
              <MapPin className="w-4 h-4 text-ice-blue flex-shrink-0" />
              <span className="text-sm font-medium text-ice-blue">UK Domestic Stock – Ships within UK only.</span>
            </div>
          </AnimateOnScroll>
        )}

        {/* Compact Header */}
        <AnimateOnScroll>
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Research Peptides</h1>
            <p className="text-sm text-muted-foreground">
              Laboratory-grade compounds · 99%+ purity · COA on request
            </p>
          </div>
        </AnimateOnScroll>

        {/* Search + Filters Row */}
        <AnimateOnScroll delay={100}>
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="relative sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search compounds..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary/20 border-border/30 h-9 text-sm"
              />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map(category => (
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
