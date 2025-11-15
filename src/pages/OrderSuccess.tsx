import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  return (
    <div className="min-h-screen pb-20">
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <div className="max-w-2xl mx-auto text-center">
          <div className="frosted-glass rounded-lg p-8 md:p-12">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="w-20 h-20 text-[hsl(var(--ice-blue))]" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))] bg-clip-text text-transparent">
              Thank You for Your Order!
            </h1>
            
            <p className="text-lg text-foreground/80 mb-6">
              Your order has been successfully submitted. You will receive an email shortly with payment instructions and order details.
            </p>
            
            <div className="bg-background/50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-3">What happens next?</h2>
              <ul className="text-left space-y-2 text-foreground/70">
                <li className="flex items-start">
                  <span className="mr-2">📧</span>
                  <span>Check your email for payment instructions</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">💳</span>
                  <span>Complete the payment using your chosen method</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">📦</span>
                  <span>We'll process and ship your order once payment is confirmed</span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--frost))]">
                <Link to="/">Back to Home</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
