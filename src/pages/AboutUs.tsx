import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
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

          {/* Mission Statement */}
          <div className="frosted-glass rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-3xl mx-auto">
              Yeti Peptides provides research-grade peptide compounds to the global scientific community. 
              We maintain rigorous quality control standards, transparent documentation, and professional 
              service to support legitimate research applications worldwide.
            </p>
          </div>

          {/* Quality Assurance Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Quality Assurance Standards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ice-blue to-glacier flex items-center justify-center flex-shrink-0">
                    <Microscope className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Analytical Testing</h3>
                    <p className="text-sm text-muted-foreground">
                      All compounds undergo HPLC and Mass Spectrometry analysis to verify identity, 
                      purity, and composition. Testing is performed on each production batch.
                    </p>
                  </div>
                </div>
              </div>

              <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-glacier to-arctic-teal flex items-center justify-center flex-shrink-0">
                    <BadgeCheck className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Purity Standards</h3>
                    <p className="text-sm text-muted-foreground">
                      We maintain strict purity thresholds of 99%+ for all peptide products. 
                      Compounds failing to meet specifications are not released.
                    </p>
                  </div>
                </div>
              </div>

              <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-arctic-teal to-ice-blue flex items-center justify-center flex-shrink-0">
                    <ClipboardCheck className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Batch Documentation</h3>
                    <p className="text-sm text-muted-foreground">
                      Complete batch records are maintained for full traceability. Each product 
                      is assigned a unique lot number linked to testing documentation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-ice-blue to-aurora flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">COA Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Certificates of Analysis are available on request for all products, 
                      providing complete analytical data for research verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Supply Chain & Operations */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Operations & Service</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="frosted-glass rounded-xl p-6 text-center hover:ice-glow transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ice-blue to-glacier flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Global Supply Chain</h3>
                <p className="text-sm text-muted-foreground">
                  Established supplier relationships with certified manufacturers. 
                  Consistent product availability for research programs worldwide.
                </p>
              </div>

              <div className="frosted-glass rounded-xl p-6 text-center hover:ice-glow transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-glacier to-arctic-teal flex items-center justify-center mx-auto mb-4">
                  <Thermometer className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Cold Chain Logistics</h3>
                <p className="text-sm text-muted-foreground">
                  Temperature-controlled storage and shipping protocols to maintain 
                  compound stability and integrity throughout transit.
                </p>
              </div>

              <div className="frosted-glass rounded-xl p-6 text-center hover:ice-glow transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-arctic-teal to-ice-blue flex items-center justify-center mx-auto mb-4">
                  <Package className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Professional Packaging</h3>
                <p className="text-sm text-muted-foreground">
                  Secure, discreet packaging designed to protect products during 
                  international shipping with full tracking provided.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-aurora to-glacier flex items-center justify-center flex-shrink-0">
                  <Truck className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Worldwide Delivery</h3>
                  <p className="text-sm text-muted-foreground">
                    International shipping to researchers globally with tracked delivery services. 
                    Standard processing within 1-2 business days.
                  </p>
                </div>
              </div>
            </div>

            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-glacier to-ice-blue flex items-center justify-center flex-shrink-0">
                  <HeadphonesIcon className="w-6 h-6 text-background" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Technical Support</h3>
                  <p className="text-sm text-muted-foreground">
                    Responsive customer support available via email, Discord, and Telegram. 
                    Assistance with product enquiries and order status.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Research Use Notice */}
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
        </div>
      </div>

      <Footer />
    </div>
  );
}