import { useRegion, Region } from '@/contexts/RegionContext';
import { Globe, MapPin } from 'lucide-react';

const regions: { value: Region; label: string; icon: typeof Globe }[] = [
  { value: 'International', label: 'International', icon: Globe },
  { value: 'UK Domestic', label: 'UK Domestic', icon: MapPin },
];

export default function RegionToggle() {
  const { region, setRegion } = useRegion();

  return (
    <div className="flex items-center gap-1 bg-secondary/30 rounded-full p-0.5">
      {regions.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setRegion(value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
            region === value
              ? 'bg-ice-blue text-background shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon className="w-3 h-3" />
          {label}
        </button>
      ))}
    </div>
  );
}
