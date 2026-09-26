# SpaceNet — TODO

## Contact & delivery (highest priority — forms currently deliver nothing)

- [ ] Decide the real inbox and set `CONTACT_EMAIL` in `lib/contact.ts` (this alone activates the `mailto:` fallback)
- [ ] Resend activation: `RESEND_API_KEY` + `CONTACT_EMAIL` (+ `MAIL_FROM` once a domain is verified) in `.env.local` — see `.env.example`
- [ ] Real meeting booking: Resend only sends email — for actual scheduling with confirmations/calendar sync consider Cal.com, Calendly, or Google Calendar API (or generate `.ics` invites via the existing `/api/meeting` route)

## Legal / trust

- [ ] Privacy page (`/privacy`) — required once the form collects emails (GDPR). Footer link is commented out in `components/Footer.tsx` waiting for it
- [ ] Legal page (`/legal`) — same, commented block ready
- [ ] LinkedIn company page URL — commented block in `Footer.tsx` (search `TODO` in the file); re-add `Linkedin` to the lucide import when restoring

## Polish

- [ ] Favicon (`app/icon.svg` — orbit mark from the logo) + `opengraph-image` for link previews
- [ ] `app/sitemap.ts` + `robots.ts` when the domain is real
- [ ] Hero H1 is long — consider splitting: headline "Process data from your constellation on our orbital compute node" + subtitle carrying "running software you develop, on infrastructure we operate"
- [ ] Page metadata: verify per-route `metadata` descriptions are final (all pages export their own)

## Tech debt

- [ ] `npm audit` — 5 vulnerabilities (4 high, 1 critical) came in with the Resend install; review before deploying
- [ ] `components/Reveal.tsx` — ~20 `useScroll` + `useSpring` instances per page; fine now, but if low-end devices ever scroll heavily, this is the optimization point
- [ ] MiniNode-02 / MiniNode-03 — currently "coming soon" placeholders in `t.mininode.models`; flip `available: true` and add specs when real
- [ ] Deploy — site is static-exportable (`next.config.mjs`); pick hosting (Vercel / static host) when ready

## Notes

- Dev: `npm run dev` → :3000 · `npx tsc --noEmit` (never `npm run build` while dev runs — corrupts `.next`) · `npx playwright test`
- Never invent metrics/partners/certs in copy — see `devin.md` content rules
