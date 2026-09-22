"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { OrbitalScene } from "./OrbitalScene";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 * i, ease: [0.21, 0.65, 0.35, 1] as const },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Backdrop layers */}
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(14,116,144,0.14),transparent_70%)]" />
      <OrbitalScene />

      <div className="container-site relative z-10 flex flex-1 flex-col items-center justify-center pb-40 pt-32 text-center md:pb-48">
        <motion.p
          custom={0}
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="section-label mb-6 flex items-center gap-3"
        >
          <span className="inline-block h-px w-8 bg-pulse/50" />
          {t.hero.eyebrow}
          <span className="inline-block h-px w-8 bg-pulse/50" />
        </motion.p>

        <motion.h1
          custom={1}
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="font-display max-w-4xl text-5xl font-medium leading-[1.02] tracking-tightest md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient">{t.hero.title}</span>
        </motion.h1>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="mt-8 max-w-2xl text-base leading-relaxed text-mist md:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial={reduce ? false : "hidden"}
          animate="visible"
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#platform"
            className="group inline-flex items-center gap-2 rounded-full bg-pulse px-7 py-3.5 text-sm font-semibold text-void transition-all hover:bg-ion hover:shadow-[0_0_32px_rgba(34,211,238,0.35)]"
          >
            {t.hero.primary}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-medium text-frost transition-all hover:border-white/30 hover:bg-white/5"
          >
            {t.hero.secondary}
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#why"
        aria-label={t.hero.scrollAria}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-mist/60 transition-colors hover:text-pulse"
      >
        <ChevronDown className="h-5 w-5 animate-bounce" />
      </motion.a>
    </section>
  );
}
