'use client';

import { useState } from 'react';
import { ArrowRight, MapPin, Star, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockDestinations } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';

export default function FeaturedDestinations({ onDestinationSelect }) {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleDestinationClick = (destination) => {
    console.log('Destination clicked:', destination);

    // Check authentication before proceeding
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      localStorage.setItem(
        'returnUrl',
        `/destinations/${encodeURIComponent(destination.name)}`
      );
      navigate('/auth/login');
      return;
    }

    // Update search filters with selected destination
    if (onDestinationSelect) {
      const destinationFilters = {
        location: destination.name,
        checkIn: null,
        checkOut: null,
        guests: 1,
        priceRange: [0, destination.averagePrice * 2],
        propertyType: 'all',
        amenities: [],
      };

      console.log('Setting filters:', destinationFilters);
      onDestinationSelect(destinationFilters);
    }

    // Scroll to search results
    setTimeout(() => {
      const searchSection = document.querySelector('[data-search-results]');
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleViewAllDestinations = () => {
    navigate('/destinations');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="h-4 w-4" />
            Popular Destinations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Amazing Places
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover unique stays and experiences in the world's most
            sought-after destinations
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {mockDestinations.slice(0, 6).map((destination) => (
            <Card
              key={destination.id}
              className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border-0 bg-white"
              onMouseEnter={() => setHoveredCard(destination.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleDestinationClick(destination)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={
                    destination.image || '/placeholder.svg?height=256&width=400'
                  }
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  onError={(e) => {
                    e.target.src = '/placeholder.svg?height=256&width=400';
                  }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Trending Badge */}
                {destination.trending && (
                  <Badge className="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 shadow-lg">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-800">
                    {destination.rating}
                  </span>
                </div>

                {/* Destination Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm opacity-90 mb-2">
                    {destination.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {destination.properties}+ stays
                    </span>
                    <span className="text-sm font-medium">
                      from ${destination.averagePrice}/night
                    </span>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-rose-500/20 to-transparent transition-opacity duration-300 ${
                    hoveredCard === destination.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </div>

              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1 text-lg">
                      {destination.name}
                    </h4>
                    <div className="flex items-center gap-1 text-gray-600 mb-2">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">
                        {destination.properties} properties available
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Average:{' '}
                      <span className="font-semibold text-gray-900">
                        ${destination.averagePrice}/night
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`transition-all duration-300 ${
                      hoveredCard === destination.id
                        ? 'bg-rose-50 text-rose-600 scale-110'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Popular Amenities */}
                <div className="flex flex-wrap gap-1">
                  {destination.popularAmenities.slice(0, 3).map((amenity) => (
                    <Badge
                      key={amenity}
                      variant="secondary"
                      className="text-xs bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Button
            size="lg"
            variant="outline"
            onClick={handleViewAllDestinations}
            className="px-8 py-3 border-2 hover:bg-gray-50 transition-all duration-300 hover:scale-105 bg-transparent"
          >
            View All Destinations
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
