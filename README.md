# ZShieldHer

A Zcash education site for domestic violence survivors, advocates, and supporters.
Teaches financial privacy using Zcash shielded transactions — so survivors can save money that is mathematically invisible to an abusive partner.

Live at **zshieldher.com**

---

## What it is

- 7 self-contained learning modules (why privacy matters → wallet setup → exit fund plan)
- Facilitator workshop guide for DV advocates (30-minute session script)
- Donor guide (how to send private emergency funds to a survivor)
- Offline-first — works without internet after first visit
- No accounts, no analytics, no cookies, no trackers
- Emergency exit button (Alt+X) on every page

## Tech stack

| Tool | Purpose |
|---|---|
| [Astro](https://astro.build) | Static site generator |
| [Tailwind CSS](https://tailwindcss.com) | Styling |
| [Pagefind](https://pagefind.app) | Offline full-text search |
| Service Worker | Offline caching |

## Getting started

```bash
cd shieldher-astro
npm install
npm run dev        # http://localhost:4321
```

## Build

```bash
npm run build      # outputs to dist/
```

The build script runs Astro then indexes the output with Pagefind for offline search.

## Project structure

```
src/
  layouts/        BaseLayout, ModuleLayout
  components/     SiteHeader, SiteFooter, Callout, ModuleNav, ShieldIcon, ...
  pages/
    learn/        7 education modules
    advocates/    Workshop facilitator guide
    donors/       Private giving guide + donation address
    get-help/     Emergency resources
    download/     Offline/print materials
  styles/         global.css (design system)
public/
  sw.js           Service worker
  favicon.svg
```

## Safety notes

- All content served with `noindex, nofollow` and `no-referrer`
- Never link to public blockchain explorers (they reveal transaction history)
- Donation address uses a Zcash Unified Address (shielded) — not a transparent address
- Module progress stored in `localStorage` only — never sent anywhere

## License

No rights reserved. Share freely.
