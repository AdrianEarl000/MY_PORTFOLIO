"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/data";
import Workspace3D from "@/components/ui/Workspace/Workspace3D";
// import Terminal from "@/components/ui/Terminal";
// import Scene3D from "@/components/ui/Scene3D"; // <-- Added Import

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  };
}

export default function Hero() {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      if (orb1Ref.current)
        orb1Ref.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      if (orb2Ref.current)
        orb2Ref.current.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px)`;
      if (orb3Ref.current)
        orb3Ref.current.style.transform = `translate(${x * 0.9}px, ${y * 0.9}px)`;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-[120px] pb-20 overflow-hidden"
    >
      {/* Orbs */}
      <div
        ref={orb1Ref}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none animate-float-1 transition-transform duration-100 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(124,106,247,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "-100px",
          right: "-100px",
        }}
      />
      <div
        ref={orb2Ref}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none animate-float-2 transition-transform duration-100 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(45,212,191,0.1) 0%, transparent 70%)",
          filter: "blur(80px)",
          bottom: "50px",
          left: "-100px",
        }}
      />
      <div
        ref={orb3Ref}
        className="absolute w-[300px] h-[300px] rounded-full pointer-events-none animate-float-3 transition-transform duration-100 ease-out"
        style={{
          background: "radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "50%",
          left: "40%",
        }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black, transparent)",
        }}
      />
      {/* INTERACTIVE DESIGNS */}

      {/*2 Interactive Terminal */}
      {/* <div className="absolute top-1/2 -translate-y-1/2 right-10 w-[45%] z-20 max-lg:hidden perspective-1000">
        <motion.div
          initial={{ opacity: 0, x: 50, rotateY: -10 }}
          animate={{ opacity: 1, x: 0, rotateY: -15 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          className="w-full transform-gpu"
          style={{ transformStyle: 'preserve-3d' }}
        > */}

          {/* A subtle glowing drop-shadow behind the terminal */}
          {/* <div className="absolute -inset-4 bg-gradient-to-r from-accent-2/20 to-teal/20 blur-2xl -z-10 rounded-full opacity-50" />
          <Terminal />
        </motion.div>
      </div> */}

{/* 3D Workspace Scene */}
      {/* 1. Removed pointer-events-none here so it can be touched. 
          Slightly increased mobile opacity (opacity-50) so it's easier to see. */}
      <div className="absolute top-[20%] lg:top-1/2 lg:-translate-y-[45%] right-0 w-full lg:w-[55%] z-0 lg:z-20 flex justify-center items-center opacity-50 lg:opacity-100">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-gradient-to-tr from-accent-2/10 to-teal/10 blur-[80px] lg:blur-[120px] -z-10 rounded-full opacity-50 pointer-events-none" />
        
        <Workspace3D />
      </div>

      {/* Main Content */}
      {/* 2. Added `pointer-events-none` here so touches pass through the empty space to the 3D scene behind it */}
      <div className="max-w-[1200px] mx-auto px-10 relative z-10 w-full pointer-events-none">
        <div className="max-w-[860px]">
          {/* Badge */}
          <motion.div {...fadeUp(0)}>
            <div className="inline-flex items-center gap-2 px-4 py-[7px] bg-surface border border-border-2 rounded-full text-[13px] text-txt-2 mb-9">
              <span
                className="w-[7px] h-[7px] rounded-full bg-teal animate-pulse2"
                style={{ animation: "pulse2 2s ease-in-out infinite" }}
              />
              Available for new projects
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            {...fadeUp(0.1)}
            className="font-syne font-extrabold leading-[0.95] tracking-[-3px] text-txt mb-3"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            {SITE.name.split(" ")[0]}
            <br />
            <span className="gradient-text">{SITE.name.split(" ")[1]}.</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            {...fadeUp(0.2)}
            className="font-syne font-semibold text-txt-2 tracking-[-1px] mb-7"
            style={{ fontSize: "clamp(22px, 3.5vw, 38px)" }}
          >
            {SITE.role}
          </motion.p>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-txt-2 font-light leading-[1.7] max-w-[540px] mb-[52px]"
            style={{ fontSize: "clamp(16px, 1.8vw, 19px)" }}
          >
            {SITE.tagline}
          </motion.p>

          {/* CTAs */}
          {/* 3. Added `pointer-events-auto` back to the buttons so they can still be clicked! */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4 pointer-events-auto">
            <Button href="#projects" variant="primary" size="default">
              View Projects
              {/* SVG omitted for brevity, keep your existing SVG here */}
            </Button>
            <Button href="#contact" variant="secondary" size="default">
              Hire Me
              {/* SVG omitted for brevity, keep your existing SVG here */}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex flex-wrap gap-12 mt-[72px] pt-12 border-t border-border"
          >
            {SITE.stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-syne font-extrabold text-[32px] text-txt tracking-[-1px] leading-none">
                  {stat.value}
                  <span className="text-accent-2">{stat.suffix}</span>
                </div>
                <div className="text-[13px] text-txt-3 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-txt-3 text-[12px] tracking-[1px] uppercase font-mono"
      >
        <div
          className="w-px h-12 bg-gradient-to-b from-accent-2 to-transparent animate-scroll-line"
          style={{ animation: "scrollLine 2s ease-in-out infinite" }}
        />
        Scroll
      </motion.div> */}
    </section>
  );
}