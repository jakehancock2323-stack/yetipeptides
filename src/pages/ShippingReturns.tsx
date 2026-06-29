import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import AnimateOnScroll from '@/components/AnimateOnScroll';
import { Truck, Package, AlertCircle, MapPin, Clock, FlaskConical } from 'lucide-react';

export default function ShippingReturns() {
  return (
    <div className="min-h-screen pb-20">
      <SEO
        title="Shipping & Returns – UK Domestic Delivery | Yeti Peptides"
        description="Royal Mail 24 next-day tracked or anonymous InPost lockers. UK domestic peptide delivery. Returns & damaged goods policy."
        canonical="https://yetipeptides.com/shipping-returns"
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-24 md:pt-28">
        <div className="max-w-4xl mx-auto mb-8 md:mb-10 grid md:grid-cols-12 gap-4 items-end border-b border-border/30 pb-6">
          <div className="md:col-span-8">
            <div className="text-[10px] uppercase tracking-[0.3em] text-aurora mb-2">UK Logistics</div>
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">Shipping & Returns</h1>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-sm text-muted-foreground">Tracked · Discreet · Posted from the UK 🇬🇧</p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Method cards */}
          <div className="grid md:grid-cols-2 gap-4">
            <AnimateOnScroll>
              <div className="frosted-glass rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-ice-blue/15 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-ice-blue" />
                  </div>
                  <h2 className="text-xl font-semibold">Royal Mail 24 Tracked</h2>
                </div>
                <p className="text-3xl font-bold text-ice-blue mb-2">£6.00</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Next-day tracked delivery to your registered address. Plain unmarked packaging.
                  Tracking number lands in your inbox the moment we drop it at the post office.
                </p>
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <div className="frosted-glass rounded-2xl p-6 h-full">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-aurora/15 flex items-center justify-center">
                    <Package className="w-5 h-5 text-aurora" />
                  </div>
                  <h2 className="text-xl font-semibold">InPost Locker</h2>
                </div>
                <p className="text-3xl font-bold text-aurora mb-2">Anonymous</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Set up an InPost locker drop in the app, send us the QR / pickup code in checkout
                  notes, we post it. You pay InPost's fee directly — nothing on our books links to you.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Timings */}
          <AnimateOnScroll>
            <div className="frosted-glass rounded-2xl p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-ice-blue" />
                <h2 className="text-2xl font-semibold">Processing & Cutoffs</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="rounded-xl border border-border/30 bg-card/30 p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Cutoff</div>
                  <div className="text-foreground font-semibold">14:00 GMT</div>
                  <p className="text-xs text-muted-foreground mt-1">Orders & cleared crypto in by 2pm ship same day.</p>
                </div>
                <div className="rounded-xl border border-border/30 bg-card/30 p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Royal Mail 24</div>
                  <div className="text-foreground font-semibold">1 working day</div>
                  <p className="text-xs text-muted-foreground mt-1">Tracked, signed-for not required.</p>
                </div>
                <div className="rounded-xl border border-border/30 bg-card/30 p-4">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">InPost</div>
                  <div className="text-foreground font-semibold">1-2 working days</div>
                  <p className="text-xs text-muted-foreground mt-1">Dropped at our local locker, then routed to yours.</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Weekends & bank holidays don't count as working days. Royal Mail and InPost may add a day during peak periods.
              </p>
            </div>
          </AnimateOnScroll>

          {/* Returns */}
          <AnimateOnScroll>
            <div className="frosted-glass rounded-2xl p-6 md:p-8 space-y-5">
              <div className="flex items-center gap-3">
                <FlaskConical className="w-6 h-6 text-aurora" />
                <h2 className="text-2xl font-semibold">Returns & Damaged Goods</h2>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Because of the research-only nature of what we ship, returns are limited to issues that are our fault:
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { title: 'Damaged in transit', desc: 'Photo evidence within 48 hours of delivery — we\'ll replace or refund.' },
                  { title: 'Wrong item sent', desc: 'Tell us within 48 hours, we\'ll dispatch the correct item at no extra cost.' },
                  { title: 'Lost in post', desc: 'If tracking confirms loss, we\'ll claim with Royal Mail and replace or refund.' },
                ].map((s) => (
                  <div key={s.title} className="rounded-xl border border-border/30 bg-card/30 p-4">
                    <h3 className="font-semibold text-foreground text-sm mb-1.5">{s.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                We can't accept change-of-mind returns on opened or sealed products.
              </p>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="rounded-xl border border-ice-blue/20 bg-ice-blue/[0.04] p-5 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-ice-blue mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-sm">UK Domestic Only</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We currently ship within the United Kingdom only. International orders are not being accepted.
                  For shipping questions email <a href="mailto:yetipeptides@protonmail.com" className="text-ice-blue underline-offset-2 hover:underline">yetipeptides@protonmail.com</a>.
                </p>
              </div>
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll>
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-sm">Need help fast?</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Email or message us on Discord/Telegram — we usually respond within 24 hours.
                </p>
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>

      <Footer />
    </div>
  );
}
