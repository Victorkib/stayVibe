'use client';

import { useState } from 'react';
import {
  Heart,
  Star,
  MapPin,
  Wifi,
  Car,
  Waves,
  ChefHat,
  Filter,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import PropertyComparison from './PropertyComparison';
import AdvancedFilters from './AdvancedFilters';
import { useNavigate } from 'react-router-dom';

// Mock data for properties
const mockProperties = [
  {
    id: 1,
    title: 'Luxury Beachfront Villa',
    location: 'Malibu, California',
    price: 450,
    rating: 4.9,
    reviews: 127,
    images: [
      '/img/airbnb1_1.avif',
      '/img/airbnb1_2.avif',
      '/img/airbnb1_3.avif',
      '/img/airbnb1_4.avif',
    ],
    amenities: ['Wifi', 'Pool', 'Parking'],
    type: 'Villa',
    host: 'Sarah',
    superhost: true,
  },
  {
    id: 2,
    title: 'Modern Downtown Apartment',
    location: 'New York, NY',
    price: 180,
    rating: 4.7,
    reviews: 89,
    images: [
      '/img/airbnb2_1.avif',
      '/img/airbnb2_2.avif',
      '/img/airbnb2_3.avif',
    ],
    amenities: ['Wifi', 'Kitchen', 'Gym'],
    type: 'Apartment',
    host: 'Michael',
    superhost: false,
  },
  {
    id: 3,
    title: 'Cozy Mountain Cabin',
    location: 'Aspen, Colorado',
    price: 320,
    rating: 4.8,
    reviews: 156,
    images: [
      '/img/airbnb3_1.avif',
      '/img/airbnb3_2.avif',
      '/img/airbnb3_3.avif',
    ],
    amenities: ['Wifi', 'Hot Tub', 'Parking'],
    type: 'Cabin',
    host: 'Emma',
    superhost: true,
  },
  {
    id: 4,
    title: 'Historic Townhouse',
    location: 'Boston, MA',
    price: 220,
    rating: 4.6,
    reviews: 73,
    images: [
      '/img/airbnb4_1.avif',
      '/img/airbnb4_2.avif',
      '/img/airbnb4_3.avif',
      '/img/airbnb4_4.avif',
    ],
    amenities: ['Wifi', 'Kitchen', 'Parking'],
    type: 'Townhouse',
    host: 'David',
    superhost: false,
  },
  // {
  //   id: 5,
  //   title: 'Penthouse with City Views',
  //   location: 'Miami, Florida',
  //   price: 380,
  //   rating: 4.9,
  //   reviews: 201,
  //   images: [
  //     '/img/airbnb1_1.avif',
  //     '/img/airbnb1_1.avif',
  //   ],
  //   amenities: ['Wifi', 'Pool', 'Gym'],
  //   type: 'Apartment',
  //   host: 'Sofia',
  //   superhost: true,
  // },
  // {
  //   id: 6,
  //   title: 'Rustic Farmhouse',
  //   location: 'Napa Valley, CA',
  //   price: 280,
  //   rating: 4.7,
  //   reviews: 94,
  //   images: [
  //     '/img/airbnb1_1.avif',
  //     '/img/airbnb1_1.avif',
  //   ],
  //   amenities: ['Wifi', 'Kitchen', 'Pet Friendly'],
  //   type: 'House',
  //   host: 'James',
  //   superhost: false,
  // },
];

export default function PropertyGrid({ filters, setFilters }) {
  const [properties, setProperties] = useState(mockProperties);
  const [favorites, setFavorites] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonProperties, setComparisonProperties] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const navigate = useNavigate();

  const toggleFavorite = (propertyId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavorites(newFavorites);
  };

  const nextImage = (propertyId, imageCount) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) + 1) % imageCount,
    }));
  };

  const prevImage = (propertyId, imageCount) => {
    setCurrentImageIndex((prev) => ({
      ...prev,
      [propertyId]: ((prev[propertyId] || 0) - 1 + imageCount) % imageCount,
    }));
  };

  const getAmenityIcon = (amenity) => {
    switch (amenity) {
      case 'Wifi':
        return <Wifi className="h-4 w-4" />;
      case 'Parking':
        return <Car className="h-4 w-4" />;
      case 'Pool':
        return <Waves className="h-4 w-4" />;
      case 'Kitchen':
        return <ChefHat className="h-4 w-4" />;
      default:
        return null;
    }
  };

  // Filter properties based on search criteria
  const filteredProperties = properties.filter((property) => {
    if (
      filters.location &&
      !property.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.priceRange &&
      (property.price < filters.priceRange[0] ||
        property.price > filters.priceRange[1])
    ) {
      return false;
    }
    if (
      filters.propertyType !== 'all' &&
      property.type !== filters.propertyType
    ) {
      return false;
    }
    if (
      filters.amenities.length > 0 &&
      !filters.amenities.every((amenity) =>
        property.amenities.includes(amenity)
      )
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {comparisonProperties.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
          <Card className="shadow-2xl border-2 border-blue-500">
            <CardContent className="p-4 flex items-center gap-4">
              <span className="font-medium">
                {comparisonProperties.length} properties selected
              </span>
              <Button
                onClick={() => setShowComparison(true)}
                disabled={comparisonProperties.length < 2}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Compare
              </Button>
              <Button
                variant="outline"
                onClick={() => setComparisonProperties([])}
              >
                Clear
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredProperties.length} stays found
          </h2>
          <p className="text-gray-600 mt-1">
            {filters.location
              ? `in ${filters.location}`
              : 'Explore amazing places'}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent">
            <option>Sort by: Recommended</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: High to Low</option>
            <option>Newest</option>
          </select>
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(true)}
            className="flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProperties.map((property) => (
          <Card
            key={property.id}
            className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            onClick={() => {
              const isAuthenticated = localStorage.getItem('isAuthenticated');
              if (isAuthenticated) {
                navigate(`/property/${property.id}`);
              } else {
                localStorage.setItem('returnUrl', `/property/${property.id}`);
                navigate('/auth/login');
              }
            }}
          >
            <div className="relative overflow-hidden rounded-t-lg">
              <img
                src={property.images[currentImageIndex[property.id] || 0]}
                alt={property.title}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              {/* Image Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(property.id, property.images.length);
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage(property.id, property.images.length);
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </>
              )}

              {/* Favorite Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(property.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-70 hover:bg-opacity-90 transition-all"
              >
                <Heart
                  className={`h-5 w-5 ${
                    favorites.has(property.id)
                      ? 'fill-rose-500 text-rose-500'
                      : 'text-gray-600'
                  }`}
                />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (comparisonProperties.find((p) => p.id === property.id)) {
                    setComparisonProperties((prev) =>
                      prev.filter((p) => p.id !== property.id)
                    );
                  } else if (comparisonProperties.length < 3) {
                    setComparisonProperties((prev) => [...prev, property]);
                  }
                }}
                className={`absolute top-3 left-3 p-2 rounded-full transition-all ${
                  comparisonProperties.find((p) => p.id === property.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-white bg-opacity-70 hover:bg-opacity-90'
                }`}
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </button>

              {/* Superhost Badge */}
              {property.superhost && (
                <Badge className="absolute top-3 left-3 bg-white text-gray-800">
                  Superhost
                </Badge>
              )}

              {/* Image Dots */}
              {property.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {property.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === (currentImageIndex[property.id] || 0)
                          ? 'bg-white'
                          : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  {property.location}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">
                    {property.rating}
                  </span>
                  <span className="ml-1 text-sm text-gray-600">
                    ({property.reviews})
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                {property.title}
              </h3>

              <div className="flex items-center space-x-2 mb-3">
                {property.amenities.slice(0, 3).map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center text-xs text-gray-600"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    ${property.price}
                  </span>
                  <span className="text-sm text-gray-600"> / night</span>
                </div>
                <div className="text-sm text-gray-600">
                  Host: {property.host}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <MapPin className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No properties found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search filters to find more results.
          </p>
        </div>
      )}

      {/* Load More Button */}
      {filteredProperties.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8">
            Load More Properties
          </Button>
        </div>
      )}
      {showComparison && (
        <PropertyComparison
          properties={comparisonProperties}
          onClose={() => setShowComparison(false)}
        />
      )}

      <AdvancedFilters
        isOpen={showAdvancedFilters}
        onClose={() => setShowAdvancedFilters(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </div>
  );
}
