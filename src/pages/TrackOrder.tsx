import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Package } from 'lucide-react';

export default function TrackOrder() {
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
            <iframe
              className="w-full border-0"
              src="https://parcelsapp.com/widget?backgroundColorButton=%230ea5e9&colorButton=%23ffffff&borderRadiusButton=8px&borderRadiusInput=8px&borderInput=1px%20solid%20%23334155&placeholder=Enter%20your%20tracking%20number&textButton=Track%20Package&widgetWrapBorder=none&widgetWrapBorderRadius=8px"
              style={{ minWidth: '312px', minHeight: '250px', width: '100%' }}
              title="Package Tracking Widget"
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
