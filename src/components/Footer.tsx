import { Mail, MessageCircle, Send, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        {/* Important Disclaimer */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-center mb-6">Important Disclaimer</h3>
          <div className="max-w-4xl mx-auto space-y-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Research Use Only:</strong> All products are intended for research purposes only. Not for human or animal consumption, diagnostic, or therapeutic use.
            </p>
            <p>
              <strong className="text-foreground">Legal Responsibility:</strong> By placing an order, you acknowledge that you are responsible for ensuring compliance with all applicable laws and regulations in your country regarding the purchase, possession, and use of research peptides.
            </p>
            <p>
              <strong className="text-foreground">Age Requirement:</strong> You must be 18 years or older to place an order. All products should be handled by qualified researchers in appropriate laboratory settings.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="border-t border-border pt-8">
          <h3 className="text-xl font-bold text-center mb-6">Contact Information</h3>
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            <a 
              href="mailto:support@yetipeptides.com" 
              className="flex items-center gap-2 hover:text-[hsl(var(--ice-blue))] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail className="w-4 h-4" />
              <span className="text-sm">support@yetipeptides.com</span>
            </a>
            <a 
              href="https://discord.gg/YOUR_DISCORD_INVITE" 
              className="flex items-center gap-2 hover:text-[hsl(var(--ice-blue))] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">Discord</span>
            </a>
            <a 
              href="https://t.me/YOUR_TELEGRAM_USERNAME" 
              className="flex items-center gap-2 hover:text-[hsl(var(--ice-blue))] transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Send className="w-4 h-4" />
              <span className="text-sm">Telegram</span>
            </a>
            <a 
              href="/" 
              className="flex items-center gap-2 hover:text-[hsl(var(--ice-blue))] transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm">Website</span>
            </a>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Yeti Peptides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
