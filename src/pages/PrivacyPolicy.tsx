import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pb-20">
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <div className="max-w-4xl mx-auto frosted-glass rounded-xl p-6 md:p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect information necessary to process orders and communicate with customers, including name, email address, shipping address, and payment information. We do not store credit card details directly as all payments are processed through secure cryptocurrency payment processors.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              Your information is used solely for:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Processing and fulfilling orders</li>
              <li>Communicating about orders and delivery</li>
              <li>Responding to customer service inquiries</li>
              <li>Sending important updates about your order</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All sensitive data is encrypted during transmission and storage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties. Information may only be shared with trusted shipping partners necessary to fulfill your order, and they are required to keep your information confidential.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this privacy policy, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your information</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use essential cookies to enable basic site functionality. We do not use tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Changes to Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to update this privacy policy at any time. Changes will be posted on this page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at yetipeptides@protonmail.com
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
