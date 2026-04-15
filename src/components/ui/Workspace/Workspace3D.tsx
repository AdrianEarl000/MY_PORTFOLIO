"use client";

import { useRef, useState, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import { useTheme } from "./ThemeProvider";

type HoverState = "idle" | "hovering";

// ─── Camera subtle parallax ───────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  useFrame((state) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, state.pointer.x * 0.28, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, state.pointer.y * 0.14 + 0.1, 0.04);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── Monitor ──────────────────────────────────────────────────────────────────
function Monitor({
  hoverState,
  isRetro,
  isTransitioning,
  onHover,
  onLeave,
  onClick,
}: {
  hoverState: HoverState;
  isRetro: boolean;
  isTransitioning: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const screenRef = useRef<THREE.Mesh>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  const primaryColor  = isRetro ? "#00FF9C" : "#7C6AF7";
  const secondaryColor = isRetro ? "#00C8B8" : "#2DD4BF";

  useFrame((_, delta) => {
    timeRef.current += delta;

    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(timeRef.current * 0.7) * 0.025;
    }

    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      if (isTransitioning) {
        mat.emissiveIntensity = 0.8 + Math.sin(timeRef.current * 60) * 0.6 + Math.random() * 0.3;
      } else if (hoverState === "hovering") {
        mat.emissiveIntensity = 0.55 + Math.sin(timeRef.current * 4) * 0.1;
      } else {
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, isRetro ? 0.28 : 0.22, 0.06);
      }
      mat.emissive.lerp(new THREE.Color(isRetro ? secondaryColor : primaryColor), 0.04);
    }

    if (glowLightRef.current) {
      const target =
        isTransitioning ? 6 + Math.random() * 3 :
        hoverState === "hovering" ? 2.8 : 0.6;
      glowLightRef.current.intensity = THREE.MathUtils.lerp(glowLightRef.current.intensity, target, 0.08);
      glowLightRef.current.color.lerp(new THREE.Color(isRetro ? secondaryColor : primaryColor), 0.05);
    }
  });

  return (
    <group ref={groupRef} onPointerEnter={onHover} onPointerLeave={onLeave} onClick={onClick}>
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[3.4, 2.1, 0.16]} />
        <meshStandardMaterial color={isRetro ? "#0D1A14" : "#161628"} metalness={0.85} roughness={0.18} />
      </mesh>

      {/* Inner bezel */}
      <mesh position={[0, 0.06, 0.07]}>
        <boxGeometry args={[3.1, 1.82, 0.04]} />
        <meshStandardMaterial color={isRetro ? "#060D0A" : "#0A0A18"} />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0.06, 0.1]}>
        <planeGeometry args={[2.88, 1.66]} />
        <meshStandardMaterial
          color={isRetro ? "#030C08" : "#060610"}
          emissive={new THREE.Color(isRetro ? secondaryColor : primaryColor)}
          emissiveIntensity={0.22}
          roughness={0.04}
          metalness={0.05}
        />
      </mesh>

      {/* Screen content lines */}
      {[0.4, 0.15, -0.1, -0.3, -0.48].map((y, i) => (
        <mesh key={i} position={[(-0.4 + i * 0.1) * 0.3, y, 0.105]}>
          <planeGeometry args={[1.2 - i * 0.15, 0.02]} />
          <meshStandardMaterial
            color={isRetro ? "#00FF9C" : "#7C6AF7"}
            emissive={isRetro ? "#00FF9C" : "#2DD4BF"}
            emissiveIntensity={isRetro ? 0.9 : 0.7}
            transparent
            opacity={0.35 - i * 0.04}
          />
        </mesh>
      ))}

      {/* Screen glow light */}
      <pointLight ref={glowLightRef} position={[0, 0.06, 0.8]} color={primaryColor} intensity={0.6} distance={5} />

      {/* Corner accent dots */}
      {[[-1.34, 0.87], [1.34, 0.87], [-1.34, -0.75], [1.34, -0.75]].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.09]}>
          <circleGeometry args={[0.03, 8]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? primaryColor : secondaryColor}
            emissive={i % 2 === 0 ? primaryColor : secondaryColor}
            emissiveIntensity={hoverState === "hovering" ? 2.5 : 1.0}
          />
        </mesh>
      ))}

      {/* Logo dot */}
      <mesh position={[0, -0.92, 0.09]}>
        <circleGeometry args={[0.055, 16]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={hoverState === "hovering" ? 3 : 1.2}
        />
      </mesh>

      {/* Stand */}
      <mesh position={[0, -1.22, -0.22]}>
        <cylinderGeometry args={[0.07, 0.11, 0.5, 12]} />
        <meshStandardMaterial color={isRetro ? "#0D1A14" : "#161628"} metalness={0.9} roughness={0.12} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -1.5, -0.4]}>
        <cylinderGeometry args={[0.65, 0.75, 0.07, 24]} />
        <meshStandardMaterial color={isRetro ? "#0A120E" : "#111125"} metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Base accent ring */}
      <mesh position={[0, -1.47, -0.4]}>
        <torusGeometry args={[0.55, 0.012, 8, 48]} />
        <meshStandardMaterial
          color={primaryColor}
          emissive={primaryColor}
          emissiveIntensity={hoverState === "hovering" ? 2 : 0.8}
        />
      </mesh>
    </group>
  );
}

