'use client';
import { useNavigate } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import BookingManagement from '../components/BookingManagement';
import Navbar from '../components/Navbar';

export default function BookingsPage() {
  const navigate = useNavigate();

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <BookingManagement />
        </div>
      </div>
    </AuthGuard>
  );
}
