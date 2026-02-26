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
        title="About Us - Research Peptide Laboratory Supplier | Yeti Peptides"
        description="Yeti Peptides is a professional research peptide supplier committed to quality assurance, batch testing, and scientific standards. COA verified compounds with worldwide shipping."
        keywords="peptide supplier, research laboratory supplier, peptide quality control, COA verified peptides, research peptide vendor, laboratory peptides UK"
        canonical="https://yetipeptides.com/about"
        schema={aboutSchema}
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <AnimateOnScroll>
            <div className="text-center mb-16">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-ice-blue to-glacier flex items-center justify-center mx-auto mb-6">
                <FlaskConical className="w-10 h-10 text-background" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-ice-blue to-frost bg-clip-text text-transparent">
                About Yeti Peptides
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Professional research peptide supplier committed to quality, consistency, and scientific standards
              </p>
            </div>
          </AnimateOnScroll>

          {/* Mission Statement */}
          <AnimateOnScroll delay={100}>
            <div className="frosted-glass rounded-xl p-8 mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
                Yeti Peptides provides research-grade peptide compounds to the global scientific community. 
                We maintain rigorous quality control standards, transparent documentation, and professional 
                service to support legitimate research applications worldwide.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Quality Assurance Section */}
          <div className="mb-16">
            <AnimateOnScroll>
              <h2 className="text-2xl font-bold mb-8 text-center">Quality Assurance Standards</h2>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Microscope, title: 'Analytical Testing', desc: 'All compounds undergo HPLC and Mass Spectrometry analysis to verify identity, purity, and composition. Testing is performed on each production batch.', gradient: 'from-ice-blue to-glacier' },
                { icon: BadgeCheck, title: 'Purity Standards', desc: 'We maintain strict purity thresholds of 99%+ for all peptide products. Compounds failing to meet specifications are not released.', gradient: 'from-glacier to-arctic-teal' },
                { icon: ClipboardCheck, title: 'Batch Documentation', desc: 'Complete batch records are maintained for full traceability. Each product is assigned a unique lot number linked to testing documentation.', gradient: 'from-arctic-teal to-ice-blue' },
                { icon: FileText, title: 'COA Verification', desc: 'Certificates of Analysis are available on request for all products, providing complete analytical data for research verification.', gradient: 'from-ice-blue to-aurora' },
              ].map(({ icon: Icon, title, desc, gradient }, i) => (
                <AnimateOnScroll key={title} delay={i * 100} animation={i % 2 === 0 ? 'fade-left' : 'fade-right'}>
                  <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300 h-full">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-6 h-6 text-background" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{title}</h3>
                        <p className="text-sm text-muted-foreground">{desc}</p>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Supply Chain & Operations */}
          <div className="mb-16">
            <AnimateOnScroll>
              <h2 className="text-2xl font-bold mb-8 text-center">Operations & Service</h2>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Globe, title: 'Global Supply Chain', desc: 'Established supplier relationships with certified manufacturers. Consistent product availability for research programs worldwide.', gradient: 'from-ice-blue to-glacier' },
                { icon: Thermometer, title: 'Cold Chain Logistics', desc: 'Temperature-controlled storage and shipping protocols to maintain compound stability and integrity throughout transit.', gradient: 'from-glacier to-arctic-teal' },
                { icon: Package, title: 'Professional Packaging', desc: 'Secure, discreet packaging designed to protect products during international shipping with full tracking provided.', gradient: 'from-arctic-teal to-ice-blue' },
              ].map(({ icon: Icon, title, desc, gradient }, i) => (
                <AnimateOnScroll key={title} delay={i * 120} animation="scale-in">
                  <div className="frosted-glass rounded-xl p-6 text-center hover:ice-glow transition-all duration-300 h-full">
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center mx-auto mb-4`}>
                      <Icon className="w-7 h-7 text-background" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{title}</h3>
                    <p className="text-sm text-muted-foreground">{desc}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>

          {/* Additional Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {[
              { icon: Truck, title: 'Worldwide Delivery', desc: 'International shipping to researchers globally with tracked delivery services. Standard processing within 1-2 business days.', gradient: 'from-aurora to-glacier' },
              { icon: HeadphonesIcon, title: 'Technical Support', desc: 'Responsive customer support available via email, Discord, and Telegram. Assistance with product enquiries and order status.', gradient: 'from-glacier to-ice-blue' },
            ].map(({ icon: Icon, title, desc, gradient }, i) => (
              <AnimateOnScroll key={title} delay={i * 100} animation="fade-up">
                <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300 h-full">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-background" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{title}</h3>
                      <p className="text-sm text-muted-foreground">{desc}</p>
                    </div>
                  </div>
                </div>
              </AnimateOnScroll>
            ))}
          </div>

          {/* Research Use Notice */}
          <AnimateOnScroll animation="scale-in">
            <div className="frosted-glass rounded-xl p-8 border-2 border-destructive/30">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-destructive" />
                <h2 className="text-xl font-semibold text-destructive">Research Use Only</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
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
