"use client";

import {
  ShieldCheck,
  FileCheck2,
  SlidersHorizontal,
  Box,
  Activity,
  Check,
} from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ICONS = [ShieldCheck, FileCheck2, SlidersHorizontal, Box, Activity];

export function Security() {
  const { t } = useLanguage();

  return (
    <Section
      id="security"
      label={t.security.label}
      title={t.security.title}
      subtitle={t.security.subtitle}
      className="bg-abyss/60"
    >
      <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {t.security.items.map((it, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal
              key={it.title}
              delay={0.06 * i}
              className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <div className="hairline h-full rounded-xl bg-night/30 p-6 transition-colors hover:border-pulse/25">
                <Icon className="h-5 w-5 text-pulse/80" strokeWidth={1.5} />
                <h3 className="mt-4 text-sm font-semibold text-frost">
                  {it.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">
                  {it.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      {/* Shared responsibility split */}
      <Reveal delay={0.15} className="mx-auto mt-12 max-w-4xl">
        <div className="hairline overflow-hidden rounded-2xl bg-night/30">
          <div className="border-b border-steel/20 px-6 py-3 text-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist/50">
              {t.security.responsibility.label}
            </span>
          </div>
          <div className="grid md:grid-cols-2">
            {[
              t.security.responsibility.ours,
              t.security.responsibility.theirs,
            ].map((col, ci) => (
              <div
                key={col.title}
                className={`p-6 ${
                  ci === 0
                    ? "border-b border-steel/20 md:border-b-0 md:border-r"
                    : ""
                }`}
              >
                <h3
                  className={`font-mono text-[10px] uppercase tracking-[0.25em] ${
                    ci === 0 ? "text-pulse" : "text-mist/70"
                  }`}
                >
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-mist"
                    >
                      <Check
                        className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                          ci === 0 ? "text-pulse/80" : "text-mist/50"
                        }`}
                        strokeWidth={2}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Security mechanisms strip */}
      <Reveal delay={0.2} className="mx-auto mt-10 max-w-4xl">
        <p className="mb-4 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-mist/50">
          {t.security.mechanismsLabel}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {t.security.mechanisms.map((m) => (
            <span
              key={m}
              className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-mist"
            >
              <span className="h-1 w-1 rounded-full bg-pulse/70" />
              {m}
            </span>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
