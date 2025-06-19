'use client';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthGuard({ children, requireAuth = true }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated');
      const isAuth = authStatus === 'true';

      setIsAuthenticated(isAuth);
      setIsLoading(false);

      if (requireAuth && !isAuth) {
        // Store the current URL to redirect back after login
        localStorage.setItem('returnUrl', window.location.pathname);
        navigate('/auth/login');
      }
    };

    checkAuth();
  }, [requireAuth, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return null; // Will redirect to login
  }

  return children;
}
