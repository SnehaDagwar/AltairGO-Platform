import imgMeghalaya from '../assets/meghalaya-bridges.jpg';
import imgKashmir from '../assets/kashmir.jpg';
import imgAndaman from '../assets/andaman-islands.jpg';
import imgVaranasi from '../assets/journal_varanasi.png';
import imgLuxury from '../assets/luxury-resort.jpg';
import imgMunnar from '../assets/munnar-tea.jpg';
import imgJaipur from '../assets/jaipur-hawa.jpg';
import imgTrain from '../assets/journal_himachal.png';
import imgRishikesh from '../assets/rishikesh-yoga.jpg';

const BASE = import.meta.env.VITE_API_URL || '';

function getToken() { return localStorage.getItem('ag_token'); }
function getAdminToken() { return localStorage.getItem('ag_admin_token'); }

async function req(path, opts = {}) {
  const { admin = false, body, method, auth = true, signal } = opts;
  const resolvedMethod = method || (body != null ? 'POST' : 'GET');
  const token = admin ? getAdminToken() : (auth ? getToken() : null);
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method: resolvedMethod,
    headers,
    signal,
    ...(body != null ? { body: JSON.stringify(body) } : {}),
  });

  if (res.status === 401) {
    if (admin) {
      // Admin token expired — only clear admin token, never touch user session
      localStorage.removeItem('ag_admin_token');
    } else if (auth) {
      // Authenticated user request got 401 — session expired, log out
      localStorage.removeItem('ag_token');
      window.dispatchEvent(new Event('ag:unauthorized'));
    }
    // auth:false calls (public endpoints, login attempts, admin verify-key) return
    // 401 as normal business logic — never touch any stored token
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || data.message || 'Request failed'), { status: res.status, data });
  // Unwrap the {success, data:[...]} envelope the backend normalizer adds to list responses
  if (data !== null && typeof data === 'object' && !Array.isArray(data)
      && 'success' in data && 'data' in data && Array.isArray(data.data)) {
    return data.data;
  }
  return data;
}

// Auth
export const authLogin = (email, password) => req('/auth/login', { body: { email, password }, auth: false });
export const authRegister = (name, email, password) => req('/auth/register', { body: { name, email, password }, auth: false });
export const authRefresh = () => req('/auth/refresh', { method: 'POST' });
export const authMe = () => req('/auth/me');

// Profile
export const getProfile = () => req('/api/user/profile');
export const updateProfile = (data) => req('/api/user/profile', { method: 'PUT', body: data });
export const deleteAccount = () => req('/api/user/account', { method: 'DELETE' });

// Search
export const search = (q, type = '', limit = 10) =>
  req(`/api/search?q=${encodeURIComponent(q)}&type=${type}&limit=${limit}`);

// Destinations
export const getCountries = () => req('/countries', { auth: false });
export const getDestinations = (params = {}) => {
  const { signal, ...rest } = params;
  const qs = new URLSearchParams(rest).toString();
  return req(`/destinations${qs ? '?' + qs : ''}`, { auth: false, signal });
};
export const getDestination = (id) => req(`/destinations/${id}`, { auth: false });

