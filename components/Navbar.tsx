"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Orbit, Globe, ChevronDown, Satellite } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Locale } from "@/lib/i18n/types";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { t, locale, setLocale } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#platform", label: t.nav.platform },
    { href: "#technology", label: t.nav.technology },
    { href: "#use-cases", label: t.nav.useCases },
    { href: "#developers", label: t.nav.developers },
    { href: "#security", label: t.nav.security },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass border-b border-white/5"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="container-site flex h-16 items-center justify-between"
        aria-label="Main navigation"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-[0.18em] text-frost"
        >
          <Orbit className="h-5 w-5 text-pulse" strokeWidth={1.5} />
          SpaceNet
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {/* Product dropdown */}
          <li className="group relative">
            <button
              className="flex items-center gap-1 text-sm text-mist transition-colors hover:text-frost"
              aria-haspopup="true"
            >
              {t.nav.product}
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="glass w-64 rounded-xl p-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
                {t.nav.productItems.map((p) => (
                  <a
                    key={p.href + p.name}
                    href={p.href}
                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-white/5"
                  >
                    <Satellite className="mt-0.5 h-4 w-4 shrink-0 text-pulse" strokeWidth={1.5} />
                    <span>
                      <span className="block text-sm font-medium text-frost">{p.name}</span>
                      <span className="mt-0.5 block text-xs text-mist">{p.desc}</span>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </li>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-mist transition-colors hover:text-frost"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageToggle locale={locale} setLocale={setLocale} />
          <a
            href="#contact"
            className="rounded-full border border-pulse/40 bg-pulse/10 px-5 py-2 text-sm font-medium text-pulse transition-all hover:border-pulse/60 hover:bg-pulse/20"
          >
            {t.nav.contact}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle locale={locale} setLocale={setLocale} compact />
          <button
            className="p-2 text-frost"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass max-h-[calc(100dvh-4rem)] overflow-y-auto lg:hidden"
          >
            <ul className="container-site flex flex-col gap-1 py-4">
              {/* Product group */}
              <li>
                <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-mist/50">
                  {t.nav.product}
                </p>
                {t.nav.productItems.map((p) => (
                  <a
                    key={p.href + p.name}
                    href={p.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg py-2.5 pl-6 pr-3 text-base text-mist transition-colors hover:bg-white/5 hover:text-frost"
                  >
                    {p.name}
                  </a>
                ))}
              </li>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base text-mist transition-colors hover:bg-white/5 hover:text-frost"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="block rounded-full border border-pulse/40 bg-pulse/10 px-5 py-3 text-center text-sm font-medium text-pulse"
                >
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function LanguageToggle({
  locale,
  setLocale,
  compact = false,
}: {
  locale: Locale;
  setLocale: (l: Locale) => void;
  compact?: boolean;
}) {
  return (
    <div
      className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1"
      role="group"
      aria-label="Language selector"
    >
      {!compact && <Globe className="ml-1.5 h-3.5 w-3.5 text-mist/60" />}
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors ${
            locale === l
              ? "bg-pulse/15 text-pulse"
              : "text-mist/60 hover:text-frost"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
