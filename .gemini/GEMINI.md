# GEMINI.md — AltairGO-Platform Codebase Knowledge Base

> **Purpose**: Complete technical reference for AI agents. Read this before making any changes.
> **Last updated**: 2026-05-31

---

## 1. What This Project Is

**AltairGO-Platform** is a production React 19 SPA — the traveler-facing frontend for AltairGO Travel Intelligence. It covers: destination discovery → AI itinerary generation → booking management → expense tracking → daily briefings → post-trip review.

- **Standalone SPA** — no backend of its own
- **Backend**: Flask app at `http://127.0.0.1:5000` (AltairGO-Engine)
- **Do NOT modify the backend** from this repo

---

## 2. Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19.2 | UI framework (StrictMode enabled) |
| Vite | 8.0 | Build tool + dev server (port 5173/5174) |
| React Router | v7 | Client-side routing (v6-style `<Routes>` API) |
| Framer Motion | 12 | Page transitions + animations |
| Recharts | 3 | Bar charts (expenses, best-time widget) |
| @dnd-kit | core@6, sortable@10, utilities@3 | Drag-and-drop (activity reorder) |
| Lucide React | 0.577 | All icons |
| react-hot-toast | 2.6 | Toast notifications |
| DOMPurify | 3.3 | HTML sanitization (admin blog preview) |
| CSS Modules | — | Per-component scoped styles |
| ESLint | 9.39 | Linting (flat config) |

---

## 3. Project Structure & Blueprint

```
AltairGO-Platform/
├── index.html                  # Shell — Satisfy font, SEO meta, OG tags
├── vite.config.js              # Proxy to :5000, manualChunks code splitting
├── package.json                # Scripts: dev, build, lint, preview
├── eslint.config.js            # Flat config, react-hooks + react-refresh
├── .gitignore
├── docs/                       # Architectural & Design specifications
│   ├── DESIGN.md               # Single source of truth for design & colors
│   ├── PRODUCT.md              # Product requirements & compliant states
│   └── UX.md                   # Actionable UX/UI motion and accessibility standards
└── src/
    ├── main.jsx                # Entry — StrictMode → <App/>
    ├── App.jsx                 # Router + guards + Toaster (143 lines)
    ├── App.css                 # Minimal reset (64 bytes)
    ├── index.css               # DESIGN SYSTEM — all CSS tokens (324 lines)
    ├── config.js               # export const API_BASE_URL = import.meta.env.VITE_API_URL || ''
    │
    ├── context/
    │   └── AuthContext.jsx     # JWT auth + refresh + admin auth (186 lines)
    │
    ├── services/
    │   └── api.js              # 60+ named API functions via req() helper (172 lines)
    │
    ├── assets/                 # Image assets inventory
    │                           # Key: logo.png, hero-page-image.png (4.4MB),
    │                           #   dest-*.png/jpg, phil-*.png, journal-*.png
    │
    ├── components/             # Layered component layout
    │   ├── layout/             # Structural page-level frames
    │   │   ├── Navbar/
    │   │   │   ├── Navbar.jsx  # Sticky glass nav, hamburger (189 lines)
    │   │   │   └── Navbar.module.css
    │   │   └── Footer/
    │   │       ├── Footer.jsx  # Rich multi-column footer + waitlist (282 lines)
    │   │       └── Footer.module.css
    │   ├── common/             # Reusable atomic UI primitives
    │   │   ├── index.js        # Single barrel export
    │   │   ├── Button.jsx      # variants: primary|glass|secondary|danger|ghost
    │   │   ├── Card.jsx        # Glass container wrapper
    │   │   ├── Badge.jsx       # Status/Category pill
    │   │   ├── Input.jsx       # Floating label text input
    │   │   ├── Modal.jsx       # Animated wrapper + focus trap
    │   │   ├── ProgressBar.jsx # Interactive step visualizer
    │   │   ├── Skeleton.jsx    # Pure shimmer loader
    │   │   ├── EmptyState.jsx  # Query feedback element
    │   │   ├── Toast.jsx       # Alert helper
    │   │   ├── ErrorBoundary.jsx # React boundary element
    │   │   └── LoadingOverlay.jsx # Spinner overlay
    │   ├── destinations/       # Feature destinations components
    │   │   └── DestinationCard/
    │   │       ├── DestinationCard.jsx # Bento optimized card
    │   │       └── DestinationCard.module.css
    │   ├── blogs/              # Feature blog components
    │   │   ├── BlogContent.jsx # Rich guide reader
    │   │   ├── BlogContent.module.css
    │   │   └── Blogs.module.css
    │   └── skeletons/          # Page specific skeleton overlays
    │       └── Skeleton.jsx    # Card, TripCard, Dashboard loaders
    │
    └── pages/
        ├── Home.jsx                        # Landing page (942 lines, 49KB)
        ├── Home.module.css
        ├── auth/
        │   ├── LoginPage.jsx               # Split-screen login (138 lines)
        │   ├── RegisterPage.jsx            # Split-screen register
        │   └── Auth.module.css
        ├── destinations/
        │   ├── DestinationsPage.jsx        # Bento grid + filters + AI search (252 lines)
        │   ├── DestinationsPage.module.css
        │   └── DestinationDetails.jsx      # 4-tab details view (340 lines)
        ├── trips/
        │   ├── TripPlannerPage.jsx          # 5-step wizard (755 lines, 42.7KB)
        │   ├── GeneratingPage.jsx          # SSE/polling progress screen (256 lines)
        │   ├── TripViewerPage.jsx          # Tab orchestrator + modals (758 lines, 43.7KB)
        │   ├── DashboardPage.jsx           # My Trips grid (254 lines)
        │   ├── DailyBriefingPage.jsx       # Day-of briefing, weather
        │   └── tabs/
        │       ├── ItineraryTab.jsx         # Day accordion + CRUD + DnD (24.3KB)
        │       ├── BookingsTab.jsx          # Booking lifecycle (7.9KB)
        │       ├── ExpensesTab.jsx          # Recharts chart + form (7.3KB)
        │       ├── ReadinessTab.jsx         # 0-100% checklist (2.4KB)
        │       ├── NotesTab.jsx             # Auto-save textarea (1.4KB)
        │       └── SummaryTab.jsx           # Post-trip stats + review (8.4KB)
        ├── profile/
        │   └── ProfilePage.jsx             # GET/PUT profile (239 lines)
        ├── shared/
        │   └── SharedTripPage.jsx          # Public read-only trip view (141 lines)
        ├── blogs/
        │   ├── BlogsPage.jsx              # Blog listing (3KB)
        │   └── BlogDetails.jsx            # Single blog view (1.7KB)
        └── admin/
            ├── AdminLogin.jsx              # Admin key verification (3.6KB)
            └── AdminDashboard.jsx          # Stats, configurations, CMS (812 lines, 54.5KB)
```

