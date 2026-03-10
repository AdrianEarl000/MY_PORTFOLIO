"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { TECH_STACK } from "@/lib/data";

function TechCard({ icon, name, index }: { icon: string; name: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -3, transition: { duration: 0.15 } }}
      className="relative flex items-center gap-[10px] px-5 py-3 bg-surface border border-border rounded-[10px] text-sm font-medium text-txt-2 cursor-default overflow-hidden group transition-colors duration-200 hover:border-border-2 hover:text-txt hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
    >
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "linear-gradient(135deg, rgba(124,106,247,0.06), transparent)" }}
      />
      <span className="text-[20px] w-7 text-center">{icon}</span>
      <span className="relative z-10">{name}</span>
    </motion.div>
  );
}

export default function TechStack() {
  return (
    <section
      id="tech"
      className="py-[120px] bg-bg-2 border-t border-b border-border"
    >
      <div className="max-w-[1200px] mx-auto px-10">
        <Reveal className="mb-16">
          <SectionLabel text="Tech Stack" />
          <h2 className="font-syne font-extrabold tracking-[-2px] leading-[1.05] text-txt mb-[14px]"
              style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
            Tools of the trade
          </h2>
          <p className="text-txt-3 font-light leading-[1.7] max-w-[480px]">
            The technologies I use to build fast, scalable, and maintainable products.
          </p>
        </Reveal>

        <div className="flex flex-col gap-10">
          {Object.entries(TECH_STACK).map(([category, items], catIdx) => (
            <Reveal key={category} delay={catIdx * 0.1}>
              <div className="text-[11px] font-mono text-txt-3 tracking-[2px] uppercase mb-4">
                {category}
              </div>
              <div className="flex flex-wrap gap-3">
                {items.map((item, i) => (
                  <TechCard
                    key={item.name}
                    icon={item.icon}
                    name={item.name}
                    index={i + catIdx * 6}
                  />
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
