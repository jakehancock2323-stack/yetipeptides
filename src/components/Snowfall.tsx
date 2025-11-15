import { useEffect, useState } from 'react';

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 10 + Math.random() * 20,
      delay: Math.random() * 10
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="snowflake absolute text-lg"
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
