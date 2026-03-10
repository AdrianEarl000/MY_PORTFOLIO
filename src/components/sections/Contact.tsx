"use client";

import { useState, FormEvent } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import Reveal from "@/components/ui/Reveal";
import { SITE } from "@/lib/data";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.09.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

const inputBase =
  "w-full px-4 py-[14px] bg-surface border border-border rounded-[10px] text-txt text-[14px] font-dm outline-none transition-all duration-200 placeholder:text-txt-3 focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,106,247,0.15)]";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-[1fr_1.4fr] gap-20 max-lg:grid-cols-1 max-lg:gap-12">
          {/* Info */}
          <Reveal direction="left">
            <SectionLabel text="Contact" />
            <h2
              className="font-syne font-extrabold tracking-[-2px] leading-[1.1] text-txt mt-2 mb-4"
              style={{ fontSize: "clamp(28px, 3.5vw, 44px)" }}
            >
              Get in touch
            </h2>
            <p className="text-[15px] text-txt-3 font-light leading-[1.7] mb-10">
              I&apos;m currently taking on new clients. Send a message and I&apos;ll get back to you within 24 hours.
            </p>

            <div className="flex flex-col gap-[14px]">
              {[
                { icon: "✉️", label: SITE.email, href: `mailto:${SITE.email}` },
                { icon: <GithubIcon />, label: "github.com/alexchen", href: SITE.github },
                { icon: "💼", label: "linkedin.com/in/alexchen", href: SITE.linkedin },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-[14px] px-5 py-4 bg-surface border border-border rounded-[10px] text-txt-2 text-[14px] font-medium no-underline transition-all duration-200 hover:border-border-2 hover:text-txt hover:bg-surface-2 hover:translate-x-1"
                >
                  <div className="w-9 h-9 bg-surface-2 rounded-lg flex items-center justify-center text-[16px] flex-shrink-0">
                    {link.icon}
                  </div>
                  {link.label}
                </a>
              ))}
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-txt-2">Your Name</label>
                  <input
                    type="text"
                    placeholder="John Smith"
                    className={inputBase}
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-txt-2">Email Address</label>
                  <input
                    type="email"
                    placeholder="john@company.com"
                    className={inputBase}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-txt-2">Project Type</label>
                <input
                  type="text"
                  placeholder="Web App, SaaS, E-commerce..."
                  className={inputBase}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-txt-2">Message</label>
                <textarea
                  placeholder="Tell me about your project, timeline, and budget..."
                  className={`${inputBase} min-h-[120px] resize-none leading-[1.6]`}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className={`w-full flex items-center justify-center gap-2 py-4 px-8 rounded-[10px] font-semibold text-[15px] text-white border-none cursor-pointer transition-all duration-200 ${
                  submitted
                    ? "bg-emerald-500 cursor-default"
                    : "bg-accent hover:bg-[#8b7af8] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(124,106,247,0.35)]"
                }`}
              >
                {submitted ? (
                  "✓ Message Sent!"
                ) : (
                  <>
                    Send Message
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 8h12M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
