import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import yetiLogo from '@/assets/yeti-logo.png';

export default function Navbar() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 frosted-glass border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src={yetiLogo} 
              alt="Yeti Peptides" 
              className="w-12 h-12 object-contain drop-shadow-[0_0_20px_rgba(71,217,217,0.3)] group-hover:drop-shadow-[0_0_30px_rgba(71,217,217,0.5)] transition-all duration-300"
            />
            <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[hsl(var(--ice-blue))] via-[hsl(var(--glacier))] to-[hsl(var(--aurora))] bg-clip-text text-transparent">
              Yeti Peptides
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="hover:text-[hsl(var(--ice-blue))] transition-colors">
              Home
            </Link>
            <Link to="/products" className="hover:text-[hsl(var(--ice-blue))] transition-colors">
              Products
            </Link>
            <Link to="/contact" className="hover:text-[hsl(var(--ice-blue))] transition-colors">
              Contact
            </Link>
          </div>

          {/* Mobile & Desktop Cart + Mobile Menu */}
          <div className="flex items-center gap-2">
            <Link to="/cart">
              <Button variant="outline" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[hsl(var(--ice-blue))] text-background rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-8">
                  <Link 
                    to="/" 
                    className="text-lg hover:text-[hsl(var(--ice-blue))] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    to="/products" 
                    className="text-lg hover:text-[hsl(var(--ice-blue))] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Products
                  </Link>
                  <Link 
                    to="/contact" 
                    className="text-lg hover:text-[hsl(var(--ice-blue))] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact
                  </Link>
                  <Link 
                    to="/cart" 
                    className="text-lg hover:text-[hsl(var(--ice-blue))] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cart {itemCount > 0 && `(${itemCount})`}
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
