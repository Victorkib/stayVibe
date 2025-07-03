'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SearchFilters from './components/SearchFilters';
import PropertyGrid from './components/PropertyGrid';
import FeaturedDestinations from './components/FeaturedDestinations';
import HostSection from './components/HostSection';
import Footer from './components/Footer';

export default function HomePage() {
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    checkIn: null,
    checkOut: null,
    guests: 1,
    priceRange: [0, 1000],
    propertyType: 'all',
    amenities: [],
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const searchFiltersRef = useRef(null);

  // Handle scroll for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search focus from navbar
  const handleSearchFocus = () => {
    if (searchFiltersRef.current) {
      searchFiltersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle destination selection from FeaturedDestinations
  const handleDestinationSelect = (destinationFilters) => {
    setSearchFilters(destinationFilters);

    // Scroll to search results
    setTimeout(() => {
      const searchResults = document.querySelector('[data-search-results]');
      if (searchResults) {
        searchResults.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handle property selection
  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    // You can add analytics tracking here
    console.log('Property selected:', property);
  };

  // Update search filters and scroll to results
  const handleFiltersUpdate = (newFilters) => {
    setSearchFilters(newFilters);

    // Auto-scroll to results when filters are applied
    setTimeout(() => {
      const searchResults = document.querySelector('[data-search-results]');
      if (searchResults) {
        searchResults.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        onSearchFocus={handleSearchFocus}
        searchFilters={searchFilters}
        isScrolled={isScrolled}
      />

      <HeroSection />

      <div ref={searchFiltersRef}>
        <SearchFilters
          filters={searchFilters}
          setFilters={handleFiltersUpdate}
        />
      </div>

      <PropertyGrid
        filters={searchFilters}
        setFilters={setSearchFilters}
        onPropertySelect={handlePropertySelect}
      />

      <FeaturedDestinations onDestinationSelect={handleDestinationSelect} />

      <HostSection />
      <Footer />
    </div>
  );
}
