"use client";

import { Code2, CheckCircle2, UploadCloud, Play } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ICONS = [Code2, CheckCircle2, UploadCloud, Play];
const NUMS = ["01", "02", "03", "04"];

export function HowItWorks() {
  const { t } = useLanguage();

  return (
    <Section
      id="technology"
      label={t.howItWorks.label}
      title={t.howItWorks.title}
      subtitle={t.howItWorks.subtitle}
    >
      <div className="relative mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Connector line (desktop) */}
        <div className="absolute left-0 top-[52px] hidden h-px w-full bg-gradient-to-r from-transparent via-steel to-transparent lg:block" />

        {t.howItWorks.steps.map((s, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={s.title} delay={0.1 * i}>
              <div className="group relative h-full">
                <div className="hairline relative h-full rounded-2xl bg-night/30 p-7 transition-all hover:border-pulse/25 hover:bg-night/60">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-[0.2em] text-pulse/70">
                      {NUMS[i]}
                    </span>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-abyss transition-colors group-hover:border-pulse/40">
                      <Icon className="h-5 w-5 text-pulse/80" strokeWidth={1.5} />
                    </div>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-medium text-frost">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {s.body}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={0.2} className="mx-auto mt-10 max-w-2xl">
        <p className="text-center text-xs leading-relaxed text-mist/70">
          {t.howItWorks.footnote}
        </p>
      </Reveal>
    </Section>
  );
}
