/**
 * AuroraWaves — animated flowing blue/violet light ribbons rendered with
 * layered SVG <path> elements. Pure CSS/SVG, no 3D, no canvas.
 * Designed to sit inside a rounded container as a hero visual.
 */
export default function AuroraWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep gradient base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 20% 10%, hsl(214 95% 68% / 0.18), transparent 60%), radial-gradient(100% 80% at 90% 90%, hsl(258 90% 76% / 0.22), transparent 60%), linear-gradient(160deg, hsl(230 50% 8%), hsl(232 45% 12%))',
        }}
      />

      {/* Soft floating orbs */}
      <div className="absolute -top-16 -left-10 w-72 h-72 rounded-full blur-3xl opacity-60 animate-orb-a"
        style={{ background: 'radial-gradient(circle, hsl(214 95% 68% / 0.55), transparent 70%)' }} />
      <div className="absolute -bottom-20 -right-10 w-80 h-80 rounded-full blur-3xl opacity-60 animate-orb-b"
        style={{ background: 'radial-gradient(circle, hsl(258 90% 76% / 0.5), transparent 70%)' }} />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full blur-3xl opacity-40 animate-orb-c"
        style={{ background: 'radial-gradient(circle, hsl(190 90% 70% / 0.35), transparent 70%)' }} />

      {/* Flowing aurora ribbons */}
      <svg
        viewBox="0 0 600 600"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <defs>
          <linearGradient id="aurora-grad-1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(214 95% 68%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(214 95% 68%)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="hsl(258 90% 76%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora-grad-2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(258 90% 76%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(268 85% 72%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(190 90% 70%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="aurora-grad-3" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(190 90% 70%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(220 90% 75%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(214 95% 68%)" stopOpacity="0" />
          </linearGradient>
          <filter id="aurora-blur">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        <g filter="url(#aurora-blur)">
          <path className="animate-ribbon-1" stroke="url(#aurora-grad-1)" strokeWidth="60" fill="none" strokeLinecap="round"
            d="M -50 380 C 120 260, 260 480, 420 320 S 660 200, 720 340" />
          <path className="animate-ribbon-2" stroke="url(#aurora-grad-2)" strokeWidth="48" fill="none" strokeLinecap="round"
            d="M -50 220 C 140 360, 280 160, 440 280 S 660 420, 720 240" />
          <path className="animate-ribbon-3" stroke="url(#aurora-grad-3)" strokeWidth="36" fill="none" strokeLinecap="round"
            d="M -50 500 C 160 420, 300 560, 460 460 S 660 360, 720 500" />
        </g>
      </svg>

      {/* Fine grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(hsl(0 0% 100% / 0.6) 1px, transparent 1px)',
          backgroundSize: '3px 3px',
        }}
      />

      <style>{`
        @keyframes orb-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(20px,30px) scale(1.1); } }
        @keyframes orb-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-25px,-20px) scale(1.15); } }
        @keyframes orb-c { 0%,100% { transform: translate(-50%,0) scale(1); } 50% { transform: translate(-50%,20px) scale(0.95); } }
        .animate-orb-a { animation: orb-a 14s ease-in-out infinite; }
        .animate-orb-b { animation: orb-b 18s ease-in-out infinite; }
        .animate-orb-c { animation: orb-c 12s ease-in-out infinite; }

        @keyframes ribbon-1 { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-18px) translateX(10px); } }
        @keyframes ribbon-2 { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(22px) translateX(-12px); } }
        @keyframes ribbon-3 { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-12px) translateX(-8px); } }
        .animate-ribbon-1 { animation: ribbon-1 11s ease-in-out infinite; transform-origin: center; }
        .animate-ribbon-2 { animation: ribbon-2 13s ease-in-out infinite; transform-origin: center; }
        .animate-ribbon-3 { animation: ribbon-3 15s ease-in-out infinite; transform-origin: center; }
      `}</style>
    </div>
  );
}
