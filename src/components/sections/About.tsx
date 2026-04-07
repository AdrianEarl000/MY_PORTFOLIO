"use client";

import SectionLabel from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import { ABOUT_SKILLS } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-[1fr_1.2fr] gap-20 items-center max-lg:grid-cols-1 max-lg:gap-12">
          {/* Visual */}
          <Reveal direction="left">
            <div className="relative max-h-[520px] aspect-[3/4] max-lg:aspect-[3/4] max-lg:max-h-[500px]">
              {/* Image Container with Border and Background */}
              <div
                className="w-full h-full rounded-2xl border border-border flex items-center justify-center relative overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(124,106,247,0.15) 0%, rgba(45,212,191,0.1) 100%)",
                }}
              >
                {/* Background Glows (Optional, keep if using transparent PNG) */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, rgba(124,106,247,0.2), transparent 60%)",
                  }}
                />

                {/* Profile Picture - now much larger on mobile */}
                <img
                  src="/images/profile.jpg"
                  alt="My Profile Picture"
                  className="w-full h-full object-cover relative z-10"
                />
              </div>

              {/* Enhanced Floating Badge - smaller, repositioned to not cover face on mobile */}
              <div
                className="absolute -bottom-5 -right-5 px-6 py-4 bg-bg border border-border-2 rounded-2xl backdrop-blur-md z-20
                           max-lg:px-4 max-lg:py-2.5 max-lg:bottom-[-30px] max-lg:right-[-30px]"
              >
                <div
                  className="font-syne font-extrabold text-[28px] text-txt tracking-[-1px]
                                  max-lg:text-[20px]"
                >
                  30<span className="text-accent-2">+</span>
                </div>
                <div
                  className="text-[12px] text-txt-2 mt-0.5
                                  max-lg:text-[10px]"
                >
                  Projects Built
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={0.15}>
            <SectionLabel text="About Me" />
            <h2
              className="font-syne font-extrabold tracking-[-2px] leading-[1.1] text-txt mt-6"
              style={{ fontSize: "clamp(28px, 3.5vw, 48px)" }}
            >
              Building for the web,
              <br />
              obsessed with craft
            </h2>

            <div className="mt-6 space-y-4">
              <p className="text-[15px] text-txt-2 leading-[1.8] font-light">
                Hi, I&apos;m Adrian Earl, a{" "}
                <strong className="text-txt font-medium">
                  Full Stack Developer
                </strong>{" "}
                based in Philippines with 4+ years of experience turning
                ambitious ideas into production-ready products.
              </p>
              <p className="text-[15px] text-txt-2 leading-[1.8] font-light">
                I specialize in building{" "}
                <strong className="text-txt font-medium">
                  performant, accessible, and maintainable
                </strong>{" "}
                applications using the modern JavaScript ecosystem. My approach
                combines technical rigor with a deep focus on user experience.
              </p>
              <p className="text-[15px] text-txt-2 leading-[1.8] font-light">
                When I&apos;m not writing code, I&apos;m contributing to open
                source, writing about web performance, or exploring new tools
                that push the boundaries of what&apos;s possible on the web.
              </p>
            </div>

            {/* Skills */}
            <div className="grid grid-cols-2 gap-3 mt-8">
              {ABOUT_SKILLS.map((skill) => (
                <div
                  key={skill}
                  className="flex items-center gap-2 text-[14px] text-txt-2"
                >
                  <span className="w-[5px] h-[5px] rounded-full bg-accent-2 flex-shrink-0" />
                  {skill}
                </div>
              ))}
            </div>

            <div className="mt-9">
              <Button href="#contact" variant="primary">
                Let&apos;s work together →
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}