// Mock blog data for high-fidelity fallback
const MOCK_BLOGS = [
  {
    id: '1',
    title: 'Hidden Valleys of Meghalaya',
    excerpt: 'A journey into the untouched beauty of the Northeast.',
    category: 'Adventure',
    date: 'May 18, 2024',
    readTime: '8 min read',
    image: imgMeghalaya,
    author: 'Rohan Das',
    content: `
      <p>Meghalaya, the "abode of clouds," is a land of jaw-dropping landscapes, misty canyons, and ancient green forests. Hidden deep within its valleys are some of the most remarkable natural and man-made wonders of the Indian subcontinent.</p>
      
      <h3>The Living Root Bridges</h3>
      <p>In the wettest regions of Cherrapunji (Sohra) and Mawlynnong, the indigenous Khasi and Jaintia tribes have perfected a unique form of bio-engineering. Over generations, they have trained the roots of the <i>Ficus elastica</i> tree to grow across wild mountain torrents, forming sturdy living bridges that grow stronger with time. The double-decker living root bridge in Nongriat village is a testament to this harmonious relationship between humanity and nature, requiring a descent of over 3,000 steps through lush jungle.</p>

      <h3>Mawlynnong: Asia's Cleanest Village</h3>
      <p>Mawlynnong is a picturesque village renowned for its extreme cleanliness, floral gardens, and community-led eco-tourism. Strolling through the village, you will see bamboo dustbins at every corner, manicured pathways, and friendly locals who take immense pride in preserving their natural heritage.</p>

      <h3>Dawki and the Umngot River</h3>
      <p>Further south, bordering Bangladesh, lies Dawki. Here, the Umngot River boasts waters so incredibly clear that boats floating on it appear as if they are suspended in mid-air. The emerald water, contrasting against the dark riverbed and surrounding cliffs, offers a surreal experience that stays with travelers forever.</p>
    `,
    tags: ['Northeast', 'Trekking', 'Eco-tourism', 'Nature']
  },
  {
    id: '2',
    title: '10 Breathtaking Lakes You Must See Before You Die',
    excerpt: 'Discover the serene, crystal-clear, and high-altitude lakes of India that offer magical views and peace.',
    category: 'Grande Drive',
    date: 'May 12, 2024',
    readTime: '6 min read',
    image: imgKashmir,
    author: 'Aisha Sen',
    content: `
      <p>From the high-altitude water bodies of the Himalayas to the tranquil backwaters of the south, India is home to some of the most spectacular lakes on Earth. Here is our selection of the top ten lakes that should be on every traveler's bucket list.</p>
      
      <h3>1. Pangong Tso, Ladakh</h3>
      <p>Situated at a height of 4,225 meters, Pangong Tso is a long narrow basin of inland drainage that changes colors from deep blue to turquoise and light green throughout the day. It spans from India to Tibet and is one of the most photographed lakes in Asia.</p>

      <h3>2. Gurudongmar Lake, Sikkim</h3>
      <p>One of the highest lakes in the world, Gurudongmar is sacred to Buddhists, Sikhs, and Hindus alike. Surrounded by snow-clad peaks, a part of the lake never freezes even in the coldest winter, which is believed to be a blessing from Guru Padmasambhava.</p>

      <h3>3. Dal Lake, Jammu & Kashmir</h3>
      <p>Known as the "Jewel in the crown of Kashmir," Dal Lake is iconic for its houseboats and shikaras (wooden boats). The floating gardens and floating markets offer a glimpse into the traditional lifestyle of Srinagar.</p>
    `,
    tags: ['Lakes', 'Himalayas', 'Ladakh', 'Kashmir', 'Scenic']
  },
  {
    id: '3',
    title: 'Coastal Bliss: Best Beaches in India for Your Next Escape',
    excerpt: 'From the pristine sands of Andaman to the vibrant shores of Goa, explore the ultimate coastal retreats.',
    category: 'Beach Escapes',
    date: 'May 10, 2024',
    readTime: '5 min read',
    image: imgAndaman,
    author: 'Vikram Malhotra',
    content: `
      <p>With a coastline stretching over 7,500 kilometers, India offers an incredible variety of beach destinations. Whether you are looking for vibrant beach parties, adventurous water sports, or secluded, quiet sands, there is a beach for you.</p>

      <h3>Radhanagar Beach, Havelock Island</h3>
      <p>Consistently rated as one of the best beaches in Asia, Radhanagar Beach in the Andaman and Nicobar Islands is famous for its powder-soft white sand, turquoise waters, and lush green forest canopy that runs right up to the shoreline.</p>

      <h3>Varkala Beach, Kerala</h3>
      <p>Varkala is unique for its dramatic red cliffs that overlook the Arabian Sea. It is a popular spot for yoga retreats, sunset views, and enjoying fresh seafood at cliffside cafes.</p>

      <h3>Palolem Beach, Goa</h3>
      <p>Located in South Goa, Palolem is a crescent-shaped beach lined with coconut palms and colorful beach shacks. Its calm waters make it perfect for swimming and kayaking.</p>
    `,
    tags: ['Beaches', 'Andaman', 'Goa', 'Coastal']
  },
  {
    id: '4',
    title: 'Cultural Journeys That Connect You Deeper',
    excerpt: 'Immerse yourself in India’s ancient traditions, spiritual centers, and historic architectures.',
    category: 'Culture',
    date: 'May 8, 2024',
    readTime: '7 min read',
    image: imgVaranasi,
    author: 'Meera Iyer',
    content: `
      <p>India is a living museum of ancient cultures, deep spiritual practices, and legendary architectures. A cultural journey here is not just about visiting monuments; it is about connecting with living traditions.</p>

      <h3>Varanasi: The Spiritual Heart</h3>
      <p>Varanasi, one of the oldest continuously inhabited cities in the world, is the spiritual capital of India. The evening Ganga Aarti ceremony at Dashashwamedh Ghat, with its synchronized brass lamps and chanting, is an intensely moving spectacle of devotion.</p>

      <h3>Hampi: The Ruins of an Empire</h3>
      <p>Hampi, the former capital of the Vijayanagara Empire, is a UNESCO World Heritage site scattered with hundreds of ancient temples, palaces, and ruins set amidst a surreal landscape of giant boulders and banana plantations.</p>
    `,
    tags: ['Culture', 'Varanasi', 'Heritage', 'History']
  },
  {
    id: '5',
    title: 'Luxury Retreats in India for the Soulful Traveler',
    excerpt: 'Experience world-class hospitality, heritage palaces, and nature wellness sanctuaries.',
    category: 'Luxury Stays',
    date: 'May 5, 2024',
    readTime: '6 min read',
    image: imgLuxury,
    author: 'Karan Oberoi',
    content: `
      <p>India is home to some of the most luxurious and iconic hotels in the world, many of which are historic palaces converted into ultra-luxury resorts that preserve their original royal splendor.</p>

      <h3>Taj Lake Palace, Udaipur</h3>
      <p>Floating in the middle of Lake Pichola, this white-marble palace is the epitome of romantic luxury. Originally built as a royal summer palace, it offers guests private butler service, royal boat rides, and stunning views of the City Palace.</p>

      <h3>Ananda in the Himalayas, Rishikesh</h3>
      <p>Located in the Himalayan foothills, Ananda is a world-renowned wellness sanctuary built around a Maharaja's palace estate. It offers personalized Ayurveda, yoga, and meditation programs to rejuvenate the body and mind.</p>
    `,
    tags: ['Luxury', 'Resorts', 'Palaces', 'Wellness']
  },
  {
    id: '6',
    title: 'Monsoon Magic: Best Places to Visit in India',
    excerpt: 'Lush green valleys and mist-covered hills await during the Indian monsoons.',
    category: 'Short Reads',
    date: 'May 2, 2024',
    readTime: '4 min read',
    image: imgMunnar,
    author: 'Ananya Rao',
    content: `<p>Monsoons transform the Indian landscape into a vibrant green paradise. From the tea gardens of Munnar to the misty valleys of Coorg, experience the romance of the rains.</p>`,
    tags: ['Monsoon', 'Nature', 'Munnar']
  },
  {
    id: '7',
    title: 'Weekend Getaways from Delhi Under 300 km',
    excerpt: 'Quick weekend road trips to historic forts and scenic hills to escape the city.',
    category: 'Short Reads',
    date: 'April 28, 2024',
    readTime: '4 min read',
    image: imgJaipur,
    author: 'Kabir Mehta',
    content: `<p>Need a break from the hustle and bustle of Delhi? Discover historic cities like Jaipur, peaceful hill stations like Lansdowne, and bird sanctuaries like Bharatpur—all just a short drive away.</p>`,
    tags: ['Weekend', 'Road Trips', 'Delhi', 'Jaipur']
  },
  {
    id: '8',
    title: 'Scenic Train Journeys You Shouldn\'t Miss',
    excerpt: 'Take the slow route through stunning valleys, coastal bridges, and mountain passes.',
    category: 'Short Reads',
    date: 'April 25, 2024',
    readTime: '5 min read',
    image: imgTrain,
    author: 'Arjun Sen',
    content: `<p>Experience the romance of rail travel on India's most scenic routes. Climb the Nilgiri Mountain Railway toy train, cross the sea on the Pamban Bridge, or slide through the Konkan hills.</p>`,
    tags: ['Train', 'Scenic', 'Travel']
  },
  {
    id: '9',
    title: 'Spiritual Trails Across Incredible India',
    excerpt: 'Embark on a soulful journey through ancient temples, ashrams, and quiet mountain retreats.',
    category: 'Short Reads',
    date: 'April 20, 2024',
    readTime: '4 min read',
    image: imgRishikesh,
    author: 'Swati Sharma',
    content: `<p>Find peace and inner harmony along India's historic spiritual pathways. From the yoga ashrams of Rishikesh to the ancient temples of Madurai, discover destinations that inspire self-reflection.</p>`,
    tags: ['Spiritual', 'Yoga', 'Rishikesh', 'Temples']
  }
];

