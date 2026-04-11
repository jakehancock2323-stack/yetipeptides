import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

export default function TermsConditions() {
  return (
    <div className="min-h-screen pb-20">
      <SEO 
        title="Terms & Conditions - Research Peptides Policy | Yeti Peptides"
        description="Terms and conditions for purchasing research-grade peptides from Yeti Peptides. Read our policies on research use, ordering, shipping, and legal compliance."
        keywords="peptide terms and conditions, research peptides policy, peptide purchase terms"
        canonical="https://yetipeptides.com/terms-conditions"
      />
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
          Terms & Conditions
        </h1>

        <div className="max-w-4xl mx-auto frosted-glass rounded-xl p-6 md:p-8 space-y-6">
          <p className="text-muted-foreground text-sm italic">Terms and Conditions (UK Version)</p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Research Use Only</h2>
            <p className="text-muted-foreground leading-relaxed">
              All products sold by Yeti Peptides ("Company", "we", "us", "our") are supplied strictly for in vitro laboratory research purposes only by suitably qualified professionals. They are not intended for human consumption, veterinary use, or for use as food additives, medicines, cosmetics, or household chemicals.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              By placing an order, you confirm that you are a qualified researcher or purchasing on behalf of a business or institution for legitimate scientific research purposes. You accept full responsibility for the safe handling, storage, use, and disposal of all products.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Nothing in these Terms limits or excludes any rights you may have under applicable UK law where such rights cannot be excluded.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              You must be at least 18 years old to place an order. By placing an order, you confirm that you meet this requirement.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">You also confirm that:</p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1 ml-4">
              <li>you have the legal capacity to enter into a binding contract;</li>
              <li>you are not purchasing from a jurisdiction where such products are prohibited; and</li>
              <li>your use of our website and products complies with all applicable laws and regulations.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We reserve the right to refuse or cancel orders where reasonably necessary (including suspected misuse or legal risk).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By placing an order via yetipeptides.com, you confirm that you have read and agree to these Terms. These Terms form a legally binding agreement between you and the Company.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We may update these Terms from time to time. The version in force at the time of your order will apply to that purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Payment</h2>
            <p className="text-muted-foreground leading-relaxed">
              All prices are listed in USD unless otherwise stated. We currently accept cryptocurrency payments (USDT, USDC, PYUSD, BTC).
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Cryptocurrency payments are generally irreversible. You are responsible for ensuring accuracy when submitting payment.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Orders will only be processed once payment has been received and verified. If payment cannot be verified, we may cancel the order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Shipping & Delivery</h2>
            <p className="text-muted-foreground leading-relaxed">
              Delivery is fulfilled when the order is passed to the shipping carrier.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">You are responsible for:</p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1 ml-4">
              <li>Providing accurate delivery details</li>
              <li>Being available to receive the delivery</li>
              <li>Monitoring tracking information</li>
              <li>Paying any applicable customs duties, VAT, or import charges</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              If a package is returned due to incorrect details, non-collection, or unpaid charges, we are not obliged to issue a refund or reship, although we may do so at our discretion.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Nothing in this section affects your statutory rights where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Shipping Times</h2>
            <p className="text-muted-foreground leading-relaxed">
              Any delivery timeframes provided are estimates only, not guarantees. Delays may occur due to factors outside our control (e.g. customs, carrier delays, weather, or peak periods).
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We are not liable for delays outside our reasonable control, but we will make reasonable efforts to assist where possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Customs & Seizures</h2>
            <p className="text-muted-foreground leading-relaxed">
              International shipments may be subject to customs checks. We have no control over these processes.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Where a shipment is officially seized by customs and evidence is provided, we may offer a replacement shipment. If a second confirmed seizure occurs, we may offer a refund.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              This policy is discretionary and subject to compliance with these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Returns & Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Due to the nature of our products (research-use chemicals), returns are not accepted once dispatched, except where required under UK law.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Nothing in this section affects your rights under the Consumer Rights Act 2015.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">Refunds will not be issued for:</p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1 ml-4">
              <li>Incorrect delivery details provided by the customer</li>
              <li>Failure to accept delivery</li>
              <li>Failure to pay customs/import charges</li>
              <li>Delays outside our control</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Quality Disputes</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you believe a product does not meet expected standards, you must provide appropriate evidence.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We may require independent testing (e.g. via Janoshik) before considering any refund or replacement.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Where a product is confirmed to be materially defective, we will provide an appropriate remedy in line with UK law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">Nothing in these Terms excludes or limits liability for:</p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1 ml-4">
              <li>Death or personal injury caused by negligence</li>
              <li>Fraud or fraudulent misrepresentation</li>
              <li>Any matter which cannot be excluded under UK law</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">To the extent permitted by law, we are not liable for:</p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1 ml-4">
              <li>Indirect or consequential losses</li>
              <li>Loss of profits, business, or data</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Our total liability for any claim shall not exceed the amount paid for the relevant order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">11. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              Products are provided "as is" for research use only. We do not guarantee suitability for any specific research purpose.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">12. Prohibited Uses</h2>
            <p className="text-muted-foreground leading-relaxed">You agree not to:</p>
            <ul className="list-disc list-inside text-muted-foreground leading-relaxed mt-2 space-y-1 ml-4">
              <li>Use products for human or animal consumption</li>
              <li>Resell for consumption or medical use</li>
              <li>Provide false information</li>
              <li>Use the website for unlawful purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">13. Dispute Resolution</h2>
            <p className="text-muted-foreground leading-relaxed">
              We encourage resolving disputes informally first by contacting <a href="mailto:support@yetipeptides.com" className="text-[hsl(var(--ice-blue))] hover:underline">support@yetipeptides.com</a>.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              If a dispute cannot be resolved, it shall be subject to the laws of England and Wales and handled by the courts of that jurisdiction, unless otherwise required by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">14. Indemnity</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to indemnify the Company against losses arising from misuse of products, breach of these Terms, or violation of applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">15. General</h2>
            <p className="text-muted-foreground leading-relaxed">
              If any part of these Terms is found unenforceable, the remainder will remain in effect.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              These Terms represent the entire agreement between you and the Company regarding your use of our website and products.
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
