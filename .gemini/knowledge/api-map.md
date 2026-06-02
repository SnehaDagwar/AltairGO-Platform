# API Map — AltairGO-Platform

> Complete mapping of every exported API function → HTTP method + endpoint.
> All functions live in `src/services/api.js`.

## Auth

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `authLogin(email, password)` | POST | `/auth/login` | No |
| `authRegister(name, email, password)` | POST | `/auth/register` | No |
| `authRefresh()` | POST | `/auth/refresh` | Yes |
| `authMe()` | GET | `/auth/me` | Yes |

## Profile

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `getProfile()` | GET | `/api/user/profile` | Yes |
| `updateProfile(data)` | PUT | `/api/user/profile` | Yes |
| `deleteAccount()` | DELETE | `/api/user/account` | Yes |

## Search

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `search(q, type, limit)` | GET | `/api/search?q=&type=&limit=` | No |

## Destinations

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `getCountries()` | GET | `/countries` | No |
| `getDestinations(params)` | GET | `/destinations?limit=&page=&budget_category=&traveler_type=` | No |
| `getDestination(id)` | GET | `/destinations/:id` | No |

## Blogs

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `getBlogs(params)` | GET | `/blogs?...` | No |
| `getBlog(id)` | GET | `/blogs/:id` | No |
| `createDestinationRequest(data)` | POST | `/api/destination-requests` | Yes |

## Discovery

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `recommend(params)` | GET | `/api/discover/recommend?q=&season=&budget=` | No |
| `getBestTime(id)` | GET | `/api/discover/best-time/:id` | No |
| `estimateBudget(data)` | POST | `/api/discover/estimate-budget` | No |
| `compareDestinations(data)` | POST | `/api/discover/compare` | No |

## Trip Generation

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `generateItinerary(data)` | POST | `/generate-itinerary` | No |
| `getItineraryStatus(jobId)` | GET | `/get-itinerary-status/:jobId` | No |
| `saveTrip(data)` | POST | `/api/save-trip` | Yes |
| `getTrip(id)` | GET | `/get-trip/:id` | Yes |
| `getUserTrips(page)` | GET | `/api/user/trips?page=` | Yes |
| `getTripVariants(id)` | POST | `/api/trip/:id/variants` | Yes |

## Sharing

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `shareTrip(id)` | POST | `/api/trip/:id/share` | Yes |
| `unshareTrip(id)` | DELETE | `/api/trip/:id/share` | Yes |
| `getSharedTrip(token)` | GET | `/api/shared/:token` | No |

## Bookings

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `getTripBookingPlan(id)` | GET | `/api/trip/:id/booking-plan` | Yes |
| `approveBooking(id)` | POST | `/api/booking/:id/approve` | Yes |
| `rejectBooking(id)` | POST | `/api/booking/:id/reject` | Yes |
| `executeAllBookings(tripId)` | POST | `/api/trip/:id/booking-plan/execute-all` | Yes |
| `cancelBooking(id)` | POST | `/api/booking/:id/cancel` | Yes |
| `getTripBookings(tripId)` | GET | `/api/trip/:id/bookings` | Yes |
| `customizeBooking(id, data)` | PUT | `/api/booking/:id/customize` | Yes |
| `addCustomBooking(tripId, data)` | POST | `/api/trip/:id/booking-plan/add-custom` | Yes |

## Expenses

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `addExpense(tripId, data)` | POST | `/api/trip/:id/expense` | Yes |
| `getExpenses(tripId)` | GET | `/api/trip/:id/expenses` | Yes |
| `deleteExpense(id)` | DELETE | `/api/expense/:id` | Yes |

## Trip Tools

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `getTripReadiness(id)` | GET | `/api/trip/:id/readiness` | Yes |
| `getDailyBriefing(id, day)` | GET | `/api/trip/:id/daily-briefing/:day` | Yes |
| `swapActivity(id, data)` | POST | `/api/trip/:id/activity/swap` | Yes |
| `getNextTripIdeas(id)` | GET | `/api/trip/:id/next-trip-ideas` | Yes |

