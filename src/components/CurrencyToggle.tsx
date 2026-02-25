import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from './ui/button';

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="inline-flex items-center rounded-lg border border-border/30 bg-secondary/30 p-0.5">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCurrency('USD')}
        className={`h-7 px-3 text-xs font-semibold rounded-md transition-all ${
          currency === 'USD'
            ? 'bg-ice-blue text-background hover:bg-ice-blue/90'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
        }`}
      >
        $ USD
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCurrency('GBP')}
        className={`h-7 px-3 text-xs font-semibold rounded-md transition-all ${
          currency === 'GBP'
            ? 'bg-ice-blue text-background hover:bg-ice-blue/90'
            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
        }`}
      >
        £ GBP
      </Button>
    </div>
  );
}
