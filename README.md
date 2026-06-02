<div align="center">

<img src="https://img.shields.io/badge/AltairGO-Platform-6CB0BD?style=for-the-badge&logo=react&logoColor=white" alt="AltairGO Platform" />

# AltairGO Platform

**Traveler-facing React frontend for AltairGO Travel Intelligence — AI itinerary planning, full booking management, and destination discovery.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![React Router](https://img.shields.io/badge/React%20Router-v7-CA4245?style=flat-square&logo=reactrouter&logoColor=white)](https://reactrouter.com)
[![CSS Modules](https://img.shields.io/badge/CSS--Modules-scoped-4285F4?style=flat-square&logo=cssmodules&logoColor=white)](https://github.com/css-modules/css-modules)

<br/>

[Features](#-features) &bull; [Getting Started](#-getting-started) &bull; [Routes](#-routing-overview) &bull; [Project Structure](#-project-structure) &bull; [Design System](#-design-system)

</div>

---

## Overview

AltairGO Platform is a production-grade React SPA connecting to the [AltairGO Engine](https://github.com/yash-dev007/AltairGO-Engine) Flask backend. It covers the full traveler journey: discover destinations, generate AI itineraries via SSE, manage bookings, track expenses, and review trips.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19.2 | UI framework (StrictMode enabled) |
| Vite | 8.0 | Build tool + dev server (port 5173/5174) |
| React Router | v7 | Client-side routing (v6-style `<Routes>` API) |
| Framer Motion | 12 | Page transitions + animations |
| Recharts | 3 | Charts (expenses, best-time widget) |
| @dnd-kit | core@6, sortable@10, utilities@3 | Drag-and-drop (activity reorder) |
| Lucide React | 0.577 | Icon library |
| react-hot-toast | 2.6 | Toast notifications |
| DOMPurify | 3.3 | HTML sanitization (admin blog preview) |
| CSS Modules | — | Scoped per-component styles |

---

## Features

### Landing Page & Aesthetic
- **Fluid Animations**: Configured Framer Motion staggered entrance and viewport scroll-triggered transitions across Heroes, Destinations, Capabilities, and Journal modules for a premium feel.
- **Premium Design System**: Built with modern CSS features including glassmorphic pills, deeply responsive grids dropping down fluidly for mobile, cohesive light/dark gradients using `oklch` and custom properties scoped uniquely via CSS Modules.

### Trip Planning
- **5-step planner wizard** — destination search + AI recommendations, dates/duration, budget slider (live ₹/person/day hint), interests chips, advanced options (dietary, fitness, accessibility)
- **AI itinerary generation** — real-time SSE stream via `EventSource`; auto-saves on completion; 2s polling fallback

### Itinerary Viewer (6 tabs)
- **Itinerary** — pending bookings banner, day briefing links, collapsible activity cards
- **Bookings** — 3-step explainer, status pills, booking refs, "Confirm & Book All Approved" CTA, approve/reject/cancel per booking
- **Expenses** — planned vs actual spend per category with Recharts bar chart
- **Readiness** — 0–100% checklist (documents, bookings, packing, health)
- **Notes** — per-trip and per-day notes with auto-save
- **Post-trip** — summary stats, highlights, star + tag chip review form

### Destination Discovery
- Bento grid with season/budget/category filters
- AI semantic search (`q=` via text embeddings)
- Destination detail: 4-tab deep-dive (overview, best time, attractions, budget)
- Best-time widget — 12-month score matrix with Excellent/Good/Fair/Avoid verdicts
- Side-by-side destination comparison with winner

### Other
- **Trip sharing** — public read-only view via share token
- **Daily briefing** — day-of carry list, weather, crowd warnings, SOS contacts
- **Admin dashboard** — stats, job triggers, SSE live feed, engine config, feature flags CRUD
- **JWT auth** — auto token refresh; `ag:unauthorized` CustomEvent auto-logout

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

The Vite dev server proxies `/api/*`, `/auth/*`, and all engine routes to `http://127.0.0.1:5000` automatically.

### Optional: Custom backend URL

```env
# .env.local
VITE_API_URL=http://127.0.0.1:5000
```

### Build for Production

```bash
npm run build   # output → dist/
```

---

## Routing Overview

| Path | Page | Auth |
|------|------|------|
| `/` | Home | Public |
| `/discover` | Destinations bento grid | Public |
| `/destination/:id` | Destination detail (4 tabs) | Public |
| `/login` | Login | Public |
| `/register` | Register | Public |
| `/trip/shared/:token` | Shared trip (read-only) | Public |
| `/planner` | Trip planner wizard | Protected |
| `/planner/generating/:jobId` | SSE generation progress | Protected |
| `/trips` | My trips dashboard | Protected |
| `/trip/:id` | Trip viewer (6 tabs) | Protected |
| `/trip/:id/briefing/:day` | Daily briefing | Protected |
| `/profile` | User profile | Protected |
| `/admin` | Admin dashboard | Admin only |

---

## Project Structure

The codebase is organized into modular layout, primitive, and domain pages directories for high maintainability:

```
src/
├── App.jsx                  # All routes + ProtectedRoute + AdminRoute
├── index.css                # Canonical Design system — tokens, fonts, resets
├── context/
│   └── AuthContext.jsx      # JWT auth state + auto-refresh + logout event
├── services/
│   └── api.js               # Central Fetch layer (60+ named API functions)
├── components/              # Restructured components space
│   ├── layout/              # Structural pages grids (Navbar, Footer)
│   ├── common/              # Reusable UI primitives barrel-exported via index.js
│   ├── destinations/        # Feature components (DestinationCard)
│   ├── blogs/               # Feature components (BlogContent)
│   └── skeletons/           # Complex loaders (Card, TripCard skeletons)
└── pages/
    ├── Home.jsx
    ├── auth/                # Login + Register
    ├── destinations/        # DestinationsPage + DestinationDetails
    ├── trips/               # Planner, Generating, Viewer, Dashboard, Briefing
    ├── profile/
    ├── shared/              # Public shared trip view
    └── admin/               # AdminLogin + AdminDashboard
```

---

## Testing

```bash
# Backend pytest validation suite
python -m pytest ../AltairGO-Engine/backend/tests/ -q  # 188 passed (backend engine)
```

---

## Design System

All layout parameters, theme tokens, and typography classes reside in `src/index.css`:

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
```

### Typography Fonts
*   **Display Headers**: `'Instrument Serif', serif` (loaded via Google Fonts)
*   **Body Typeface**: `'Aeonik', sans-serif` (geometric, clean)
*   **Accent Scripts**: `'Satisfy', cursive` (premium handwritten accent styles)

---

## API Integration Notes

All API calls go through `src/services/api.js`. Key field names to know:

| Endpoint | Gotcha |
|----------|--------|
| `PUT /api/trip/<id>/notes` | Body must be `{ trip: "...", days: {...} }` — not `{ notes: "..." }` |
| `GET /get-trip/<id>` | `user_notes` is `{ trip: "...", days: {...} }` — extract `.trip` for display |
| `PUT /api/trip/<id>/day/<n>/activity/edit` | Use `cost_override` (not `cost`), `user_note` (not `notes`) |
| `GET /api/user/trips` | Response is `{ items: [...] }` — not `{ trips: [...] }` |
| `GET /api/discover/best-time/<id>` | Monthly scores are under `monthly_guide` key |
| `GET /api/discover/recommend` | Results are under `recommendations` key |

---

## Related Projects

*   [AltairGO-Engine](https://github.com/yash-dev007/AltairGO-Engine): Flask backend handling PostgreSQL, Celery task cues, and Gemini AI.

---

## License

Private — All rights reserved.
