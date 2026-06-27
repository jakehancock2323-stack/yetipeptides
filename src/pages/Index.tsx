import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
// ProductCard removed — featured section deleted
import Reviews from '@/components/Reviews';
import SEO from '@/components/SEO';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AnimatedCounter from '@/components/AnimatedCounter';
import { 
  FileText, Lock, Globe, FlaskConical, Package,
  Microscope, Award, HeadphonesIcon, BadgeCheck, ArrowRight, Zap, X, Sparkles
} from 'lucide-react';
import AuroraWaves from '@/components/AuroraWaves';


export default function Index() {
  const [showDiscordBanner, setShowDiscordBanner] = useState(true);


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
        title="Yeti Peptides – Research Peptides | UK & Worldwide"
        description="UK research peptide supplier. COA on request, 99%+ purity, worldwide shipping. Semaglutide, Tirzepatide, Retatrutide, BPC-157 & more."
        keywords="buy peptides online, research peptides UK, peptide supplier worldwide, GLP-1 peptides, Semaglutide research, Retatrutide peptide, Tirzepatide, Cagrilintide, laboratory peptides, research chemicals, UK peptide vendor, worldwide peptide shipping, premium research peptides"
        canonical="https://yetipeptides.com/"
        schema={organizationSchema}
      />
      <Snowfall />
      <Navbar />

      {/* Discord Banner */}
      {showDiscordBanner && (
        <div className="pt-[60px]">
          <div className="relative bg-[#5865F2] py-2.5 px-4">
            <a 
              href="https://discord.gg/seDb5c9XkM" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <div className="container mx-auto flex items-center justify-center gap-3 text-white pr-8">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="text-sm font-medium">Join our Discord community — connect with researchers & get support</span>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 hidden sm:block" />
              </div>
            </a>
            <button
              onClick={() => setShowDiscordBanner(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {!showDiscordBanner && <div className="pt-[60px]" />}

      {/* Ice Elixir Announcement Banner */}
      <AnimateOnScroll animation="fade-up">
        <div className="container mx-auto px-4 pt-6">
          <Link to="/products?product=frostskin-serum" className="block group">
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-ice-blue/10 via-glacier/5 to-arctic-teal/10 border border-ice-blue/20 glow-border hover:border-ice-blue/40 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-ice-blue/5 to-transparent opacity-50" />
              <div className="absolute top-0 right-0 w-64 h-64 bg-ice-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="relative z-10 px-6 py-4 md:px-8 md:py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ice-blue/15 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-ice-blue" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-wider text-ice-blue bg-ice-blue/10 px-2 py-0.5 rounded">New Product</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-arctic-teal bg-arctic-teal/10 px-2 py-0.5 rounded">UK Only</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-destructive bg-destructive/10 px-2 py-0.5 rounded">Limited Stock</span>
                    </div>
                    <p className="text-sm md:text-base font-medium mt-1">
                      <span className="text-foreground">Ice Elixir</span>
                      <span className="text-muted-foreground"> — GHK-Cu 3.33% Facial Serum now available. Only 13 units in stock.</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-ice-blue font-semibold text-sm whitespace-nowrap group-hover:gap-3 transition-all">
                  Shop Now <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </AnimateOnScroll>

      {/* Hero Section — asymmetric split */}
      <section className="relative overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[42rem] h-[42rem] rounded-full bg-ice-blue/10 blur-[120px]" />
          <div className="absolute top-40 -right-32 w-[36rem] h-[36rem] rounded-full bg-aurora/15 blur-[120px]" />
          <div className="absolute inset-0 grid-overlay opacity-60" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Copy column */}
            <div className="lg:col-span-7 fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-ice-blue/25 bg-ice-blue/5 mb-6">
                <Zap className="w-3.5 h-3.5 text-ice-blue" />
                <span className="text-[11px] uppercase tracking-[0.2em] text-ice-blue font-medium">Research-Grade Peptides</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.05]">
                <span className="block text-foreground">Precision</span>
                <span className="block bg-gradient-to-r from-ice-blue via-arctic-teal to-aurora bg-clip-text text-transparent">
                  Compounds for
                </span>
                <span className="block text-foreground">Serious Research.</span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                COA verified, 99%+ purity. Trusted by laboratories and researchers worldwide. UK-based with worldwide shipping.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/products">
                  <Button size="lg" className="bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold px-7 gap-2">
                    Browse Catalogue <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/products?region=uk">
                  <Button size="lg" variant="outline" className="border-aurora/40 text-aurora hover:bg-aurora/10 hover:text-aurora font-semibold px-7">
                    UK Domestic
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual column */}
            <div className="lg:col-span-5 fade-in-up animate-delay-200 relative">
              <div className="relative aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden border border-border/40 bg-card/30 backdrop-blur-sm">
                <AuroraWaves />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-aurora/10 pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 frosted-glass rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Live Catalogue</p>
                    <p className="text-sm font-semibold">50+ Compounds</p>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-ice-blue animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30 rounded-2xl overflow-hidden border border-border/40 fade-in-up animate-delay-400">
            {[
              { v: <AnimatedCounter end={99} suffix="%+" />, l: 'Purity' },
              { v: <AnimatedCounter end={150} suffix="+" />, l: 'Reviews' },
              { v: <AnimatedCounter end={50} suffix="+" />, l: 'Compounds' },
              { v: '24/7', l: 'Support' },
            ].map((s, i) => (
              <div key={i} className="bg-card/60 backdrop-blur-sm py-5 px-3 text-center">
                <div className="text-2xl md:text-3xl font-urbanist font-bold text-ice-blue">{s.v}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badge Strip */}
      <AnimateOnScroll animation="fade-in">
        <section className="py-5 border-y border-border/20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 md:gap-12">
              {[
                { icon: FlaskConical, label: 'Quality Verified' },
                { icon: Lock, label: 'Secure Checkout' },
                { icon: Globe, label: 'Worldwide Shipping' },
                { icon: FlaskConical, label: 'Research Use Only' },
                { icon: Package, label: 'Discreet Packaging' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-ice-blue" />
                  <span className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </AnimateOnScroll>



      {/* Why Trust Us */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Trust Yeti Peptides?</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Committed to quality, transparency, and professional service for the research community
              </p>
            </div>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {trustFeatures.map(({ icon: Icon, title, desc }, i) => (
              <AnimateOnScroll key={title} delay={i * 80} animation="scale-in">
                <div className="frosted-glass rounded-xl p-6 glow-border hover:bg-card/80 transition-all duration-300 group h-full">
                  <div className="w-10 h-10 rounded-lg bg-ice-blue/10 flex items-center justify-center mb-4 group-hover:bg-ice-blue/20 transition-colors">
                    <Icon className="w-5 h-5 text-ice-blue" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <Reviews />

      {/* Discord Community CTA */}
      <AnimateOnScroll animation="scale-in">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <a
              href="https://discord.gg/seDb5c9XkM"
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-[#5865F2] p-8 md:p-12 text-center hover:shadow-[0_0_40px_rgba(88,101,242,0.3)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2] via-[#4752C4] to-[#3C45A5]" />
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/20 -translate-x-1/2 -translate-y-1/2" />
                  <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/10 translate-x-1/3 translate-y-1/3" />
                </div>
                <div className="relative z-10">
                  <div className="flex justify-center mb-5">
                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-9 h-9 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Join Our Discord Community</h2>
                  <p className="text-white/80 text-base md:text-lg mb-6 max-w-xl mx-auto">
                    Connect with fellow researchers, get real-time support, exclusive updates, and be part of the Yeti community.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white text-[#5865F2] font-semibold px-6 py-3 rounded-lg group-hover:bg-white/90 transition-colors">
                    Join Discord
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        </section>
      </AnimateOnScroll>

      {/* Policies */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <AnimateOnScroll>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Policies & Information</h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { to: '/privacy-policy', icon: Lock, label: 'Privacy Policy' },
              { to: '/terms-conditions', icon: FileText, label: 'Terms & Conditions' },
              { to: '/shipping-returns', icon: Package, label: 'Shipping & Returns' },
              { to: '/research-disclaimer', icon: FlaskConical, label: 'Research Disclaimer' },
            ].map(({ to, icon: Icon, label }, i) => (
              <AnimateOnScroll key={to} delay={i * 100} animation="fade-up">
                <Link to={to}>
                  <div className="frosted-glass rounded-lg p-5 hover:bg-card/80 glow-border transition-all duration-300 text-center h-full flex flex-col items-center justify-center gap-3">
                    <Icon className="w-6 h-6 text-ice-blue" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                </Link>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      <FAQ />
      <Footer />
    </div>
  );
}
