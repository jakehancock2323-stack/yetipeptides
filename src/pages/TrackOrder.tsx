import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Package } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function TrackOrder() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    const script = document.createElement('script');
    script.src = '//www.17track.net/externalcall.js';
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
    };
    document.body.appendChild(script);
  }, []);

  const handleTrack = () => {
    if (!trackingNumber.trim()) return;
    const YQV5 = (window as any).YQV5;
    if (YQV5) {
      YQV5.trackSingle({
        YQ_ContainerId: 'YQContainer',
        YQ_Height: 560,
        YQ_Fc: '0',
        YQ_Lang: 'en',
        YQ_Num: trackingNumber.trim(),
      });
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title="Track Your Order – Yeti Peptides"
        description="Track your research peptide order in real-time. Supports all major carriers including USPS, Royal Mail, DHL, FedEx, and more. Worldwide tracking for UK and international shipments."
        keywords="track order, peptide shipping tracking, parcel tracking, international shipping tracker"
        canonical="https://yetipeptides.com/track-order"
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] flex items-center justify-center">
                <Package className="w-8 h-8 text-background" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
              Track Your Order
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your tracking number below to check the status of your shipment. 
              Supports all major carriers worldwide including USPS, Royal Mail, DHL, FedEx, and more.
            </p>
          </div>

          <div className="frosted-glass rounded-xl p-6 md:p-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
                placeholder="Enter your tracking number"
                className="flex-1 px-4 py-3 rounded-lg bg-background/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ice-blue))] transition-all"
                maxLength={50}
              />
              <button
                onClick={handleTrack}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] text-background font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Track Package
              </button>
            </div>
            
            <div 
              id="YQContainer" 
              className="mt-6 min-h-[100px] rounded-lg overflow-hidden"
              ref={containerRef} 
            />
          </div>

          <div className="mt-8 frosted-glass rounded-xl p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4">Where do I find my tracking number?</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--ice-blue))] font-bold">1.</span>
                <span>Check your order confirmation email for the tracking number</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--ice-blue))] font-bold">2.</span>
                <span>Paste it into the tracker above — the carrier will be detected automatically</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[hsl(var(--ice-blue))] font-bold">3.</span>
                <span>Can't find your tracking number? Contact us at yetipeptides@protonmail.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