## Trip Editor

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `getHotelOptions(id, params)` | GET | `/api/trip/:id/hotel-options?day=&category=` | Yes |
| `swapHotel(id, data)` | PUT | `/api/trip/:id/hotel` | Yes |
| `addActivity(id, day, data)` | POST | `/api/trip/:id/day/:day/activity/add` | Yes |
| `removeActivity(id, day, data)` | DELETE | `/api/trip/:id/day/:day/activity/remove` | Yes |
| `editActivity(id, day, data)` | PUT | `/api/trip/:id/day/:day/activity/edit` | Yes |
| `reorderActivities(id, day, data)` | PUT | `/api/trip/:id/day/:day/reorder` | Yes |
| `updateTripNotes(id, data)` | PUT | `/api/trip/:id/notes` | Yes |

## Reviews & Post-Trip

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `getTripReview(id)` | GET | `/api/trip/:id/review` | Yes |
| `submitTripReview(id, data)` | POST | `/api/trip/:id/review` | Yes |
| `submitAttractionReview(id, data)` | POST | `/api/attraction/:id/review` | Yes |
| `getTripSummary(id)` | GET | `/api/trip/:id/summary` | Yes |

## Signals

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `recordSignal(data)` | POST | `/api/signal` | Yes |

## Admin — Core

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `adminVerifyKey(key)` | POST | `/api/admin/verify-key` | No |
| `adminGetStats()` | GET | `/api/admin/stats` | Admin |
| `adminGetOpsSummary()` | GET | `/api/ops/summary` | Admin |
| `adminGetDestinations()` | GET | `/api/admin/destinations` | Admin |
| `adminCreateDestination(data)` | POST | `/api/admin/destinations` | Admin |
| `adminUpdateDestination(id, data)` | PUT | `/api/admin/destinations/:id` | Admin |
| `adminDeleteDestination(id)` | DELETE | `/api/admin/destinations/:id` | Admin |
| `adminGetUsers()` | GET | `/api/admin/users` | Admin |
| `adminGetTrips()` | GET | `/api/admin/trips` | Admin |
| `adminDeleteTrip(id)` | DELETE | `/api/admin/trips/:id` | Admin |
| `adminGetRequests()` | GET | `/api/admin/requests` | Admin |
| `adminApproveRequest(id)` | POST | `/api/admin/requests/:id/approve` | Admin |
| `adminRejectRequest(id)` | POST | `/api/admin/requests/:id/reject` | Admin |

## Admin — Ops

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `adminTriggerJob(job_name)` | POST | `/api/ops/trigger-job` | Admin |
| `adminTriggerAgent(agent_key)` | POST | `/api/ops/trigger-agent` | Admin |
| `adminGetEngineConfig()` | GET | `/api/ops/engine-config` | Admin |
| `adminUpdateEngineConfig(data)` | POST | `/api/ops/engine-config` | Admin |

## Admin — Feature Flags

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `adminGetFeatureFlags()` | GET | `/api/admin/feature-flags` | Admin |
| `adminCreateFeatureFlag(data)` | POST | `/api/admin/feature-flags` | Admin |
| `adminUpdateFeatureFlag(key, data)` | PATCH | `/api/admin/feature-flags/:key` | Admin |
| `adminDeleteFeatureFlag(key)` | DELETE | `/api/admin/feature-flags/:key` | Admin |

## Admin — Blog CMS

| Function | Method | Endpoint | Auth |
|----------|--------|----------|------|
| `adminGetBlogs()` | GET | `/api/admin/blogs` | Admin |
| `adminCreateBlog(data)` | POST | `/api/admin/blogs` | Admin |
| `adminUpdateBlog(id, data)` | PUT | `/api/admin/blogs/:id` | Admin |
| `adminDeleteBlog(id)` | DELETE | `/api/admin/blogs/:id` | Admin |

---

## Schema Gotchas

| Field | Correct Format | Wrong Format |
|-------|---------------|--------------|
| `selected_destinations` | `[{name: "Jaipur"}]` | `["Jaipur"]` |
| `travel_month` | `"12"` (string) | `12` (number) |
| Trip notes PUT body | `{ trip: "...", days: {...} }` | `{ notes: "..." }` |
| Activity edit | `cost_override`, `user_note` | `cost`, `notes` |
| User trips response | `{ items: [...] }` | `{ trips: [...] }` |
| Best-time response | `monthly_guide` key | `monthly_data` |
| Recommendations response | `recommendations` key | `results` |
