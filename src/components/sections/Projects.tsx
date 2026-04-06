"use client";

import { motion } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { PROJECTS } from "@/lib/data";
import Image from "next/image";

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className={`bg-surface border border-border rounded-2xl overflow-hidden group transition-shadow duration-300 hover:border-border-2 hover:shadow-[0_24px_64px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] ${
        project.featured ? "col-span-2 max-sm:col-span-1" : ""
      }`}
    >
     {/* Image container */}
      <div
        className={`relative w-full aspect-video flex items-center justify-center overflow-hidden bg-gradient-to-br ${project.bgClass}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.accentClass} group-hover:opacity-80 transition-opacity duration-500 z-10`}
        />
        
        {project.image ? (
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <span className="relative z-20 text-[40px] group-hover:scale-110 transition-transform duration-500">
            {project.emoji}
          </span>
        )}

        <div className="absolute bottom-5 left-5 font-mono text-[11px] text-white/80 tracking-[2px] uppercase z-20">
          {project.label}
        </div>
      </div>

      {/* Body */}
      <div className="p-7">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-[10px] py-1 bg-accent/10 border border-accent/20 rounded-full font-mono text-[11px] text-accent-2 tracking-[0.5px]"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-syne font-bold text-[22px] text-txt tracking-[-0.5px] leading-[1.2] mb-[10px]">
          {project.title}
        </h3>
        <p className="text-[14px] text-txt-2 leading-[1.7] font-light mb-6">
          {project.description}
        </p>
        <div className="flex gap-3">
          <a
            href={project.demo}
            className="inline-flex items-center gap-1.5 px-[18px] py-[9px] bg-accent text-white text-[13px] font-semibold rounded-lg no-underline transition-all duration-200 hover:bg-[#8b7af8] hover:-translate-y-px"
          >
            ↗ Live Demo
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-[18px] py-[9px] bg-surface-2 text-txt-2 border border-border text-[13px] font-semibold rounded-lg no-underline transition-all duration-200 hover:text-txt hover:border-border-2"
          >
            <GithubIcon />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-10">
        <Reveal className="mb-16">
          <SectionLabel text="Featured Work" />
          <h2
            className="font-syne font-extrabold tracking-[-2px] leading-[1.05] text-txt mb-[14px]"
            style={{ fontSize: "clamp(32px, 4vw, 52px)" }}
          >
            Selected projects
          </h2>
          <p className="text-txt-2 font-light leading-[1.7] max-w-[480px]">
            A curated selection of products I&apos;ve built each designed to solve real problems at scale.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
