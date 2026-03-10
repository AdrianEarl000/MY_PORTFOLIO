"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/lib/data";

export default function Process() {
  return (
    <section
      id="process"
      className="py-[120px] bg-bg-2 border-t border-b border-border"
    >
      <div className="max-w-[1200px] mx-auto px-10">
        <Reveal className="mb-16">
          <SectionLabel text="How I Work" />
          <h2
            className="font-syne font-extrabold tracking-[-2px] leading-[1.05] text-txt mb-[14px]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            My process
          </h2>
          <p className="text-txt-3 font-light leading-[1.7] max-w-[480px]">
            A structured, transparent approach that keeps every project on time and on scope.
          </p>
        </Reveal>

        <div className="relative grid grid-cols-4 gap-0 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {/* Connecting line — desktop only */}
          <div
            className="absolute hidden lg:block"
            style={{
              top: "40px",
              left: "10%",
              right: "10%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.12), #7c6af7, rgba(255,255,255,0.12), transparent)",
            }}
          />

          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              className="relative text-center px-6 py-10 rounded-2xl transition-colors duration-300 group"
            >
              {/* Step number bubble */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-[52px] h-[52px] bg-bg border border-border-2 rounded-full flex items-center justify-center font-mono text-[13px] text-accent-2 mx-auto mb-6 relative z-10 transition-all duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-white group-hover:shadow-[0_0_24px_rgba(124,106,247,0.35)]"
              >
                {step.num}
              </motion.div>

              <div className="text-[28px] mb-4">{step.icon}</div>
              <div className="font-syne font-bold text-[16px] text-txt tracking-[-0.3px] mb-[10px]">
                {step.name}
              </div>
              <div className="text-[13px] text-txt-3 leading-[1.7] font-light">
                {step.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
