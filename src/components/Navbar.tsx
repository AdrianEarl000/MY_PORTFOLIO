"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Tech", href: "#tech" },
  { label: "Work", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Removed the body overflow hidden hook since a small modal doesn't require locking the scroll

  const close = () => setMobileOpen(false);
  const toggle = () => setMobileOpen(!mobileOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled
          ? "py-3.5 bg-bg/85 backdrop-blur-xl border-b border-border"
          : "py-5"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-10 flex items-center justify-between relative">
        <Link
          href="#hero"
          className="font-syne font-extrabold text-xl text-txt tracking-tight no-underline relative z-[100]"
        >
          Adrian<span className="text-accent-2">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-txt-2 text-sm font-medium tracking-[0.2px] no-underline hover:text-txt transition-colors duration-200"
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#contact"
              className="bg-accent text-white no-underline px-[22px] py-[9px] rounded-lg text-[13px] font-semibold transition-all duration-200 hover:bg-accent-2 hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(124,106,247,0.35)]"
            >
              Hire Me
            </Link>
          </li>
        </ul>

        {/* Animated Hamburger Toggle */}
        <button
          className="md:hidden flex flex-col justify-center items-center gap-[6px] w-10 h-10 cursor-pointer bg-transparent border-none z-[100]"
          onClick={toggle}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-[2px] bg-txt rounded-full transition-transform duration-300 ease-in-out ${
              mobileOpen ? "rotate-45 translate-y-[8px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-txt rounded-full transition-opacity duration-300 ease-in-out ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-txt rounded-full transition-transform duration-300 ease-in-out ${
              mobileOpen ? "-rotate-45 -translate-y-[8px]" : ""
            }`}
          />
        </button>

        {/* Floating Mobile Modal */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute top-[120%] right-6 mt-2 p-6 min-w-[220px] bg-zinc-950/95 backdrop-blur-2xl border border-border rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.4)] z-[90] flex flex-col gap-6 md:hidden"
            >
              <div className="flex flex-col gap-5">
                {[...NAV_LINKS, { label: "Contact", href: "#contact" }].map(
                  (link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={close}
                      className="font-syne font-bold text-[22px] text-txt no-underline hover:text-accent-2 transition-colors tracking-tight"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}