// Blogs
export const getBlogs = async (params = {}) => {
  try {
    const { signal, ...rest } = params;
    const qs = new URLSearchParams(rest).toString();
    const data = await req(`/blogs${qs ? '?' + qs : ''}`, { auth: false, signal });
    if (Array.isArray(data) && data.length > 0) return data;
    if (data && Array.isArray(data.blogs) && data.blogs.length > 0) return data.blogs;
    return MOCK_BLOGS;
  } catch (err) {
    console.warn("Failed to fetch blogs from server, falling back to mock data.", err);
    return MOCK_BLOGS;
  }
};

export const getBlog = async (id) => {
  try {
    return await req(`/blogs/${id}`, { auth: false });
  } catch (err) {
    console.warn(`Failed to fetch blog ${id} from server, falling back to mock data.`, err);
    const mock = MOCK_BLOGS.find(b => b.id === String(id));
    if (mock) return mock;
    throw err;
  }
};
export const createDestinationRequest = (data) => req('/api/destination-requests', { body: data });
// Discovery
export const recommend = (params = {}) => {
  const { signal, ...rest } = params;
  const qs = new URLSearchParams(rest).toString();
  return req(`/api/discover/recommend${qs ? '?' + qs : ''}`, { auth: false, signal });
};
export const getBestTime = (id) => req(`/api/discover/best-time/${id}`, { auth: false });
export const estimateBudget = (data) => req('/api/discover/estimate-budget', { body: data, auth: false });
export const compareDestinations = (data) => req('/api/discover/compare', { body: data, auth: false });

