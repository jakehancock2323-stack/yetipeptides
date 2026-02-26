import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Snowfall from '@/components/Snowfall';
import yetiLogo from '@/assets/yeti-logo.png';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

interface AgeVerificationProps {
  onVerified: () => void;
}

export default function AgeVerification({ onVerified }: AgeVerificationProps) {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setShow(false);
      onVerified();
    }
  }, [onVerified]);

  const handleVerified = () => {
    setFadeOut(true);
    setTimeout(() => {
      localStorage.setItem('ageVerified', 'true');
      setShow(false);
      onVerified();
    }, 600);
  };

  const handleUnderAge = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-50 winter-gradient grid-overlay overflow-hidden transition-opacity duration-600 ${fadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
      style={{ transitionProperty: 'opacity, transform' }}
    >
      <Snowfall />

      {/* Large transparent logo watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <img
          src={yetiLogo}
          alt=""
          aria-hidden="true"
          className="w-[500px] h-[500px] md:w-[700px] md:h-[700px] object-contain opacity-[0.04]"
          style={{ filter: 'blur(1px)' }}
        />
      </div>

      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[hsl(var(--ice-blue))] opacity-[0.04] blur-[150px] pointer-events-none" />
      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--ice-blue)/0.2)] to-transparent" />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-sm w-full">

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[hsl(var(--ice-blue))] opacity-[0.12] blur-[50px] scale-150" />
              <img
                src={yetiLogo}
                alt="Yeti Peptides Logo"
                className="w-28 h-28 md:w-36 md:h-36 object-contain relative z-10"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              />
            </div>
          </div>

          {/* Card */}
          <div className="frosted-glass rounded-2xl p-6 md:p-8 scan-line relative overflow-hidden">
            {/* Inner glow accent at top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[hsl(var(--ice-blue)/0.5)] to-transparent" />

            <div className="flex items-center justify-center gap-2 mb-3">
              <ShieldCheck className="w-4 h-4 text-[hsl(var(--ice-blue))]" />
              <span className="text-[9px] uppercase tracking-[0.3em] text-[hsl(var(--ice-blue))] font-semibold">
                Verification Required
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-center mb-2 text-foreground leading-tight">
              Are you 21 or older?
            </h1>
            <p className="text-xs text-muted-foreground text-center mb-7">
              You must verify your age to access this site.
            </p>

            <div className="space-y-2.5 mb-6">
              <Button
                size="lg"
                onClick={handleVerified}
                className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold text-sm py-5 transition-all duration-300 hover:shadow-[0_0_40px_hsl(var(--ice-blue)/0.35)] gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                Yes, I'm 21+
              </Button>

              <Button
                size="lg"
                onClick={handleUnderAge}
                variant="ghost"
                className="w-full text-sm py-5 border border-border/30 text-muted-foreground hover:text-destructive hover:border-destructive/30 hover:bg-destructive/5 transition-all duration-300 gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                No, I'm under 21
              </Button>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border/60 to-transparent mb-4" />

            <p className="text-[10px] text-muted-foreground/70 text-center leading-relaxed">
              All products are for <span className="text-muted-foreground">research purposes only</span> and are not for human consumption. By entering, you agree to our terms.
            </p>
          </div>

          {/* Bottom brand */}
          <p className="text-center mt-8 text-[9px] uppercase tracking-[0.35em] text-muted-foreground/30 font-medium">
            Yeti Peptides™
          </p>
        </div>
      </div>
    </div>
  );
}
