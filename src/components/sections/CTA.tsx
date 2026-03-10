"use client";

import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import SectionLabel from "@/components/ui/SectionLabel";

export default function CTA() {
  return (
    <section id="cta" className="py-[120px] relative overflow-hidden text-center">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, rgba(124,106,247,0.1) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-10 relative z-10">
        <Reveal>
          <div className="max-w-[680px] mx-auto">
            <SectionLabel text="Let's build" center />
            <h2
              className="font-syne font-extrabold tracking-[-2px] leading-[1.05] text-txt mb-5"
              style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
            >
              Have a project in mind?{" "}
              <br />
              <span className="gradient-text">
                Let&apos;s build something amazing.
              </span>
            </h2>
            <p className="text-[17px] text-txt-3 font-light leading-[1.6] mb-11">
              Whether you need a full product from scratch or a senior developer to level up
              your team — I&apos;m ready to help you ship.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button href="#contact" variant="primary" size="lg">
                Start a Project →
              </Button>
              <Button href="#projects" variant="secondary" size="lg">
                View My Work
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
