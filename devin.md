# SpaceNet — Orbital Computing Landing Page

## Project overview

Premium B2B marketing landing page for **SpaceNet**, an Orbital Computing-as-a-Service company. The platform lets customers deploy their own software workloads on satellites with onboard CPU/GPU compute — a "PaaS for orbit". Target audience: satellite operators, Earth-observation/geospatial companies, AI companies, space software developers, partners and investors.

## Branding facts

- **Company:** SpaceNet
- **Satellite / compute node:** Mininode
- **Product interfaces:** SpaceNet Forge (developer environment) and SpaceNet Helm (mission & operations platform)
- **Positioning:** "The orbital computing platform for the next generation of space applications."

## Stack

- Next.js 14.2.35 (App Router, fully static prerender)
- TypeScript, Tailwind CSS 3.4, Framer Motion 11, lucide-react
- Fonts via `next/font/google`: Space Grotesk (`--font-display`), Inter (`--font-body`), JetBrains Mono (`--font-mono`)

## Commands

```powershell
npm run dev    # dev server on http://localhost:3000
npm run build  # production build (also runs lint + typecheck)
npm run lint
```

## Structure

```
app/
  layout.tsx        # fonts, metadata, theme color
  page.tsx          # section assembly
  globals.css       # tokens, utilities (.glass, .hairline, .grid-bg, .starfield), reduced-motion
components/
  Navbar.tsx        # sticky glass navbar + mobile menu
  Hero.tsx          # headline + CTAs, mounts OrbitalScene
  OrbitalScene.tsx  # single-SVG scene: Earth sphere, 4 inclined orbit ellipses w/ ~14
                    # satellites (rAF-driven, same period), named ground stations,
                    # Mininode highlighted w/ signal links + travelling packets
  Problem.tsx       # "Not every byte needs to reach Earth" + data funnel visual
  Platform.tsx      # 6-stage architecture timeline (Workload → Forge → Helm → Orbital Compute → Processing → Results) + 5-phase roadmap
  HowItWorks.tsx    # 4 steps: Develop / Validate / Deploy / Execute
  Workloads.tsx     # 6 illustrative use cases
  ProductSuite.tsx  # Forge terminal mockup + Helm console mockup
  Developers.tsx    # "Bring your own software" + workload.manifest card
  Security.tsx      # controlled-execution principles
  FinalCTA.tsx      # contact form (client-side validation, simulated submit)
  Footer.tsx
  Section.tsx       # shared section wrapper (label/title/subtitle)
  Reveal.tsx        # scroll-reveal wrapper (Framer Motion, reduced-motion aware)
```

## Design system

- Palette (tailwind.config.ts): `void #030509`, `abyss #060a14`, `night #0a1020`, `graphite`, `steel`, `mist #94a3b8`, `frost #e2e8f0`, accents `pulse #22d3ee` / `ion #38bdf8`
- Dark theme only; hairline borders `rgba(148,163,184,0.12)`; glassmorphism reserved for navbar, mockups, form
- Mono uppercase micro-labels (`section-label`), tight display headings (`tracking-tightest`)
- All visuals are hand-built SVG/CSS — no image assets. Satellite constellation animates via SVG `animateMotion` on a shared orbit path (90s period)

## Content rules (important)

- **Never invent** metrics, savings percentages, latency figures, clients, partners, certifications, addresses or corporate info
- Use cases are *illustrative*, not certified capabilities — keep that framing
- Workload compatibility is conditional: profiles, resource envelopes and validation gates — never claim "any app runs in orbit"
- Security claims stay conceptual (validation, authorization, isolation, observability) — no specific standards
- Product mockups are labeled "Interface concepts shown for illustration"
- Contact form submission is simulated — wire to a real endpoint/CRM when available

## Accessibility & quality

- **Responsive-first (mandatory)**: every component and layout must work on mobile, tablet and desktop. Use Tailwind responsive prefixes (`sm:`/`md:`/`lg:`), fluid sizing (`vw`, `%`, `clamp()`) and flexible grids — no fixed pixel widths that overflow small viewports. Verify no horizontal scroll or clipped content at ~375px width
- `prefers-reduced-motion` disables orbit animation, stream packets and reveals (CSS + `useReducedMotion`)
- Semantic HTML, aria labels on nav/form, visible focus states
- SEO basics in `layout.tsx` metadata + OpenGraph

## i18n (EN/ES)

- Custom lightweight i18n: `lib/i18n/LanguageProvider.tsx` (React context + `useLanguage()` hook), typed dictionaries in `lib/i18n/en.ts` and `lib/i18n/es.ts`, shared types in `lib/i18n/types.ts`
- Locale persisted in `localStorage` (`spacenet-locale`), `<html lang>` synced, EN/ES toggle in the navbar
- **Rule: every new component or UI text must consume `useLanguage()` — never hardcode user-facing strings.** Add the key to `types.ts`, `en.ts` AND `es.ts` in the same change
- Proper nouns and CLI output (SpaceNet, Mininode, Forge, Helm, terminal commands) stay in English by design

## Maintenance rules

- **Keep this file in sync automatically**: whenever structure, stack, branding, design tokens or conventions change, update `devin.md` in the same change — no need to be asked
- Only restructure or rewrite this file when explicitly requested
