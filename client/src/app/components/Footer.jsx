'use client';

import { useState, useEffect } from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ChevronUp,
  Heart,
  Shield,
  Award,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router-dom';

const trustFeatures = [
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Your payment information is always protected',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Every property is verified by our team',
  },
  {
    icon: Heart,
    title: '24/7 Support',
    description: "We're here to help whenever you need us",
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();

  // Show back to top button when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
    // Show success message (you could add a toast here)
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-rose-500 hover:bg-rose-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}

      {/* Trust Features */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trustFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-rose-500/20 rounded-full flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-rose-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-lg mb-6 opacity-90">
              Get the latest deals, travel tips, and exclusive offers delivered
              to your inbox
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-gray-900 border-0 flex-1"
                required
              />
              <Button
                type="submit"
                className="bg-white text-rose-600 hover:bg-gray-100 px-6"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 bg-clip-text text-transparent mb-4">
              StayVibe
            </h3>
            <p className="text-gray-300 mb-4">
              Discover unique homes, experiences, and places around the world.
              Your perfect stay is just a click away.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/how-it-works')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/careers')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/press')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Press
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/blog')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Blog
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => navigate('/help')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/safety')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Safety Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/cancellation')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Cancellation Options
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/community-support')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Community Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/report')}
                  className="text-gray-300 hover:text-white transition-colors text-left"
                >
                  Report Issue
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <span className="text-gray-300">support@stayvibe.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-rose-400 flex-shrink-0" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 StayVibe. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <button
                onClick={() => navigate('/privacy')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate('/terms')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => navigate('/cookies')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