---

## 4. Design System (`src/index.css`)

### Fonts (loaded via @font-face in index.css + Google Fonts in index.html)
```
Display:  'Instrument Serif', serif  (400 weight)
Body:     'Aeonik', sans-serif       (400, 500, 700)
Accent:   'Satisfy', cursive         (Google Fonts)
```

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

### OKLCh Functional Tokens
```css
--bg:        oklch(99.4% 0.003 95)      /* Creamy white page background */
--surface:   oklch(100% 0 0 / 70%)      /* Semi-transparent panels */
--fg:        var(--color-black)          /* Text color */
--muted:     oklch(50% 0.02 240)        /* Secondary text */
--border:    oklch(92% 0.01 240)        /* Dividers */
--accent:    var(--color-teal)           /* Primary accent */
--accent-soft: var(--color-sky)         /* Soft accent */
```

### Dark Mode (`[data-theme="dark"]`)
```css
--bg:           var(--color-black)
--surface:      oklch(15% 0 0 / 60%)
--fg:           var(--color-white)
--muted:        oklch(70% 0.01 240)
--border:       oklch(30% 0.02 240)
--glass-bg:     oklch(20% 0.01 240 / 40%)
--glass-border: oklch(100% 0 0 / 10%)
```

---

## 5. Routing (`src/App.jsx`)

### Public Routes
| Path | Component | Notes |
|------|-----------|-------|
| `/` | Home | Eagerly loaded |
| `/discover` | DestinationsPage | Lazy |
| `/destination/:id` | DestinationDetails | Lazy |
| `/login` | LoginPage | Eagerly loaded |
| `/register` | RegisterPage | Eagerly loaded |
| `/trip/shared/:token` | SharedTripPage | Lazy |
| `/planner` | TripPlannerPage | Semi-protected (save requires auth) |
| `/planner/generating/:jobId` | GeneratingPage | Lazy |
| `/blogs` | BlogsPage | Lazy |
| `/blogs/:id` | BlogDetails | Lazy |

