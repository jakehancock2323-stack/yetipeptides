import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import { Package, Truck, Globe, AlertCircle } from 'lucide-react';

export default function ShippingReturns() {
  return (
    <div className="min-h-screen pb-20">
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
          Shipping & Returns
        </h1>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="frosted-glass rounded-xl p-6 md:p-8 space-y-8">
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] flex items-center justify-center">
                  <Globe className="w-6 h-6 text-background" />
                </div>
                <h2 className="text-2xl font-semibold">Worldwide Shipping</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Yeti Peptides ships to researchers worldwide. We offer tracked, discreet shipping to ensure your order arrives safely and confidentially.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>All orders are shipped with tracking numbers</li>
                <li>Discreet packaging with no external product identification</li>
                <li>Temperature-controlled packaging for product integrity</li>
                <li>Insurance available on request</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--glacier))] to-[hsl(var(--aurora))] flex items-center justify-center">
                  <Truck className="w-6 h-6 text-background" />
                </div>
                <h2 className="text-2xl font-semibold">Processing & Delivery Times</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p><strong className="text-foreground">Processing Time:</strong> 2-3 business days after payment confirmation</p>
                <p><strong className="text-foreground">Domestic Delivery:</strong> 5-10 business days (country dependent)</p>
                <p><strong className="text-foreground">International Delivery:</strong> 10-21 business days (country dependent)</p>
                <p className="text-sm">
                  Note: Delivery times are estimates and may vary due to customs processing, local holidays, or carrier delays.
                </p>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[hsl(var(--aurora))] to-[hsl(var(--arctic-teal))] flex items-center justify-center">
                  <Package className="w-6 h-6 text-background" />
                </div>
                <h2 className="text-2xl font-semibold">Shipping Costs</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Shipping costs are calculated based on destination and weight. Standard tracked shipping is $65 USD for most destinations.
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Express shipping available on request for urgent orders</li>
                <li>Shipping costs displayed at checkout</li>
                <li>Free shipping on orders over $500 USD (select countries)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Customs & Import Duties</h2>
              <p className="text-muted-foreground leading-relaxed">
                International customers are responsible for any customs duties, taxes, or fees imposed by their country. Yeti Peptides is not responsible for customs delays or charges. Please check your local regulations regarding research peptide imports.
              </p>
            </section>

            <section className="border-t border-border pt-6">
              <h2 className="text-2xl font-semibold mb-4">Returns & Refunds Policy</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Due to the specialized nature of research peptides and regulatory requirements, we have a limited returns policy:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Damaged Products</h3>
                  <p className="text-muted-foreground text-sm">
                    If you receive a damaged product, please contact us within 48 hours of delivery with photographic evidence. We will arrange a replacement or refund.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Incorrect Products</h3>
                  <p className="text-muted-foreground text-sm">
                    If you receive an incorrect product, contact us within 48 hours with order details. We will send the correct product at no additional cost.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Lost Shipments</h3>
                  <p className="text-muted-foreground text-sm">
                    If tracking shows your shipment as lost, we will investigate with the carrier and provide a replacement or refund once confirmed.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 text-foreground">Non-Returnable Items</h3>
                  <p className="text-muted-foreground text-sm">
                    For safety and regulatory reasons, we cannot accept returns of products that have been delivered in good condition. Please ensure you review product specifications carefully before ordering.
                  </p>
                </div>
              </div>
            </section>

            <section className="border-t border-border pt-6">
              <div className="flex items-start gap-3 p-4 bg-[hsl(var(--ice-blue))]/10 rounded-lg border border-[hsl(var(--ice-blue))]/20">
                <AlertCircle className="w-6 h-6 text-[hsl(var(--ice-blue))] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-2">Need Assistance?</h3>
                  <p className="text-sm text-muted-foreground">
                    For any shipping or returns inquiries, please contact us at yetipeptides@protonmail.com or through our Discord server. We typically respond within 24 hours.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
