<div align="center">

<img src="https://img.shields.io/badge/AltairGO-Platform-6CB0BD?style=for-the-badge&logo=react&logoColor=white" alt="AltairGO Platform" />

# AltairGO Platform

**Traveler-facing React frontend for AltairGO Travel Intelligence — AI itinerary planning, full booking management, and destination discovery.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React%20Router-v7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![Lenis](https://img.shields.io/badge/Lenis-1.3-smooth--scroll-FF6B6B?style=flat-square)](https://github.com/darkroomengineering/lenis)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![CSS Modules](https://img.shields.io/badge/CSS--Modules-scoped-4285F4?style=flat-square&logo=cssmodules&logoColor=white)](https://github.com/css-modules/css-modules)

<br/>

[Features](#-features) &bull; [Getting Started](#-getting-started) &bull; [Routes](#-routing-overview) &bull; [Project Structure](#-project-structure) &bull; [Design System](#-design-system) &bull; [Pre-Push](#-pre-push-checklist)

</div>

---

## Overview

AltairGO Platform is a production-grade React SPA connecting to the [AltairGO Engine](https://github.com/yash-dev007/AltairGO-Engine) Flask backend. It covers the full traveler journey: discover destinations, generate AI itineraries via SSE, manage bookings, track expenses, and review trips. Built with performance, accessibility, and polished motion in mind.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19.2 | UI framework (StrictMode enabled) |
| Vite | 8.0 | Build tool + dev server (port 5173) |
| React Router | v7 | Client-side routing (`<Routes>` + `AnimatePresence` page transitions) |
| Framer Motion | 12.38 | Page transitions, scroll-reveal text, micro-interactions |
| Lenis | 1.3.26 | Slow inertia smooth scroll (site-wide, `prefers-reduced-motion` aware) |
| Recharts | 3.8 | Charts (expenses, best-time widget) |
| Lucide React | 0.577 | Primary icon library |
| @phosphor-icons/react | 2.1.10 | Secondary icons (Hero, FAQ, Blogs) |
| react-hot-toast | 2.6 | Toast notifications |
| DOMPurify | 3.3 | HTML sanitization (blog `dangerouslySetInnerHTML`) |
| CSS Modules | — | Scoped per-component styles |

> Removed: `@dnd-kit/*` (unused ~80kB gz), `App.css`, `Toast.jsx`, `PlanYourTripButton` — see [Changelog](#-changelog).

---

## Features

### Landing Page & Motion
- **Lenis slow smooth scroll** — site-wide inertia (`duration 1.35`, `easing 1-(1-t)^3.2`, `smoothTouch: false`) via `src/components/common/SmoothScroll.jsx`, disabled for `prefers-reduced-motion`.
- **Scroll-triggered text reveal** — `src/components/common/TextReveal.jsx` (`RevealWords` / `RevealChars` / `FadeUp` / `Stagger`) on all headings and paragraphs (Hero, WhyAltairgo, TourSelection, FAQ, TravelInspiration, Destinations, Blogs). Words stagger `70ms`, chars `35ms`, reduced-motion fallback renders plain text.
- **Page transitions** — `src/components/common/PageTransition.jsx` wraps all routes with `AnimatePresence mode="wait"` (fade + y 10px, 450ms).
- **Navbar** — fixed pill morph `600ms transform` (GPU, `translateY` not `top`), uniform `1px transparent → glass-border` (no 1px jump), `::before` opacity fade for glass blur, rAF-throttled scroll + `will-change: transform`, focus trap + body lock, backdrop dim.
- **Premium Design System** — `oklch` tokens, glassmorphic pills, responsive bento grids, `contain`/`will-change` optimizations, centralized `@keyframes` in `src/index.css`.

### Trip Planning
- **5-step planner wizard** — destination search + AI recommendations, dates/duration, budget slider (live ₹/person/day hint with NaN/Infinity guard), interests chips, advanced options (dietary, fitness, accessibility). Debounced search now uses `AbortController`; planner pre-fills `?destination=` param.
- **AI itinerary generation** — real-time SSE stream via `EventSource`; polling fallback `2s`; `pollIntervalRef`/`esRef` split fixes interval leak, `pollErrorCount` resets on success. Saves via `POST /api/save-trip`; anonymous fallback renders `/trip/preview` (read-only `SharedTripPage` preview) instead of redirect loop.

### Itinerary Viewer (6 tabs)
- **Itinerary** — pending bookings banner, day briefing links, collapsible activity cards, hotel swap (native + custom), add/edit/remove activity (all now call `fetchTrip` correctly).
- **Bookings** — 3-step explainer, status pills, booking refs, “Confirm & Book All Approved” CTA, approve/reject/cancel per booking (`DELETE` → `POST` for `removeActivity` to survive proxies).
- **Expenses** — planned vs actual spend per category with Recharts bar chart
- **Readiness** — 0–100% checklist (documents, bookings, packing, health)
- **Notes** — per-trip and per-day notes with auto-save
- **Post-trip** — summary stats, highlights, star + tag chip review form

### Destination Discovery
- Bento grid with budget/traveler filters + **AI semantic search** (`GET /api/discover/recommend?q=`) — AI results now isolate `isAiMode`, `hasMore=false`, client `filtered` memoized with `useMemo`, `Load More` hidden in AI mode.
- Destination detail: 4-tab deep-dive (overview, best-time 12-month `Recharts` bar, attractions, budget estimator).
- Pagination meta preserved (`wrapped.pagination`) from `{success,data,pagination}` envelope.

### Other
- **Trip sharing** — public read-only view via share token; preview route for anonymous generation.
- **Daily briefing** — day-of carry list, weather, crowd warnings, SOS contacts
- **Admin dashboard** — stats, job triggers, SSE live feed (`/api/ops/live-metrics?token=` with warning), engine config, feature flags CRUD, blog CMS.
- **JWT auth** — `AuthContext` with JWT base64url padding fix, 5-min early refresh (`scheduleRefresh` + `fetchUser` correctly ordered, `useCallback`/`useMemo` to avoid re-renders), `ag:unauthorized` event clears both `ag_token` + `ag_refresh_token`, `logout` also clears `ag_admin_token`, `safeLS` wrappers for Safari private mode, open-redirect guard via `new URL(origin)` check.

### Security & Quality
- `localStorage` access via `safeGet/safeRemove`, `ag_refresh_token` cleared on 401, `adminLogin` rate-limit TODO, `resolveBlogImage` whitelists `https://` only (blocks `javascript:/data:`), `DOMPurify` before `dangerouslySetInnerHTML`, CSP `meta` + `theme-color`/`og:image` in `index.html`, `ErrorBoundary` logs via `console.error`.

---

## Getting Started

### Prerequisites

- Node.js 18+
- **AltairGO Engine** running on `http://127.0.0.1:5000`

### Install & Run

```bash
npm install
npm run dev
# → http://localhost:5173
```

The Vite dev server proxies `/api/*`, `/auth/*`, `/generate-itinerary`, `/get-itinerary-status`, `/get-trip`, `/countries`, `/destinations`, `/blogs` to `http://127.0.0.1:5000` (`vite.config.js:13`). In production set `VITE_API_URL`.

### Environment

```env
# .env.local
VITE_API_URL=http://127.0.0.1:5000
```

> `src/config.js` is the single source for `API_BASE_URL`; `src/services/api.js` and `GeneratingPage` import it (no duplication).

### Build & Lint

```bash
npm run lint   # 0 errors, 0 warnings (2026-08-26)
npm run build  # output → dist/ (14M, 7313 modules)
npm run preview
```

Chunk sizes (gz): `react-vendor 91.5kB`, `ui-vendor 54.2kB` (includes `framer-motion`/`lucide`/`phosphor`/`dompurify`), `chart-vendor 103kB`, `index 24.9kB` (includes Lenis).

---

## Routing Overview

| Path | Page | Auth | Notes |
|------|------|------|-------|
| `/` | Home | Public | Lenis + text reveals |
| `/discover` | Destinations bento grid | Public | Filters + AI search |
| `/destination/:id` | Destination detail (4 tabs) | Public | Recharts best-time |
| `/blogs` | Blogs stories | Public | Staggered grid |
| `/blogs/:id` | Blog detail | Public | `DOMPurify` |
| `/login` | Login | Public | `?redirect=` guard |
| `/register` | Register | Public | |
| `/trip/shared/:token` | Shared trip (read-only) | Public | |
| `/trip/preview` | Preview (anon generation) | Public | State from `GeneratingPage` |
| `/planner` | Trip planner wizard | Public* | *Save requires auth; anonymous can generate |
| `/planner/generating/:jobId` | SSE generation progress | Public | Polling fallback, Lenis scroll-to-top disabled for hash |
| `/trips` | My trips dashboard | Protected | `fetchTrips` with pagination |
| `/trip/:id` | Trip viewer (6 tabs) | Protected | `fetchTrip` fixed |
| `/trip/:id/briefing/:day` | Daily briefing | Protected | |
| `/profile` | User profile | Protected | |
| `/admin/login` | Admin login | Public | Verify-key |
| `/admin` | Admin dashboard | Admin only | `ag_admin_token` |
| `*` | 404 | Public | `minHeight 50vh` `aria-busy` |

`ProtectedRoute` no longer allows `isAdmin` to bypass user auth (`App.jsx:32`).

---

## Project Structure

```
src/
├── App.jsx                  # Routes + ProtectedRoute/AdminRoute + AnimatePresence + PageTransition + SmoothScroll
├── index.css                # Design tokens, fonts, resets, @keyframes (shimmer/skeleton/progress)
├── config.js                # Single API_BASE_URL export
├── context/
│   └── AuthContext.jsx      # JWT decode (padding), scheduleRefresh 5m, fetchUser, safeLS, useMemo value
├── services/
│   └── api.js               # Central Fetch (safeGet/safeRemove, 401 handling, pagination unwrap, POST removeActivity)
├── components/
│   ├── layout/              # Navbar (600ms transform pill, rAF throttle, focus trap), Footer (regex email, span not <a>)
│   ├── common/              # Button, Card, Badge, Input, Modal, Skeleton, ProgressBar, LoadingOverlay (z100), ErrorBoundary, SmoothScroll, TextReveal, PageTransition
│   ├── destinations/        # DestinationCard
│   ├── blogs/               # Blogs.module.css
│   ├── skeletons/           # Skeleton (no per-instance <style>)
│   └── home/                # Hero (RevealChars/Words), WhyAltairgo (Stagger), TourSelection, FAQ (null open, Stagger), TravelInspiration (Stagger), AnimatedCounter (rAF textContent)
├── constants/
│   └── homeData.jsx         # TOURS, WHY_ALTAIRGO_CARDS, FAQS, COLLAGE_IMAGES (no bg dead fields)
├── utils/
│   └── blogHelpers.js       # resolveBlogImage (https-only), formatDate (UTC)
└── pages/
    ├── Home.jsx             # Orchestrator + PageTransition
    ├── auth/                # Login (URL origin guard, aria-invalid), Register
    ├── destinations/        # DestinationsPage (useMemo filtered, isAiMode), DestinationDetails (smoke test pending)
    ├── trips/               # Planner (NaN guard, AbortController), Generating (esRef/pollIntervalRef), Viewer (fetchTrip), Dashboard (field fallback), Briefing
    ├── blogs/               # BlogsPage (Stagger, keyboard, empty), BlogDetails (lazy img fallback, error hidden)
    ├── shared/              # SharedTripPage (preview via location.state)
    ├── profile/             # Profile
    └── admin/               # AdminLogin, AdminDashboard (SSE note, empty catch _e)

public/
vite.config.js              # Proxy + manualChunks (react/ui/chart, no dnd)
eslint.config.js            # globals browser+node, no-empty allowEmptyCatch, varsIgnorePattern ^[A-Z_]|motion
index.html                  # CSP, theme-color, og:image, preconnect framerusercontent
```

Removed: `src/App.css`, `src/components/common/Toast.jsx` (unused `react-hot-toast` is used), `PlanYourTripButton*` (147+205 LOC dead), `@dnd-kit/*`.

---

## Testing & Checks

```bash
npm run lint   # 0 errors (was 20, now 0)
npm run build  # 7313 modules, 0 errors
npm audit      # 0 vulnerabilities
# Backend pytest validation suite (engine repo)
python -m pytest ../AltairGO-Engine/backend/tests/ -q  # 188 passed
```

No `.env` committed (`.gitignore` covers `*.local`, `dist`, `node_modules`). No `console.log`/`debugger`/`TODO` in `src`.

---

## Pre-Push Checklist

Before `git push` (run from project root):

```bash
npm run lint
npm run build
npm audit --audit-level=high
git status
git diff --stat
git log --oneline -5
# Ensure no secrets:
grep -r "VITE_API\|ag_token\|ag_admin" --include="*.js" --include="*.jsx" src | head
# Ensure no .env tracked:
git ls-files | grep -E "^\.env"
# Large files:
du -sh dist
```

- [ ] `lint` 0 errors, `build` passes
- [ ] `package.json` has `lenis` 1.3.26, no `@dnd-kit`
- [ ] `README` routes + tech stack + structure up to date
- [ ] No `console.log`, no `.env` in git, `dist` ignored
- [ ] `git status` clean except intended files, `git log` message descriptive
- [ ] `npm audit` 0 high

---

## Design System

All tokens in `src/index.css`:

### Color Tokens (`:root`)
```css
--color-black:    #121212
--color-white:    #FFFFFF
--color-teal:     #6CB0BD       /* Primary accent — CTAs, active states */
--color-sky:      #9BC6DB       /* Secondary accent */
--color-lavender: #E2D4E1       /* Decorative gradient */
--color-peach:    #FCE4D6       /* Decorative gradient */
--color-cream:    #FFFDF2       /* Warm background tint */
--color-ice:      #DFEDF4       /* Cool panel background */
--color-sand:     #D4A373       /* Warm sandy tone */
```

### Typography Fonts
*   **Display Headers**: `'Instrument Serif', serif` (Google Fonts, swap, 2 unicode-range)
*   **Body Typeface**: `'Aeonik', sans-serif` (framerusercontent, 400/500/700, `font-display: swap`)
*   **Accent Scripts**: `'Satisfy', cursive` (Google Fonts)

### Other
- `html.lenis` + `overscroll-behavior-y: none` for Lenis; `prefers-reduced-motion` disables Lenis + text reveals + navbar transitions.
- `--glass-bg: oklch(100% 0 0 /55%)`, `--glass-blur: blur(20px) saturate(180%)`, `--radius-full: 9999px`, `--shadow-md/lg`.

---

## API Integration Notes

All API calls go through `src/services/api.js`. Key field names:

| Endpoint | Gotcha |
|----------|--------|
| `PUT /api/trip/<id>/notes` | Body must be `{ trip: "...", days: {...} }` — not `{ notes: "..." }` |
| `GET /get-trip/<id>` | `user_notes` is `{ trip: "...", days: {...} }` — extract `.trip` for display |
| `PUT /api/trip/<id>/day/<n>/activity/edit` | Use `cost_override` (not `cost`), `user_note` (not `notes`) |
| `GET /api/user/trips` | Response is `{ items: [...] }` — not `{ trips: [...] }` |
| `GET /api/discover/best-time/<id>` | Monthly scores are under `monthly_guide` key |
| `GET /api/discover/recommend` | Results are under `recommendations` key; wrapper returns `destinations` array |
| `POST /api/trip/<id>/day/<n>/activity/remove` | Now `POST` (was `DELETE` with body, stripped by proxies) |
| `GET /destinations` | Envelope `{success, data:[], pagination}` — `data.pagination` preserved as `wrapped.pagination` |

---

## Changelog (Aug 2026 — this PR)

- **Fixes**: `TripViewer fetchTrip` TDZ (5 handlers), `AuthContext fetchUser` TDZ (moved before useEffect), JWT base64 padding, `scheduleRefresh` 3→5m, `ag_refresh_token` leak, `Navbar` render-phase setState + rAF throttle + 600ms transform pill (border 1px transparent fix, `::before` opacity fade), `GeneratingPage` `esRef`/`pollIntervalRef` split, `DestinationsPage` AI mode + `useMemo`, budget NaN/Infinity guard, `BookingsTab` duplicate background, `resolveBlogImage` https-only, `formatDate` UTC, `index.html` CSP, email regex, `removeActivity` POST, pagination unwrap, `Dashboard` field fallbacks, `BlogDetails` lazy fallback, `FAQ` first closed (`null`), `LoginPage` origin guard, `ErrorBoundary` log, `LoadingOverlay` z100.
- **Perf**: removed `Toast`/`PlanYourTripButton`/`@dnd-kit` (~80kB), deduplicated `Skeleton`/`ProgressBar` keyframes to `index.css`, `AnimatedCounter` direct `textContent` (no React re-render per frame), `AuthContext` `useMemo` value, `vite manualChunks` dompurify→ui-vendor.
- **Motion**: Lenis slow scroll site-wide + `TextReveal` scroll reveals on all headings + `PageTransition` route fades.
- **Cleanup**: `src/App.css` removed, `config.js` single source, `eslint` node globals + `allowEmptyCatch`, `html overflow-x: clip` (iOS sticky fix).

---

## Related Projects

*   [AltairGO-Engine](https://github.com/yash-dev007/AltairGO-Engine): Flask backend handling PostgreSQL, Celery task cues, and Gemini AI.

---

## License

Private — All rights reserved.
