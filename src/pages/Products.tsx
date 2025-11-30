import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import SEO from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products, categories } from '@/data/products';
import { Search, ShieldCheck, Lock } from 'lucide-react';

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
        title="Buy Research Peptides Online - Premium Laboratory-Grade Compounds"
        description="Premium research-grade peptides for laboratory use. Semaglutide, Retatrutide, Tirzepatide, Cagrilintide & GLP-1 compounds. UK & worldwide shipping. COA verified, 99%+ purity."
        keywords="buy peptides online, research peptides, peptide shop, GLP-1 peptides, Semaglutide research, Retatrutide, Tirzepatide, Cagrilintide, laboratory peptides, research chemicals, peptide supplier"
        canonical="https://yetipeptides.com/products"
        schema={productsSchema}
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
          Buy Research-Grade Peptides Online | UK & Worldwide
        </h1>
        <p className="text-lg text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
          Premium laboratory-grade peptides for research purposes only - GLP-1, Semaglutide, Retatrutide & more
        </p>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
            <span className="text-muted-foreground">COA Verified</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Lock className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
            <span className="text-muted-foreground">Secure Crypto Payments</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ShieldCheck className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
            <span className="text-muted-foreground">99%+ Purity</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => handleCategoryChange(category)}
              className={`text-sm sm:text-base ${selectedCategory === category ? 'bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background' : ''}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground">No products found</p>
          </div>
        )}
      </div>

      <FAQ />

      <Footer />
    </div>
  );
}
