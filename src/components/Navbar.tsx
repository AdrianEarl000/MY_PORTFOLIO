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

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const close = () => setMobileOpen(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? "py-3.5 bg-bg/85 backdrop-blur-xl border-b border-border"
            : "py-5"
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-10 flex items-center justify-between">
          <Link
            href="#hero"
            className="font-syne font-extrabold text-xl text-txt tracking-tight no-underline"
          >
            Alex<span className="text-accent-2">.</span>
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

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-[5px] cursor-pointer bg-transparent border-none p-1"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <span className="block w-[22px] h-px bg-txt rounded-sm" />
            <span className="block w-[22px] h-px bg-txt rounded-sm" />
            <span className="block w-[22px] h-px bg-txt rounded-sm" />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-bg/97 z-[99] flex flex-col items-center justify-center gap-8"
          >
            <button
              className="absolute top-6 right-6 bg-transparent border-none text-txt text-2xl cursor-pointer"
              onClick={close}
              aria-label="Close menu"
            >
              ✕
            </button>
            {[...NAV_LINKS, { label: "Contact", href: "#contact" }].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="font-syne font-bold text-[32px] text-txt no-underline hover:text-accent-2 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
