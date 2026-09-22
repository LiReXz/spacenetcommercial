"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Crosshair, ArrowDownUp, Rocket, Globe } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ICONS = [Crosshair, ArrowDownUp, Rocket];

export function Problem() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  return (
    <Section
      id="why"
      label={t.problem.label}
      title={t.problem.title}
      subtitle={t.problem.subtitle}
    >
      {/* Constraints strip */}
      <Reveal className="mx-auto mt-12 max-w-4xl">
        <p className="mb-3 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-mist/50">
          {t.problem.constraintsLabel}
        </p>
        <div className="hairline flex flex-wrap items-center justify-center gap-x-8 gap-y-3 rounded-2xl bg-night/40 px-6 py-5">
          {t.problem.constraints.map((c) => (
            <span
              key={c.title}
              className="group relative flex cursor-default items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-mist"
            >
              <span className="h-1 w-1 rounded-full bg-pulse/70" />
              {c.title}
              <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-52 -translate-x-1/2 rounded-lg border border-steel/40 bg-abyss/95 px-3 py-2 text-[11px] normal-case leading-snug tracking-normal text-mist opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                {c.body}
              </span>
            </span>
          ))}
        </div>
      </Reveal>

      {/* Data funnel visual */}
      <Reveal className="mx-auto mt-14 max-w-4xl" delay={0.1}>
        <div className="relative mx-auto flex h-40 max-w-2xl items-center justify-center">
          {/* Raw data streams — particles flow into the compute node */}
          {[38, 50, 62].map((top, li) => (
            <div
              key={li}
              className="absolute left-0 w-[38%]"
              style={{ top: `${top}%` }}
            >
              <div className="h-px w-full bg-gradient-to-r from-transparent via-mist/20 to-mist/40" />
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-mist/70"
                  animate={
                    reduce
                      ? undefined
                      : { left: ["0%", "98%"], opacity: [0, 1, 1, 0] }
                  }
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    delay: li * 0.4 + d * 0.7,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
          ))}
          {/* Compute node */}
          <motion.div
            animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass relative z-10 flex h-24 w-24 flex-col items-center justify-center rounded-2xl border-pulse/30 px-2"
          >
            <span className="text-center font-mono text-[9px] uppercase leading-tight tracking-[0.2em] text-pulse">
              {t.problem.compute}
            </span>
            <span className="mt-1.5 flex gap-1">
              <span className="h-1 w-1 animate-pulse-soft rounded-full bg-pulse" />
              <span className="h-1 w-1 animate-pulse-soft rounded-full bg-pulse [animation-delay:0.6s]" />
              <span className="h-1 w-1 animate-pulse-soft rounded-full bg-pulse [animation-delay:1.2s]" />
            </span>
          </motion.div>
          {/* Results stream — particles flow OUT of the node into the Earth endpoint */}
          <div className="absolute right-0 top-1/2 flex w-[38%] -translate-y-1/2 items-center">
            <div className="relative h-px flex-1 bg-gradient-to-r from-pulse/60 via-pulse/30 to-pulse/25">
              {[0, 1].map((d) => (
                <motion.span
                  key={d}
                  className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-pulse"
                  animate={
                    reduce
                      ? undefined
                      : { left: ["0%", "96%"], opacity: [0, 1, 1, 0] }
                  }
                  transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    delay: d * 1.6,
                    ease: "linear",
                  }}
                />
              ))}
            </div>
            {/* Earth endpoint — results arrive ready to consume */}
            <div className="relative ml-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-pulse/30 bg-night/60">
              <Globe className="h-4 w-4 text-pulse/80" strokeWidth={1.5} />
              <span className="absolute inset-0 animate-pulse-soft rounded-full border border-pulse/20" />
              <span className="absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.15em] text-pulse/70">
                {t.problem.toEarth}
              </span>
            </div>
          </div>
          <span className="absolute left-[6%] top-[26%] font-mono text-[10px] uppercase tracking-[0.15em] text-mist/60">
            {t.problem.raw}
          </span>
          <span className="absolute right-[14%] top-[26%] font-mono text-[10px] uppercase tracking-[0.15em] text-pulse/80">
            {t.problem.results}
          </span>
        </div>
      </Reveal>

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        {t.problem.blocks.map((b, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={b.title} delay={0.1 * i}>
              <div className="group hairline h-full rounded-2xl bg-night/30 p-8 transition-colors hover:border-pulse/25 hover:bg-night/60">
                <Icon
                  className="h-6 w-6 text-pulse/80 transition-colors group-hover:text-pulse"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 font-display text-lg font-medium text-frost">
                  {b.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{b.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
