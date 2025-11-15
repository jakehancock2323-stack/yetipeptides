import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import { Mail, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-screen pb-20">
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
          Contact Us
        </h1>

        <div className="max-w-2xl mx-auto">
          {/* Contact Information */}
          <div className="frosted-glass rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--ice-blue))]/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-[hsl(var(--ice-blue))]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a 
                    href="mailto:yetipeptides@protonmail.com"
                    className="text-muted-foreground hover:text-[hsl(var(--ice-blue))] transition-colors"
                  >
                    yetipeptides@protonmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--ice-blue))]/20 flex items-center justify-center flex-shrink-0">
                  <Send className="w-6 h-6 text-[hsl(var(--ice-blue))]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Telegram</h3>
                  <a 
                    href="https://t.me/yetipeptides" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--ice-blue))] transition-colors"
                  >
                    @yetipeptides
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[hsl(var(--ice-blue))]/20 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-[hsl(var(--ice-blue))]" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Discord</h3>
                  <a 
                    href="https://discord.gg/RFNxjhf2up" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-[hsl(var(--ice-blue))] transition-colors"
                  >
                    Join Server
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 bg-[hsl(var(--ice-blue))]/10 rounded-lg border border-[hsl(var(--ice-blue))]/20">
              <p className="text-sm text-center">
                <strong>Response Time:</strong> We typically respond within 24 hours during business days.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
