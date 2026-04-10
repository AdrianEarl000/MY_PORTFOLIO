"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { ACHIEVEMENTS } from "@/lib/data";
import Image from "next/image";

function AchievementCard({
  item,
  index,
  onClick,
}: {
  item: (typeof ACHIEVEMENTS)[0];
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={item.image ? onClick : undefined}
      className={`bg-surface border border-border rounded-3xl p-8 lg:p-10 flex flex-col h-full group transition-shadow duration-300 hover:border-border-2 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] ${
        item.image ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex items-center justify-between mb-8">
        <span
          className={`px-[12px] py-[6px] border rounded-full font-mono text-[12px] tracking-[0.5px] ${
            item.type === "Certification"
              ? "bg-accent/10 border-accent/20 text-accent-2"
              : "bg-surface-2 border-border text-txt-2"
          }`}
        >
          {item.type}
        </span>
        <span className="text-[14px] font-mono text-txt-2">
          {item.date}
        </span>
      </div>

      <h3 className="font-syne font-bold text-[24px] lg:text-[26px] text-txt tracking-[-0.5px] leading-[1.2] mb-2">
        {item.title}
      </h3>
      <p className="text-[15px] text-accent-2 font-medium mb-5">
        {item.issuer}
      </p>
      
      <p className="text-[15px] lg:text-[16px] text-txt-2 leading-[1.8] font-light mb-8 flex-grow">
        {item.description}
      </p>

      <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
        {item.link ? (
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} 
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-txt transition-colors duration-200 hover:text-accent-2 group/link"
          >
            Verify Link
            <svg className="w-4 h-4 transition-transform duration-200 group-hover/link:translate-x-1 group-hover/link:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ) : <div />}

        {item.image && (
          <span className="text-[13px] text-txt-2 font-mono flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            Click to view
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<(typeof ACHIEVEMENTS)[0] | null>(null);

  return (
    <section id="certifications" className="py-[120px] relative">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <Reveal className="mb-16">
          <SectionLabel text="Milestones" />
          <h2
            className="font-syne font-extrabold tracking-[-2px] leading-[1.05] text-txt mb-[14px]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Certifications & Awards
          </h2>
          <p className="text-txt-2 font-light leading-[1.7] max-w-[480px]">
            Official recognitions, competition results, and continuous learning achievements throughout my academic journey.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ACHIEVEMENTS.map((item, i) => (
            <AchievementCard 
              key={item.id} 
              item={item} 
              index={i} 
              onClick={() => setSelectedCert(item)} 
            />
          ))}
        </div>
      </div>

      {/* --- THE UPGRADED MODAL --- */}
      <AnimatePresence>
        {selectedCert && selectedCert.image && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedCert(null)} 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60"
          >
            <motion.div
              // NEW ANIMATION: Starts smaller (0.85) and drops from higher up (y: 50)
              initial={{ scale: 0.85, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 50 }}
              // TWEAKED PHYSICS: Slightly heavier mass for a more premium, grounded spring
              transition={{ type: "spring", damping: 25, stiffness: 300, mass: 0.8 }}
              onClick={(e) => e.stopPropagation()} 
              // NEW SIZE: w-[95vw] max-w-[1200px] makes it huge, max-h-[95vh] keeps it on screen
              className="relative w-[95vw] max-w-[1200px] max-h-[95vh] flex flex-col bg-surface border border-border rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 p-2.5 bg-black/50 hover:bg-accent text-white rounded-full transition-colors duration-200 backdrop-blur-md border border-white/10"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Certificate Details Header */}
              <div className="p-6 md:p-8 border-b border-border bg-surface-2">
                <h3 className="font-syne font-bold text-2xl text-txt">{selectedCert.title}</h3>
                <p className="text-base text-txt-2 mt-1">{selectedCert.issuer} • {selectedCert.date}</p>
              </div>

              {/* The Image Container - NEW HEIGHT: Uses vh (viewport height) to fill the screen */}
              <div className="relative w-full h-[60vh] md:h-[75vh] bg-[#050505] flex items-center justify-center p-4 md:p-8">
                <Image
                  src={selectedCert.image}
                  alt={selectedCert.title}
                  fill
                  className="object-contain p-2 md:p-6"
                  sizes="100vw"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}