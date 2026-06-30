import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, User, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/hooks/useAuth';
import { useState, useEffect } from 'react';
import CartDrawer from './CartDrawer';
import yetiLogo from '@/assets/yeti-logo.png';

export default function Navbar() {
  const { getItemCount } = useCart();
  const { user } = useAuth();
  const itemCount = getItemCount();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Catalogue' },
    { to: '/calculator', label: 'Calculator' },
    { to: '/guides', label: 'Guides' },

    { to: '/how-to-pay-crypto', label: 'How to Pay' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-2xl border-b border-border/30 shadow-[0_4px_20px_hsl(var(--ice-blue)/0.05)]' : 'bg-background/60 backdrop-blur-xl border-b border-transparent'}`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={yetiLogo}
                alt="Yeti Peptides logo - UK research peptide supplier"
                className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(71,217,217,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(71,217,217,0.5)] transition-all duration-300"
              />
              <div className="leading-none">
                <span className="block text-lg md:text-xl font-bold text-ice-blue tracking-wider">YETI PEPTIDES</span>
                <span className="hidden sm:block text-[9px] uppercase tracking-[0.3em] text-muted-foreground mt-1">UK Domestic · 🇬🇧</span>
              </div>
            </Link>

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

            <div className="flex items-center gap-2">
              <Link to={user ? "/account" : "/auth"} className="hidden sm:inline-flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-secondary/50"
                  aria-label={user ? "My Account" : "Sign In"}
                  title={user ? "My Account" : "Sign In"}
                >
                  {user ? <User className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                </Button>
              </Link>
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

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden hover:bg-secondary/50" aria-label="Menu">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] bg-background/95 backdrop-blur-2xl">
                  <div className="flex flex-col gap-2 mt-8">
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
                    <Link
                      to={user ? "/account" : "/auth"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium px-4 py-3 rounded-lg hover:text-ice-blue hover:bg-secondary/30 transition-all flex items-center gap-2"
                    >
                      {user ? <User className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                      {user ? "My Account" : "Sign In / Sign Up"}
                    </Link>
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
