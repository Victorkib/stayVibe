'use client';

import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import SmartNotifications from './SmartNotifications';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    navigate('/');
  };

  const isAuthenticated =
    typeof window !== 'undefined' && localStorage.getItem('isAuthenticated');

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div
              className="flex-shrink-0 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <h1 className="text-2xl font-bold text-rose-500">StayVibe</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <button className="text-gray-700 hover:text-rose-500 font-medium transition-colors">
                Stays
              </button>
              <button className="text-gray-700 hover:text-rose-500 font-medium transition-colors">
                Experiences
              </button>
              <button className="text-gray-700 hover:text-rose-500 font-medium transition-colors">
                Online Experiences
              </button>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-700 hover:text-rose-500 font-medium transition-colors">
              Become a Host
            </button>

            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
            </Button>

            {isAuthenticated && <SmartNotifications />}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 rounded-full"
                >
                  <Menu className="h-4 w-4" />
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white shadow-2xl">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/bookings')}>
                      My Bookings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem
                      onClick={() => navigate('/auth/register')}
                    >
                      Sign up
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/auth/login')}>
                      Log in
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem>Host your home</DropdownMenuItem>
                <DropdownMenuItem>Help</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button className="block px-3 py-2 text-gray-700 hover:text-rose-500 font-medium">
                Stays
              </button>
              <button className="block px-3 py-2 text-gray-700 hover:text-rose-500 font-medium">
                Experiences
              </button>
              <button className="block px-3 py-2 text-gray-700 hover:text-rose-500 font-medium">
                Online Experiences
              </button>
              <button className="block px-3 py-2 text-gray-700 hover:text-rose-500 font-medium">
                Become a Host
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