// Trip Generation
export const generateItinerary = (data) => req('/generate-itinerary', { body: data, auth: false });
export const getItineraryStatus = (jobId) => req(`/get-itinerary-status/${jobId}`, { auth: false });
export const saveTrip = (data) => req('/api/save-trip', { body: data });
export const getTrip = (id) => req(`/get-trip/${id}`);
export const getUserTrips = (page = 1) => req(`/api/user/trips?page=${page}`);
export const getTripVariants = (id) => req(`/api/trip/${id}/variants`, { method: 'POST' });

// Sharing
export const shareTrip = (id) => req(`/api/trip/${id}/share`, { method: 'POST' });
export const unshareTrip = (id) => req(`/api/trip/${id}/share`, { method: 'DELETE' });
export const getSharedTrip = (token) => req(`/api/shared/${token}`, { auth: false });

// Bookings
export const getTripBookingPlan = (id) => req(`/api/trip/${id}/booking-plan`);
export const approveBooking = (id) => req(`/api/booking/${id}/approve`, { method: 'POST' });
export const rejectBooking = (id) => req(`/api/booking/${id}/reject`, { method: 'POST' });
export const executeAllBookings = (tripId) => req(`/api/trip/${tripId}/booking-plan/execute-all`, { method: 'POST' });
export const cancelBooking = (id) => req(`/api/booking/${id}/cancel`, { method: 'POST' });
export const getTripBookings = (tripId) => req(`/api/trip/${tripId}/bookings`);
export const customizeBooking = (id, data) => req(`/api/booking/${id}/customize`, { method: 'PUT', body: data });
export const addCustomBooking = (tripId, data) => req(`/api/trip/${tripId}/booking-plan/add-custom`, { body: data });

// Expenses
export const addExpense = (tripId, data) => req(`/api/trip/${tripId}/expense`, { body: data });
export const getExpenses = (tripId) => req(`/api/trip/${tripId}/expenses`);
export const deleteExpense = (id) => req(`/api/expense/${id}`, { method: 'DELETE' });

// Trip Tools
export const getTripReadiness = (id) => req(`/api/trip/${id}/readiness`);
export const getDailyBriefing = (id, day) => req(`/api/trip/${id}/daily-briefing/${day}`);
export const swapActivity = (id, data) => req(`/api/trip/${id}/activity/swap`, { method: 'POST', body: data });
export const getNextTripIdeas = (id) => req(`/api/trip/${id}/next-trip-ideas`);

