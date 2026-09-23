"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Orbit, Globe, ChevronDown, Satellite } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Locale } from "@/lib/i18n/types";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { t, locale, setLocale } = useLanguage();

  // Lock page scroll while the mobile menu is open — the menu behaves
  // as a modal: the page behind must not move, and touch gestures on
  // links can't be misread as scrolls (which would cancel navigation).
  // Applied synchronously in the toggle (not an effect) so there's no
  // gap where the page can still scroll. Locks documentElement — the
  // actual document scroller.
  const setMenuOpen = (v: boolean) => {
    setOpen(v);
    document.documentElement.style.overflow = v ? "hidden" : "";
  };

  const links = [
    { href: "#platform", label: t.nav.platform },
    { href: "#technology", label: t.nav.technology },
    { href: "#use-cases", label: t.nav.useCases },
    { href: "#developers", label: t.nav.developers },
    { href: "#security", label: t.nav.security },
  ];

  // Mobile menu links scroll explicitly via scrollIntoView, deferred
  // until the menu exit animation finishes — a smooth scroll still in
  // flight when the menu unmounts gets cancelled mid-flight (reproduced
  // in Firefox AND Chromium for far-away targets).
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    window.setTimeout(() => {
      document
        .getElementById(href.slice(1))
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300); // matches the 0.25s exit transition
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* glass lives on this wrapper, not <header> — backdrop-filter on an
          ancestor makes it the containing block for fixed descendants and
          would pin the menu backdrop to the header instead of the viewport */}
      <div className="glass border-b border-white/5">
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
              className="-mx-3 -my-1.5 flex items-center gap-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-mist transition-all hover:bg-pulse/15 hover:text-frost"
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
                    className="flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-pulse/15"
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
                className="-mx-3 -my-1.5 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm text-mist transition-all hover:bg-pulse/15 hover:text-frost"
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
            className="whitespace-nowrap rounded-full border border-pulse/40 bg-pulse/10 px-5 py-2 text-sm font-medium text-pulse transition-all hover:border-pulse/60 hover:bg-pulse/20"
          >
            {t.nav.contact}
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageToggle locale={locale} setLocale={setLocale} compact />
          <button
            className="p-2 text-frost"
            onClick={() => setMenuOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        </nav>
      </div>

      <AnimatePresence>
        {/* Backdrop — tapping outside the menu closes it */}
        {open && (
          <motion.div
            key="menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 bg-void/70 backdrop-blur-sm lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
        {open && (
          <motion.div
            key="menu-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="glass relative max-h-[calc(100dvh-4rem)] overflow-y-auto lg:hidden"
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
                    onClick={(e) => goTo(e, p.href)}
                    className="block rounded-lg border-l-2 border-transparent py-2.5 pl-6 pr-3 text-base text-mist transition-all hover:border-pulse hover:bg-pulse/15 hover:text-frost active:border-pulse active:bg-pulse/25 active:text-frost"
                  >
                    {p.name}
                  </a>
                ))}
              </li>
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={(e) => goTo(e, l.href)}
                    className="block rounded-lg border-l-2 border-transparent px-3 py-3 text-base text-mist transition-all hover:border-pulse hover:bg-pulse/15 hover:text-frost active:border-pulse active:bg-pulse/25 active:text-frost"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => goTo(e, "#contact")}
                  className="block rounded-full border border-pulse/40 bg-pulse/10 px-5 py-3 text-center text-sm font-medium text-pulse transition-all hover:border-pulse/70 hover:bg-pulse/20 active:bg-pulse/30"
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
