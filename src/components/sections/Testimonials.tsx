"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { TESTIMONIALS } from "@/lib/data";

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-[120px] bg-bg-2 border-t border-b border-border"
    >
      <div className="max-w-[1200px] mx-auto px-10">
        <Reveal className="mb-16">
          <SectionLabel text="Testimonials" />
          <h2
            className="font-syne font-extrabold tracking-[-2px] leading-[1.05] text-txt mb-[14px]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            What clients say
          </h2>
          <p className="text-txt-3 font-light leading-[1.7] max-w-[480px]">
            Trusted by founders, CTOs, and product teams to deliver exceptional results.
          </p>
        </Reveal>

        <div className="grid grid-cols-3 gap-5 max-lg:grid-cols-1">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="relative p-8 bg-surface border border-border rounded-2xl transition-all duration-300 hover:border-border-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.4)] overflow-hidden"
            >
              {/* Decorative quote mark */}
              <div
                className="absolute top-5 right-7 font-syne text-[80px] text-accent leading-none pointer-events-none"
                style={{ opacity: 0.12 }}
              >
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <span key={j} className="text-amber text-[14px]">★</span>
                ))}
              </div>

              <p className="text-[15px] text-txt-2 leading-[1.75] font-light italic mb-7">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-[14px]">
                <div
                  className={`w-[42px] h-[42px] rounded-full flex items-center justify-center text-[18px] flex-shrink-0 border-2 border-border-2 bg-gradient-to-br ${t.avatarClass}`}
                >
                  {t.avatar}
                </div>
                <div>
                  <div className="font-syne font-bold text-[14px] text-txt">
                    {t.name}
                  </div>
                  <div className="text-[12px] text-txt-3 mt-0.5">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
