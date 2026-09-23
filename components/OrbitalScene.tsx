"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Cinematic orbital scene — everything lives in one SVG so geometry stays
 * consistent at any viewport:
 * - Earth as a fully-visible sphere centered in the lower half
 * - Named ground stations as points on the surface
 * - Four inclined orbit ellipses centered on Earth's center, each rotated at
 *   a different angle and carrying its own small constellation — all shells
 *   share the same period so satellites move at roughly the same speed
 * - Satellites pass IN FRONT of Earth at full brightness and fade out only
 *   when occluded behind the planet (per-satellite opacity, smoothly lerped)
 * - MININODE (SpaceNet's compute satellite) highlighted, with dynamic signal
 *   links to ground stations and nearby satellites — packets travel along
 *   active links
 * Positions are computed analytically per frame (rotated parametric ellipses).
 */

// Earth geometry in viewBox coords (1440x900) — fully visible sphere
const EARTH = { cx: 720, cy: 640, r: 190 };

// Inclined orbit shells around Earth's center — all share the same period.
// ry < EARTH.r → the orbit transits the planet's face (front) and is occluded
// behind it; ry > EARTH.r → the shell stays outside the silhouette.
const ORBITS = [
  { rx: 360, ry: 130, rot: -15, period: 70 }, // Mininode's shell — transits
  { rx: 460, ry: 230, rot: 15, period: 70 }, // outer ring
  { rx: 320, ry: 100, rot: -35, period: 70 }, // tight transit
  { rx: 540, ry: 250, rot: 6, period: 70 }, // wide outer ring
];

interface SatDef {
  name: string;
  orbit: number;
  phase: number; // fraction of period along the ellipse at t=0
  ours?: boolean;
}

const SATS: SatDef[] = [
  { name: "MININODE-01", orbit: 0, phase: 0.25, ours: true },
  { name: "VEGA-3", orbit: 0, phase: 0.15 },
  { name: "ALPHA-1", orbit: 0, phase: 0.4 },
  { name: "KESTREL-2", orbit: 1, phase: 0.1 },
  { name: "NOVA-6", orbit: 1, phase: 0.35 },
  { name: "ORION-4", orbit: 1, phase: 0.6 },
  { name: "LYRA-8", orbit: 1, phase: 0.85 },
  { name: "PICO-5", orbit: 2, phase: 0.2 },
  { name: "NANO-9", orbit: 2, phase: 0.38 },
  { name: "CUBESAT-12", orbit: 2, phase: 0.7 },
  { name: "HELIOS-2", orbit: 3, phase: 0.15 },
  { name: "ATLAS-7", orbit: 3, phase: 0.45 },
  { name: "ZENITH-1", orbit: 3, phase: 0.65 },
  { name: "TALOS-4", orbit: 3, phase: 0.9 },
];

// Ground stations — spread across the visible face of the planet
const GROUND_STATIONS = [
  { name: "NIVARA-1", x: 600, y: 700 },
  { name: "CALDERA-2", x: 650, y: 780 },
  { name: "MERIDIAN-9", x: 720, y: 560 },
  { name: "VOSTOK-3", x: 800, y: 790 },
  { name: "HALLEY-6", x: 850, y: 690 },
  { name: "KODIAK-5", x: 770, y: 590 },
];

// Faint surface lights for texture
const SURFACE_DOTS = [
  [620, 600], [680, 700], [740, 580], [790, 720], [660, 750],
  [820, 640], [700, 690], [760, 800], [640, 660], [840, 740],
];

const GS_RANGE = 280;
const ISL_RANGE = 180;
const PACKET_SPEED = 0.6; // fraction of the link travelled per second

function satPos(s: SatDef, t: number) {
  const o = ORBITS[s.orbit];
  const th = 2 * Math.PI * (t / o.period + s.phase);
  const lx = o.rx * Math.cos(th);
  const ly = o.ry * Math.sin(th);
  const rot = (o.rot * Math.PI) / 180;
  return {
    x: EARTH.cx + lx * Math.cos(rot) - ly * Math.sin(rot),
    y: EARTH.cy + lx * Math.sin(rot) + ly * Math.cos(rot),
    front: ly > 0, // lower half of the local ellipse = viewer side
  };
}

/** Opacity target: front → 1, far side beside planet → 0.5, occluded → 0 */
function targetOpacity(p: { x: number; y: number; front: boolean }) {
  const inside = Math.hypot(p.x - EARTH.cx, p.y - EARTH.cy) < EARTH.r - 4;
  if (p.front) return 1;
  return inside ? 0 : 0.5;
}

/** Endpoint of an orbit's major axis (sign +1 → local (rx,0), -1 → (-rx,0)) */
function arcEnd(o: (typeof ORBITS)[number], sign: 1 | -1) {
  const rot = (o.rot * Math.PI) / 180;
  return {
    x: EARTH.cx + sign * o.rx * Math.cos(rot),
    y: EARTH.cy + sign * o.rx * Math.sin(rot),
  };
}

export function OrbitalScene() {
  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewBox, setViewBox] = useState("0 0 1440 900");
  const satRefs = useRef<(SVGGElement | null)[]>([]);
  const gsLinkRefs = useRef<(SVGLineElement | null)[]>([]);
  const islLinkRefs = useRef<(SVGLineElement | null)[]>([]);
  const gsPktRefs = useRef<(SVGCircleElement | null)[]>([]);
  const islPktRefs = useRef<(SVGCircleElement | null)[]>([]);
  const opacities = useRef<number[]>([]);

  const stars = useMemo(
    () =>
      Array.from({ length: 90 }, (_, i) => ({
        id: i,
        x: (i * 37.7) % 100,
        y: (i * 53.3) % 72,
        size: i % 9 === 0 ? 2 : 1,
        dur: 3 + ((i * 7) % 6),
        delay: (i * 0.37) % 5,
        min: 0.08 + ((i * 13) % 20) / 100,
        max: 0.5 + ((i * 11) % 40) / 100,
      })),
    []
  );

  // Initial positions/opacities (t=0) — also the static layout for reduced motion
  const initial = useMemo(
    () =>
      SATS.map((s) => {
        const p = satPos(s, 0);
        return { ...p, opacity: targetOpacity(p) };
      }),
    []
  );

  // Responsive viewBox — keeps the scene proportional to the container's
  // aspect ratio so Earth stays reasonably sized on any viewport:
  // - wide screens (aspect ≥ 1.6): full 1440×900 frame, top cropped as needed
  // - narrower: sides crop symmetrically around Earth's center (x=720)
  // - portrait (aspect < ~0.9): frame widens upward, showing more sky so the
  //   planet shrinks to ~45% of the screen width instead of filling it
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const { width: w, height: h } = el.getBoundingClientRect();
      if (w < 1 || h < 1) return;
      const aspect = w / h;
      const vbW = Math.min(1440, Math.max(800, 900 * aspect));
      const vbH = vbW / aspect;
      setViewBox(
        `${(720 - vbW / 2).toFixed(0)} ${(900 - vbH).toFixed(0)} ${vbW.toFixed(0)} ${vbH.toFixed(0)}`
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    opacities.current = initial.map((p) => p.opacity);
    if (reduce) return;
    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      const pos = SATS.map((s) => satPos(s, t));
      const op = opacities.current;

      pos.forEach((p, i) => {
        const el = satRefs.current[i];
        if (!el) return;
        // Smooth fade between front / far-side / occluded states
        op[i] += (targetOpacity(p) - op[i]) * 0.08;
        el.setAttribute(
          "transform",
          `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`
        );
        el.setAttribute("opacity", op[i].toFixed(3));
      });

      const m = pos[0]; // MININODE
      const mOp = op[0];

      // Links to ground stations + travelling packets
      GROUND_STATIONS.forEach((gp, i) => {
        const el = gsLinkRefs.current[i];
        const pkt = gsPktRefs.current[i];
        if (!el) return;
        const d = Math.hypot(m.x - gp.x, m.y - gp.y);
        const o = Math.max(0, 1 - d / GS_RANGE) * 0.55 * mOp;
        el.setAttribute("x1", m.x.toFixed(1));
        el.setAttribute("y1", m.y.toFixed(1));
        el.setAttribute("x2", String(gp.x));
        el.setAttribute("y2", String(gp.y));
        el.setAttribute("opacity", o.toFixed(3));
        if (pkt) {
          const u = (t * PACKET_SPEED + i * 0.37) % 1;
          pkt.setAttribute("cx", (m.x + (gp.x - m.x) * u).toFixed(1));
          pkt.setAttribute("cy", (m.y + (gp.y - m.y) * u).toFixed(1));
          pkt.setAttribute("opacity", (o * 1.8).toFixed(3));
        }
      });

      // Inter-satellite links + travelling packets
      for (let i = 1; i < SATS.length; i++) {
        const el = islLinkRefs.current[i - 1];
        const pkt = islPktRefs.current[i - 1];
        if (!el) continue;
        const p = pos[i];
        const d = Math.hypot(m.x - p.x, m.y - p.y);
        const o = Math.max(0, 1 - d / ISL_RANGE) * 0.45 * Math.min(mOp, op[i]);
        el.setAttribute("x1", m.x.toFixed(1));
        el.setAttribute("y1", m.y.toFixed(1));
        el.setAttribute("x2", p.x.toFixed(1));
        el.setAttribute("y2", p.y.toFixed(1));
        el.setAttribute("opacity", o.toFixed(3));
        if (pkt) {
          const u = (t * PACKET_SPEED + i * 0.53) % 1;
          pkt.setAttribute("cx", (m.x + (p.x - m.x) * u).toFixed(1));
          pkt.setAttribute("cy", (m.y + (p.y - m.y) * u).toFixed(1));
          pkt.setAttribute("opacity", (o * 1.8).toFixed(3));
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce, initial]);

  return (
    <div ref={containerRef} className="absolute inset-0" aria-hidden="true">
      {/* Starfield */}
      <div className="starfield">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={
              {
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                "--tw-dur": `${s.dur}s`,
                "--tw-delay": `${s.delay}s`,
                "--tw-min": s.min,
                "--tw-max": s.max,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={viewBox}
        fill="none"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <radialGradient id="earthGrad" cx="50%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.22" />
            <stop offset="38%" stopColor="#0a1020" stopOpacity="0.9" />
            <stop offset="62%" stopColor="#030509" />
          </radialGradient>
          <radialGradient id="earthHalo" cx="50%" cy="50%" r="50%">
            <stop offset="78%" stopColor="#38bdf8" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </radialGradient>
          <filter id="earthGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>

        {/* Far halves of the orbits — behind the planet */}
        {ORBITS.map((o, i) => {
          const a = arcEnd(o, 1);
          const b = arcEnd(o, -1);
          return (
            <path
              key={`back-${i}`}
              d={`M ${a.x} ${a.y} A ${o.rx} ${o.ry} ${o.rot} 0 0 ${b.x} ${b.y}`}
              stroke="rgba(148,163,184,0.08)"
              strokeWidth="1"
              strokeDasharray="3 8"
            />
          );
        })}

        {/* Earth */}
        <circle cx={EARTH.cx} cy={EARTH.cy} r={EARTH.r + 34} fill="url(#earthHalo)" />
        <circle
          cx={EARTH.cx}
          cy={EARTH.cy}
          r={EARTH.r}
          fill="none"
          stroke="#38bdf8"
          strokeOpacity="0.3"
          strokeWidth="2"
          filter="url(#earthGlow)"
        />
        <circle cx={EARTH.cx} cy={EARTH.cy} r={EARTH.r} fill="url(#earthGrad)" />

        {/* Surface lights */}
        {SURFACE_DOTS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.2" fill="#7dd3fc" fillOpacity="0.25" />
        ))}

        {/* Near halves of the orbits — in front of the planet */}
        {ORBITS.map((o, i) => {
          const a = arcEnd(o, 1);
          const b = arcEnd(o, -1);
          return (
            <path
              key={`front-${i}`}
              d={`M ${a.x} ${a.y} A ${o.rx} ${o.ry} ${o.rot} 0 1 ${b.x} ${b.y}`}
              stroke="rgba(148,163,184,0.16)"
              strokeWidth="1"
              strokeDasharray="3 8"
            />
          );
        })}

        {/* Mininode → ground station links + packets */}
        {GROUND_STATIONS.map((gp, i) => (
          <g key={`gs-${gp.name}`}>
            <line
              ref={(el) => {
                gsLinkRefs.current[i] = el;
              }}
              className="signal-line"
              x1={initial[0].x}
              y1={initial[0].y}
              x2={gp.x}
              y2={gp.y}
              stroke="#22d3ee"
              strokeWidth="1"
              opacity={reduce ? 0.25 : 0}
            />
            <circle
              ref={(el) => {
                gsPktRefs.current[i] = el;
              }}
              r="2.2"
              fill="#22d3ee"
              cx={initial[0].x}
              cy={initial[0].y}
              opacity={reduce ? 0.4 : 0}
            />
          </g>
        ))}

        {/* Mininode → satellite links + packets */}
        {SATS.slice(1).map((s, i) => (
          <g key={`isl-${s.name}`}>
            <line
              ref={(el) => {
                islLinkRefs.current[i] = el;
              }}
              className="signal-line"
              x1={initial[0].x}
              y1={initial[0].y}
              x2={initial[i + 1].x}
              y2={initial[i + 1].y}
              stroke="#38bdf8"
              strokeWidth="1"
              opacity={reduce ? 0.15 : 0}
            />
            <circle
              ref={(el) => {
                islPktRefs.current[i] = el;
              }}
              r="1.8"
              fill="#7dd3fc"
              cx={initial[0].x}
              cy={initial[0].y}
              opacity={reduce ? 0.3 : 0}
            />
          </g>
        ))}

        {/* Satellites */}
        {SATS.map((s, i) => (
          <g
            key={s.name}
            ref={(el) => {
              satRefs.current[i] = el;
            }}
            transform={`translate(${initial[i].x} ${initial[i].y})`}
            opacity={initial[i].opacity}
          >
            <SatGlyph ours={s.ours} name={s.name} />
          </g>
        ))}

        {/* Ground stations on the surface */}
        {GROUND_STATIONS.map((g, i) => (
          <g key={g.name} transform={`translate(${g.x} ${g.y})`}>
            <circle r="8" fill="none" stroke="#22d3ee" strokeOpacity="0.25">
              <animate
                attributeName="r"
                values="4;12"
                dur="3s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-opacity"
                values="0.35;0"
                dur="3s"
                begin={`${i * 0.5}s`}
                repeatCount="indefinite"
              />
            </circle>
            <circle r="2.5" fill="#22d3ee" fillOpacity="0.9" />
            <text
              y="16"
              textAnchor="middle"
              fill="rgba(148,163,184,0.6)"
              fontSize="9"
              fontFamily="var(--font-mono), monospace"
              letterSpacing="1.5"
            >
              {g.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function SatGlyph({ ours, name }: { ours?: boolean; name: string }) {
  if (!ours) {
    return (
      <>
        <rect x="-14" y="-2" width="10" height="4" rx="1" fill="#94a3b8" fillOpacity="0.35" />
        <rect x="4" y="-2" width="10" height="4" rx="1" fill="#94a3b8" fillOpacity="0.35" />
        <rect x="-4" y="-4" width="8" height="8" rx="1.5" fill="#1e293b" stroke="#94a3b8" strokeOpacity="0.5" />
        <text
          y="-14"
          textAnchor="middle"
          fill="rgba(148,163,184,0.5)"
          fontSize="9"
          fontFamily="var(--font-mono), monospace"
          letterSpacing="1.5"
        >
          {name}
        </text>
      </>
    );
  }

  return (
    <>
      {/* Glow halo */}
      <circle r="26" fill="#22d3ee" fillOpacity="0.08" />
      <circle r="14" fill="none" stroke="#22d3ee" strokeOpacity="0.35">
        <animate attributeName="r" values="12;20;12" dur="3.5s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.4;0.05;0.4" dur="3.5s" repeatCount="indefinite" />
      </circle>

      {/* Mininode satellite */}
      <rect x="-26" y="-3" width="16" height="6" rx="1" fill="#0a1020" stroke="#38bdf8" strokeOpacity="0.6" />
      <rect x="10" y="-3" width="16" height="6" rx="1" fill="#0a1020" stroke="#38bdf8" strokeOpacity="0.6" />
      <rect x="-9" y="-8" width="18" height="16" rx="2.5" fill="#111827" stroke="#7dd3fc" strokeOpacity="0.8" />
      <rect x="-4" y="-3" width="8" height="6" rx="1" fill="#0e7490" fillOpacity="0.5" stroke="#22d3ee" strokeOpacity="0.8" />
      <circle cy="0" r="1.6" fill="#22d3ee">
        <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
      </circle>

      {/* Labels */}
      <text
        y="-22"
        textAnchor="middle"
        fill="#22d3ee"
        fontSize="11"
        fontWeight="600"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="2.5"
      >
        MININODE
      </text>
      <text
        y="-34"
        textAnchor="middle"
        fill="rgba(148,163,184,0.7)"
        fontSize="8"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="3"
      >
        SPACENET
      </text>
    </>
  );
}
