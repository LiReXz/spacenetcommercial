# SpaceNet — Orbital Computing Landing Page

## Project overview

Premium B2B marketing landing page for **SpaceNet**, an Orbital Computing-as-a-Service company. Business model: the customer's satellites generate the data; SpaceNet operates an orbital compute node (MiniNode) that processes it; the customer develops the mission-specific processing software (early stage — SpaceNet provides hardware, execution environment and ops tooling). Target audience: satellite operators/constellations, Earth-observation/geospatial companies, AI companies, space software developers, partners and investors.

## Branding facts

- **Company:** SpaceNet
- **Satellite / compute node:** MiniNode-01
- **Product interfaces:** SpaceNet Forge (developer environment) and SpaceNet Helm (mission & operations platform)
- **Positioning:** "The orbital computing platform for the next generation of space applications."

## Stack

- Next.js 14.2.35 (App Router, fully static prerender)
- TypeScript, Tailwind CSS 3.4, Framer Motion 11, lucide-react
- Fonts via `next/font/google`: Space Grotesk (`--font-display`), Inter (`--font-body`), JetBrains Mono (`--font-mono`)

## Commands

```powershell
npm run dev         # dev server on http://localhost:3000
npm run build       # production build (also runs lint + typecheck)
npm run lint
npx tsc --noEmit    # typecheck only (safe while dev server runs — do NOT run npm run build with dev up, it corrupts .next)
npx playwright test # E2E: nav + scheduler + API routes (chromium + firefox)
```

## Structure

```
app/
  layout.tsx        # fonts, metadata, LanguageProvider + Navbar + Footer (shared chrome)
  template.tsx      # route-transition fade/rise on every navigation (reduced-motion aware)
  page.tsx          # / — Hero + Problem + FinalCTA
  product/page.tsx  # /product — Mininode + ProductSuite (Forge #forge, Helm #helm)
  platform|technology|use-cases|developers|security/page.tsx  # one section each + FinalCTA
  api/contact/route.ts, api/meeting/route.ts  # POST endpoints — Resend-ready (lib/mail.ts)
  globals.css       # tokens, utilities (.glass, .hairline, .grid-bg, .starfield), reduced-motion
components/
  Navbar.tsx        # sticky glass navbar, path links + active state, mobile modal menu
  Hero.tsx          # headline + CTAs, mounts OrbitalScene
  OrbitalScene.tsx  # single-SVG scene: Earth sphere, inclined orbits w/ satellites,
                    # ground stations, Mininode highlighted w/ signal links + packets
  Problem.tsx       # "Not every byte needs to reach Earth" + data funnel visual
  Platform.tsx      # architecture timeline + roadmap (own sw → orbital datacenter → catalogs → custom)
  Mininode.tsx      # node selector (MiniNode-01/02/03 via Select) + exploded iso diagram
                    # with selectable parts + full-width detail panel
  HowItWorks.tsx    # 4 steps: Develop / Validate / Deploy / Execute
  Workloads.tsx     # 6 illustrative use cases
  ProductSuite.tsx  # Forge terminal mockup + Helm console mockup
  Developers.tsx    # "Bring your own software" + workload.manifest card
  Security.tsx      # controlled-execution principles
  FinalCTA.tsx      # schedule-meeting + partnerships cards / "Have questions?" form
  MeetingScheduler.tsx  # calendar modal — 7–60 day bookable window, weekdays only,
                    # time slots, full visitor form → /api/meeting (mailto fallback)
  Select.tsx        # shared custom dropdown — see "Dropdowns" below
  Footer.tsx
  Section.tsx       # shared section wrapper (label/title/subtitle)
  Reveal.tsx        # scroll-scrubbed "fog" reveal: soft mask edge + fade/rise
                    # mapped to scroll, spring-smoothed (useSpring) so wheel jumps
                    # become fluid motion; freezes mid-state, ungenerates on
                    # scroll-up; mount fade covers anchor jumps; reduced-motion aware
lib/
  contact.ts        # CONTACT_EMAIL — empty "" until the real inbox is decided
  mail.ts           # Resend wrapper; without RESEND_API_KEY/CONTACT_EMAIL requests
                    # are accepted but not delivered (pending activation)
  i18n/             # LanguageProvider.tsx + en.ts / es.ts / types.ts
tests/              # Playwright — nav.spec.ts (routing, menu, scheduler) + api.spec.ts
```

## Design system

- Palette (tailwind.config.ts): `void #030509`, `abyss #060a14`, `night #0a1020`, `graphite`, `steel`, `mist #94a3b8`, `frost #e2e8f0`, accents `pulse #22d3ee` / `ion #38bdf8`
- Dark theme only; hairline borders `rgba(148,163,184,0.12)`; glassmorphism reserved for navbar, mockups, form
- Mono uppercase micro-labels (`section-label`), tight display headings (`tracking-tightest`)
- All visuals are hand-built SVG/CSS — no image assets. Satellite constellation animates via SVG `animateMotion` on a shared orbit path (90s period)
- **Dropdowns: always use `components/Select.tsx`** — the custom listbox (keyboard nav ↑↓/Home/End/Enter, Escape, click-outside, `aria-activedescendant`, glass panel animation). Never use native `<select>`: the OS-styled popup clashes with the dark theme. Consumers pass trigger styling via `className` (same chrome as inputs) and `labelId` pointing at an external label

## Content rules (important)

- **Never invent** metrics, savings percentages, latency figures, clients, partners, certifications, addresses or corporate info
- Use cases are *illustrative*, not certified capabilities — keep that framing
- Workload compatibility is conditional: profiles, resource envelopes and validation gates — never claim "any app runs in orbit"
- Security claims stay conceptual (validation, authorization, isolation, observability) — no specific standards
- Product mockups are labeled "Interface concepts shown for illustration"
- Contact & meeting forms POST to `/api/*` → `lib/mail.ts` (Resend). **Pending activation**: no `RESEND_API_KEY` and `CONTACT_EMAIL` is empty, so nothing is delivered yet — set both to go live

## Accessibility & quality

- **Responsive-first (mandatory)**: every component and layout must work on mobile, tablet and desktop. Use Tailwind responsive prefixes (`sm:`/`md:`/`lg:`), fluid sizing (`vw`, `%`, `clamp()`) and flexible grids — no fixed pixel widths that overflow small viewports. Verify no horizontal scroll or clipped content at ~375px width
- `prefers-reduced-motion` disables orbit animation, stream packets and reveals (CSS + `useReducedMotion`)
- Semantic HTML, aria labels on nav/form, visible focus states
- SEO basics in `layout.tsx` metadata + OpenGraph

## i18n (EN/ES)

- Custom lightweight i18n: `lib/i18n/LanguageProvider.tsx` (React context + `useLanguage()` hook), typed dictionaries in `lib/i18n/en.ts` and `lib/i18n/es.ts`, shared types in `lib/i18n/types.ts`
- Locale persisted in `localStorage` (`spacenet-locale`), `<html lang>` synced, EN/ES toggle in the navbar
- **Rule: every new component or UI text must consume `useLanguage()` — never hardcode user-facing strings.** Add the key to `types.ts`, `en.ts` AND `es.ts` in the same change
- Proper nouns and CLI output (SpaceNet, MiniNode-01, Forge, Helm, terminal commands) stay in English by design

## Maintenance rules

- **Keep this file in sync automatically**: whenever structure, stack, branding, design tokens or conventions change, update `devin.md` in the same change — no need to be asked
- Only restructure or rewrite this file when explicitly requested
- **Never run `git push` unless the user explicitly asks for it** — commits are fine, pushes are not
