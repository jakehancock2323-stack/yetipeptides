import { Link } from 'react-router-dom';
import { Mail, MessageCircle, Send, FlaskConical } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-ice-blue">Yeti Peptides</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Professional research peptide supplier. Premium quality compounds for laboratory use only.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FlaskConical className="w-4 h-4 text-ice-blue" />
              <span>Research Use Only</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-ice-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-ice-blue transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/coa-request" className="text-muted-foreground hover:text-ice-blue transition-colors">
                  COA Request
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-ice-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-ice-blue transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-muted-foreground hover:text-ice-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-muted-foreground hover:text-ice-blue transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/shipping-returns" className="text-muted-foreground hover:text-ice-blue transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link to="/research-disclaimer" className="text-muted-foreground hover:text-ice-blue transition-colors">
                  Research Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/how-to-pay-crypto" className="text-muted-foreground hover:text-ice-blue transition-colors">
                  How to Pay with Crypto
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a 
                  href="mailto:yetipeptides@protonmail.com" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-ice-blue transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  <span>yetipeptides@protonmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/seDb5c9XkM"
                  className="flex items-center gap-2 text-muted-foreground hover:text-ice-blue transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discord Community</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/yetipeptides" 
                  className="flex items-center gap-2 text-muted-foreground hover:text-ice-blue transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="w-4 h-4" />
                  <span>Telegram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Research Use Disclaimer */}
        <div className="border-t border-border pt-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-center text-destructive font-semibold mb-2">
                FOR RESEARCH USE ONLY – NOT FOR HUMAN CONSUMPTION
              </p>
              <p className="text-xs text-center text-muted-foreground">
                All products sold by Yeti Peptides are strictly for laboratory research purposes. 
                Not intended for human or animal consumption, diagnostic, or therapeutic use. 
                Purchasers must comply with all applicable laws and regulations.
              </p>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Yeti Peptides. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}