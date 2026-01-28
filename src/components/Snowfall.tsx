import { useMemo } from 'react';

export default function Snowfall() {
  // Generate snowflakes once using useMemo to avoid re-renders
  const snowflakes = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 25 + Math.random() * 20,
      delay: Math.random() * 10,
      size: 'text-xs'
    })), []
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className={`snowflake absolute ${flake.size} opacity-20`}
          style={{
            left: `${flake.left}%`,
            animationDuration: `${flake.duration}s`,
            animationDelay: `${flake.delay}s`
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}
