'use client';

import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 mb-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-lg mb-6 opacity-90">
              Get the latest deals, travel tips, and exclusive offers delivered
              to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900 border-0"
              />
              <Button className="bg-white text-rose-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-rose-400 mb-4">StayVibe</h3>
            <p className="text-gray-300 mb-4">
              Discover unique homes, experiences, and places around the world.
              Your perfect stay is just a click away.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white"
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
                <a
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Press
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Safety Information
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Cancellation Options
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Community Support
                </a>
              </li>
              <li>
                <a
                  to="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Report Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-rose-400" />
                <span className="text-gray-300">support@stayvibe.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-rose-400" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-rose-400" />
                <span className="text-gray-300">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 StayVibe. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                to="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
