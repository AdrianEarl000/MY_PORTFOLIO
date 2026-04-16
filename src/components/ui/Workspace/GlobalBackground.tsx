"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Particles() {
  const count = 40; // Increased count slightly for full-page coverage
  const meshesRef = useRef<(THREE.Mesh | null)[]>([]);
  
  // Spread particles wider for full background
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5,
      ] as [number, number, number],
      speed: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  useFrame((state) => {
    meshesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = state.clock.elapsedTime * particles[i].speed;
      mesh.position.y = particles[i].position[1] + Math.sin(t + i) * 0.5;
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.005;
    });
  });

  return (
    <>
      {particles.map((p, i) => (
        <mesh key={i} ref={(el) => { meshesRef.current[i] = el; }} position={p.position}>
          <octahedronGeometry args={[0.06, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#7C6AF7" : "#2DD4BF"}
            emissive={i % 2 === 0 ? "#7C6AF7" : "#2DD4BF"}
            emissiveIntensity={1.5}
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
    </>
  );
}

export default function GlobalBackground() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none bg-background">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Particles />
      </Canvas>
    </div>
  );
}