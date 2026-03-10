"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export function Button({
  href,
  children,
  variant = "primary",
  size = "default",
  className = "",
}: ButtonProps) {
  const base =
    "inline-flex items-center gap-2 font-semibold rounded-[10px] transition-all duration-200 no-underline";

  const sizes = {
    sm: "px-[18px] py-[9px] text-[13px]",
    default: "px-8 py-[15px] text-[15px]",
    lg: "px-9 py-[17px] text-[16px]",
  };

  const variants = {
    primary:
      "bg-accent text-white hover:bg-[#8b7af8] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(124,106,247,0.35)]",
    secondary:
      "bg-surface text-txt border border-border-2 hover:bg-surface-2 hover:border-white/20 hover:-translate-y-0.5",
  };

  const isExternal = href.startsWith("http");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
