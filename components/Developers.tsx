"use client";

import {
  FileCode2,
  Layers,
  GitBranch,
  Gauge,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const ICONS = [FileCode2, Layers, GitBranch, Gauge, Lock];

export function Developers() {
  const { t } = useLanguage();

  return (
    <Section
      id="developers"
      label={t.developers.label}
      title={t.developers.title}
      subtitle={t.developers.subtitle}
      align="left"
    >
      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start">
        <Reveal>
          <div className="hairline rounded-2xl bg-night/40 p-7 font-mono text-xs leading-relaxed md:text-sm">
            <p className="text-mist/60">{t.developers.comment1}</p>
            <p className="mt-3 text-frost">
              <span className="text-pulse">name:</span> cloud-mask
            </p>
            <p className="text-frost">
              <span className="text-pulse">version:</span> 0.4.2
            </p>
            <p className="text-frost">
              <span className="text-pulse">runtime:</span> orbital-py3.11
            </p>
            <p className="text-frost">
              <span className="text-pulse">profile:</span> gpu-a
            </p>
            <p className="text-frost">
              <span className="text-pulse">data:</span> eo-multispectral-v2
            </p>
            <p className="text-frost">
              <span className="text-pulse">resources:</span>
            </p>
            <p className="pl-4 text-mist">cpu: 4 · gpu: 1 · storage: 8GB</p>
            <p className="mt-4 text-mist/60">{t.developers.comment2}</p>
          </div>
          <a
            href="#contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-full border border-pulse/40 bg-pulse/10 px-6 py-3 text-sm font-medium text-pulse transition-all hover:bg-pulse/20"
          >
            {t.developers.cta}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {t.developers.points.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={p.title} delay={0.06 * i} className="h-full">
                <div className="hairline h-full rounded-xl bg-night/20 p-5 transition-colors hover:border-pulse/25">
                  <Icon className="h-5 w-5 text-pulse/80" strokeWidth={1.5} />
                  <h3 className="mt-3 text-sm font-semibold text-frost">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-mist">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
