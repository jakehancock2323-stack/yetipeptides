import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import ProductCard from '@/components/ProductCard';
import Reviews from '@/components/Reviews';
import SEO from '@/components/SEO';
import { 
  CheckCircle2, Globe, ShieldCheck, Package, FileText, Lock, 
  FlaskConical, Microscope, Award, Truck, HeadphonesIcon, BadgeCheck
} from 'lucide-react';
import heroBanner from '@/assets/hero-banner.png';
import { products } from '@/data/products';

export default function Index() {
  const featuredProductIds = ['lc526', 'retatrutide', 'tirzepatide', 'cagrilintide', 'ghk-cu', 'hgh-somatropin'];
  const featuredProducts = products.filter(p => featuredProductIds.includes(p.id));

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Yeti Peptides",
    "url": "https://yetipeptides.com",
    "logo": "https://yetipeptides.com/yeti-logo.png",
    "description": "Premium research-grade peptides supplier. UK & worldwide shipping. Specializing in Semaglutide, Retatrutide, Cagrilintide, and GLP-1 research compounds.",
    "email": "yetipeptides@protonmail.com",
    "areaServed": "Worldwide",
    "founder": {
      "@type": "Organization",
      "name": "Yeti Peptides"
    },
    "sameAs": [
      "https://discord.gg/seDb5c9XkM",
      "https://t.me/yetipeptides"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    }
  };

  return (
    <div className="min-h-screen">
      <SEO 
        title="Yeti Peptides – Research-Use Peptides | UK & Worldwide Shipping"
        description="High-quality research peptides with COA on request. Worldwide shipping, competitive pricing, secure ordering and fast support. For laboratory research use only."
        keywords="buy peptides online, research peptides UK, peptide supplier worldwide, GLP-1 peptides, Semaglutide research, Retatrutide peptide, Tirzepatide, Cagrilintide, laboratory peptides, research chemicals, UK peptide vendor, worldwide peptide shipping, premium research peptides"
        canonical="https://yetipeptides.com/"
        schema={organizationSchema}
      />
      <Snowfall />
      <Navbar />

      {/* Hero Section - Full Width */}
      <section className="relative pt-20 pb-8 fade-in-up">
        <div className="w-full">
          <div className="relative overflow-hidden">
            <img 
              src={heroBanner} 
              alt="Yeti Peptides research laboratory - premium research-grade peptides with worldwide shipping" 
              className="w-full h-auto object-cover max-h-[350px] md:max-h-[450px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
            <div className="absolute bottom-8 left-0 right-0 text-center px-4">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground drop-shadow-lg">
                Research-Grade Peptides
              </h1>
              <p className="text-sm md:text-lg text-foreground/90 mb-6 max-w-2xl mx-auto drop-shadow">
                Premium quality compounds for laboratory research. COA verified, worldwide shipping.
              </p>
              <div className="flex flex-wrap gap-3 justify-center">
                <Link to="/products">
                  <Button size="lg" className="bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold">
                    Browse Catalogue
                  </Button>
                </Link>
                <Link to="/coa-request">
                  <Button size="lg" variant="outline" className="border-foreground/50 hover:bg-foreground/10">
                    Request COA
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badge Strip - Primary */}
      <section className="py-6 px-4 bg-gradient-to-r from-deep-freeze/30 via-secondary/50 to-deep-freeze/30 border-y border-border/50 fade-in-up animate-delay-100">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-ice-blue" />
              <span className="text-sm font-medium">COA Available</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-ice-blue" />
              <span className="text-sm font-medium">Secure Checkout</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-ice-blue" />
              <span className="text-sm font-medium">Worldwide Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-ice-blue" />
              <span className="text-sm font-medium">Research Use Only</span>
            </div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-ice-blue" />
              <span className="text-sm font-medium">Discreet Packaging</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Yeti Peptides Section */}
      <section className="py-16 px-4 fade-in-up animate-delay-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Trust Yeti Peptides?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Committed to quality, transparency, and professional service for the research community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ice-blue to-glacier flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Microscope className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Strict QC Standards</h3>
              <p className="text-sm text-muted-foreground">
                Every batch undergoes rigorous quality control testing to ensure 99%+ purity and consistency.
              </p>
            </div>
            
            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-glacier to-arctic-teal flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <BadgeCheck className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Batch Verification</h3>
              <p className="text-sm text-muted-foreground">
                Full traceability with batch numbers and lot-specific documentation for all products.
              </p>
            </div>
            
            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-arctic-teal to-ice-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">COA Available</h3>
              <p className="text-sm text-muted-foreground">
                Certificates of Analysis with HPLC and MS data available on request for all compounds.
              </p>
            </div>
            
            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ice-blue to-aurora flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional Packaging</h3>
              <p className="text-sm text-muted-foreground">
                Temperature-controlled, discreet packaging to maintain product integrity during transit.
              </p>
            </div>
            
            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-aurora to-glacier flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Established Supplier</h3>
              <p className="text-sm text-muted-foreground">
                Trusted by researchers worldwide with a proven track record of reliable service.
              </p>
            </div>
            
            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-glacier to-ice-blue flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <HeadphonesIcon className="w-6 h-6 text-background" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast & Helpful Support</h3>
              <p className="text-sm text-muted-foreground">
                Responsive customer service via email, Discord, and Telegram for all enquiries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-transparent via-secondary/20 to-transparent fade-in-up animate-delay-200">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Research Compounds</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Premium GLP-1 peptides and research compounds - COA verified, 99%+ purity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/products">
              <Button size="lg" variant="outline" className="min-w-[200px]">
                View Full Catalogue
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Reviews />

      {/* Our Policies Section */}
      <section className="py-16 px-4 fade-in-up">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Policies & Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/privacy-policy">
              <div className="frosted-glass rounded-xl p-6 hover:ice-glow hover:border-ice-blue/50 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-ice-blue" />
                  <h3 className="text-lg font-semibold">Privacy Policy</h3>
                  <p className="text-sm text-muted-foreground">
                    How we protect your data
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/terms-conditions">
              <div className="frosted-glass rounded-xl p-6 hover:ice-glow hover:border-ice-blue/50 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center gap-3">
                  <FileText className="w-8 h-8 text-ice-blue" />
                  <h3 className="text-lg font-semibold">Terms & Conditions</h3>
                  <p className="text-sm text-muted-foreground">
                    Our terms of service
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/shipping-returns">
              <div className="frosted-glass rounded-xl p-6 hover:ice-glow hover:border-ice-blue/50 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center gap-3">
                  <Truck className="w-8 h-8 text-ice-blue" />
                  <h3 className="text-lg font-semibold">Shipping & Returns</h3>
                  <p className="text-sm text-muted-foreground">
                    Delivery information
                  </p>
                </div>
              </div>
            </Link>
            <Link to="/research-disclaimer">
              <div className="frosted-glass rounded-xl p-6 hover:ice-glow hover:border-ice-blue/50 transition-all duration-300 h-full">
                <div className="flex flex-col items-center text-center gap-3">
                  <FlaskConical className="w-8 h-8 text-ice-blue" />
                  <h3 className="text-lg font-semibold">Research Disclaimer</h3>
                  <p className="text-sm text-muted-foreground">
                    Research use only
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </div>
  );
}