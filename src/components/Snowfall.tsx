import { useEffect, useState } from 'react';

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; duration: number; delay: number; size: string }>>([]);

  useEffect(() => {
    // Reduced from 50 to 15 snowflakes for a subtle, professional look
    const flakes = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 20 + Math.random() * 30, // Slower fall for elegance
      delay: Math.random() * 15,
      size: ['text-xs', 'text-sm', 'text-base'][Math.floor(Math.random() * 3)] // Varied sizes, mostly small
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className={`snowflake absolute ${flake.size} opacity-30`}
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