// ─── Keyboard ─────────────────────────────────────────────────────────────────
function Keyboard({ isRetro }: { isRetro: boolean }) {
  return (
    <group position={[0, -1.62, 0.9]} rotation={[-0.08, 0, 0]}>
      <mesh>
        <boxGeometry args={[2.5, 0.055, 0.85]} />
        <meshStandardMaterial color={isRetro ? "#0C1510" : "#10101E"} metalness={0.75} roughness={0.35} />
      </mesh>
      {[0, 1, 2, 3].map((row) =>
        Array.from({ length: 12 - row }, (_, col) => (
          <mesh key={`${row}-${col}`} position={[-1.05 + col * 0.19 + row * 0.04, 0.04, -0.3 + row * 0.18]}>
            <boxGeometry args={[0.155, 0.028, 0.155]} />
            <meshStandardMaterial color={isRetro ? "#0F1F18" : "#16163A"} metalness={0.6} roughness={0.4} />
          </mesh>
        ))
      )}
    </group>
  );
}

// ─── Desk ─────────────────────────────────────────────────────────────────────
function Desk({ isRetro }: { isRetro: boolean }) {
  const primary = isRetro ? "#00FF9C" : "#7C6AF7";
  return (
    <group position={[0, -1.7, 0.3]}>
      <mesh receiveShadow>
        <boxGeometry args={[5.8, 0.07, 2.4]} />
        <meshStandardMaterial color={isRetro ? "#090E0D" : "#0C0C1C"} metalness={0.4} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.018, 1.15]}>
        <boxGeometry args={[5.8, 0.028, 0.028]} />
        <meshStandardMaterial color={primary} emissive={primary} emissiveIntensity={isRetro ? 1.2 : 1.8} />
      </mesh>
      <mesh position={[-1.9, 0.22, 0.2]}>
        <cylinderGeometry args={[0.1, 0.1, 0.44, 8]} />
        <meshStandardMaterial color={isRetro ? "#0D1810" : "#18183C"} metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.9, 0.16, 0.3]}>
        <boxGeometry args={[0.22, 0.32, 0.22]} />
        <meshStandardMaterial color={isRetro ? "#0D1810" : "#18183C"} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[2.3, 0.26, 0.1]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial
          color={isRetro ? "#00FF9C" : "#2DD4BF"}
          emissive={isRetro ? "#00FF9C" : "#2DD4BF"}
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>
    </group>
  );
}