### Protected Routes (require `isAuthenticated`)
| Path | Component |
|------|-----------|
| `/trips` | DashboardPage |
| `/trip/:id` | TripViewerPage |
| `/trip/:id/briefing/:day` | DailyBriefingPage |
| `/profile` | ProfilePage |

### Admin Routes (require `isAdmin`)
| Path | Component |
|------|-----------|
| `/admin/login` | AdminLogin |
| `/admin` | AdminDashboard |

---

## 6. Authentication (`src/context/AuthContext.jsx`)

### localStorage Keys
| Key | Purpose |
|-----|---------|
| `ag_token` | Traveler JWT access token |
| `ag_refresh_token` | Traveler JWT refresh token |
| `ag_admin_token` | Admin JWT token |

### Context Shape
```js
{ user, token, isAdmin, isAuthenticated, loading, login, register, logout, adminLogin, adminLogout }
```

### Behavior
- **Mount**: if `ag_token` → `GET /auth/me` → hydrate `user`; if `ag_admin_token` → `isAdmin = true`
- **login(email, pw)**: `POST /auth/login` → saves `ag_token` + `ag_refresh_token`, schedules refresh
- **register(name, email, pw)**: `POST /auth/register` → saves `ag_token`
- **adminLogin(key)**: `POST /api/admin/verify-key` → saves `ag_admin_token`
- **Token refresh**: Scheduled `(expiry - 5min)` before JWT expires. Uses `POST /auth/refresh` with `{ refresh_token }`
- **Auto-logout**: `ag:unauthorized` CustomEvent (dispatched by api.js on 401) → clears user state
- **safeLS**: Try/catch wrapper around localStorage for storage-disabled environments
- **jwtExpiry()**: Client-side decode with `atob()` to get `exp` claim

---

## 7. API Layer (`src/services/api.js`)

### Core `req()` Helper
```js
async function req(path, opts = {})
// opts: { admin, body, method, auth, signal }
// - Auto-sets Content-Type: application/json
// - Auto-attaches Bearer token (ag_token or ag_admin_token)
// - Auto-unwraps { success, data: [...] } envelope to just the array
// - Throws Error on non-2xx
// - Dispatches ag:unauthorized on 401
```

### Exported Functions Categories
* **Auth**: `authLogin`, `authRegister`, `authRefresh`, `authMe`
* **Profile**: `getProfile`, `updateProfile`, `deleteAccount`
* **Search**: `search`
* **Destinations**: `getCountries`, `getDestinations`, `getDestination`
* **Blogs**: `getBlogs`, `getBlog`, `createDestinationRequest`
* **Discovery**: `recommend`, `getBestTime`, `estimateBudget`, `compareDestinations`
* **Trip Generation**: `generateItinerary`, `getItineraryStatus`, `saveTrip`, `getTrip`, `getUserTrips`, `getTripVariants`
* **Sharing**: `shareTrip`, `unshareTrip`, `getSharedTrip`
* **Bookings**: `getTripBookingPlan`, `approveBooking`, `rejectBooking`, `executeAllBookings`, `cancelBooking`, `getTripBookings`, `customizeBooking`, `addCustomBooking`
* **Expenses**: `addExpense`, `getExpenses`, `deleteExpense`
* **Trip Tools**: `getTripReadiness`, `getDailyBriefing`, `swapActivity`, `getNextTripIdeas`
* **Trip Editor**: `getHotelOptions`, `swapHotel`, `addActivity`, `removeActivity`, `editActivity`, `reorderActivities`, `updateTripNotes`
* **Reviews**: `getTripReview`, `submitTripReview`, `submitAttractionReview`
* **Post-Trip**: `getTripSummary`
* **Signals**: `recordSignal`
* **Admin / Configurations**: `adminVerifyKey`, `adminGetStats`, `adminGetDestinations`, `adminCreateDestination`, `adminUpdateDestination`, `adminDeleteDestination`, `adminGetUsers`, `adminGetTrips`, `adminDeleteTrip`, `adminGetRequests`, `adminApproveRequest`, `adminRejectRequest`, `adminTriggerJob`, `adminTriggerAgent`, `adminGetEngineConfig`, `adminUpdateEngineConfig`, `adminGetOpsSummary`
* **Admin — Feature Flags**: `adminGetFeatureFlags`, `adminCreateFeatureFlag`, `adminUpdateFeatureFlag`, `adminDeleteFeatureFlag`
* **Admin — Blog CMS**: `adminGetBlogs`, `adminCreateBlog`, `adminUpdateBlog`, `adminDeleteBlog`

