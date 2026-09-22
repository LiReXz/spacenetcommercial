"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Package,
  TerminalSquare,
  Satellite,
  Cpu,
  Database,
  BarChart3,
  ShieldCheck,
} from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ICONS = [Package, TerminalSquare, Satellite, Cpu, Database, BarChart3];
const ACCENT = new Set([1, 2]); // SpaceDev & SpaceOps stages

export function Platform() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  return (
    <Section
      id="platform"
      label={t.platform.label}
      title={t.platform.title}
      subtitle={t.platform.subtitle}
      className="bg-abyss/60"
    >
      <div className="mx-auto mt-16 max-w-3xl">
        <div className="relative">
          {/* Vertical spine */}
          <div className="absolute left-[27px] top-0 h-full w-px bg-gradient-to-b from-pulse/50 via-ion/30 to-pulse/50 md:left-1/2" />

          {/* Travelling pulse along the spine */}
          {!reduce && (
            <motion.div
              className="absolute left-[27px] h-16 w-px bg-gradient-to-b from-transparent via-pulse to-transparent md:left-1/2"
              animate={{ bottom: ["100%", "0%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            />
          )}

          <div className="flex flex-col gap-6 md:gap-10">
            {t.platform.stages.map((s, i) => {
              const left = i % 2 === 0;
              const accent = ACCENT.has(i);
              const Icon = ICONS[i];
              return (
                <Reveal key={s.tag} delay={0.05 * i}>
                  <div
                    className={`relative flex items-center gap-6 pl-16 md:w-1/2 md:pl-0 ${
                      left
                        ? "md:flex-row-reverse md:pr-12 md:text-right"
                        : "md:ml-auto md:pl-12"
                    }`}
                  >
                    {/* Node dot */}
                    <span
                      className={`absolute left-[19px] top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center md:top-auto ${
                        left ? "md:-right-2 md:left-auto" : "md:-left-2"
                      }`}
                    >
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          accent
                            ? "bg-pulse shadow-[0_0_12px_rgba(34,211,238,0.7)]"
                            : "border border-mist/40 bg-steel"
                        }`}
                      />
                    </span>

                    <div
                      className={`hairline w-full rounded-2xl p-6 transition-colors hover:border-pulse/30 ${
                        accent ? "border-pulse/20 bg-night/70" : "bg-night/30"
                      }`}
                    >
                      <div
                        className={`flex items-center gap-3 ${
                          left ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <Icon
                          className={`h-5 w-5 shrink-0 ${
                            accent ? "text-pulse" : "text-mist"
                          }`}
                          strokeWidth={1.5}
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-pulse/80">
                          {s.tag}
                        </span>
                      </div>
                      <h3 className="mt-3 font-display text-base font-medium text-frost md:text-lg">
                        {s.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Compatibility note */}
        <Reveal delay={0.15} className="mt-14">
          <div className="glass flex items-start gap-4 rounded-2xl p-6 text-left">
            <ShieldCheck
              className="mt-0.5 h-5 w-5 shrink-0 text-pulse"
              strokeWidth={1.5}
            />
            <p className="text-sm leading-relaxed text-mist">
              {t.platform.note.map((seg, i) =>
                seg.strong ? (
                  <span key={i} className="text-frost">
                    {seg.text}
                  </span>
                ) : (
                  seg.text
                )
              )}
            </p>
          </div>
        </Reveal>

        {/* Platform roadmap */}
        <Reveal delay={0.2} className="mt-14">
          <p className="mb-6 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-mist/50">
            {t.platform.roadmapLabel}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {t.platform.roadmap.map((r, i) => (
              <div
                key={r.phase}
                className={`hairline relative rounded-2xl p-5 transition-colors ${
                  i === 0
                    ? "border-pulse/30 bg-night/60"
                    : "bg-night/20 hover:border-pulse/20"
                }`}
              >
                <span
                  className={`font-mono text-[9px] uppercase tracking-[0.25em] ${
                    i === 0 ? "text-pulse" : "text-mist/50"
                  }`}
                >
                  {r.phase}
                </span>
                <h4 className="mt-2 font-display text-sm font-medium text-frost">
                  {r.title}
                </h4>
                <p className="mt-1.5 text-xs leading-relaxed text-mist">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
