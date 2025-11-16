import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Snowfall from '@/components/Snowfall';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export default function OrderSuccess() {
  const location = useLocation();
  const orderData = location.state?.orderData;

  return (
    <div className="min-h-screen pb-20">
      <Snowfall />
      <Navbar />

      <div className="container mx-auto px-4 pt-32">
        <div className="max-w-3xl mx-auto text-center">
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
            
            {orderData && (
              <div className="bg-background/50 rounded-lg p-6 mb-6 text-left">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {orderData.items.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-start text-sm">
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-foreground/60">{item.specification}</p>
                        <p className="text-foreground/60">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium">${item.lineTotal.toFixed(2)}</p>
                    </div>
                  ))}
                  {orderData.includeEbook && (
                    <div className="flex justify-between items-start text-sm">
                      <div className="flex-1">
                        <p className="font-medium">Yeti's E-book – The GLP1 Series</p>
                      </div>
                      <p className="font-medium">$4.99</p>
                    </div>
                  )}
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>${orderData.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery:</span>
                      <span>${orderData.deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold mt-2">
                      <span>Total:</span>
                      <span>${orderData.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-background/50 rounded-lg p-6 mb-6">
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

            <div className="bg-gradient-to-r from-[hsl(var(--ice-blue))]/20 to-[hsl(var(--frost))]/20 rounded-lg p-6 mb-8 border border-[hsl(var(--ice-blue))]/30">
              <h2 className="text-xl font-semibold mb-3">Join Our Community! 🎮</h2>
              <p className="text-foreground/80 mb-4">
                Connect with other Yeti enthusiasts, get exclusive updates, and be the first to know about new products and special offers on our Discord server.
              </p>
              <Button 
                asChild 
                className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                <a href="https://discord.gg/your-discord-invite" target="_blank" rel="noopener noreferrer">
                  Join Discord Server
                </a>
              </Button>
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
