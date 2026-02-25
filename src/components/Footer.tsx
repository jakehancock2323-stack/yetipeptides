import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Send, FlaskConical } from 'lucide-react';
import yetiLogo from '@/assets/yeti-logo.png';

export default function Footer() {
  return (
    <footer className="border-t border-border/30 bg-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <img src={yetiLogo} alt="Yeti Peptides" className="w-8 h-8 object-contain" />
              <span className="text-lg font-bold text-ice-blue tracking-wider">YETI PEPTIDES</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Professional research peptide supplier. Premium quality compounds for laboratory use only. Trusted by researchers worldwide.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://discord.gg/seDb5c9XkM"
                className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-ice-blue hover:bg-secondary transition-all"
                target="_blank" rel="noopener noreferrer" aria-label="Discord"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a 
                href="https://t.me/yetipeptides"
                className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-ice-blue hover:bg-secondary transition-all"
                target="_blank" rel="noopener noreferrer" aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a 
                href="mailto:yetipeptides@protonmail.com"
                className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-ice-blue hover:bg-secondary transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-foreground">Navigate</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'Products' },
                { to: '/coa-request', label: 'COA Request' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted-foreground hover:text-ice-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div className="md:col-span-3">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-foreground">Policies</h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { to: '/privacy-policy', label: 'Privacy Policy' },
                { to: '/terms-conditions', label: 'Terms & Conditions' },
                { to: '/shipping-returns', label: 'Shipping & Returns' },
                { to: '/research-disclaimer', label: 'Research Disclaimer' },
                { to: '/how-to-pay-crypto', label: 'How to Pay with Crypto' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted-foreground hover:text-ice-blue transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-foreground">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:yetipeptides@protonmail.com" className="text-muted-foreground hover:text-ice-blue transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>yetipeptides@protonmail.com</span>
                </a>
              </li>
              <li>
                <a href="https://discord.gg/seDb5c9XkM" className="text-muted-foreground hover:text-ice-blue transition-colors flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 flex-shrink-0" />
                  <span>Discord Community</span>
                </a>
              </li>
              <li>
                <a href="https://t.me/yetipeptides" className="text-muted-foreground hover:text-ice-blue transition-colors flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                  <Send className="w-4 h-4 flex-shrink-0" />
                  <span>Telegram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer + Copyright */}
      <div className="border-t border-border/20">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <FlaskConical className="w-4 h-4 text-destructive" />
              <p className="text-sm font-semibold text-destructive">FOR RESEARCH USE ONLY – NOT FOR HUMAN CONSUMPTION</p>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              All products sold by Yeti Peptides are strictly for laboratory research purposes. Not intended for human or animal consumption, diagnostic, or therapeutic use.
            </p>
          </div>
          <p className="text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} Yeti Peptides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
