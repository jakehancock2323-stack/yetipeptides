import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Detailed peptide sphere: nested wireframe shells, orbital rings, vertex nodes
 * connected by lines, glowing core, halo, and sparkle particles.
 * Auto-tunes detail and DPR for mobile to keep solid FPS.
 */
function PeptideSphere({ isMobile }: { isMobile: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const wire2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const electronsRef = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined' || isMobile) return;
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [isMobile]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.05); // clamp for stability
    if (groupRef.current) {
      groupRef.current.rotation.y += d * 0.18;
      const tX = -mouse.current.y * 0.3;
      groupRef.current.rotation.x += (tX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.position.x += (mouse.current.x * 0.25 - groupRef.current.position.x) * 0.03;
      groupRef.current.position.y += (-mouse.current.y * 0.18 - groupRef.current.position.y) * 0.03;
    }
    if (wireRef.current) wireRef.current.rotation.x -= d * 0.1;
    if (wire2Ref.current) {
      wire2Ref.current.rotation.y -= d * 0.15;
      wire2Ref.current.rotation.z += d * 0.05;
    }
    if (coreRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.4) * 0.05;
      coreRef.current.scale.setScalar(s);
    }
    if (ring1Ref.current) ring1Ref.current.rotation.z += d * 0.4;
    if (ring2Ref.current) ring2Ref.current.rotation.x += d * 0.35;
    if (ring3Ref.current) ring3Ref.current.rotation.y += d * 0.5;
    if (electronsRef.current) electronsRef.current.rotation.y += d * 0.6;
  });

  // Vertex nodes from a lower-poly icosahedron (for the "atoms")
  const nodeDetail = isMobile ? 1 : 2;
  const nodes = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, nodeDetail);
    const pos = geo.attributes.position;
    const seen = new Set<string>();
    const out: [number, number, number][] = [];
    for (let i = 0; i < pos.count; i++) {
      const x = +pos.getX(i).toFixed(3);
      const y = +pos.getY(i).toFixed(3);
      const z = +pos.getZ(i).toFixed(3);
      const k = `${x},${y},${z}`;
      if (!seen.has(k)) {
        seen.add(k);
        out.push([x, y, z]);
      }
    }
    geo.dispose();
    return out;
  }, [nodeDetail]);

  // Connecting filaments between nearby nodes — peptide bond network
  const bondGeometry = useMemo(() => {
    const positions: number[] = [];
    const threshold = isMobile ? 1.0 : 1.15;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const [x1, y1, z1] = nodes[i];
        const [x2, y2, z2] = nodes[j];
        const dx = x1 - x2, dy = y1 - y2, dz = z1 - z2;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          positions.push(x1, y1, z1, x2, y2, z2);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [nodes, isMobile]);

  // Orbital electrons positions (small spheres on rings)
  const electronCount = isMobile ? 6 : 10;
  const electrons = useMemo(() => {
    const arr: { pos: [number, number, number]; axis: 'x' | 'y' | 'z' }[] = [];
    for (let i = 0; i < electronCount; i++) {
      const a = (i / electronCount) * Math.PI * 2;
      const r = 3.2;
      const axis = (['x', 'y', 'z'] as const)[i % 3];
      const p: [number, number, number] =
        axis === 'x' ? [0, Math.cos(a) * r, Math.sin(a) * r] :
        axis === 'y' ? [Math.cos(a) * r, 0, Math.sin(a) * r] :
                       [Math.cos(a) * r, Math.sin(a) * r, 0];
      arr.push({ pos: p, axis });
    }
    return arr;
  }, [electronCount]);

  return (
    <group ref={groupRef}>
      {/* Soft glowing halos */}
      <mesh>
        <sphereGeometry args={[3.3, 32, 32]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.03} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.7, 32, 32]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.05} />
      </mesh>

      {/* Inner solid core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.25, isMobile ? 2 : 4]} />
        <meshPhysicalMaterial
          color="#0ea5e9"
          emissive="#0891b2"
          emissiveIntensity={0.6}
          roughness={0.15}
          metalness={0.4}
          transparent
          opacity={0.6}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Inner wireframe lattice */}
      <mesh ref={wire2Ref}>
        <icosahedronGeometry args={[1.75, isMobile ? 1 : 2]} />
        <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Outer wireframe shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.4, isMobile ? 2 : 3]} />
        <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.55} />
      </mesh>

      {/* Bond network lines */}
      <lineSegments geometry={bondGeometry}>
        <lineBasicMaterial color="#38bdf8" transparent opacity={0.25} />
      </lineSegments>

      {/* Vertex nodes — peptide atoms */}
      {nodes.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#e0f2fe" />
        </mesh>
      ))}

      {/* Orbital rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[3.0, 0.012, 8, 96]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[0, Math.PI / 3, Math.PI / 4]}>
        <torusGeometry args={[3.2, 0.01, 8, 96]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[3.4, 0.008, 8, 96]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.35} />
      </mesh>

      {/* Orbiting electrons */}
      <group ref={electronsRef}>
        {electrons.map((e, i) => (
          <mesh key={i} position={e.pos}>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial color="#bae6fd" />
          </mesh>
        ))}
      </group>

      {/* Sparkle field */}
      <Sparkles
        count={isMobile ? 60 : 140}
        scale={[8, 6, 8]}
        size={2.2}
        speed={0.35}
        opacity={0.7}
        color="#bae6fd"
      />
      {!isMobile && (
        <Sparkles
          count={50}
          scale={[5, 4, 5]}
          size={3.5}
          speed={0.2}
          opacity={0.5}
          color="#ffffff"
        />
      )}
    </group>
  );
}

export default function DnaHelix() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={isMobile ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' }}
      frameloop="always"
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#7dd3fc" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#67e8f9" />
      <PeptideSphere isMobile={isMobile} />
    </Canvas>
  );
}
