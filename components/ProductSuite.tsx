"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  TerminalSquare,
  Satellite,
  ShieldCheck,
  Check,
  CircleDashed,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ProductSuite() {
  const { t } = useLanguage();

  return (
    <Section
      id="products"
      label={t.products.label}
      title={t.products.title}
      subtitle={t.products.subtitle}
    >
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <ProductCard
            icon={TerminalSquare}
            name={t.products.dev.name}
            role={t.products.dev.role}
            tagline={t.products.dev.tagline}
            note={t.products.dev.note}
            features={t.products.dev.features}
            mockup={<ForgeMockup />}
          />
        </Reveal>
        <Reveal delay={0.12}>
          <ProductCard
            icon={Satellite}
            name={t.products.ops.name}
            role={t.products.ops.role}
            tagline={t.products.ops.tagline}
            features={t.products.ops.features}
            mockup={<HelmMockup />}
          />
        </Reveal>
      </div>

      <Reveal delay={0.15} className="mt-8">
        <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mist/50">
          {t.products.disclaimer}
        </p>
      </Reveal>
    </Section>
  );
}

interface ProductCardProps {
  icon: LucideIcon;
  name: string;
  role: string;
  tagline: string;
  note?: string;
  features: string[];
  mockup: React.ReactNode;
}

function ProductCard({
  icon: Icon,
  name,
  role,
  tagline,
  note,
  features,
  mockup,
}: ProductCardProps) {
  return (
    <div className="group flex h-full flex-col">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-pulse/25 bg-pulse/5">
          <Icon className="h-5 w-5 text-pulse" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="font-display text-xl font-medium tracking-wide text-frost">
            {name}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-mist/70">
            {role}
          </p>
        </div>
      </div>
      <p className="mt-4 text-base text-frost/90">{tagline}</p>
      {note && (
        <p className="mt-3 flex items-center gap-2 rounded-lg border border-pulse/20 bg-pulse/5 px-3 py-2 font-mono text-[11px] leading-snug text-pulse/90">
          <ShieldCheck className="h-3.5 w-3.5 shrink-0" strokeWidth={1.5} />
          {note}
        </p>
      )}
      <ul className="mt-4 space-y-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-mist">
            <Check className="h-3.5 w-3.5 text-pulse/70" strokeWidth={2} />
            {f}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex-1">{mockup}</div>
    </div>
  );
}

function MockupShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="glass overflow-hidden rounded-xl shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-steel" />
        <span className="h-2.5 w-2.5 rounded-full bg-steel" />
        <span className="h-2.5 w-2.5 rounded-full bg-pulse/40" />
        <span className="ml-3 font-mono text-[10px] tracking-[0.15em] text-mist/60">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}

function ForgeMockup() {
  const reduce = useReducedMotion();
  // CLI output stays in English — it's a developer tool.
  const lines = [
    { text: "$ forge init eo-cloud-mask", cls: "text-frost" },
    { text: "  ✓ workspace created · runtime: orbital-py3.11", cls: "text-mist/70" },
    { text: "$ forge validate --profile gpu-a", cls: "text-frost" },
    { text: "  ✓ manifest ok        ✓ resources within envelope", cls: "text-pulse/90" },
    { text: "  ✓ data profile: eo-multispectral-v2", cls: "text-pulse/90" },
    { text: "$ forge package --version 0.4.2", cls: "text-frost" },
    { text: "  → artifact: cloud-mask_0.4.2.ocw (ready)", cls: "text-ion" },
  ];

  return (
    <MockupShell title="forge — terminal">
      <div className="space-y-1.5 p-5 font-mono text-[11px] leading-relaxed md:text-xs">
        {lines.map((l, i) => (
          <motion.p
            key={i}
            className={l.cls}
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.18, duration: 0.3 }}
          >
            {l.text}
          </motion.p>
        ))}
        <motion.span
          className="inline-block h-3.5 w-2 bg-pulse/80 align-middle"
          animate={reduce ? undefined : { opacity: [1, 0, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
      </div>
    </MockupShell>
  );
}

function HelmMockup() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const rows = [
    { name: "cloud-mask", ver: "v0.4.2", status: t.products.mockup.running, kind: "running" },
    { name: "sar-detect", ver: "v1.1.0", status: t.products.mockup.queued, kind: "queued" },
    { name: "thermal-fusion", ver: "v0.9.7", status: t.products.mockup.complete, kind: "complete" },
  ];
  const bars = [42, 68, 55, 80, 61, 74, 48, 90, 66, 58, 72, 50];

  return (
    <MockupShell title="helm — mission console">
      <div className="p-5">
        {/* Telemetry bars */}
        <div className="mb-4 flex h-16 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-gradient-to-t from-deep/60 to-pulse/70"
              initial={reduce ? false : { height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.05, duration: 0.5 }}
            />
          ))}
        </div>
        <div className="mb-4 flex justify-between font-mono text-[9px] uppercase tracking-[0.15em] text-mist/50">
          <span>{t.products.mockup.gpuLabel}</span>
          <span className="text-pulse/80">{t.products.mockup.passLabel}</span>
        </div>
        {/* Workload table */}
        <div className="space-y-1.5">
          {rows.map((r) => (
            <div
              key={r.name}
              className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2 font-mono text-[10px] md:text-[11px]"
            >
              <span className="text-frost/90">{r.name}</span>
              <span className="text-mist/60">{r.ver}</span>
              <span
                className={`flex items-center gap-1.5 ${
                  r.kind === "running"
                    ? "text-pulse"
                    : r.kind === "queued"
                      ? "text-mist/70"
                      : "text-ion"
                }`}
              >
                {r.kind === "running" ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : r.kind === "queued" ? (
                  <CircleDashed className="h-3 w-3" />
                ) : (
                  <Check className="h-3 w-3" />
                )}
                {r.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </MockupShell>
  );
}
