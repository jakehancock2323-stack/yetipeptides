import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Detailed peptide-sphere: a glowing wireframe icosahedron, an inner solid
 * core, a soft halo, and drifting sparkle particles. Reacts subtly to mouse.
 */
function PeptideSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.15;
    const tX = -mouse.current.y * 0.35;
    const tY = mouse.current.x * 0.35;
    groupRef.current.rotation.x += (tX - groupRef.current.rotation.x) * 0.04;
    groupRef.current.position.x += (mouse.current.x * 0.3 - groupRef.current.position.x) * 0.03;
    groupRef.current.position.y += (-mouse.current.y * 0.2 - groupRef.current.position.y) * 0.03;

    if (wireRef.current) wireRef.current.rotation.x -= delta * 0.08;
    if (coreRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
      coreRef.current.scale.setScalar(s);
    }
  });

  // Generate vertex node positions from an icosahedron geometry
  const vertexPositions = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, 3);
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
  }, []);

  return (
    <group ref={groupRef}>
      {/* Soft glowing halo */}
      <mesh>
        <sphereGeometry args={[2.9, 32, 32]} />
        <meshBasicMaterial color="#7dd3fc" transparent opacity={0.04} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.55, 32, 32]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.06} />
      </mesh>

      {/* Inner solid core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.35, 4]} />
        <meshPhysicalMaterial
          color="#0ea5e9"
          emissive="#0891b2"
          emissiveIntensity={0.55}
          roughness={0.15}
          metalness={0.4}
          transparent
          opacity={0.55}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Wireframe outer shell */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2.2, 3]} />
        <meshBasicMaterial color="#7dd3fc" wireframe transparent opacity={0.55} />
      </mesh>

      {/* Vertex nodes — peptide bonds */}
      {vertexPositions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.045, 10, 10]} />
          <meshBasicMaterial color="#e0f2fe" />
        </mesh>
      ))}

      {/* Sparkle field */}
      <Sparkles
        count={140}
        scale={[8, 6, 8]}
        size={2.2}
        speed={0.35}
        opacity={0.7}
        color="#bae6fd"
      />
      <Sparkles
        count={60}
        scale={[5, 4, 5]}
        size={3.5}
        speed={0.2}
        opacity={0.5}
        color="#ffffff"
      />
    </group>
  );
}

export default function DnaHelix() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#7dd3fc" />
      <pointLight position={[-5, -3, -5]} intensity={0.8} color="#67e8f9" />
      <PeptideSphere />
    </Canvas>
  );
}
