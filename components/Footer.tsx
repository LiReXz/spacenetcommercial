"use client";

import { Orbit, Linkedin } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-white/5 bg-abyss/80">
      <div className="container-site py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <a
              href="#top"
              className="flex items-center gap-2.5 font-display text-sm font-semibold tracking-[0.18em] text-frost"
            >
              <Orbit className="h-5 w-5 text-pulse" strokeWidth={1.5} />
              SpaceNet
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-mist">
              {t.footer.tagline}
            </p>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.footer.linkedinAria}
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-mist transition-colors hover:border-pulse/40 hover:text-pulse"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          {t.footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-mist/60">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="text-sm text-mist transition-colors hover:text-frost"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="text-xs text-mist/50">
            © {new Date().getFullYear()} SpaceNet. {t.footer.rights}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-mist/50 transition-colors hover:text-mist">
              {t.footer.privacy}
            </a>
            <a href="#" className="text-xs text-mist/50 transition-colors hover:text-mist">
              {t.footer.legal}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
