'use client';

import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Page from './app/page';
import LoginPage from './app/auth/login/page';
import RegisterPage from './app/auth/register/page';
import ForgotPasswordPage from './app/auth/forgot-password/page';
import DashboardPage from './app/dashboard/page';
import OnboardingPage from './app/onboarding/page';
import BookingsPage from './app/bookings/page';
import ProfilePage from './app/profile/page';
import PropertyDetailPage from './app/property/[id]/page';
import BookingPage from './app/booking/[id]/page';
import BookingConfirmationPage from './app/booking/confirmation/[id]/page';
import WishlistPage from './app/wishlist/page';
import HelpPage from './app/help/page';
import DestinationsPage from './app/components/DestinationsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Page />} />

        {/* Authentication Routes */}
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />

        {/* Destinations Routes */}
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route
          path="/destinations/:destination"
          element={<DestinationsPage />}
        />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/help" element={<HelpPage />} />

        {/* Property Routes */}
        <Route path="/property/:id" element={<PropertyDetailPage />} />
        <Route path="/booking/:id" element={<BookingPage />} />
        <Route
          path="/booking/confirmation/:id"
          element={<BookingConfirmationPage />}
        />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// 404 Page Component
function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg font-medium"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

export default App;
