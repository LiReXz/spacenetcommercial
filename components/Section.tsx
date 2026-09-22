import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionProps {
  id?: string;
  label?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className = "",
  align = "center",
}: SectionProps) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <section id={id} className={`relative py-24 md:py-36 ${className}`}>
      <div className="container-site">
        {(label || title || subtitle) && (
          <Reveal className={`max-w-3xl ${alignCls}`}>
            {label && <p className="section-label mb-5">{label}</p>}
            {title && (
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tightest leading-[1.08] text-frost">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-6 text-base md:text-lg leading-relaxed text-mist">
                {subtitle}
              </p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
