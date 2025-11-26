import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import { CheckCircle2, Globe, ShieldCheck, Package, FileText, Lock } from 'lucide-react';
import heroBanner from '@/assets/hero-banner.png';
import { products } from '@/data/products';
export default function Index() {
  const featuredProductIds = ['lc526', 'retatrutide', 'tirzepatide', 'cagrilintide', 'ghk-cu', 'hgh-somatropin'];
  const featuredProducts = products.filter(p => featuredProductIds.includes(p.id));

  return (
    <div className="min-h-screen">
      <Snowfall />
      <Navbar />

      {/* Hero Section with Banner */}
      <section className="relative pt-20 pb-8 px-4 fade-in-up">
        <div className="container mx-auto max-w-5xl">
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <img 
              src={heroBanner} 
              alt="Yeti Peptides - Premium Research-Grade Compounds" 
              className="w-full h-auto object-cover max-h-[300px] md:max-h-[400px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-6">
            <Link to="/products">
              <Button size="lg" className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background">
                Browse Products
              </Button>
            </Link>
            <Link to="/coa-request">
              <Button size="lg" variant="outline">
                Request COA
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-16 px-4 fade-in-up animate-delay-100">
        <div className="container mx-auto max-w-4xl">
          <div className="frosted-glass rounded-xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Why Choose Yeti Peptides</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
              <div className="space-y-2">
                <CheckCircle2 className="w-8 h-8 text-[hsl(var(--ice-blue))] mx-auto" />
                <h3 className="font-semibold">Research-Grade Compounds</h3>
                <p className="text-sm text-muted-foreground">99%+ purity with full testing documentation</p>
              </div>
              <div className="space-y-2">
                <FileText className="w-8 h-8 text-[hsl(var(--ice-blue))] mx-auto" />
                <h3 className="font-semibold">COA Available on Request</h3>
                <p className="text-sm text-muted-foreground">Complete analytical verification for all products</p>
              </div>
              <div className="space-y-2">
                <Globe className="w-8 h-8 text-[hsl(var(--ice-blue))] mx-auto" />
                <h3 className="font-semibold">Worldwide Discreet Shipping</h3>
                <p className="text-sm text-muted-foreground">Fast, tracked delivery to researchers globally</p>
              </div>
              <div className="space-y-2">
                <Lock className="w-8 h-8 text-[hsl(var(--ice-blue))] mx-auto" />
                <h3 className="font-semibold">Secure Crypto Checkout</h3>
                <p className="text-sm text-muted-foreground">Private and secure payment processing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badge Strip */}
      <section className="py-12 px-4 bg-gradient-to-r from-[hsl(var(--deep-freeze))]/20 to-transparent fade-in-up animate-delay-200">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-[hsl(var(--ice-blue))]" />
              <span className="text-sm font-medium">COA Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-[hsl(var(--ice-blue))]" />
              <span className="text-sm font-medium">Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-6 h-6 text-[hsl(var(--ice-blue))]" />
              <span className="text-sm font-medium">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-6 h-6 text-[hsl(var(--ice-blue))]" />
              <span className="text-sm font-medium">Discreet Packaging</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-[hsl(var(--ice-blue))]" />
              <span className="text-sm font-medium">Research Use Only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-4 fade-in-up animate-delay-300">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-lg text-muted-foreground">Explore our most popular research compounds</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Policies Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-[hsl(var(--deep-freeze))]/10 to-transparent fade-in-up">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Policies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="frosted-glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
                Storage Instructions
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Store lyophilized powder at -20°C, protected from light and moisture</li>
                <li>• After reconstitution, store at 2-8°C and use within 14 days</li>
              </ul>
            </div>
            <div className="frosted-glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
                Solubility
              </h3>
              <p className="text-sm text-muted-foreground">
                Soluble in sterile water or bacteriostatic water (for research use only)
              </p>
            </div>
            <div className="frosted-glass rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-destructive">
                <Package className="w-5 h-5" />
                Important Information
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                This product is for laboratory research use only. It is not for human or veterinary use, and is not approved for diagnostic, therapeutic, or medical applications.
              </p>
              <p className="text-sm text-muted-foreground">
                Handle according to appropriate laboratory safety procedures.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </div>
  );
}