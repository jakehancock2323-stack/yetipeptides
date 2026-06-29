import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import {
  Shield, FlaskConical, FileText, Microscope, BadgeCheck, ClipboardCheck,
  Truck, Package, HeadphonesIcon, MapPin
} from 'lucide-react';

export default function AboutUs() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Yeti Peptides',
    'url': 'https://yetipeptides.com',
    'description': 'UK-based research peptide supplier. Royal Mail 24 tracked (typically 2 days) or anonymous InPost lockers. Crypto checkout only.',
    'email': 'yetipeptides@protonmail.com',
    'areaServed': 'United Kingdom',
  };

  return (
    <div className="min-h-screen pb-20">
      <SEO
        title="About Yeti Peptides – UK Research Peptide Supplier"
        description="A small UK-based research peptide outfit. 99%+ purity, plain packaging, Royal Mail 24 or anonymous InPost lockers."
        canonical="https://yetipeptides.com/about"
        schema={aboutSchema}
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28">
        {/* Editorial masthead */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-16 md:mb-20 max-w-6xl mx-auto border-b border-border/30 pb-10">
          <AnimateOnScroll animation="fade-right" className="lg:col-span-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-4">Yeti Peptides · UK Domestic</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
              A small UK bench. <span className="bg-gradient-to-r from-ice-blue to-aurora bg-clip-text text-transparent">Done properly.</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              No empire, no hype. One UK-based outfit running a tight despatch of research-grade
              peptides — posted via Royal Mail 24 next-day or anonymous InPost lockers, paid in crypto.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-left" delay={150} className="lg:col-span-4">
            <div className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-6 space-y-4">
              {[
                { label: 'Purity standard', value: '99%+' },
                { label: 'Despatch from', value: 'West Yorkshire 🇬🇧' },
                { label: 'Cutoff', value: '14:00 GMT' },
                { label: 'Checkout', value: 'Crypto only' },
              ].map((row) => (
                <div key={row.label} className="flex items-baseline justify-between border-b border-border/20 pb-2 last:border-0 last:pb-0">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{row.label}</span>
                  <span className="text-sm font-semibold text-foreground">{row.value}</span>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>

        <div className="max-w-6xl mx-auto space-y-16 md:space-y-20">
          {/* 01 — Quality */}
          <section>
            <AnimateOnScroll>
              <div className="flex items-end justify-between mb-8 border-b border-border/30 pb-4">
                <h2 className="text-2xl md:text-3xl font-bold">Quality Assurance</h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">01 / Standards</span>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Microscope, title: 'Analytical Testing', desc: 'HPLC and Mass Spectrometry verification of identity and purity. Data available on request.' },
                { icon: BadgeCheck, title: 'Purity Standards', desc: 'A strict 99%+ purity threshold across all peptides. Anything below spec doesn\'t leave the bench.' },
                { icon: ClipboardCheck, title: 'Research Grade', desc: 'Prepared and handled to research-grade standards — strictly for laboratory use.' },
                { icon: FileText, title: 'COA on Request', desc: 'Certificates of Analysis available on request, for verification before or after delivery.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <AnimateOnScroll key={title} delay={i * 80}>
                  <div className="frosted-glass rounded-xl p-6 hover:bg-card/70 transition-all duration-300 h-full glow-border">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-ice-blue/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-ice-blue" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </section>

          {/* 02 — Despatch */}
          <section>
            <AnimateOnScroll>
              <div className="flex items-end justify-between mb-8 border-b border-border/30 pb-4">
                <h2 className="text-2xl md:text-3xl font-bold">Despatch</h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">02 / Logistics</span>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Truck, title: 'Royal Mail 24', desc: 'Next-day tracked, flat £6. Drop at the local sorting office before 14:00 — usually with you tomorrow.' },
                { icon: Package, title: 'InPost Lockers', desc: 'For people who want anonymity — send us a locker QR, we post, you collect. You pay InPost\'s fee directly.' },
                { icon: MapPin, title: 'Plain Packaging', desc: 'No external markings. No "Yeti Peptides" on the label. Nothing that suggests what\'s inside.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <AnimateOnScroll key={title} delay={i * 100}>
                  <div className="frosted-glass rounded-xl p-6 hover:bg-card/70 transition-all duration-300 h-full">
                    <div className="w-10 h-10 rounded-lg bg-aurora/15 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-aurora" />
                    </div>
                    <h3 className="text-base font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </section>

          {/* 03 — Service */}
          <section>
            <AnimateOnScroll>
              <div className="flex items-end justify-between mb-8 border-b border-border/30 pb-4">
                <h2 className="text-2xl md:text-3xl font-bold">Service</h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">03 / Support</span>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: HeadphonesIcon, title: 'Real-person support', desc: 'ProtonMail, Discord, Telegram. Usually replies same day — overnight at the latest.' },
                { icon: FileText, title: 'Honest stock counts', desc: 'If a vial count says "3 left", that\'s 3 left. No fake urgency banners, no oversold drama.' },
              ].map(({ icon: Icon, title, desc }, i) => (
                <AnimateOnScroll key={title} delay={i * 100} animation="fade-up">
                  <div className="frosted-glass rounded-xl p-6 hover:bg-card/70 transition-all duration-300 h-full">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-ice-blue/15 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-5 h-5 text-ice-blue" />
                      </div>
                      <div>
                        <h3 className="text-base font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </section>

          {/* Research notice */}
          <AnimateOnScroll animation="scale-in">
            <div className="rounded-xl p-6 md:p-8 border border-destructive/30 bg-destructive/5">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-7 h-7 text-destructive" />
                <h2 className="text-lg md:text-xl font-semibold text-destructive">Research Use Only</h2>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                Everything we sell is intended strictly for <strong className="text-foreground">laboratory research purposes</strong>.
                Not approved for human or veterinary use, not for diagnostic or therapeutic applications.
                Purchasers must be qualified researchers and are responsible for compliance with all applicable UK regulations.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      <Footer />
    </div>
  );
}
