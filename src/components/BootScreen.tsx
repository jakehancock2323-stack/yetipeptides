import { useState, useEffect, useRef } from 'react';
import yetiLogo from '@/assets/yeti-logo.png';

interface BootScreenProps {
  onComplete: () => void;
}

const BOOT_LINES = [
  { text: '> INITIALIZING YETI SYSTEMS...', delay: 0 },
  { text: '> Loading cryo-modules ██████████ OK', delay: 400 },
  { text: '> Peptide database connected', delay: 700 },
  { text: '> Verifying compound integrity... 99.7% PASS', delay: 1000 },
  { text: '> Establishing secure tunnel ✓', delay: 1400 },
  { text: '> QC protocols: ACTIVE', delay: 1700 },
  { text: '> Shipping matrix: ONLINE', delay: 1900 },
  { text: '> Region detection: COMPLETE', delay: 2100 },
  { text: '> Frost engine: ENABLED', delay: 2300 },
  { text: '', delay: 2500 },
  { text: '> ALL SYSTEMS OPERATIONAL', delay: 2600, highlight: true },
  { text: '> Welcome to Yeti Peptides.', delay: 2900, highlight: true },
];

export default function BootScreen({ onComplete }: BootScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem('bootShown') === 'true') {
      onComplete();
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => {
        setVisibleLines(i + 1);
        setProgress(Math.min(100, ((i + 1) / BOOT_LINES.length) * 100));
      }, line.delay));
    });

    // Fade out and complete
    timers.push(setTimeout(() => {
      setFadeOut(true);
    }, 3400));

    timers.push(setTimeout(() => {
      sessionStorage.setItem('bootShown', 'true');
      onComplete();
    }, 4000));

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  // If already shown, render nothing
  if (sessionStorage.getItem('bootShown') === 'true') return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-background flex flex-col items-center justify-center overflow-hidden transition-all duration-600 ${
        fadeOut ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
      }`}
      style={{ transitionProperty: 'opacity, transform' }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay opacity-30" />

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[hsl(var(--ice-blue))] opacity-[0.03] blur-[120px]" />

      {/* Scanline effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="w-full h-[2px] bg-[hsl(var(--ice-blue)/0.08)]"
          style={{
            animation: 'scanMove 3s linear infinite',
          }}
        />
      </div>

      {/* Logo */}
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-[hsl(var(--ice-blue))] opacity-[0.1] blur-[40px] scale-[2]" />
        <img
          src={yetiLogo}
          alt="Yeti Peptides"
          className="w-20 h-20 md:w-24 md:h-24 object-contain relative z-10"
          style={{
            animation: 'pulse 2s ease-in-out infinite',
            filter: `drop-shadow(0 0 20px hsl(var(--ice-blue) / 0.3))`,
          }}
        />
      </div>

      {/* Terminal window */}
      <div className="w-full max-w-lg px-6">
        <div className="frosted-glass rounded-xl overflow-hidden border border-[hsl(var(--ice-blue)/0.1)]">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-card/30">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
            </div>
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest ml-2 font-mono">
              yeti-terminal v2.1
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="p-4 h-[260px] overflow-y-auto font-mono text-xs md:text-sm space-y-1"
          >
            {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`transition-opacity duration-200 ${
                  line.highlight
                    ? 'text-[hsl(var(--ice-blue))] font-semibold'
                    : 'text-muted-foreground'
                }`}
                style={{
                  animation: 'fadeInLine 0.2s ease-out',
                }}
              >
                {line.text}
                {i === visibleLines - 1 && !line.highlight && (
                  <span className="inline-block w-2 h-4 bg-[hsl(var(--ice-blue))] ml-1 animate-pulse align-middle" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 px-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-[10px] text-muted-foreground/50 uppercase tracking-widest font-mono">
              Boot Progress
            </span>
            <span className="text-[10px] text-[hsl(var(--ice-blue))] font-mono font-semibold">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1 bg-secondary/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[hsl(var(--ice-blue))] to-[hsl(var(--glacier))] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom brand */}
      <p className="absolute bottom-6 text-[9px] uppercase tracking-[0.35em] text-muted-foreground/20 font-medium font-mono">
        Yeti Peptides™ Systems
      </p>

      <style>{`
        @keyframes scanMove {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes fadeInLine {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
