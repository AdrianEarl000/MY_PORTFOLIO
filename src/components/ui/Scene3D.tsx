"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  // This hook runs on every frame to animate the object
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // 1. Base continuous rotation
    meshRef.current.rotation.z += 0.002;

    // 2. Mouse tracking: calculate target rotation based on cursor position
    // state.pointer gives normalized coordinates from -1 to +1
    const targetX = (state.pointer.x * Math.PI) / 4; 
    const targetY = (state.pointer.y * Math.PI) / 4;

    // 3. Smoothly interpolate (lerp) towards the target rotation for a premium feel
    meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x);
    meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y);
  });

  return (
    // Float makes it bob up and down gracefully
    <Float speed={2} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={meshRef}>
        {/* A beautifully complex geometric knot */}
        <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />
        
        {/* A material that warps and reflects your brand colors */}
        <MeshDistortMaterial
          color="#7C6AF7"       // Your Purple
          emissive="#2DD4BF"    // Your Teal
          emissiveIntensity={0.15}
          distort={0.3}         // How much the shape warps
          speed={2}             // Speed of the warping animation
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

export default function Scene3D() {
  return (
    <div className="w-full h-[600px] pointer-events-auto cursor-crosshair">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Base lighting */}
        <ambientLight intensity={0.5} />
        
        {/* Colored directional lights to enhance the 3D volume */}
        <directionalLight position={[10, 10, 5]} intensity={2} color="#2DD4BF" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#7C6AF7" />
        
        <AnimatedShape />
        
        {/* Gives the metalness realistic reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}