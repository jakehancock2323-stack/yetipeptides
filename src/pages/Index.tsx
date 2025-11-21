import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import { Award, Globe, Shield, Zap, MessageCircle } from 'lucide-react';
import yetiLogo from '@/assets/yeti-logo.png';
export default function Index() {
  return <div className="min-h-screen">
      <Snowfall />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 winter-gradient">
        <div className="container mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <img src={yetiLogo} alt="Yeti Peptides Logo" className="w-64 h-64 md:w-80 md:h-80 object-contain drop-shadow-[0_0_40px_rgba(71,217,217,0.4)] hover:drop-shadow-[0_0_60px_rgba(71,217,217,0.6)] transition-all duration-300 rounded-full border-4 border-[hsl(var(--ice-blue))]/30 p-4 bg-card/20" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-[hsl(var(--ice-blue))] via-[hsl(var(--glacier))] to-[hsl(var(--aurora))] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(71,217,217,0.5)] [text-shadow:_0_0_30px_rgb(71_217_217_/_40%)]">
            Power. Precision. Performance.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Premium Research Peptides & Advanced Wellness Compounds
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/products">
              <Button size="lg" className="bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background">
                Browse Products
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Discord Community Section */}
      <section className="py-16 px-4 -mt-10">
        <div className="container mx-auto max-w-4xl">
          <div className="frosted-glass rounded-2xl p-8 md:p-12 text-center ice-glow border-2 border-[hsl(var(--ice-blue))]/30">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-background" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--ice-blue))] via-[hsl(var(--glacier))] to-[hsl(var(--aurora))] bg-clip-text text-transparent">
              Join Our Community
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect with fellow researchers, get instant support, and stay updated on new products and exclusive deals. Our Discord community is active 24/7!
            </p>
            <a 
              href="https://discord.gg/seDb5c9XkM"
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] hover:from-[hsl(var(--ice-blue))]/90 hover:to-[hsl(var(--glacier))]/90 text-background font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="mr-2" />
                Join Discord Server
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="frosted-glass rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About Yeti Peptides</h2>
            <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              Leading the frontier of research peptide distribution with uncompromising quality, 
              scientific integrity, and customer excellence. Your trusted partner in advanced research compounds.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] flex items-center justify-center mb-4">
                  <Award className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Every product is COA-verified and tested to meet the highest research standards. 
                  We source only from certified laboratories with stringent quality control.
                </p>
              </div>

              <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--glacier))] to-[hsl(var(--aurora))] flex items-center justify-center mb-4">
                  <Globe className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Worldwide Delivery</h3>
                <p className="text-muted-foreground">
                  Discreet, secure shipping to researchers globally. Fast processing and tracking 
                  for all orders with temperature-controlled packaging.
                </p>
              </div>

              <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--aurora))] to-[hsl(var(--arctic-teal))] flex items-center justify-center mb-4">
                  <Shield className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Trusted Reputation</h3>
                <p className="text-muted-foreground">
                  Built on trust and transparency within the research community. Trusted by 
                  researchers worldwide for their critical research needs.
                </p>
              </div>

              <div className="frosted-glass rounded-xl p-6 hover:ice-glow transition-all duration-300">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--arctic-teal))] to-[hsl(var(--ice-blue))] flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
                <p className="text-muted-foreground">
                  Our knowledgeable team provides responsive, professional assistance. Get help 
                  with product selection, storage, and research applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-[hsl(var(--deep-freeze))]/30">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Researchers Choose Yeti Peptides</h2>
            <p className="text-lg text-muted-foreground">
              Join the research community who trust us for their peptide research needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="frosted-glass rounded-xl p-6 text-center hover:ice-glow transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] bg-clip-text text-transparent mb-2">
                99%+
              </div>
              <h3 className="font-semibold mb-2">Purity Guaranteed</h3>
              <p className="text-sm text-muted-foreground">COA verification for every batch</p>
            </div>

            <div className="frosted-glass rounded-xl p-6 text-center hover:ice-glow transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--glacier))] to-[hsl(var(--aurora))] bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <h3 className="font-semibold mb-2">Support Available</h3>
              <p className="text-sm text-muted-foreground">
                Expert guidance whenever you need it via email and Discord
              </p>
            </div>

            <div className="frosted-glass rounded-xl p-6 text-center hover:ice-glow transition-all duration-300">
              <div className="text-4xl font-bold bg-gradient-to-r from-[hsl(var(--aurora))] to-[hsl(var(--arctic-teal))] bg-clip-text text-transparent mb-2">
                Fast
              </div>
              <h3 className="font-semibold mb-2">Shipping Worldwide</h3>
              <p className="text-sm text-muted-foreground">
                Discreet packaging with tracking and temperature control
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </div>;
}