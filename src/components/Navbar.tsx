import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import RegionToggle from './RegionToggle';
import yetiLogo from '@/assets/yeti-logo.png';

export default function Navbar() {
  const { getItemCount } = useCart();
  const itemCount = getItemCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/how-to-pay-crypto', label: 'How to Pay' },
    
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-2xl border-b border-border/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={yetiLogo} 
                alt="Yeti Peptides logo - research peptide supplier" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(71,217,217,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(71,217,217,0.5)] transition-all duration-300"
              />
              <span className="text-lg md:text-xl font-bold text-ice-blue tracking-wider">
                YETI PEPTIDES
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link 
                  key={link.to}
                  to={link.to} 
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 ${
                    location.pathname === link.to 
                      ? 'text-ice-blue bg-ice-blue/10' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Region Toggle + Cart & Mobile Menu */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <RegionToggle />
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="relative hover:bg-secondary/50"
                onClick={() => setCartDrawerOpen(true)}
                aria-label="Shopping Basket"
              >
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ice-blue text-background rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-bold">
                    {itemCount}
                  </span>
                )}
              </Button>

              {/* Mobile Menu */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden hover:bg-secondary/50" aria-label="Menu">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-background/95 backdrop-blur-2xl">
                  <div className="flex flex-col gap-2 mt-8">
                    <div className="px-4 pb-3 sm:hidden">
                      <RegionToggle />
                    </div>
                    {navLinks.map(link => (
                      <Link 
                        key={link.to}
                        to={link.to} 
                        className={`text-lg font-medium px-4 py-3 rounded-lg transition-all ${
                          location.pathname === link.to
                            ? 'text-ice-blue bg-ice-blue/10'
                            : 'text-foreground hover:text-ice-blue hover:bg-secondary/30'
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setCartDrawerOpen(true);
                      }}
                      className="text-lg font-medium px-4 py-3 rounded-lg hover:text-ice-blue hover:bg-secondary/30 transition-all text-left"
                    >
                      Basket {itemCount > 0 && `(${itemCount})`}
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      <CartDrawer open={cartDrawerOpen} onOpenChange={setCartDrawerOpen} />
    </>
  );
}
