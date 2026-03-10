"use client";

interface SectionLabelProps {
  text: string;
  center?: boolean;
}

export default function SectionLabel({ text, center = false }: SectionLabelProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-mono text-[11px] text-accent-2 tracking-[2px] uppercase mb-5 ${
        center ? "justify-center flex" : ""
      }`}
    >
      {!center && (
        <span className="block w-5 h-px bg-accent-2" />
      )}
      {text}
    </div>
  );
}
