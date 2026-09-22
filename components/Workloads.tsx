"use client";

import {
  Globe2,
  ImageDown,
  BrainCircuit,
  FlaskConical,
  Radio,
  Boxes,
} from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ICONS = [Globe2, ImageDown, BrainCircuit, FlaskConical, Radio, Boxes];

export function Workloads() {
  const { t } = useLanguage();

  return (
    <Section
      id="use-cases"
      label={t.workloads.label}
      title={t.workloads.title}
      subtitle={t.workloads.subtitle}
      className="bg-abyss/60"
    >
      <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
        {t.workloads.cases.map((c, i) => {
          const Icon = ICONS[i];
          return (
            <Reveal key={c.title} delay={0.05 * i} className="h-full">
              <div className="group flex h-full flex-col bg-void p-8 transition-colors hover:bg-night/70">
                <Icon
                  className="h-6 w-6 text-mist transition-colors group-hover:text-pulse"
                  strokeWidth={1.5}
                />
                <h3 className="mt-5 font-display text-base font-medium text-frost">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{c.body}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
