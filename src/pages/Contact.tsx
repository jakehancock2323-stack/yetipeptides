import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, MessageCircle, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  // Honeypot — real users never fill this, bots usually will
  const [website, setWebsite] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    if (formData.name.length > 200 || formData.message.length > 5000) {
      toast.error('Message is too long');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-contact-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, website }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success('Message sent successfully! We will get back to you within 24 hours.');
      setFormData({ name: '', email: '', message: '' });
      setWebsite('');
    } catch {
      toast.error("Failed to send message. Please try again or email us directly at yetipeptides@protonmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title="Contact Us - Research Peptide Inquiries | Yeti Peptides"
        description="Contact Yeti Peptides for research peptide inquiries, COA requests, and support. UK & worldwide peptide supplier. Email, Telegram, and Discord support available."
        keywords="contact peptide supplier, peptide inquiries, research peptides support, COA request, peptide vendor contact"
        canonical="https://yetipeptides.com/contact"
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Magazine header */}
          <div className="mb-10 md:mb-12 grid md:grid-cols-12 gap-6 items-end border-b border-border/30 pb-6">
            <div className="md:col-span-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-3">Get in Touch</div>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                Questions, COA requests, or research enquiries?
              </h1>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="text-sm text-muted-foreground">We typically respond within 24 hours during business days.</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-10">
            {/* Contact Information — sidebar */}
            <div className="lg:col-span-5 lg:order-1 order-2 space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'yetipeptides@protonmail.com', href: 'mailto:yetipeptides@protonmail.com' },
                { icon: Send, label: 'Telegram', value: '@yetipeptides', href: 'https://t.me/yetipeptides', external: true },
                { icon: MessageCircle, label: 'Discord', value: 'Join Server', href: 'https://discord.gg/5AVhbfjg3', external: true },
              ].map(({ icon: Icon, label, value, href, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="block frosted-glass rounded-xl p-5 hover:bg-card/70 hover:border-ice-blue/30 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-lg bg-ice-blue/15 flex items-center justify-center flex-shrink-0 group-hover:bg-ice-blue/25 transition-colors">
                      <Icon className="w-5 h-5 text-ice-blue" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
                      <div className="text-sm font-medium truncate">{value}</div>
                    </div>
                  </div>
                </a>
              ))}

              <div className="rounded-xl border border-aurora/30 bg-aurora/5 p-5">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-aurora">Tip:</strong> For order-specific questions, please include your order ID in the message so we can locate it quickly.
                </p>
              </div>
            </div>

            {/* Contact Form — main */}
            <div className="lg:col-span-7 lg:order-2 order-1">
              <div className="frosted-glass rounded-2xl p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot */}
                  <div aria-hidden="true" style={{ position: 'absolute', left: '-10000px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
                    <label htmlFor="website">Website</label>
                    <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} required maxLength={200} placeholder="Your name" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange('email', e.target.value)} required maxLength={320} placeholder="your.email@example.com" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" value={formData.message} onChange={(e) => handleChange('message', e.target.value)} required maxLength={5000} placeholder="How can we help you?" className="min-h-[180px]" />
                  </div>

                  <Button type="submit" disabled={isSubmitting} className="w-full bg-ice-blue hover:bg-ice-blue/90 text-background font-semibold" size="lg">
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </div>
  );
}
