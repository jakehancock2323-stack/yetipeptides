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
    }, 500);
  };

  const handleUnderAge = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-50 bg-background grid-overlay transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <Snowfall />
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(var(--ice-blue))] opacity-[0.03] blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--ice-blue)/0.3)] to-transparent" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="max-w-md w-full">
          {/* Logo with scan line effect */}
          <div className="mb-10 flex justify-center">
            <div className="relative scan-line">
              <div className="absolute inset-0 rounded-full bg-[hsl(var(--ice-blue))] opacity-[0.08] blur-[40px]" />
              <img 
                src={yetiLogo} 
                alt="Yeti Peptides Logo" 
                className="w-32 h-32 md:w-40 md:h-40 object-contain relative z-10 drop-shadow-[0_0_30px_rgba(71,217,217,0.3)]"
                style={{ animation: 'float 6s ease-in-out infinite' }}
              />
            </div>
          </div>

          {/* Frosted card */}
          <div className="frosted-glass rounded-2xl p-6 md:p-8 glow-border">
            {/* Header with icon */}
            <div className="flex items-center justify-center gap-2 mb-2">
              <ShieldCheck className="w-5 h-5 text-[hsl(var(--ice-blue))]" />
              <span className="text-[10px] uppercase tracking-[0.25em] text-[hsl(var(--ice-blue))] font-semibold">
                Age Verification Required
              </span>
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold text-center mb-6 text-foreground leading-snug">
              You must be 21 or older<br />to enter this site.
            </h1>

            <div className="space-y-3 mb-6">
              <Button
                size="lg"
                onClick={handleVerified}
                className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/80 text-background font-semibold text-sm py-5 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--ice-blue)/0.3)]"
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                I am 21 or older — Enter Site
              </Button>

              <Button
                size="lg"
                onClick={handleUnderAge}
                variant="ghost"
                className="w-full text-sm py-5 border border-border/40 text-muted-foreground hover:text-destructive hover:border-destructive/40 transition-all duration-300"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                I am under 21 — Leave
              </Button>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-4" />

            <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
              By entering this website, you confirm you are 21+ and agree that all products are for <span className="text-foreground/70">research purposes only</span> — not for human consumption.
            </p>
          </div>

          {/* Bottom branding */}
          <p className="text-center mt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
            Yeti Peptides™ — Research Grade
          </p>
        </div>
      </div>
    </div>
  );
}
