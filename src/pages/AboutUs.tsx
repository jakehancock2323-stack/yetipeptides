import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Award, Globe, Shield, Zap, FileText, Users, Target } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title="About Us - UK Research Peptide Supplier | Yeti Peptides"
        description="Yeti Peptides provides research-grade peptides with worldwide shipping. COA verified, 99%+ purity. Supporting researchers with premium laboratory-grade compounds."
        keywords="peptide supplier UK, research peptides, peptide vendor, laboratory peptides, COA verified peptides, worldwide peptide shipping"
        canonical="https://yetipeptides.com/about"
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
          About Yeti Peptides - UK & Worldwide Research Peptide Supplier
        </h1>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Description */}
          <div className="frosted-glass rounded-xl p-8">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Yeti Peptides is a trusted UK-based research peptide supplier providing premium research-grade compounds with a strong focus on quality, consistency, and transparency. All products are sourced from trusted manufacturers and supported with Certificates of Analysis (COAs) available on request.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We offer worldwide discreet shipping, secure cryptocurrency checkout, and responsive customer support. Our mission is to support researchers globally with reliable, laboratory-grade materials including GLP-1 peptides, Semaglutide, Retatrutide, Cagrilintide, and other research compounds, while maintaining industry-leading standards.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every peptide product in our catalogue undergoes rigorous testing to ensure it meets the highest standards of purity (99%+) and quality. We are committed to transparency and provide Certificates of Analysis for all our research peptides upon request.
            </p>
          </div>

          {/* Core Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
              <p className="text-muted-foreground">
                Every product is COA-verified and tested to meet the highest research standards. We source only from certified laboratories with stringent quality control.
              </p>
            </div>

            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--glacier))] to-[hsl(var(--aurora))] flex items-center justify-center mb-4">
                <Globe className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Worldwide Delivery</h3>
              <p className="text-muted-foreground">
                Discreet, secure shipping to researchers globally. Fast processing and tracking for all orders with temperature-controlled packaging.
              </p>
            </div>

            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--aurora))] to-[hsl(var(--arctic-teal))] flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Reputation</h3>
              <p className="text-muted-foreground">
                Built on trust and transparency within the research community. Trusted by researchers worldwide for their critical research needs.
              </p>
            </div>

            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--arctic-teal))] to-[hsl(var(--ice-blue))] flex items-center justify-center mb-4">
                <Zap className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-muted-foreground">
                Our knowledgeable team provides responsive, professional assistance. Get help with product selection, storage, and research applications.
              </p>
            </div>

            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--ice-blue))] to-[hsl(var(--aurora))] flex items-center justify-center mb-4">
                <FileText className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3">COA Verified</h3>
              <p className="text-muted-foreground">
                Certificates of Analysis available for all products. Request COAs to verify purity, composition, and quality for your research.
              </p>
            </div>

            <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--glacier))] to-[hsl(var(--ice-blue))] flex items-center justify-center mb-4">
                <Target className="w-7 h-7 text-background" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Research Focused</h3>
              <p className="text-muted-foreground">
                All products are strictly for laboratory research purposes. We support the scientific community with reliable research materials.
              </p>
            </div>
          </div>

          {/* Research Use Notice */}
          <div className="frosted-glass rounded-xl p-6 border-2 border-destructive/30">
            <h3 className="text-xl font-semibold mb-3 text-destructive">Important Notice</h3>
            <p className="text-muted-foreground">
              All Yeti Peptides products are intended for <strong className="text-foreground">research use only</strong>. They are not for human consumption, diagnostic, or therapeutic use. All purchases must comply with local regulations and laws.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
