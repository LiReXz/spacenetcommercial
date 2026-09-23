"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "./Section";
import { Reveal } from "./Reveal";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

/**
 * "Meet Mininode" — exploded isometric view of the satellite bus.
 * Subsystems are drawn as separated iso slabs stacked vertically with dashed
 * assembly guides; solar wings stay attached to the bus layer. Numbered
 * callout markers point at each part; hovering a legend item (or the SVG
 * part itself) highlights both. Order matches t.mininode.parts:
 * 0 solar arrays · 1 compute module · 2 bus · 3 comms · 4 ADCS
 */
const MARKERS = [
  { x: 100, y: 190, tx: 120, ty: 251 }, // 1 → left solar wing
  { x: 430, y: 120, tx: 352, ty: 150 }, // 2 → compute module
  { x: 130, y: 340, tx: 195, ty: 264 }, // 3 → bus
  { x: 380, y: 400, tx: 330, ty: 350 }, // 4 → comms
  { x: 280, y: 35, tx: 280, ty: 68 },   // 5 → ADCS
];

// Assembly guides between separated layers (dashed verticals)
const GUIDES: [number, number][] = [
  [112, 125], // ADCS → compute
  [193, 201], // compute → bus
  [293, 305], // bus → comms
];

interface SlabProps {
  cx: number;
  y: number; // top-face center y
  w: number; // half-width of the top diamond
  d: number; // half-depth of the top diamond
  h: number; // slab thickness
  active: boolean;
  tint?: boolean; // pulse-tinted (compute module)
}

/** Isometric slab: top diamond + left/right faces */
function Slab({ cx, y, w, d, h, active, tint }: SlabProps) {
  const top = `${cx - w},${y} ${cx},${y - d} ${cx + w},${y} ${cx},${y + d}`;
  const left = `${cx - w},${y} ${cx},${y + d} ${cx},${y + d + h} ${cx - w},${y + h}`;
  const right = `${cx + w},${y} ${cx},${y + d} ${cx},${y + d + h} ${cx + w},${y + h}`;
  const stroke = active ? "#22d3ee" : "#64748b";
  return (
    <g>
      <polygon
        points={left}
        fill={tint ? "rgba(34,211,238,0.10)" : "rgba(10,16,32,0.9)"}
        stroke={stroke}
      />
      <polygon
        points={right}
        fill={tint ? "rgba(34,211,238,0.16)" : "rgba(15,23,42,0.9)"}
        stroke={stroke}
      />
      <polygon
        points={top}
        fill={tint ? "rgba(34,211,238,0.22)" : "rgba(30,41,59,0.95)"}
        stroke={stroke}
        strokeWidth={active ? 1.5 : 1}
      />
    </g>
  );
}