// ─── Floating particles ───────────────────────────────────────────────────────
function Particles({ isRetro }: { isRetro: boolean }) {
  const count = 24;
  const meshesRef = useRef<(THREE.Mesh | null)[]>([]);
  const posRef = useRef(
    Array.from({ length: count }, () => [
      (Math.random() - 0.5) * 7,
      (Math.random() - 0.5) * 5,
      (Math.random() - 0.5) * 4 - 1,
    ] as [number, number, number])
  );
  const speedRef = useRef(Array.from({ length: count }, () => 0.3 + Math.random() * 0.8));

  useFrame((state) => {
    meshesRef.current.forEach((mesh, i) => {
      if (!mesh) return;
      const t = state.clock.elapsedTime * speedRef.current[i];
      mesh.position.y = posRef.current[i][1] + Math.sin(t + i) * 0.2;
      mesh.position.x = posRef.current[i][0] + Math.cos(t * 0.5 + i) * 0.1;
      mesh.rotation.y += 0.01;
    });
  });

  return (
    <>
      {posRef.current.map((pos, i) => (
        <mesh key={i} ref={(el) => { meshesRef.current[i] = el; }} position={pos}>
          <octahedronGeometry args={[0.04 + (i % 4) * 0.015, 0]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? (isRetro ? "#00FF9C" : "#7C6AF7") : (isRetro ? "#00C8B8" : "#2DD4BF")}
            emissive={i % 2 === 0 ? (isRetro ? "#00FF9C" : "#7C6AF7") : (isRetro ? "#00C8B8" : "#2DD4BF")}
            emissiveIntensity={0.9}
            transparent
            opacity={0.45 + (i % 3) * 0.15}
          />
        </mesh>
      ))}
    </>
  );
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function WorkspaceScene({
  hoverState,
  isRetro,
  isTransitioning,
  onHover,
  onLeave,
  onClick,
}: {
  hoverState: HoverState;
  isRetro: boolean;
  isTransitioning: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const primary = isRetro ? "#00FF9C" : "#7C6AF7";
  const secondary = isRetro ? "#00C8B8" : "#2DD4BF";
  return (
    <>
      <ambientLight intensity={isRetro ? 0.2 : 0.3} />
      <directionalLight position={[5, 6, 4]} intensity={isRetro ? 0.8 : 1.2} color={secondary} />
      <directionalLight position={[-5, -4, -3]} intensity={isRetro ? 0.6 : 1.0} color={primary} />
      <pointLight position={[0, 4, 2]} intensity={0.3} color="#ffffff" />
      <CameraRig />
      <group position={[0, 0.28, 0]}>
        <Monitor
          hoverState={hoverState}
          isRetro={isRetro}
          isTransitioning={isTransitioning}
          onHover={onHover}
          onLeave={onLeave}
          onClick={onClick}
        />
      </group>
      <Keyboard isRetro={isRetro} />
      <Desk isRetro={isRetro} />
      <Particles isRetro={isRetro} />
      <Environment preset={isRetro ? "forest" : "night"} />
    </>
  );
}

// ─── Mode badge ───────────────────────────────────────────────────────────────
function ModeBadge({ isRetro, isTransitioning }: { isRetro: boolean; isTransitioning: boolean }) {
  return (
    <div style={{
      position: "absolute", top: 18, right: 18,
      display: "flex", alignItems: "center", gap: 7,
      padding: "5px 12px",
      border: `1px solid ${isRetro ? "rgba(0,255,156,0.3)" : "rgba(124,106,247,0.35)"}`,
      background: isRetro ? "rgba(3,12,8,0.75)" : "rgba(10,10,22,0.75)",
      backdropFilter: "blur(8px)",
      fontFamily: isRetro ? "'Share Tech Mono', monospace" : "'JetBrains Mono', monospace",
      fontSize: 10, letterSpacing: "2px",
      color: isRetro ? "#00FF9C" : "#7C6AF7",
      textShadow: isRetro ? "0 0 8px rgba(0,255,156,0.6)" : "0 0 8px rgba(124,106,247,0.6)",
      opacity: isTransitioning ? 0 : 1,
      transition: "opacity 0.3s, color 0.55s, border-color 0.55s",
      pointerEvents: "none",
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", display: "inline-block",
        background: isRetro ? "#00FF9C" : "#7C6AF7",
        boxShadow: isRetro ? "0 0 6px #00FF9C" : "0 0 6px #7C6AF7",
        animation: "badgePulse 2s ease-in-out infinite",
      }} />
      {/* {isRetro ? "RETRO MODE" : "NEON MODE"} */}
    </div>
  );
}

function HoverHint({ visible, isRetro }: { visible: boolean; isRetro: boolean }) {
  return (
    <div style={{
      position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
      fontFamily: isRetro ? "'Share Tech Mono', monospace" : "'JetBrains Mono', monospace",
      fontSize: 10, letterSpacing: "3px",
      color: isRetro ? "#00FF9C" : "#2DD4BF",
      textShadow: isRetro ? "0 0 10px #00FF9C" : "0 0 10px #2DD4BF",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.3s",
      pointerEvents: "none",
      whiteSpace: "nowrap",
      animation: visible ? "hintPulse 1.4s ease-in-out infinite" : "none",
    }}>
      {isRetro ? "[ CLICK TO RESTORE NEON ]" : "[ CLICK TO ENTER RETRO ]"}
    </div>
  );
}

// ─── Root export ──────────────────────────────────────────────────────────────
export default function Workspace3D() {
  const { mode, toggle, isTransitioning } = useTheme();
  const [hoverState, setHoverState] = useState<HoverState>("idle");
  const isRetro = mode === "retro";

  const handleHover = useCallback(() => setHoverState("hovering"), []);
  const handleLeave = useCallback(() => setHoverState("idle"), []);
  const handleClick = useCallback(() => { if (!isTransitioning) toggle(); }, [isTransitioning, toggle]);

  return (
    <div
      className="w-full h-[600px] relative"
      style={{
        cursor: hoverState === "hovering" ? "pointer" : "default",
        filter: isTransitioning
          ? (isRetro ? "hue-rotate(120deg) saturate(3) brightness(1.4)" : "hue-rotate(-120deg) saturate(3) brightness(1.4)")
          : "none",
        transition: isTransitioning ? "filter 0.15s ease" : "filter 0.55s ease",
      }}
    >
      <Canvas camera={{ position: [0, 0.1, 5], fov: 44 }} shadows style={{ background: "transparent" }}>
        <WorkspaceScene
          hoverState={hoverState} isRetro={isRetro} isTransitioning={isTransitioning}
          onHover={handleHover} onLeave={handleLeave} onClick={handleClick}
        />
      </Canvas>

      <ModeBadge isRetro={isRetro} isTransitioning={isTransitioning} />
      <HoverHint visible={hoverState === "hovering" && !isTransitioning} isRetro={isRetro} />

      <style>{`
        @keyframes badgePulse { 0%,100%{opacity:1}50%{opacity:0.35} }
        @keyframes hintPulse  { 0%,100%{opacity:1}50%{opacity:0.25} }
      `}</style>
    </div>
  );
}