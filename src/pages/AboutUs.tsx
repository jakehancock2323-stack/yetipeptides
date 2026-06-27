import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { 
  Award, Globe, Shield, FlaskConical, FileText, Microscope, 
  Thermometer, Package, BadgeCheck, ClipboardCheck, Truck, HeadphonesIcon
} from 'lucide-react';

export default function AboutUs() {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Yeti Peptides",
    "url": "https://yetipeptides.com",
    "description": "Professional research peptide supplier committed to quality, consistency, and scientific standards.",
    "email": "yetipeptides@protonmail.com",
    "areaServed": "Worldwide"
  };

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title="About Us – Research Peptide Supplier | Yeti Peptides"
        description="Yeti Peptides — research peptide supplier with COA-verified compounds, batch testing and scientific quality standards. Worldwide shipping."
        keywords="peptide supplier, research laboratory supplier, peptide quality control, COA verified peptides, research peptide vendor, laboratory peptides UK"
        canonical="https://yetipeptides.com/about"
        schema={aboutSchema}
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28">
        {/* Asymmetric magazine header */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 md:mb-20 max-w-6xl mx-auto">
          <AnimateOnScroll animation="fade-right" className="lg:col-span-7">
            <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-4">Yeti Peptides · Est. for Research</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
              Built for the <span className="bg-gradient-to-r from-ice-blue to-aurora bg-clip-text text-transparent">scientific community</span>.
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Yeti Peptides provides research-grade peptide compounds to laboratories worldwide.
              We maintain rigorous quality control, transparent documentation, and professional service
              to support legitimate research applications.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll animation="fade-left" delay={150} className="lg:col-span-5">
            <div className="relative aspect-square max-w-sm mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-ice-blue/30 via-aurora/20 to-transparent blur-2xl" />
              <div className="relative h-full rounded-3xl border border-border/40 bg-card/40 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center px-6">
                  <FlaskConical className="w-16 h-16 text-ice-blue mx-auto mb-4" />
                  <div className="text-5xl font-bold text-foreground">99%+</div>
                  <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mt-2">Purity Standard</div>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Quality Assurance Section */}
          <div className="mb-16 md:mb-20">
            <AnimateOnScroll>
              <div className="flex items-end justify-between mb-8 border-b border-border/30 pb-4">
                <h2 className="text-2xl md:text-3xl font-bold">Quality Assurance</h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">01 / Standards</span>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Microscope, title: 'Analytical Testing', desc: 'All compounds undergo HPLC and Mass Spectrometry analysis to verify identity, purity, and composition. Testing is performed on each production batch.' },
                { icon: BadgeCheck, title: 'Purity Standards', desc: 'We maintain strict purity thresholds of 99%+ for all peptide products. Compounds failing to meet specifications are not released.' },
                { icon: ClipboardCheck, title: 'Batch Documentation', desc: 'Complete batch records are maintained for full traceability. Each product is assigned a unique lot number linked to testing documentation.' },
                { icon: FileText, title: 'COA Verification', desc: 'Certificates of Analysis are available on request for all products, providing complete analytical data for research verification.' },
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
          </div>

          {/* Supply Chain & Operations */}
          <div className="mb-16 md:mb-20">
            <AnimateOnScroll>
              <div className="flex items-end justify-between mb-8 border-b border-border/30 pb-4">
                <h2 className="text-2xl md:text-3xl font-bold">Operations</h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground hidden sm:block">02 / Logistics</span>
              </div>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Globe, title: 'Global Supply', desc: 'Established supplier relationships with certified manufacturers. Consistent product availability worldwide.' },
                { icon: Thermometer, title: 'Cold Chain', desc: 'Temperature-controlled storage and shipping protocols to maintain compound stability and integrity throughout transit.' },
                { icon: Package, title: 'Discreet Packaging', desc: 'Secure, discreet packaging designed to protect products during international shipping with full tracking.' },
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
          </div>

          {/* Additional Services — zigzag */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
            {[
              { icon: Truck, title: 'Worldwide Delivery', desc: 'International shipping to researchers globally with tracked delivery services. Standard processing within 1-2 business days.' },
              { icon: HeadphonesIcon, title: 'Technical Support', desc: 'Responsive customer support available via email, Discord, and Telegram. Assistance with product enquiries and order status.' },
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

          {/* Research Use Notice */}
          <AnimateOnScroll animation="scale-in">
            <div className="rounded-xl p-6 md:p-8 border border-destructive/30 bg-destructive/5 mb-12">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-7 h-7 text-destructive" />
                <h2 className="text-lg md:text-xl font-semibold text-destructive">Research Use Only</h2>
              </div>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                All products supplied by Yeti Peptides are intended strictly for <strong className="text-foreground">laboratory research purposes</strong>.
                They are not approved for human or veterinary use, diagnostic applications, or therapeutic purposes.
                Purchasers must be qualified researchers and are responsible for ensuring compliance with all
                applicable regulations in their jurisdiction.
              </p>
            </div>
          </AnimateOnScroll>
        </div>
      </div>


      <Footer />
    </div>
  );
}
