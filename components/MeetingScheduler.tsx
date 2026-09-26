"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { Select } from "./Select";
import { CONTACT_EMAIL } from "@/lib/contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00", "13:00",
  "14:00", "15:00", "16:00", "17:00",
];
const DAY_MS = 24 * 60 * 60 * 1000;
// Rolling availability window (like Calendly): bookable from
// MIN_DAYS_AHEAD out (lead time to prepare the meeting) up to
// MAX_DAYS_AHEAD, weekdays only.
const MIN_DAYS_AHEAD = 7;
const MAX_DAYS_AHEAD = 60;

function firstBookableDate(): Date {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return new Date(t.getTime() + MIN_DAYS_AHEAD * DAY_MS);
}

function monthStart(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function addMonths(d: Date, n: number) {
  return new Date(d.getFullYear(), d.getMonth() + n, 1);
}
function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function MeetingScheduler({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { t, locale } = useLanguage();
  const [view, setView] = useState(() => monthStart(firstBookableDate()));
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [sending, setSending] = useState(false);

  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const interests = t.cta.form.interests;
  const nameOk = name.trim().length >= 2;
  const emailOk = EMAIL_RE.test(email.trim());
  const messageOk = message.trim().length >= 10;

  // Reset the selection each time the modal opens
  useEffect(() => {
    if (open) {
      setView(monthStart(firstBookableDate()));
      setDay(null);
      setTime(null);
      setName("");
      setEmail("");
      setCompany("");
      setInterest(t.cta.form.interests[0]);
      setMessage("");
      setAttempted(false);
      setSending(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Escape closes; page scroll is locked while open (same pattern as the
  // mobile menu — locks documentElement, the actual document scroller)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      // an open Select listbox consumes Escape first — don't close the modal
      if (e.key === "Escape" && !document.querySelector('[role="listbox"]'))
        onClose();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open, onClose]);

  const minDate = firstBookableDate();
  const maxDate = new Date(
    minDate.getTime() + (MAX_DAYS_AHEAD - MIN_DAYS_AHEAD) * DAY_MS
  );
  const viewMin = monthStart(minDate);

  const isBookable = (d: Date) => {
    const wd = d.getDay();
    return d >= minDate && d <= maxDate && wd !== 0 && wd !== 6;
  };

  // 2024-01-01 was a Monday → Mon..Sun weekday labels in the current locale
  const weekdays = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
    return Array.from({ length: 7 }, (_, i) =>
      fmt.format(new Date(2024, 0, 1 + i))
    );
  }, [locale]);

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
  }).format(view);

  // Calendar cells: leading nulls pad the first week (Monday-first)
  const days = useMemo<(Date | null)[]>(() => {
    const lead = (view.getDay() + 6) % 7;
    const count = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    return [
      ...Array<Date | null>(lead).fill(null),
      ...Array.from(
        { length: count },
        (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)
      ),
    ];
  }, [view]);

  const slotLabel =
    day && time
      ? `${new Intl.DateTimeFormat(locale, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(day)} · ${time} (${tz})`
      : null;

  const fieldCls = (invalid: boolean) =>
    `w-full rounded-xl border bg-white/[0.03] px-4 py-2.5 text-sm text-frost outline-none transition-colors placeholder:text-mist/40 focus:border-pulse/50 focus:bg-white/[0.05] ${
      invalid ? "border-red-400/50" : "border-white/10"
    }`;

  const confirm = async () => {
    if (!slotLabel || !nameOk || !emailOk || !messageOk) {
      setAttempted(true);
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slot: slotLabel,
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          interest: interest || interests[0],
          message: message.trim(),
          locale,
        }),
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.delivered) {
        onClose();
        return;
      }
    } catch {
      /* fall through to the mailto draft */
    }
    // Resend isn't configured yet — hand the request to the visitor's
    // mail client so it still arrives. Skipped until CONTACT_EMAIL is set.
    if (CONTACT_EMAIL) {
      const subject = encodeURIComponent(
        `${t.cta.meeting.emailSubject}: ${interest || interests[0]}`
      );
      const body = encodeURIComponent(
        t.cta.meeting.emailBody
          .replace("{slot}", slotLabel)
          .replace("{name}", name.trim())
          .replace("{email}", email.trim())
          .replace("{company}", company.trim() || "—")
          .replace("{interest}", interest || interests[0])
          .replace("{message}", message.trim())
      );
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    }
    setSending(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-void/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.cta.meeting.title}
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="glass max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-2xl p-6 shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-medium text-frost">
                {t.cta.meeting.title}
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="rounded-lg p-1.5 text-mist transition-colors hover:bg-white/5 hover:text-frost"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-6 sm:flex-row">
              {/* Calendar */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setView((v) => addMonths(v, -1))}
                    disabled={view <= viewMin}
                    aria-label="Previous month"
                    className="rounded-lg p-1.5 text-mist transition-colors hover:bg-white/5 hover:text-frost disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-frost">
                    {monthLabel}
                  </p>
                  <button
                    onClick={() => setView((v) => addMonths(v, 1))}
                    disabled={addMonths(view, 1) > maxDate}
                    aria-label="Next month"
                    className="rounded-lg p-1.5 text-mist transition-colors hover:bg-white/5 hover:text-frost disabled:opacity-30 disabled:hover:bg-transparent"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase tracking-wider text-mist/50">
                  {weekdays.map((w) => (
                    <span key={w} className="py-1">
                      {w}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {days.map((d, i) =>
                    d === null ? (
                      <span key={`pad-${i}`} />
                    ) : (
                      <button
                        key={d.getTime()}
                        disabled={!isBookable(d)}
                        onClick={() => {
                          setDay(d);
                          setTime(null);
                        }}
                        aria-pressed={day ? sameDay(d, day) : false}
                        className={`rounded-lg py-1.5 text-sm transition-colors disabled:text-mist/25 disabled:hover:bg-transparent ${
                          day && sameDay(d, day)
                            ? "bg-pulse font-semibold text-void"
                            : "text-mist hover:bg-pulse/15 hover:text-frost"
                        }`}
                      >
                        {d.getDate()}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Time slots */}
              <div className="sm:w-32 sm:border-l sm:border-white/5 sm:pl-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-mist/50">
                  {t.cta.meeting.pickTime}
                </p>
                <div className="mt-3 grid grid-cols-3 gap-1.5 sm:grid-cols-1">
                  {TIME_SLOTS.map((s) => (
                    <button
                      key={s}
                      disabled={!day}
                      onClick={() => setTime(s)}
                      aria-pressed={time === s}
                      className={`rounded-lg px-2 py-1.5 font-mono text-xs transition-colors disabled:cursor-not-allowed disabled:opacity-30 ${
                        time === s
                          ? "bg-pulse font-semibold text-void"
                          : "border border-white/10 text-mist hover:border-pulse/40 hover:text-frost"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Requester details — name + work email are what we need to
                book the meeting; interest becomes the meeting subject */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="meeting-name"
                  className="mb-1.5 block text-xs font-medium text-mist"
                >
                  {t.cta.form.name}
                </label>
                <input
                  id="meeting-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.cta.form.placeholders.name}
                  aria-invalid={attempted && !nameOk}
                  className={fieldCls(attempted && !nameOk)}
                />
                {attempted && !nameOk && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" /> {t.cta.form.errors.name}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="meeting-email"
                  className="mb-1.5 block text-xs font-medium text-mist"
                >
                  {t.cta.form.email}
                </label>
                <input
                  id="meeting-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.cta.form.placeholders.email}
                  aria-invalid={attempted && !emailOk}
                  className={fieldCls(attempted && !emailOk)}
                />
                {attempted && !emailOk && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                    <AlertCircle className="h-3 w-3" /> {t.cta.form.errors.email}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="meeting-company"
                  className="mb-1.5 block text-xs font-medium text-mist"
                >
                  {t.cta.form.company}
                </label>
                <input
                  id="meeting-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={t.cta.form.placeholders.company}
                  className={fieldCls(false)}
                />
              </div>
              <div>
                <label
                  id="meeting-interest-label"
                  className="mb-1.5 block text-xs font-medium text-mist"
                >
                  {t.cta.form.interest}
                </label>
                <Select
                  id="meeting-interest"
                  labelId="meeting-interest-label"
                  value={interest || interests[0]}
                  onChange={setInterest}
                  options={interests.map((i) => ({ label: i }))}
                  className={fieldCls(false)}
                />
              </div>
            </div>

            <div className="mt-4">
              <label
                htmlFor="meeting-message"
                className="mb-1.5 block text-xs font-medium text-mist"
              >
                {t.cta.form.message}
              </label>
              <textarea
                id="meeting-message"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.cta.form.placeholders.message}
                aria-invalid={attempted && !messageOk}
                className={`${fieldCls(attempted && !messageOk)} resize-none`}
              />
              {attempted && !messageOk && (
                <p className="mt-1.5 flex items-center gap-1 text-xs text-red-400">
                  <AlertCircle className="h-3 w-3" /> {t.cta.form.errors.message}
                </p>
              )}
            </div>

            <button
              onClick={confirm}
              disabled={sending}
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pulse px-7 py-3 text-sm font-semibold text-void transition-all hover:bg-ion hover:shadow-[0_0_32px_rgba(34,211,238,0.35)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-pulse disabled:hover:shadow-none"
            >
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t.cta.form.sending}
                </>
              ) : (
                <>
                  {slotLabel ?? t.cta.meeting.confirm}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
