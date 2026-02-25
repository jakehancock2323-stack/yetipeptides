import { useRegion, Region } from '@/contexts/RegionContext';
import { Globe, MapPin } from 'lucide-react';

const regions: { value: Region; label: string; icon: typeof Globe }[] = [
  { value: 'International', label: 'International', icon: Globe },
  { value: 'UK Domestic', label: 'UK Domestic', icon: MapPin },
];

export default function RegionToggle() {
  const { region, setRegion } = useRegion();

  return (
    <div className="flex items-center gap-1 bg-secondary/40 rounded-lg p-1 border border-border/30">
      {regions.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setRegion(value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            region === value
              ? 'bg-ice-blue text-background shadow-md'
              : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
