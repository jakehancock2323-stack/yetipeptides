import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import CurrencyToggle from '@/components/CurrencyToggle';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import { Search, ShieldCheck, Lock, FlaskConical } from 'lucide-react';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get('category') || 'All'
  );

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
    <div className="min-h-screen pb-20">
      <SEO 
        title="Buy Research Peptides Online – Premium Laboratory-Grade Compounds UK & Worldwide"
        description="Shop premium research-grade peptides for laboratory use. Semaglutide, Retatrutide, Tirzepatide, Cagrilintide, BPC-157, TB-500 & GLP-1 compounds. UK-based supplier with worldwide shipping. COA verified, 99%+ purity. Secure crypto payments."
        keywords="buy peptides online, research peptides, peptide shop UK, GLP-1 peptides, Semaglutide research peptide, Retatrutide for sale, Tirzepatide peptide, Cagrilintide, BPC-157, TB-500, laboratory peptides, research chemicals, peptide supplier worldwide, UK peptide vendor"
        canonical="https://yetipeptides.com/products"
        schema={productsSchema}
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-28 pb-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-ice-blue via-glacier to-aurora bg-clip-text text-transparent">
            Research Peptides
          </h1>
          <p className="text-muted-foreground mb-6">
            Premium laboratory-grade peptides for research purposes only — GLP-1, Semaglutide, Retatrutide & more
          </p>

          {/* Trust badges + Currency toggle */}
          <div className="flex flex-wrap justify-center items-center gap-5 mb-6">
            {[
              { icon: ShieldCheck, label: 'COA Verified' },
              { icon: Lock, label: 'Secure Crypto Payments' },
              { icon: FlaskConical, label: '99%+ Purity' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Icon className="w-4 h-4 text-ice-blue" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Currency Toggle */}
          <div className="flex justify-center mb-6">
            <CurrencyToggle />
          </div>

          {/* Search */}
          <div className="max-w-lg mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search compounds..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-secondary/30 border-border/50"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange(category)}
                className={`text-xs ${selectedCategory === category 
                  ? 'bg-ice-blue hover:bg-ice-blue/90 text-background' 
                  : 'border-border/50 hover:bg-secondary/50'}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {filteredProducts.length} compound{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No compounds found matching your search.</p>
          </div>
        )}
      </div>

      <FAQ />
      <Footer />
    </div>
  );
}
