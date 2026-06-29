import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import Reviews from '@/components/Reviews';
import SEO from '@/components/SEO';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import AnimatedCounter from '@/components/AnimatedCounter';
import {
  FileText, Lock, FlaskConical, Package,
  Microscope, Award, HeadphonesIcon, ArrowRight, X, Sparkles, Truck, MapPin, Clock, Bitcoin
} from 'lucide-react';

export default function Index() {
  const [showDiscordBanner, setShowDiscordBanner] = useState(true);

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Yeti Peptides',
    'url': 'https://yetipeptides.com',
    'logo': 'https://yetipeptides.com/yeti-logo.png',
    'description': 'UK domestic research peptide supplier. Royal Mail 24 tracked (typically 2 days) or anonymous InPost lockers. Crypto checkout only.',
    'email': 'yetipeptides@protonmail.com',
    'areaServed': 'United Kingdom',
    'sameAs': ['https://discord.gg/seDb5c9XkM', 'https://t.me/yetipeptides'],
    'aggregateRating': { '@type': 'AggregateRating', 'ratingValue': '4.9', 'reviewCount': '150' },
  };

  const trustFeatures = [
    { icon: Microscope, title: 'Strict QC Standards', desc: '99%+ purity — every batch quality-controlled before it leaves the bench.' },
    { icon: Truck, title: 'Royal Mail 24', desc: 'Tracked despatch on every UK order at a flat £6 — typically arrives within 2 days.' },

    { icon: Package, title: 'InPost Locker', desc: 'Want it anonymous? Send us your InPost QR code — we post, you collect.' },
    { icon: Award, title: 'UK Based & Discreet', desc: 'Plain packaging, no external markings, no signed-for awkwardness.' },
    { icon: HeadphonesIcon, title: 'Fast Support', desc: 'ProtonMail, Discord and Telegram — usually replies same day.' },
    { icon: Bitcoin, title: 'Crypto Checkout', desc: 'USDT, USDC and BTC only. Private, no card, no chargebacks.' },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Yeti Peptides – UK Domestic Research Peptides | Royal Mail 24 & InPost"
        description="UK domestic research peptide supplier. 99%+ purity. Royal Mail 24 next-day or anonymous InPost lockers. Crypto-only checkout. Shipped from the UK."
        keywords="UK research peptides, royal mail peptides, inpost peptide delivery, domestic peptide UK, GHK-Cu UK, MT-2 UK, tretinoin UK, GLP-1 UK"
        canonical="https://yetipeptides.com/"
        schema={organizationSchema}
      />
      <Snowfall />
      <Navbar />

      {/* Discord Banner */}
      {showDiscordBanner && (
        <div className="pt-[60px]">
          <div className="relative bg-[#5865F2] py-2.5 px-4">
            <a href="https://discord.gg/seDb5c9XkM" target="_blank" rel="noopener noreferrer" className="block">
              <div className="container mx-auto flex items-center justify-center gap-3 text-white pr-8">
                <span className="text-sm font-medium">Join our Discord community — connect with researchers & get support</span>
                <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 hidden sm:block" />
              </div>
            </a>
            <button onClick={() => setShowDiscordBanner(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-1" aria-label="Dismiss banner">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      {!showDiscordBanner && <div className="pt-[60px]" />}

      {/* Ice Elixir banner */}
      <AnimateOnScroll animation="fade-up">
        <div className="container mx-auto px-4 pt-6">
          <Link to="/products?product=frostskin-serum" className="block group">
            <div className="relative rounded-xl overflow-hidden bg-gradient-to-r from-ice-blue/10 via-glacier/5 to-arctic-teal/10 border border-ice-blue/20 glow-border hover:border-ice-blue/40 transition-all duration-300">
              <div className="absolute top-0 right-0 w-64 h-64 bg-ice-blue/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
              <div className="relative z-10 px-6 py-4 md:px-8 md:py-5 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-ice-blue/15 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-ice-blue" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold uppercase tracking-wider text-ice-blue bg-ice-blue/10 px-2 py-0.5 rounded">New</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-destructive bg-destructive/10 px-2 py-0.5 rounded">Limited</span>
                    </div>
                    <p className="text-sm md:text-base font-medium mt-1">
                      <span className="text-foreground">Ice Elixir</span>
                      <span className="text-muted-foreground"> — GHK-Cu 3.33% Facial Serum. Only 13 units in stock.</span>
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

      {/* HERO — editorial UK postal masthead */}
      <section className="relative overflow-hidden border-b border-border/20">
        <div className="container mx-auto px-4 pt-12 pb-16 md:pt-20 md:pb-24">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7 fade-in-up">
              <div className="flex items-center gap-2 mb-5">
                <span className="text-[11px] uppercase tracking-[0.35em] text-aurora">Posted from the UK</span>
                <span className="h-px flex-1 bg-gradient-to-r from-aurora/60 via-border/50 to-transparent max-w-[180px]" />
                <span className="text-[11px] uppercase tracking-[0.25em] text-muted-foreground">Vol. 03 · 2026</span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[0.95] tracking-tight">
                <span className="block text-foreground">Posted today.</span>
                <span className="block bg-gradient-to-r from-ice-blue via-arctic-teal to-aurora bg-clip-text text-transparent">
                  Delivered tomorrow.
                </span>
              </h1>

              <p className="text-base md:text-lg text-muted-foreground mt-7 max-w-xl leading-relaxed">
                A small UK research-peptide outfit. 99%+ purity, plain packaging, no card readers — just
                Royal Mail 24 next-day or anonymous InPost lockers, paid in crypto.
              </p>

              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/products">
                  <Button size="lg" className="bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold px-7 gap-2">
                    Open the Catalogue <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/how-to-pay-crypto">
                  <Button size="lg" variant="outline" className="border-aurora/40 text-aurora hover:bg-aurora/10 hover:text-aurora font-semibold px-7">
                    How to pay in crypto
                  </Button>
                </Link>
              </div>

              {/* Despatch ticker */}
              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Despatch open</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-ice-blue" /> Cutoff 14:00 GMT</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3 text-aurora" /> Posted from West Yorkshire</span>
              </div>
            </div>

            {/* Right — shipping menu card */}
            <div className="lg:col-span-5 fade-in-up animate-delay-200">
              <div className="relative rounded-2xl border border-border/40 bg-card/40 backdrop-blur-xl p-6 overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-ice-blue/15 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-aurora/15 rounded-full blur-3xl" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Despatch options</span>
                    <span className="text-[10px] uppercase tracking-[0.25em] text-aurora">UK only · 🇬🇧</span>
                  </div>

                  {/* Royal Mail card */}
                  <div className="rounded-xl border border-ice-blue/30 bg-ice-blue/[0.05] p-4 mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-ice-blue" />
                        <span className="text-sm font-semibold">Royal Mail 24 Tracked</span>
                      </div>
                      <span className="text-lg font-bold text-ice-blue">£6</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Posted same day if you order before 14:00 · Next-day tracked to your door.</p>
                  </div>

                  {/* InPost card */}
                  <div className="rounded-xl border border-aurora/30 bg-aurora/[0.05] p-4 mb-5">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-aurora" />
                        <span className="text-sm font-semibold">InPost Locker</span>
                      </div>
                      <span className="text-[11px] uppercase tracking-wider text-aurora">Anonymous</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Generate an InPost QR code, send it across, we drop it off. You pay InPost's fee directly.</p>
                  </div>

                  {/* Payment row */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/30">
                    {['USDT', 'USDC', 'BTC'].map((c) => (
                      <div key={c} className="rounded-lg bg-secondary/30 py-2 text-center text-[11px] font-bold tracking-wider text-foreground/80">
                        {c}
                      </div>
                    ))}
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-3 text-center">Crypto checkout only</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="mt-14 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30 rounded-2xl overflow-hidden border border-border/40 fade-in-up animate-delay-400">
            {[
              { v: <AnimatedCounter end={99} suffix="%+" />, l: 'Purity' },
              { v: <AnimatedCounter end={150} suffix="+" />, l: 'Reviews' },
              { v: '24h', l: 'Royal Mail' },
              { v: 'UK 🇬🇧', l: 'Despatch' },
            ].map((s, i) => (
              <div key={i} className="bg-card/60 backdrop-blur-sm py-5 px-3 text-center">
                <div className="text-2xl md:text-3xl font-urbanist font-bold text-ice-blue">{s.v}</div>
                <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <AnimateOnScroll animation="fade-in">
        <section className="py-5 border-y border-border/20 bg-secondary/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 md:gap-12">
              {[
                { icon: FlaskConical, label: 'Research Use Only' },
                { icon: Lock, label: 'Crypto Checkout' },
                { icon: Truck, label: 'Royal Mail 24' },
                { icon: Package, label: 'InPost Lockers' },
                { icon: MapPin, label: 'Posted from the UK' },
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

      {/* How it works — 3 numbered steps */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <AnimateOnScroll>
            <div className="grid md:grid-cols-12 gap-6 items-end mb-12 border-b border-border/30 pb-5">
              <div className="md:col-span-8">
                <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-2">How it works</div>
                <h2 className="text-3xl md:text-4xl font-bold">From basket to letterbox in 24 hours.</h2>
              </div>
              <div className="md:col-span-4 md:text-right text-sm text-muted-foreground">
                Three steps. No card readers, no signatures, no awkwardness.
              </div>
            </div>
          </AnimateOnScroll>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { n: '01', title: 'Order before 14:00', desc: 'Drop what you need into the basket. Royal Mail 24 (£6) or send us an InPost QR code for anonymous drop-off.' },
              { n: '02', title: 'Pay in crypto', desc: 'USDT, USDC or BTC. We send wallet details on your order confirmation. Reply with the TXID and you\'re done.' },
              { n: '03', title: 'Posted the same day', desc: 'Plain packaging, no markings. Tracking number lands in your inbox the moment we\'ve dropped it at the post office.' },
            ].map((s, i) => (
              <AnimateOnScroll key={s.n} delay={i * 100} animation="fade-up">
                <div className="relative frosted-glass rounded-xl p-6 glow-border h-full">
                  <div className="text-5xl font-bold text-ice-blue/20 mb-3">{s.n}</div>
                  <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </AnimateOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Why trust us — bento grid */}
      <section className="py-20 px-4 border-t border-border/20">
        <div className="container mx-auto max-w-6xl">
          <AnimateOnScroll>
            <div className="text-center mb-12">
              <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-2">Why Yeti</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">A small UK shop, taken seriously.</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">No empire, no hype — one bench, one despatch, run properly.</p>
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

      {/* Discord CTA */}
      <AnimateOnScroll animation="scale-in">
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <a href="https://discord.gg/seDb5c9XkM" target="_blank" rel="noopener noreferrer" className="block group">
              <div className="relative rounded-2xl overflow-hidden bg-[#5865F2] p-8 md:p-12 text-center hover:shadow-[0_0_40px_rgba(88,101,242,0.3)] transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#5865F2] via-[#4752C4] to-[#3C45A5]" />
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Join Our Discord</h2>
                  <p className="text-white/80 text-base md:text-lg mb-6 max-w-xl mx-auto">
                    Live order updates, restock pings and a place to chat with other researchers.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white text-[#5865F2] font-semibold px-6 py-3 rounded-lg group-hover:bg-white/90 transition-colors">
                    Join Discord <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
