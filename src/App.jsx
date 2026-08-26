import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import Navbar from './components/layout/Navbar/Navbar.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import ErrorBoundary from './components/common/ErrorBoundary.jsx';
import LoadingOverlay from './components/common/LoadingOverlay.jsx';
import SmoothScroll from './components/common/SmoothScroll.jsx';
import PageTransition from './components/common/PageTransition.jsx';


// Pages (eager load critical ones)
import Home from './pages/Home.jsx';
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';

// Lazy-loaded pages
const DestinationsPage = lazy(() => import('./pages/destinations/DestinationsPage.jsx'));
const DestinationDetails = lazy(() => import('./pages/destinations/DestinationDetails.jsx'));
const TripPlannerPage = lazy(() => import('./pages/trips/TripPlannerPage.jsx'));
const GeneratingPage = lazy(() => import('./pages/trips/GeneratingPage.jsx'));
const TripViewerPage = lazy(() => import('./pages/trips/TripViewerPage.jsx'));
const DashboardPage = lazy(() => import('./pages/trips/DashboardPage.jsx'));
const DailyBriefingPage = lazy(() => import('./pages/trips/DailyBriefingPage.jsx'));
const ProfilePage = lazy(() => import('./pages/profile/ProfilePage.jsx'));
const SharedTripPage = lazy(() => import('./pages/shared/SharedTripPage.jsx'));
const AdminLogin = lazy(() => import('./pages/admin/AdminLogin.jsx'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard.jsx'));
const BlogsPage = lazy(() => import('./pages/blogs/BlogsPage.jsx'));
const BlogDetails = lazy(() => import('./pages/blogs/BlogDetails.jsx'));

// Protected Route — admin session does NOT grant user access
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingOverlay message="Checking authentication..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

// Admin Route
const AdminRoute = ({ children }) => {
  const { isAdmin, loading } = useAuth();
  if (loading) return <LoadingOverlay message="Checking authentication..." />;
  if (!isAdmin) return <Navigate to="/admin/login" replace />;
  return children;
};

// Page Fallback
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }} aria-busy="true" aria-label="Loading page">
    <div className="global-spinner" />
  </div>
);

// 404 Page
const NotFoundPage = () => (
  <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '4rem', fontWeight: 800, color: '#141413', margin: 0 }}>404</h1>
    <p style={{ fontSize: '1.2rem', color: '#5e5d59', margin: 0 }}>Page not found</p>
    <Link to="/" style={{ marginTop: '1rem', background: '#141413', color: 'white', padding: '0.75rem 2rem', borderRadius: '999px', textDecoration: 'none', fontWeight: 600 }}>Go Home</Link>
  </div>
);

function AppLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isGenerating = location.pathname.startsWith('/planner/generating');
  const shouldHideLayout = isAdmin || isAuthPage || isGenerating;

  return (
    <>
      <SmoothScroll />
      {!shouldHideLayout && <Navbar />}
      <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <Routes location={location} key={location.pathname}>
          {/* Public */}
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/discover" element={<PageTransition><DestinationsPage /></PageTransition>} />
          <Route path="/destination/:id" element={<PageTransition><DestinationDetails /></PageTransition>} />
          <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
          <Route path="/trip/shared/:token" element={<PageTransition><SharedTripPage /></PageTransition>} />
          <Route path="/trip/preview" element={<PageTransition><SharedTripPage preview /></PageTransition>} />
          <Route path="/planner/generating/:jobId" element={<PageTransition><GeneratingPage /></PageTransition>} />
          <Route path="/blogs" element={<PageTransition><BlogsPage /></PageTransition>} />
          <Route path="/blogs/:id" element={<PageTransition><BlogDetails /></PageTransition>} />

          {/* Semi-protected (shows planner to all, but save requires auth) */}
          <Route path="/planner" element={<PageTransition><TripPlannerPage /></PageTransition>} />

          {/* Protected */}
          <Route path="/trips" element={<ProtectedRoute><PageTransition><DashboardPage /></PageTransition></ProtectedRoute>} />
          <Route path="/trip/:id" element={<ProtectedRoute><PageTransition><TripViewerPage /></PageTransition></ProtectedRoute>} />
          <Route path="/trip/:id/briefing/:day" element={<ProtectedRoute><PageTransition><DailyBriefingPage /></PageTransition></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><PageTransition><ProfilePage /></PageTransition></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
          <Route path="/admin" element={<AdminRoute><PageTransition><AdminDashboard /></PageTransition></AdminRoute>} />

          {/* Fallback */}
          <Route path="*" element={<PageTransition><NotFoundPage /></PageTransition>} />
        </Routes>
      </Suspense>
      </AnimatePresence>
      {!shouldHideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppLayout />
          <Toaster
            position="top-right"
            containerStyle={{ top: 80 }}
            toastOptions={{
              duration: 4000,
              style: {
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.9rem',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
              },
              success: {
                style: { background: '#f0fdf4', color: '#065f46', border: '1px solid #bbf7d0' },
                iconTheme: { primary: '#10b981', secondary: '#fff' },
              },
              error: {
                style: { background: '#fef2f2', color: '#991b1b', border: '1px solid #fecaca' },
                iconTheme: { primary: '#ef4444', secondary: '#fff' },
              },
            }}
          />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