---

## 8. Key Page Flows

### Trip Generation Flow
```
/planner (TripPlannerPage — 5 steps)
  Step 1: WHERE — destination search + AI recommendations
  Step 2: WHEN — start date + duration + from city (IATA)
  Step 3: BUDGET — ₹ slider + style chips + travelers count
  Step 4: ABOUT YOU — traveler type + dietary + fitness + interests + accessibility
  Step 5: REVIEW — summary + budget estimate + "Generate" button
    → POST /generate-itinerary → get jobId → navigate to /planner/generating/:jobId

/planner/generating/:jobId (GeneratingPage)
  → First tries SSE (EventSource) to /get-itinerary-status/:jobId
  → Fallback: polls GET /get-itinerary-status/:jobId every 2s
  → Shows rotating MESSAGES array + progress bar
  → On completed: POST /api/save-trip → navigate to /trip/:savedTripId
  → On failed: show error + retry button
```

### Trip Viewer Flow (6 tabs)
```
/trip/:id (TripViewerPage)
  → GET /get-trip/:id
  → 6 tabs:
    Itinerary  — day accordion + activity cards + hotel swap modal + add/swap/remove/edit activity
    Bookings   — approve/reject/execute-all/cancel + add-custom-booking
    Expenses   — Recharts bar chart + log expense form
    Readiness  — 0-100% score + category checklist
    Notes      — auto-save textarea (trip-level notes)
    Summary    — post-trip stats + highlights + star/tag review form
```

---

## 9. Component API Reference

### Primitives (`src/components/common/`)
* **Button.jsx**: Fluid action element supporting multiple sizes and 5 styles.
* **Modal.jsx**: Framer Motion animated modal wrapper featuring focus trap, Escape key closing, and body scroll lock.
* **Card.jsx**: Translucent glassmorphic container with custom hover translations.
* **Badge.jsx**: Pill labels for priorities or status categories.
* **Input.jsx**: High-fidelity text field with floating labels and icon injection.
* **ProgressBar.jsx**: Smooth percentage step visualizer.
* **Skeleton.jsx**: Atomic shim shimmer primitive loader.
* **EmptyState.jsx**: Visual feedback card for empty list queries.
* **Toast.jsx**: Dynamic custom notifications via `react-hot-toast` provider.

### Feature Layouts (`src/components/layout/`)
* **Navbar.jsx**: Frosted glass sticky header that hides on auth/admin paths, handles responsive transitions, and adapts auth states.
* **Footer.jsx**: Rich technical tech-navy footer with dynamic waitlist, newsletter submissions, and layout navigation grids.

---

## 10. Vite Configuration

### Dev Proxy (all routes → Flask :5000)
```
/api/*              → http://127.0.0.1:5000
/auth/*             → http://127.0.0.1:5000
/generate-itinerary → http://127.0.0.1:5000
/get-itinerary-status/* → http://127.0.0.1:5000
/get-trip/*         → http://127.0.0.1:5000
/countries          → http://127.0.0.1:5000
/health             → http://127.0.0.1:5000
/destinations/*     → http://127.0.0.1:5000 (with HTML bypass for SPA routing)
/blogs/*            → http://127.0.0.1:5000 (with HTML bypass for SPA routing)
```

---

## 11. Coding Conventions & Workflow Rules

### Mandatory Rules
1. **Never hardcode colors** — use HSL/OKLCh variables from `src/index.css`
2. **Never fetch directly** — always use centralized named helpers from `src/services/api.js`
3. **Always use CSS Modules** for component scoped stylings (`.module.css`)
4. **Never raw `<img>` without fallback** — handle image loading failures with gradients
5. **API-bound elements must use state loaders** (disable element + display loading spinners)
6. **All API boundaries require explicit error catching and notification** (`toast.error(err.message)`)
7. **Immutability Principle** — Never update state arrays or objects in-place. Always return deep-cloned structures or state copies.
8. **Size limits** — Maintain standard file lengths of `200-400` lines (max `800` lines). Keep function bodies strictly under `50` lines; extract secondary logical blocks aggressively.
9. **Atomic Conventional Commits** — Format messages using standard templates: `<emoji> <type>: <description>` (e.g. `✨ feat: add new panel`, `🐛 fix: resolve import`).
