'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Globe, Search, Heart, User } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import SmartNotifications from './SmartNotifications';

export default function Navbar({
  onSearchFocus,
  searchFilters,
  isScrolled = false,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user profile from localStorage
    const savedProfile = localStorage.getItem('userProfile');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else if (userName || userEmail) {
      setUserProfile({
        name: userName || 'User',
        email: userEmail || '',
        avatar: '/placeholder.svg?height=40&width=40',
      });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('returnUrl');
    setUserProfile(null);
    navigate('/');
  };

  const isAuthenticated =
    typeof window !== 'undefined' && localStorage.getItem('isAuthenticated');

  // Get active filter count for badge
  const getActiveFilterCount = () => {
    if (!searchFilters) return 0;
    let count = 0;
    if (searchFilters.location) count++;
    if (searchFilters.checkIn) count++;
    if (searchFilters.checkOut) count++;
    if (searchFilters.guests > 1) count++;
    if (
      searchFilters.priceRange &&
      (searchFilters.priceRange[0] > 0 || searchFilters.priceRange[1] < 1000)
    )
      count++;
    if (searchFilters.propertyType !== 'all') count++;
    if (searchFilters.amenities && searchFilters.amenities.length > 0) count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-lg'
          : 'bg-white border-b border-gray-200 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent group-hover:from-rose-600 group-hover:to-pink-700 transition-all duration-300">
                StayVibe
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button
                className="text-gray-700 hover:text-rose-500 font-medium transition-colors duration-200 relative group"
                onClick={() => navigate('/')}
              >
                Stays
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button className="text-gray-700 hover:text-rose-500 font-medium transition-colors duration-200 relative group">
                Experiences
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
              <button className="text-gray-700 hover:text-rose-500 font-medium transition-colors duration-200 relative group">
                Online Experiences
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-rose-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-3">
            {/* Search Icon for Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100 relative"
              onClick={onSearchFocus}
            >
              <Search className="h-5 w-5 text-gray-600" />
              {activeFilterCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 rounded-full p-0 flex items-center justify-center bg-rose-500 text-white text-xs">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>

            {/* Become a Host */}
            <button className="hidden md:block text-gray-700 hover:text-rose-500 font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50">
              Become a Host
            </button>

            {/* Language/Globe */}
            <Button variant="ghost" size="icon" className="hover:bg-gray-100">
              <Globe className="h-5 w-5 text-gray-600" />
            </Button>

            {/* Notifications for authenticated users */}
            {isAuthenticated && <SmartNotifications />}

            {/* Wishlist for authenticated users */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-100 relative"
                onClick={() => navigate('/wishlist')}
              >
                <Heart className="h-5 w-5 text-gray-600" />
              </Button>
            )}

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 rounded-full border-2 hover:shadow-md transition-all duration-200 px-2 py-1"
                >
                  <Menu className="h-4 w-4 text-gray-600" />
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={userProfile?.avatar || '/placeholder.svg'}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm">
                      {userProfile?.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-white shadow-2xl border-2 rounded-xl"
              >
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 border-b">
                      <p className="text-sm font-medium text-gray-900">
                        {userProfile?.name || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">
                        {userProfile?.email}
                      </p>
                    </div>
                    <DropdownMenuItem
                      onClick={() => navigate('/dashboard')}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                    >
                      <User className="h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/bookings')}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                    >
                      <Search className="h-4 w-4" />
                      My Bookings
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/wishlist')}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                    >
                      <Heart className="h-4 w-4" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/profile')}
                      className="flex items-center gap-2 cursor-pointer hover:bg-gray-50"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleSignOut}
                      className="text-red-600 cursor-pointer hover:bg-red-50"
                    >
                      Sign out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate('/auth/register')}
                      className="cursor-pointer hover:bg-gray-50 font-medium"
                    >
                      Sign up
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => navigate('/auth/login')}
                      className="cursor-pointer hover:bg-gray-50"
                    >
                      Log in
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                  Host your home
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate('/help')}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  Help
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-gray-100"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <button
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-gray-50 font-medium rounded-lg transition-colors"
                onClick={() => {
                  navigate('/');
                  setIsMenuOpen(false);
                }}
              >
                Stays
              </button>
              <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-gray-50 font-medium rounded-lg transition-colors">
                Experiences
              </button>
              <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-gray-50 font-medium rounded-lg transition-colors">
                Online Experiences
              </button>
              <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-gray-50 font-medium rounded-lg transition-colors">
                Become a Host
              </button>
              {isAuthenticated && (
                <>
                  <div className="border-t pt-2 mt-2">
                    <button
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-gray-50 font-medium rounded-lg transition-colors"
                      onClick={() => {
                        navigate('/dashboard');
                        setIsMenuOpen(false);
                      }}
                    >
                      Dashboard
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-gray-50 font-medium rounded-lg transition-colors"
                      onClick={() => {
                        navigate('/bookings');
                        setIsMenuOpen(false);
                      }}
                    >
                      My Bookings
                    </button>
                    <button
                      className="block w-full text-left px-3 py-2 text-gray-700 hover:text-rose-500 hover:bg-gray-50 font-medium rounded-lg transition-colors"
                      onClick={() => {
                        navigate('/wishlist');
                        setIsMenuOpen(false);
                      }}
                    >
                      Wishlist
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
