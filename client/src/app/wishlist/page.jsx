'use client';
import AuthGuard from '../components/AuthGuard';
import WishlistManager from '../components/WishlistManager';
import Navbar from '../components/Navbar';

export default function WishlistPage() {
  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <WishlistManager />
        </div>
      </div>
    </AuthGuard>
  );
}
