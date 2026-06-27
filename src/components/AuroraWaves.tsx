/**
 * AuroraWaves — smooth animated mesh gradient. No SVG ribbons, no visible
 * edges. Just soft blue/violet blobs drifting and morphing behind a subtle
 * grid, contained in the hero card.
 */
export default function AuroraWaves() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(160deg, hsl(232 50% 9%) 0%, hsl(230 45% 13%) 60%, hsl(258 40% 16%) 100%)',
        }}
      />

      {/* Drifting color blobs — heavily blurred so edges fully dissolve */}
      <div
        className="absolute -top-1/3 -left-1/4 w-[140%] h-[140%] blur-3xl opacity-80 animate-mesh-a"
        style={{
          background:
            'radial-gradient(40% 35% at 30% 30%, hsl(214 95% 68% / 0.55), transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 w-[140%] h-[140%] blur-3xl opacity-80 animate-mesh-b"
        style={{
          background:
            'radial-gradient(40% 35% at 70% 70%, hsl(258 90% 72% / 0.55), transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-[120%] h-[120%] blur-3xl opacity-70 animate-mesh-c"
        style={{
          background:
            'radial-gradient(35% 30% at 80% 25%, hsl(190 90% 70% / 0.4), transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[120%] h-[120%] blur-3xl opacity-60 animate-mesh-d"
        style={{
          background:
            'radial-gradient(30% 25% at 25% 80%, hsl(268 85% 70% / 0.45), transparent 70%)',
        }}
      />

      {/* Subtle dotted grid for tech feel */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(hsl(220 30% 96% / 0.35) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
          maskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 40%, transparent 80%)',
        }}
      />

      {/* Soft inner vignette to blend into card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 50%, hsl(230 50% 7% / 0.55) 100%)',
        }}
      />

      <style>{`
        @keyframes mesh-a {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50%      { transform: translate(8%, 6%) scale(1.1); }
        }
        @keyframes mesh-b {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50%      { transform: translate(-7%, -5%) scale(1.12); }
        }
        @keyframes mesh-c {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50%      { transform: translate(-6%, 8%) scale(1.08); }
        }
        @keyframes mesh-d {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50%      { transform: translate(7%, -7%) scale(1.1); }
        }
        .animate-mesh-a { animation: mesh-a 18s ease-in-out infinite; }
        .animate-mesh-b { animation: mesh-b 22s ease-in-out infinite; }
        .animate-mesh-c { animation: mesh-c 16s ease-in-out infinite; }
        .animate-mesh-d { animation: mesh-d 20s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
