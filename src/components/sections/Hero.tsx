"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/lib/data";
import Workspace3D from "@/components/ui/Workspace/Workspace3D";

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
      // CHANGED: Use flex-col to allow stacking on mobile, while centering vertically
      className="relative min-h-screen flex flex-col justify-center pt-[120px] pb-20 overflow-hidden"
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

      {/* Main Content Wrapper */}
      {/* CHANGED: Swaps between flex-col for mobile stacking and standard block for desktop */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 w-full flex flex-col lg:block">
        
        {/* TEXT CONTENT */}
        <div className="max-w-[860px] pointer-events-none relative z-20">
          
          {/* Badge */}
          <motion.div {...fadeUp(0)} className="pointer-events-auto w-max">
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
            className="font-syne font-extrabold leading-[0.95] tracking-[-3px] text-txt mb-3 pointer-events-auto w-max"
            style={{ fontSize: "clamp(52px, 8vw, 96px)" }}
          >
            {SITE.name.split(" ")[0]}
            <br />
            <span className="gradient-text">{SITE.name.split(" ")[1]}.</span>
          </motion.h1>

          {/* Role */}
          <motion.p
            {...fadeUp(0.2)}
            className="font-syne font-semibold text-txt-2 tracking-[-1px] mb-7 pointer-events-auto w-max"
            style={{ fontSize: "clamp(22px, 3.5vw, 38px)" }}
          >
            {SITE.role}
          </motion.p>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.3)}
            className="text-txt-2 font-light leading-[1.7] max-w-[540px] mb-[52px] pointer-events-auto"
            style={{ fontSize: "clamp(16px, 1.8vw, 19px)" }}
          >
            {SITE.tagline}
          </motion.p>

          {/* CTAs */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-4 pointer-events-auto">
            <Button href="#projects" variant="primary" size="default">
              View Projects
              {/* Note: SVG omitted for brevity, paste your SVG here */}
            </Button>
            <Button href="#contact" variant="secondary" size="default">
              Hire Me
              {/* Note: SVG omitted for brevity, paste your SVG here */}
            </Button>
          </motion.div>

          {/* Stats - UPDATED LAYOUT */}
          <motion.div
            {...fadeUp(0.5)}
            // Mobile: spaced out with justify-between and smaller gaps/padding.
            // Desktop: restore large gaps and left-alignment.
            className="flex flex-wrap justify-between md:justify-start gap-4 md:gap-12 mt-10 md:mt-[72px] pt-8 md:pt-12 border-t border-border pointer-events-auto"
          >
            {SITE.stats.map((stat) => (
              <div key={stat.label} className="min-w-fit text-left">
                <div className="font-syne font-extrabold text-[28px] md:text-[32px] text-txt tracking-[-1px] leading-none">
                  {stat.value}
                  <span className="text-accent-2">{stat.suffix}</span>
                </div>
                <div className="text-[12px] md:text-[13px] text-txt-3 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D WORKSPACE SCENE - IDEA B IMPLEMENTATION */}
        {/* Mobile: relative block that flows below stats. Desktop: absolute positioned to the right. */}
        <div className="relative mt-16 w-full h-[350px] lg:mt-0 lg:absolute lg:top-1/2 lg:-translate-y-[45%] lg:right-0 lg:w-[55%] lg:h-auto z-10 lg:z-10 flex justify-center items-center opacity-100 pointer-events-none">
          
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] lg:w-[500px] h-[250px] lg:h-[500px] bg-gradient-to-tr from-accent-2/10 to-teal/10 blur-[60px] lg:blur-[120px] -z-10 rounded-full opacity-50" />
          
          {/* Restored interaction to the 3D object only */}
          <div className="relative w-full h-full pointer-events-auto flex justify-center items-center">
             <Workspace3D />
          </div>
        </div>

      </div>
    </section>
  );
}