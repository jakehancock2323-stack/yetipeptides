/**
 * AuroraWaves — ambient page-blending aurora. Large blurred color clouds
 * that drift slowly and fade to transparent edges so it dissolves into the
 * surrounding background. No box, no borders, no visible cutouts.
 */
export default function AuroraWaves() {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          'radial-gradient(ellipse 90% 80% at 60% 40%, black 30%, transparent 85%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 90% 80% at 60% 40%, black 30%, transparent 85%)',
      }}
    >
      <div
        className="absolute -top-1/2 -left-1/4 w-[80%] h-[140%] blur-[120px] opacity-70 animate-mesh-a"
        style={{
          background:
            'radial-gradient(40% 40% at 50% 50%, hsl(214 95% 68% / 0.55), transparent 70%)',
        }}
      />
      <div
        className="absolute -bottom-1/3 right-0 w-[80%] h-[130%] blur-[120px] opacity-70 animate-mesh-b"
        style={{
          background:
            'radial-gradient(40% 40% at 50% 50%, hsl(258 90% 72% / 0.55), transparent 70%)',
        }}
      />
      <div
        className="absolute top-0 right-1/4 w-[60%] h-[100%] blur-[120px] opacity-60 animate-mesh-c"
        style={{
          background:
            'radial-gradient(40% 40% at 50% 50%, hsl(190 90% 70% / 0.4), transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-1/4 w-[55%] h-[90%] blur-[120px] opacity-55 animate-mesh-d"
        style={{
          background:
            'radial-gradient(40% 40% at 50% 50%, hsl(268 85% 70% / 0.45), transparent 70%)',
        }}
      />

      <style>{`
        @keyframes mesh-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(6%,4%) scale(1.1); } }
        @keyframes mesh-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-5%,-4%) scale(1.12); } }
        @keyframes mesh-c { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-4%,6%) scale(1.08); } }
        @keyframes mesh-d { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(5%,-5%) scale(1.1); } }
        .animate-mesh-a { animation: mesh-a 18s ease-in-out infinite; }
        .animate-mesh-b { animation: mesh-b 22s ease-in-out infinite; }
        .animate-mesh-c { animation: mesh-c 16s ease-in-out infinite; }
        .animate-mesh-d { animation: mesh-d 20s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
