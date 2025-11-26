import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';

export default function TermsConditions() {
  return (
    <div className="min-h-screen pb-20">
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
          Terms & Conditions
        </h1>

        <div className="max-w-4xl mx-auto frosted-glass rounded-xl p-6 md:p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and placing an order with Yeti Peptides, you confirm that you are in agreement with and bound by the terms and conditions contained in these Terms. These terms apply to the entire website and any email or other type of communication between you and Yeti Peptides.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Research Use Only</h2>
            <p className="text-muted-foreground leading-relaxed">
              All products sold by Yeti Peptides are strictly for <strong className="text-foreground">research purposes only</strong>. Products are not intended for human consumption, diagnostic, or therapeutic use. By purchasing from us, you acknowledge that you are a qualified researcher and will handle all products in accordance with appropriate laboratory safety protocols.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Age Requirement</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 18 years of age to place an order. By placing an order, you confirm that you meet this age requirement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Legal Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              You are responsible for ensuring that your purchase and possession of research peptides complies with all applicable laws and regulations in your jurisdiction. Yeti Peptides is not responsible for any misuse of products or violations of local, state, national, or international laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Product Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to provide accurate product information, including descriptions, specifications, and purity levels. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. Certificates of Analysis (COAs) are available upon request for verification.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Pricing and Payment</h2>
            <p className="text-muted-foreground leading-relaxed">
              All prices are listed in USD. We accept Bitcoin (BTC), USDT, and USDC as payment methods. Prices are subject to change without notice. Payment must be received in full before orders are shipped.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Order Processing</h2>
            <p className="text-muted-foreground leading-relaxed">
              Orders are typically processed within 2-3 business days after payment confirmation. You will receive a tracking number once your order has been shipped. We are not responsible for delays caused by customs or shipping carriers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Shipping</h2>
            <p className="text-muted-foreground leading-relaxed">
              We ship worldwide via tracked and discreet packaging. Shipping fees are calculated at checkout. Customers are responsible for any customs duties, taxes, or fees imposed by their country.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Returns and Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Due to the nature of our products, we do not accept returns or offer refunds except in cases of damaged or incorrect items received. Claims must be made within 48 hours of delivery with photographic evidence.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Yeti Peptides shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use or inability to use our products or services. Our maximum liability shall not exceed the purchase price of the product.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify and hold harmless Yeti Peptides from any claims, damages, losses, liabilities, and expenses arising from your use of our products or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Modification of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website. Continued use of the website after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions regarding these Terms and Conditions, please contact us at yetipeptides@protonmail.com
            </p>
          </section>

          <div className="pt-6 mt-6 border-t border-border">
            <p className="text-sm text-muted-foreground text-center">
              Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
