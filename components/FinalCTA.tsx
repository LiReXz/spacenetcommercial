"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

type Status = "idle" | "submitting" | "success";

interface FormState {
  name: string;
  email: string;
  company: string;
  interest: string;
  message: string;
}

export function FinalCTA() {
  const { t } = useLanguage();
  const interests = t.cta.form.interests;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    interest: interests[0],
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {}
  );

  function validate(): boolean {
    const next: typeof errors = {};
    if (form.name.trim().length < 2) next.name = t.cta.form.errors.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = t.cta.form.errors.email;
    if (form.message.trim().length < 10)
      next.message = t.cta.form.errors.message;
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    // Simulated submission — wire to your CRM/API endpoint here.
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  }

  const inputCls = (field: keyof FormState) =>
    `w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-frost outline-none transition-colors placeholder:text-mist/40 focus:border-pulse/50 focus:bg-white/[0.05] ${
      errors[field] ? "border-red-400/50" : "border-white/10"
    }`;

  return (
    <Section
      id="contact"
      label={t.cta.label}
      title={t.cta.title}
      subtitle={t.cta.subtitle}
    >
      <div className="mx-auto mt-14 grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Left: pitch + secondary CTA */}
        <Reveal>
          <div className="space-y-6">
            <div className="hairline rounded-2xl bg-night/30 p-7">
              <h3 className="font-display text-lg font-medium text-frost">
                {t.cta.pilot.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {t.cta.pilot.body}
              </p>
              <button
                onClick={() => {
                  setForm((f) => ({ ...f, interest: interests[3] }));
                  document.getElementById("contact-message")?.focus();
                }}
                className="group mt-5 inline-flex items-center gap-2 text-sm font-medium text-pulse transition-colors hover:text-ion"
              >
                {t.cta.pilot.button}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
            <div className="hairline rounded-2xl bg-night/30 p-7">
              <h3 className="font-display text-lg font-medium text-frost">
                {t.cta.partners.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">
                {t.cta.partners.body}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="glass rounded-2xl p-7 md:p-8"
            aria-label={t.cta.form.ariaLabel}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-pulse" strokeWidth={1.5} />
                <h3 className="mt-4 font-display text-xl font-medium text-frost">
                  {t.cta.form.success.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm text-mist">
                  {t.cta.form.success.body}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setForm({
                      name: "",
                      email: "",
                      company: "",
                      interest: interests[0],
                      message: "",
                    });
                  }}
                  className="mt-6 text-sm text-pulse underline-offset-4 hover:underline"
                >
                  {t.cta.form.success.again}
                </button>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-mist">
                      {t.cta.form.name}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className={inputCls("name")}
                      placeholder={t.cta.form.placeholders.name}
                      aria-invalid={!!errors.name}
                    />
                    {errors.name && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle className="h-3 w-3" /> {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-mist">
                      {t.cta.form.email}
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className={inputCls("email")}
                      placeholder={t.cta.form.placeholders.email}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && (
                      <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle className="h-3 w-3" /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-company" className="mb-1.5 block text-xs font-medium text-mist">
                      {t.cta.form.company}
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, company: e.target.value }))
                      }
                      className={inputCls("company")}
                      placeholder={t.cta.form.placeholders.company}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-interest" className="mb-1.5 block text-xs font-medium text-mist">
                      {t.cta.form.interest}
                    </label>
                    <select
                      id="contact-interest"
                      value={form.interest}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, interest: e.target.value }))
                      }
                      className={`${inputCls("interest")} appearance-none`}
                    >
                      {interests.map((i) => (
                        <option key={i} value={i} className="bg-night">
                          {i}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4">
                  <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-mist">
                    {t.cta.form.message}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className={`${inputCls("message")} resize-none`}
                    placeholder={t.cta.form.placeholders.message}
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                      <AlertCircle className="h-3 w-3" /> {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pulse px-7 py-3.5 text-sm font-semibold text-void transition-all hover:bg-ion hover:shadow-[0_0_32px_rgba(34,211,238,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.cta.form.sending}
                    </>
                  ) : (
                    <>
                      {t.cta.form.submit}
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
                <p className="mt-3 text-center text-[11px] text-mist/50">
                  {t.cta.form.privacyNote}
                </p>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