export function Mininode() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  const hl = (i: number) => active === i;
  const stroke = (i: number) => (hl(i) ? "#22d3ee" : "#64748b");
  const hover = (i: number) => ({
    onMouseEnter: () => setActive(i),
    onMouseLeave: () => setActive(null),
  });

  return (
    <Section
      id="mininode"
      label={t.mininode.label}
      title={t.mininode.title}
      subtitle={t.mininode.subtitle}
    >
      {/* Product selector — scales as more nodes launch */}
      <Reveal>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          {t.mininode.products.map((p) => (
            <span
              key={p}
              className="rounded-full border border-pulse/50 bg-pulse/10 px-4 py-1.5 font-mono text-xs tracking-wide text-pulse"
            >
              {p}
            </span>
          ))}
          {t.mininode.upcoming.map((p) => (
            <span
              key={p}
              className="rounded-full border border-dashed border-steel/50 px-4 py-1.5 font-mono text-xs tracking-wide text-mist/50"
            >
              {p} · {t.mininode.comingSoon}
            </span>
          ))}
        </div>
      </Reveal>

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-2">
        {/* Diagram */}
        <Reveal>
          <div className="glass relative overflow-hidden rounded-2xl p-4 md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(14,116,144,0.12),transparent_70%)]" />
            <motion.div
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 560 440" className="relative w-full" fill="none">
                {/* Assembly guides between layers */}
                {GUIDES.map(([y1, y2], i) => (
                  <line
                    key={i}
                    x1="280" y1={y1} x2="280" y2={y2}
                    stroke="rgba(148,163,184,0.3)"
                    strokeDasharray="3 4"
                  />
                ))}

                {/* Left solar wing — part 0 (flat iso panel on the bus layer) */}
                <g {...hover(0)} className="cursor-pointer">
                  <polygon
                    points="180,238 55,266 55,286 180,258"
                    fill={hl(0) ? "rgba(34,211,238,0.08)" : "rgba(10,16,32,0.7)"}
                    stroke={stroke(0)}
                    strokeWidth={hl(0) ? 1.5 : 1}
                  />
                  {[
                    [148.75, 245, 148.75, 265],
                    [117.5, 252, 117.5, 272],
                    [86.25, 259, 86.25, 279],
                  ].map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={hl(0) ? "rgba(34,211,238,0.35)" : "rgba(148,163,184,0.18)"} />
                  ))}
                  <line x1="180" y1="248" x2="55" y2="276"
                    stroke={hl(0) ? "rgba(34,211,238,0.35)" : "rgba(148,163,184,0.18)"} />
                </g>

                {/* Right solar wing — part 0 */}
                <g {...hover(0)} className="cursor-pointer">
                  <polygon
                    points="380,238 505,266 505,286 380,258"
                    fill={hl(0) ? "rgba(34,211,238,0.08)" : "rgba(10,16,32,0.7)"}
                    stroke={stroke(0)}
                    strokeWidth={hl(0) ? 1.5 : 1}
                  />
                  {[
                    [411.25, 245, 411.25, 265],
                    [442.5, 252, 442.5, 272],
                    [473.75, 259, 473.75, 279],
                  ].map(([x1, y1, x2, y2], i) => (
                    <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                      stroke={hl(0) ? "rgba(34,211,238,0.35)" : "rgba(148,163,184,0.18)"} />
                  ))}
                  <line x1="380" y1="248" x2="505" y2="276"
                    stroke={hl(0) ? "rgba(34,211,238,0.35)" : "rgba(148,163,184,0.18)"} />
                </g>

                {/* ADCS — part 4 (top layer) */}
                <g {...hover(4)} className="cursor-pointer">
                  <Slab cx={280} y={85} w={42} d={15} h={12} active={hl(4)} />
                  <ellipse
                    cx="280" cy="82" rx="10" ry="5"
                    fill="rgba(10,16,32,0.85)"
                    stroke={stroke(4)}
                  />
                  <circle cx="280" cy="81" r="2" fill={hl(4) ? "#22d3ee" : "#94a3b8"} />
                </g>

                {/* Compute module — part 1 */}
                <g {...hover(1)} className="cursor-pointer">
                  <Slab cx={280} y={150} w={72} d={25} h={18} active={hl(1)} tint />
                  <text
                    x="280" y="154" textAnchor="middle" fontSize="9" letterSpacing="1.5"
                    fill="#22d3ee" fillOpacity={hl(1) ? 1 : 0.7}
                    fontFamily="var(--font-mono), monospace"
                  >
                    CPU/GPU
                  </text>
                </g>

                {/* Bus — part 2 */}
                <g {...hover(2)} className="cursor-pointer">
                  <Slab cx={280} y={235} w={100} d={34} h={24} active={hl(2)} />
                  {/* panel seams on the right face */}
                  <line x1="330" y1="252" x2="330" y2="276" stroke="rgba(148,163,184,0.15)" />
                  <line x1="355" y1="243" x2="355" y2="267" stroke="rgba(148,163,184,0.15)" />
                </g>

                {/* Comms — part 3 (bottom layer + dish) */}
                <g {...hover(3)} className="cursor-pointer">
                  <Slab cx={280} y={325} w={58} d={20} h={14} active={hl(3)} />
                  <line x1="280" y1="359" x2="280" y2="368" stroke={stroke(3)} />
                  <path
                    d="M 256 370 Q 280 392 304 370 Z"
                    fill={hl(3) ? "rgba(34,211,238,0.1)" : "rgba(10,16,32,0.7)"}
                    stroke={stroke(3)}
                  />
                  <circle cx="280" cy="366" r="2.5" fill={hl(3) ? "#22d3ee" : "#94a3b8"} />
                  <path d="M 264 398 Q 280 406 296 398" stroke={hl(3) ? "#22d3ee" : "#475569"} strokeOpacity="0.5" />
                  <path d="M 256 406 Q 280 418 304 406" stroke={hl(3) ? "#22d3ee" : "#475569"} strokeOpacity="0.3" />
                </g>

                {/* Numbered callout markers */}
                {MARKERS.map((m, i) => (
                  <g key={i} className="pointer-events-none">
                    <line
                      x1={m.x} y1={m.y} x2={m.tx} y2={m.ty}
                      stroke={hl(i) ? "#22d3ee" : "rgba(148,163,184,0.35)"}
                      strokeDasharray="2 3"
                    />
                    <circle cx={m.tx} cy={m.ty} r="2.5" fill={hl(i) ? "#22d3ee" : "#64748b"} />
                    <circle
                      cx={m.x} cy={m.y} r="11"
                      fill={hl(i) ? "#22d3ee" : "#0a1020"}
                      stroke={hl(i) ? "#22d3ee" : "#475569"}
                    />
                    <text
                      x={m.x} y={m.y + 3.5} textAnchor="middle"
                      fontSize="10" fontWeight="600"
                      fill={hl(i) ? "#030509" : "#94a3b8"}
                      fontFamily="var(--font-mono), monospace"
                    >
                      {i + 1}
                    </text>
                  </g>
                ))}
              </svg>
            </motion.div>
            <p className="relative mt-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-mist/50">
              {t.mininode.caption}
            </p>
          </div>
        </Reveal>

        {/* Legend */}
        <Reveal delay={0.1}>
          <ul className="space-y-3">
            {t.mininode.parts.map((p, i) => (
              <li
                key={p.title}
                {...hover(i)}
                className={`flex gap-4 rounded-xl border p-4 transition-colors duration-200 ${
                  hl(i)
                    ? "border-pulse/40 bg-pulse/5"
                    : "border-white/5 bg-white/[0.02]"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono text-[11px] transition-colors ${
                    hl(i)
                      ? "border-pulse bg-pulse text-void"
                      : "border-steel/60 text-mist"
                  }`}
                >
                  {i + 1}
                </span>
                <div>
                  <h4 className="font-display text-sm font-medium tracking-wide text-frost">
                    {p.title}
                  </h4>
                  <p className="mt-1 text-sm leading-relaxed text-mist">{p.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
