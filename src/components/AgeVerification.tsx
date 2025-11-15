import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Snowfall from '@/components/Snowfall';
import yetiLogo from '@/assets/yeti-logo.png';

interface AgeVerificationProps {
  onVerified: () => void;
}

export default function AgeVerification({ onVerified }: AgeVerificationProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setShow(false);
      onVerified();
    }
  }, [onVerified]);

  const handleVerified = () => {
    localStorage.setItem('ageVerified', 'true');
    setShow(false);
    onVerified();
  };

  const handleUnderAge = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
      <Snowfall />
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8 flex justify-center">
          <img 
            src={yetiLogo} 
            alt="Yeti Peptides Logo" 
            className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_40px_rgba(71,217,217,0.4)] hover:drop-shadow-[0_0_60px_rgba(71,217,217,0.6)] transition-all duration-300 rounded-full border-4 border-[hsl(var(--ice-blue))]/30 p-4 bg-card/20"
          />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">
          Please verify you are 21 years or older to enter.
        </h1>

        <div className="flex flex-col gap-4 mb-8">
          <Button
            size="lg"
            onClick={handleVerified}
            className="w-full bg-[hsl(var(--ice-blue))] hover:bg-[hsl(var(--ice-blue))]/90 text-background text-lg py-6"
          >
            I am 21 or older
          </Button>

          <Button
            size="lg"
            onClick={handleUnderAge}
            variant="destructive"
            className="w-full text-lg py-6"
          >
            I am under 21
          </Button>
        </div>

        <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
          By entering and using this website, you confirm that you are 21 years of age or older (or the legal age of majority in your jurisdiction). 
          All products offered are intended for research purposes only and are not for human consumption. 
          If you do not meet the age requirement or agree with these terms, you must leave this site immediately.
        </p>
      </div>
    </div>
  );
}
