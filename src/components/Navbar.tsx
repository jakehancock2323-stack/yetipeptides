import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { useCart } from '@/contexts/CartContext';
import yetiLogo from '@/assets/yeti-logo.png';

export default function Navbar() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

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
        </div>
      </div>
    </nav>
  );
}