// Trip Editor
export const getHotelOptions = (id, params = {}) => {
  const qs = new URLSearchParams(params).toString();
  return req(`/api/trip/${id}/hotel-options${qs ? '?' + qs : ''}`);
};
export const swapHotel = (id, data) => req(`/api/trip/${id}/hotel`, { method: 'PUT', body: data });
export const addActivity = (id, day, data) => req(`/api/trip/${id}/day/${day}/activity/add`, { body: data });
export const removeActivity = (id, day, data) => req(`/api/trip/${id}/day/${day}/activity/remove`, { method: 'DELETE', body: data });
export const editActivity = (id, day, data) => req(`/api/trip/${id}/day/${day}/activity/edit`, { method: 'PUT', body: data });
export const reorderActivities = (id, day, data) => req(`/api/trip/${id}/day/${day}/reorder`, { method: 'PUT', body: data });
export const updateTripNotes = (id, data) => req(`/api/trip/${id}/notes`, { method: 'PUT', body: data });

// Signals
export const recordSignal = (data) => req('/api/signal', { body: data });

// Admin
export const adminVerifyKey = (key) => req('/api/admin/verify-key', { body: { key }, auth: false });
export const adminGetStats = () => req('/api/admin/stats', { admin: true });
export const adminGetDestinations = () => req('/api/admin/destinations', { admin: true });
export const adminCreateDestination = (data) => req('/api/admin/destinations', { body: data, admin: true });
export const adminUpdateDestination = (id, data) => req(`/api/admin/destinations/${id}`, { method: 'PUT', body: data, admin: true });
export const adminDeleteDestination = (id) => req(`/api/admin/destinations/${id}`, { method: 'DELETE', admin: true });
export const adminGetUsers = () => req('/api/admin/users', { admin: true });
export const adminGetTrips = () => req('/api/admin/trips', { admin: true });
export const adminDeleteTrip = (id) => req(`/api/admin/trips/${id}`, { method: 'DELETE', admin: true });
export const adminGetRequests = () => req('/api/admin/requests', { admin: true });
export const adminApproveRequest = (id) => req(`/api/admin/requests/${id}/approve`, { method: 'POST', admin: true });
export const adminRejectRequest = (id) => req(`/api/admin/requests/${id}/reject`, { method: 'POST', admin: true });
export const adminTriggerJob = (job_name) => req('/api/ops/trigger-job', { body: { job_name }, admin: true });
export const adminTriggerAgent = (agent_key) => req('/api/ops/trigger-agent', { body: { agent_key }, admin: true });
export const adminGetEngineConfig = () => req('/api/ops/engine-config', { admin: true });
export const adminUpdateEngineConfig = (data) => req('/api/ops/engine-config', { method: 'POST', body: data, admin: true });
export const adminGetOpsSummary = () => req('/api/ops/summary', { admin: true });

// Trip Reviews
export const getTripReview = (id) => req(`/api/trip/${id}/review`);
export const submitTripReview = (id, data) => req(`/api/trip/${id}/review`, { body: data });
export const submitAttractionReview = (id, data) => req(`/api/attraction/${id}/review`, { body: data });

// Post-Trip Summary
export const getTripSummary = (id) => req(`/api/trip/${id}/summary`);

// Admin — Feature Flags
export const adminGetFeatureFlags = () => req('/api/admin/feature-flags', { admin: true });
export const adminCreateFeatureFlag = (data) => req('/api/admin/feature-flags', { body: data, admin: true });
export const adminUpdateFeatureFlag = (key, data) => req(`/api/admin/feature-flags/${key}`, { method: 'PATCH', body: data, admin: true });
export const adminDeleteFeatureFlag = (key) => req(`/api/admin/feature-flags/${key}`, { method: 'DELETE', admin: true });

// Admin — Blog CMS
export const adminGetBlogs = () => req('/api/admin/blogs', { admin: true });
export const adminCreateBlog = (data) => req('/api/admin/blogs', { body: data, admin: true });
export const adminUpdateBlog = (id, data) => req(`/api/admin/blogs/${id}`, { method: 'PUT', body: data, admin: true });
export const adminDeleteBlog = (id) => req(`/api/admin/blogs/${id}`, { method: 'DELETE', admin: true });
