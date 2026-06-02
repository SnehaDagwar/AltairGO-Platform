# File Index — AltairGO-Platform

> Quick-reference for locating any file in the project.

## Root Config Files

| File | Size | Purpose |
|------|------|---------|
| `index.html` | 1.2KB | HTML shell — fonts, SEO meta, OG tags |
| `vite.config.js` | 1.4KB | Vite config — proxy rules, code splitting |
| `package.json` | 1.6KB | Dependencies, scripts |
| `eslint.config.js` | 787B | ESLint flat config |
| `.gitignore` | 277B | Git ignore rules |

## Documentation (`docs/`)

| File | Size | Purpose |
|------|------|---------|
| `docs/DESIGN.md` | 7.7KB | Design system specification (Midnight/Cerulean) |
| `docs/PRODUCT.md` | 2.7KB | Product spec — users, brand, principles |
| `docs/UX.md` | 4.3KB | UX guidelines |
| `docs/design-audit.md` | 6.9KB | Review audit of original layout structure |
| `CLAUDE.md` | 15.2KB | Project rules and technical reference |
| `README.md` | 9.5KB | Public README with setup instructions |

## Source — Core

| File | Size | Lines | Purpose |
|------|------|-------|---------|
| `src/main.jsx` | 239B | 11 | Entry point — StrictMode + createRoot |
| `src/App.jsx` | 6.4KB | 143 | Router, guards, Toaster config |
| `src/App.css` | 64B | — | Minimal reset |
| `src/index.css` | 8.5KB | 324 | **DESIGN SYSTEM** — all tokens, fonts, globals |
| `src/config.js` | 65B | 2 | API_BASE_URL export |

## Source — Context & Services

| File | Size | Lines | Purpose |
|------|------|-------|---------|
| `src/context/AuthContext.jsx` | 5.9KB | 186 | JWT auth, refresh, admin auth |
| `src/services/api.js` | 10.2KB | 172 | 60+ API functions, req() helper |

## Source — Layered Components (`src/components/`)

### Layout Components

| File | Size | Purpose |
|------|------|---------|
| `src/components/layout/Navbar/Navbar.jsx` | 6.2KB | Sticky nav, mobile hamburger |
| `src/components/layout/Navbar/Navbar.module.css` | 3.7KB | Sticky frosted glass header styling |
| `src/components/layout/Footer/Footer.jsx` | 10.9KB | CTA waitlist form, links, footer layout |
| `src/components/layout/Footer/Footer.module.css` | — | Footer styling modules |

### Common Primitives (barrel exported via `src/components/common/index.js`)

| File | Size | Purpose |
|------|------|---------|
| `src/components/common/Button.jsx` | 2.1KB | Custom buttons (5 variants, 3 sizes, loading indicators) |
| `src/components/common/Card.jsx` | 695B | Translucent glass panel wrapper |
| `src/components/common/Badge.jsx` | 1.8KB | Pill labels for status/priorities |
| `src/components/common/Input.jsx` | 3.5KB | Animated inputs with icons |
| `src/components/common/Modal.jsx` | 5.8KB | Animated modal, focus traps, Esc handlers |
| `src/components/common/ProgressBar.jsx` | 2.1KB | Step percentage indicator |
| `src/components/common/Skeleton.jsx` | 1.6KB | Basic shim shimmer primitive |
| `src/components/common/EmptyState.jsx` | 2.0KB | Search query fallback feedback layout |
| `src/components/common/Toast.jsx` | 4.5KB | Toast alerts hooks and notification overlays |
| `src/components/common/ErrorBoundary.jsx` | 1.8KB | Resilient Class error recovery element |
| `src/components/common/LoadingOverlay.jsx` | 847B | Center page overlay transition loader spinner |

### Feature & Page-Specific Skeletons

| File | Size | Purpose |
|------|------|---------|
| `src/components/destinations/DestinationCard/DestinationCard.jsx` | 2.5KB | Grid-aligned destination visual layout |
| `src/components/destinations/DestinationCard/DestinationCard.module.css` | 4.5KB | Bento-grid hover effects and image wrappers |
| `src/components/blogs/BlogContent.jsx` | — | Complete structured travel guide content card |
| `src/components/blogs/BlogContent.module.css` | — | Guide typography styling modular sheets |
| `src/components/blogs/Blogs.module.css` | — | Blogs grid display CSS sheets |
| `src/components/skeletons/Skeleton.jsx` | 3.6KB | Complex loaders (Dashboard, Card, TripCard skeletons) |

## Source — Pages (`src/pages/`)

| File | Size | Purpose |
|------|------|---------|
| `src/pages/Home.jsx` | **49KB** | Landing page with inline layouts (hero, stats, bento) |
| `src/pages/Home.module.css` | 4.5KB | Landing page styles |

### Auth Pages
* `src/pages/auth/LoginPage.jsx`: Split-screen traveler login
* `src/pages/auth/RegisterPage.jsx`: Split-screen traveler account registration
* `src/pages/auth/Auth.module.css`: Shared auth forms styles

### Destination Discovery Pages
* `src/pages/destinations/DestinationsPage.jsx`: Bento grid with budgets and semantic search
* `src/pages/destinations/DestinationsPage.module.css`: Layout styles for destination directory
* `src/pages/destinations/DestinationDetails.jsx`: Details viewer (Overview, Best Time, Attractions, Budget)

### AI Trip Planning Pages
* `src/pages/trips/TripPlannerPage.jsx`: 5-step interactive travel planning wizard
* `src/pages/trips/GeneratingPage.jsx`: SSE progress status monitoring page
* `src/pages/trips/TripViewerPage.jsx`: Tab orchestrator showing selected trips
* `src/pages/trips/DashboardPage.jsx`: Traveler's dashboard grid ("My Trips")
* `src/pages/trips/DailyBriefingPage.jsx`: Dynamic day-of packing, weather list

### Trip Sub-Tabs (`src/pages/trips/tabs/`)
* `ItineraryTab.jsx`: Drag-and-drop activity scheduler
* `BookingsTab.jsx`: Accommodation and bookings workflow
* `ExpensesTab.jsx`: Expense tracking forms and Recharts visual charts
* `ReadinessTab.jsx`: Packing checklist metrics
* `NotesTab.jsx`: Rich auto-saving text notes
* `SummaryTab.jsx`: Post-trip summary, star-rating feedback reviews

### Operations & CMS Pages
* `src/pages/profile/ProfilePage.jsx`: User profile settings CRUD
* `src/pages/shared/SharedTripPage.jsx`: Shared read-only public trip overview
* `src/pages/blogs/BlogsPage.jsx`: Public articles and travel guide listings
* `src/pages/blogs/BlogDetails.jsx`: Individual travel article view
* `src/pages/admin/AdminLogin.jsx`: Operations admin login gateway
* `src/pages/admin/AdminDashboard.jsx`: Ops center: stats, Celery job dispatchers, blogs CMS, feature flags
