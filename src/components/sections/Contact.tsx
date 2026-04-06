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
  "w-full px-4 py-[14px] bg-surface border border-border rounded-[10px] text-txt text-[14px] font-dm outline-none transition-all duration-200 placeholder:text-txt-3 focus:border-accent focus:shadow-[0_0_0_3px_rgba(124,106,247,0.15)] disabled:opacity-50 disabled:cursor-not-allowed";

export default function Contact() {
  // We consolidate all states into one clean status manager
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Parse JSON from backend to prevent false failures
      const result = await response.json().catch(() => null);

      if (response.ok) {
        setStatus("success");
        e.currentTarget.reset(); // Clear the form
        setTimeout(() => setStatus("idle"), 5000); // Hide success message after 5 seconds
      } else {
        console.error("Server responded with an error:", result);
        setStatus("error");
      }
    } catch (error) {
      console.error("Network error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-10">
        <div className="grid grid-cols-[1fr_1.4fr] gap-20 max-lg:grid-cols-1 max-lg:gap-12">
          {/* Info Side */}
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
                { icon: <GithubIcon />, label: "https://github.com/AdrianEarl000", href: SITE.github },
                { icon: "💼", label: "linkedin.com/in/adrianearl", href: SITE.linkedin },
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

          {/* Form Side */}
          <Reveal delay={0.15}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              
              {/* MODERN UI NOTIFICATIONS */}
              {status === "success" && (
                <div className="flex items-center gap-3 p-4 rounded-[10px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 font-medium text-[14px] transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  Message sent successfully! I will get back to you soon.
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-3 p-4 rounded-[10px] bg-red-500/10 border border-red-500/20 text-red-500 font-medium text-[14px] transition-all">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="15" y1="9" x2="9" y2="15"></line>
                    <line x1="9" y1="9" x2="15" y2="15"></line>
                  </svg>
                  Failed to send message. Please try again.
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-txt-2">Your Name</label>
                  <input
                    name="name"
                    type="text"
                    placeholder="John Smith"
                    className={inputBase}
                    required
                    disabled={status === "loading"}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-medium text-txt-2">Email Address</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="john@company.com"
                    className={inputBase}
                    required
                    disabled={status === "loading"}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-txt-2">Project Type</label>
                <input
                  name="project"
                  type="text"
                  placeholder="Web App, SaaS, E-commerce..."
                  className={inputBase}
                  disabled={status === "loading"}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-medium text-txt-2">Message</label>
                <textarea
                  name="message"
                  placeholder="Tell me about your project, timeline, and budget..."
                  className={`${inputBase} min-h-[120px] resize-none leading-[1.6]`}
                  required
                  disabled={status === "loading"}
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`w-full flex items-center justify-center gap-2 py-4 px-8 rounded-[10px] font-semibold text-[15px] text-white border-none cursor-pointer transition-all duration-200 ${
                  status === "success"
                    ? "bg-emerald-500 cursor-default"
                    : status === "loading"
                    ? "bg-accent/70 cursor-wait"
                    : "bg-accent hover:bg-[#8b7af8] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(124,106,247,0.35)]"
                }`}
              >
                {status === "loading" ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : status === "success" ? (
                  "Message Sent!"
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