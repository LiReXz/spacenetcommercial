"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  id?: string;
}

/**
 * Scroll-scrubbed "fog" reveal — the block fades in top→bottom behind a
 * wide soft mask edge (no hard line): content blurs into view over a
 * ~150px gradient band. Generation is a direct function of scroll
 * position: stop scrolling and it freezes mid-fade, scroll up and it
 * dissolves again. `delay` shifts the start boundary so delayed blocks
 * need a bit more scroll.
 *
 * The mask snaps to `none` at full progress and only opacity/transforms
 * persist — both resolve to identity — so absolutely-positioned children
 * (Select panels) are never clipped or re-anchored at rest.
 */
const SOFT_EDGE = 150; // px of fade band — content blurs in, no visible line

export function Reveal({ children, delay = 0, className, y = 40, id }: RevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  // measured height lets the mask edge travel in px (uniform speed
  // regardless of block size, quantized per line)
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    setH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // progress 0 → block top enters at the bottom of the viewport;
  // 1 → block bottom has crossed 80% of it. The window is
  // 20%vh + block-height of scroll travel, so even small blocks get a
  // gradual reveal (and page-bottom blocks always complete — their
  // bottom passes the 80% line before scrolling ends).
  const startEdge = 1 - Math.min(delay * 0.05, 0.1);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startEdge}`, "end 0.8"],
  });

  // Smoothed progress — wheel/trackpad scroll arrives in discrete jumps;
  // the spring turns each jump into continuous motion, so generation is
  // always fluid instead of stepping with the scroll ticks. Still fully
  // bidirectional: it settles wherever the scroll stops.
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.9,
  });

  const scrollOpacity = useTransform(progress, [0, 0.5, 1], [0, 1, 1]);
  const ty = useTransform(progress, [0, 1], [y, 0]);
  const scale = useTransform(progress, [0, 1], [0.97, 1]);

  // Mount fade: blocks already in view when the component mounts (anchor
  // navigation like "#contact", page loads scrolled down) still fade in
  // softly instead of popping at full opacity. Runs once; for below-fold
  // blocks it finishes before they're reached, so scrub owns them after.
  const mountFade = useMotionValue(0);
  useEffect(() => {
    if (reduce) return;
    const c = animate(mountFade, 1, {
      duration: 0.9,
      ease: [0.21, 0.65, 0.35, 1],
    });
    return () => c.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const opacity = useTransform(
    [scrollOpacity, mountFade],
    ([s, m]: number[]) => s * m
  );

  const maskImage = useTransform(progress, (p) => {
    if (h <= 0 || p >= 1) return "none";
    // soft front travels from above the block to below it; the gradient
    // band fades content in over SOFT_EDGE px — no hard line. Extra
    // overshoot so the mask is fully clear before p hits 1 (no abrupt
    // pop when it snaps to "none")
    const e = p * (h + SOFT_EDGE * 2.4) - SOFT_EDGE * 1.2;
    return `linear-gradient(180deg, #000 0px, #000 ${Math.max(
      0,
      e - SOFT_EDGE
    )}px, transparent ${e + SOFT_EDGE * 0.3}px)`;
  });

  if (reduce) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} id={id} className={`relative ${className ?? ""}`}>
      <motion.div
        style={{
          opacity,
          y: ty,
          scale,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
