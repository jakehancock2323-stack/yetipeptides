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
  FileText, Lock, Globe, FlaskConical, Package,
  Microscope, Award, HeadphonesIcon, BadgeCheck, ArrowRight, Zap
} from 'lucide-react';
import heroBanner from '@/assets/hero-banner.png';
import yetiLogo from '@/assets/yeti-logo.png';
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

  const trustFeatures = [
    { icon: Microscope, title: 'Strict QC Standards', desc: 'Every batch undergoes rigorous quality control testing to ensure 99%+ purity and consistency.' },
    { icon: BadgeCheck, title: 'Batch Verification', desc: 'Full traceability with batch numbers and lot-specific documentation for all products.' },
    { icon: FileText, title: 'COA Available', desc: 'Certificates of Analysis with HPLC and MS data available on request for all compounds.' },
    { icon: Package, title: 'Professional Packaging', desc: 'Temperature-controlled, discreet packaging to maintain product integrity during transit.' },
    { icon: Award, title: 'Established Supplier', desc: 'Trusted by researchers worldwide with a proven track record of reliable service.' },
    { icon: HeadphonesIcon, title: 'Fast & Helpful Support', desc: 'Responsive customer service via email, Discord, and Telegram for all enquiries.' },
  ];

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

      {/* Hero Section — Full-bleed cinematic */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background image with heavy overlay */}
        <div className="absolute inset-0">
          <img 
            src={heroBanner} 
            alt="Yeti Peptides research laboratory - premium research-grade peptides with worldwide shipping" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
          <div className="absolute inset-0 grid-overlay" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center pt-20">
          <div className="fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ice-blue/20 bg-ice-blue/5 mb-8">
              <Zap className="w-3.5 h-3.5 text-ice-blue" />
              <span className="text-xs uppercase tracking-[0.15em] text-ice-blue font-medium">Research-Grade Peptides</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in-up animate-delay-100 leading-tight">
            <span className="text-foreground">Precision Compounds</span>
            <br />
            <span className="bg-gradient-to-r from-ice-blue via-glacier to-aurora bg-clip-text text-transparent">
              For Serious Research
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto fade-in-up animate-delay-200 leading-relaxed">
            COA verified, 99%+ purity. Trusted by laboratories and researchers worldwide. UK-based with worldwide shipping.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center fade-in-up animate-delay-300">
            <Link to="/products">
              <Button size="lg" className="bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold px-8 gap-2">
                Browse Catalogue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/coa-request">
              <Button size="lg" variant="outline" className="border-border hover:bg-secondary/50 px-8">
                Request COA
              </Button>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-0 max-w-3xl mx-auto fade-in-up animate-delay-400">
            <div className="stat-block border-r border-border/30">
              <div className="stat-value">99%+</div>
              <div className="stat-label">Purity</div>
            </div>
            <div className="stat-block border-r border-border/30 md:border-r">
              <div className="stat-value">150+</div>
              <div className="stat-label">Reviews</div>
            </div>
            <div className="stat-block border-r border-border/30">
              <div className="stat-value">50+</div>
              <div className="stat-label">Compounds</div>
            </div>
            <div className="stat-block">
              <div className="stat-value">24/7</div>
              <div className="stat-label">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badge Strip */}
      <section className="py-5 border-y border-border/20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              { icon: FileText, label: 'COA Available' },
              { icon: Lock, label: 'Secure Checkout' },
              { icon: Globe, label: 'Worldwide Shipping' },
              { icon: FlaskConical, label: 'Research Use Only' },
              { icon: Package, label: 'Discreet Packaging' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-ice-blue" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 fade-in-up">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Compounds</h2>
              <p className="text-muted-foreground max-w-lg">
                Premium GLP-1 peptides and research compounds — COA verified, 99%+ purity
              </p>
            </div>
            <Link to="/products">
              <Button variant="outline" className="gap-2 border-border hover:bg-secondary/50">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Trust Yeti Peptides?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Committed to quality, transparency, and professional service for the research community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trustFeatures.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="frosted-glass rounded-xl p-6 glow-border hover:bg-card/80 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-ice-blue/10 flex items-center justify-center mb-4 group-hover:bg-ice-blue/20 transition-colors">
                  <Icon className="w-5 h-5 text-ice-blue" />
                </div>
                <h3 className="text-base font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discord CTA — Asymmetric */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="relative frosted-glass rounded-2xl p-10 md:p-14 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5865F2]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 md:flex md:items-center md:justify-between gap-8">
              <div className="mb-6 md:mb-0">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Join Our Community</h2>
                <p className="text-muted-foreground max-w-md">
                  Connect with fellow researchers, share insights, get updates, and chat with our team on Discord.
                </p>
              </div>
              <a href="https://discord.gg/seDb5c9XkM" target="_blank" rel="noopener noreferrer" className="flex-shrink-0">
                <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold px-8 gap-2 w-full md:w-auto">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Discord
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Reviews />

      {/* Policies — minimal grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Policies & Information</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { to: '/privacy-policy', icon: Lock, label: 'Privacy Policy' },
              { to: '/terms-conditions', icon: FileText, label: 'Terms & Conditions' },
              { to: '/shipping-returns', icon: Package, label: 'Shipping & Returns' },
              { to: '/research-disclaimer', icon: FlaskConical, label: 'Research Disclaimer' },
            ].map(({ to, icon: Icon, label }) => (
              <Link key={to} to={to}>
                <div className="frosted-glass rounded-lg p-5 hover:bg-card/80 glow-border transition-all duration-300 text-center h-full flex flex-col items-center justify-center gap-3">
                  <Icon className="w-6 h-6 text-ice-blue" />
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
}
