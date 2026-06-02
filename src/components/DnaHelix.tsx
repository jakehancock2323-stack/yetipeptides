import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Animated double-helix DNA / peptide strand.
 * Rotates slowly and gently tracks the mouse for a subtle parallax.
 */
function Helix() {
  const groupRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  // Pre-compute helix node positions
  const { nodes, rungs } = useMemo(() => {
    const turns = 6;
    const segments = 90;
    const radius = 1.15;
    const height = 9;
    const nodes: { pos: [number, number, number]; strand: 0 | 1 }[] = [];
    const rungs: { a: [number, number, number]; b: [number, number, number] }[] = [];

    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const y = (t - 0.5) * height;
      const angle = t * Math.PI * 2 * turns;
      const a: [number, number, number] = [Math.cos(angle) * radius, y, Math.sin(angle) * radius];
      const b: [number, number, number] = [
        Math.cos(angle + Math.PI) * radius,
        y,
        Math.sin(angle + Math.PI) * radius,
      ];
      nodes.push({ pos: a, strand: 0 });
      nodes.push({ pos: b, strand: 1 });
      if (i % 3 === 0) rungs.push({ a, b });
    }
    return { nodes, rungs };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;
    // Subtle parallax
    const targetX = mouse.current.y * 0.15;
    const targetZ = mouse.current.x * 0.25;
    groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
    groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.05;
  });

  // Track mouse via window listener (cleaned up automatically by Canvas unmount)
  useMemo(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  const iceBlue = new THREE.Color('#7dd3fc');
  const aurora = new THREE.Color('#67e8f9');

  return (
    <group ref={groupRef}>
      {/* Strand nodes */}
      {nodes.map((n, i) => (
        <mesh key={`n-${i}`} position={n.pos}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color={n.strand === 0 ? iceBlue : aurora} transparent opacity={0.85} />
        </mesh>
      ))}
      {/* Rungs */}
      {rungs.map((r, i) => {
        const mid = new THREE.Vector3(
          (r.a[0] + r.b[0]) / 2,
          (r.a[1] + r.b[1]) / 2,
          (r.a[2] + r.b[2]) / 2,
        );
        const dir = new THREE.Vector3(r.b[0] - r.a[0], r.b[1] - r.a[1], r.b[2] - r.a[2]);
        const len = dir.length();
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          dir.clone().normalize(),
        );
        return (
          <mesh key={`r-${i}`} position={mid.toArray()} quaternion={quat}>
            <cylinderGeometry args={[0.015, 0.015, len, 6]} />
            <meshBasicMaterial color="#bae6fd" transparent opacity={0.35} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function DnaHelix() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Helix />
    </Canvas>
  );
}
