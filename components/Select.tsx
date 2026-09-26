"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

export interface SelectOption {
  label: string;
  /** small trailing tag, e.g. "Soon" for upcoming nodes */
  hint?: string;
}

interface SelectProps {
  id: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  /** id of an external label element — wired through aria-labelledby */
  labelId?: string;
  /** trigger styling; consumers pass the same chrome as their inputs */
  className?: string;
}

/**
 * Custom listbox replacing native <select> — the OS-styled dropdown panel
 * clashes with the dark glass UI. Supports arrows, Enter/Space, Escape,
 * Home/End, click-outside, and scrolls the active option into view.
 */
export function Select({
  id,
  value,
  options,
  onChange,
  labelId,
  className,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedIdx = options.findIndex((o) => o.label === value);

  // Close on outside click / Escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Keep the active option visible while navigating with arrows
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current
      ?.querySelectorAll<HTMLElement>('[role="option"]')
      [active]?.scrollIntoView({ block: "nearest" });
  }, [active, open]);

  const openList = () => {
    setActive(selectedIdx >= 0 ? selectedIdx : 0);
    setOpen(true);
  };

  const commit = (i: number) => {
    if (i >= 0 && i < options.length) onChange(options[i].label);
    setOpen(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
        openList();
      }
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActive((i) => Math.min(i + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
        break;
      case "Home":
        e.preventDefault();
        setActive(0);
        break;
      case "End":
        e.preventDefault();
        setActive(options.length - 1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        commit(active);
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId ? `${labelId} ${id}` : undefined}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={onKeyDown}
        className={`flex items-center justify-between gap-2 text-left ${className ?? ""}`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-mist transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            role="listbox"
            aria-labelledby={labelId}
            aria-activedescendant={active >= 0 ? `${id}-opt-${active}` : undefined}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="glass absolute left-0 z-50 mt-2 max-h-64 w-max min-w-full max-w-[min(20rem,85vw)] overflow-auto rounded-xl p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          >
            {options.map((o, i) => {
              const sel = o.label === value;
              return (
                <li
                  key={o.label}
                  id={`${id}-opt-${i}`}
                  role="option"
                  aria-selected={sel}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => commit(i)}
                  className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    i === active ? "bg-pulse/15 text-frost" : sel ? "text-pulse" : "text-mist"
                  }`}
                >
                  <span className="truncate">{o.label}</span>
                  {o.hint ? (
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-mist/50">
                      {o.hint}
                    </span>
                  ) : sel ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-pulse" />
                  ) : null}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
