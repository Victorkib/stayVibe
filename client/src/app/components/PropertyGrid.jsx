'use client';

import { useState, useEffect } from 'react';
import {
  Heart,
  Star,
  MapPin,
  Wifi,
  Car,
  Waves,
  ChefHat,
  Filter,
  Grid3X3,
  List,
  TrendingUp,
  Award,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import PropertyComparison from './PropertyComparison';
import AdvancedFilters from './AdvancedFilters';
import { useNavigate } from 'react-router-dom';
import { mockPropertiesArray, searchProperties } from '../../data/mockData';

export default function PropertyGrid({
  filters,
  setFilters,
  onPropertySelect,
}) {
  const [properties, setProperties] = useState(mockPropertiesArray);
  const [favorites, setFavorites] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonProperties, setComparisonProperties] = useState([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('userFavorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  // Save favorites to localStorage
  useEffect(() => {
    localStorage.setItem('userFavorites', JSON.stringify([...favorites]));
  }, [favorites]);

  // Update properties when filters change
  useEffect(() => {
    const filteredResults = searchProperties(filters);
    setProperties(filteredResults);
  }, [filters]);

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

  // Sorting logic
  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        // Recommended: featured first, then by rating
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
    }
  });

  const handlePropertyClick = (property) => {
    // Store property data for the detail page
    localStorage.setItem('currentProperty', JSON.stringify(property));

    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate(`/property/${property.id}`);
    } else {
      localStorage.setItem('returnUrl', `/property/${property.id}`);
      navigate('/auth/login');
    }

    if (onPropertySelect) {
      onPropertySelect(property);
    }
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      data-search-results
    >
      {/* Comparison Bar */}
      {comparisonProperties.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
          <Card className="shadow-2xl border-2 border-blue-500 bg-white">
            <CardContent className="p-4 flex items-center gap-4">
              <span className="font-medium text-blue-700">
                {comparisonProperties.length} properties selected for comparison
              </span>
              <Button
                onClick={() => setShowComparison(true)}
                disabled={comparisonProperties.length < 2}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Compare ({comparisonProperties.length})
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

      {/* Header with Results and Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
            {sortedProperties.length}{' '}
            {sortedProperties.length === 1 ? 'stay' : 'stays'} found
          </h2>
          <p className="text-gray-600 mt-1">
            {filters.location
              ? `in ${filters.location}`
              : 'Explore amazing places'}
            {filters.checkIn && filters.checkOut && (
              <span className="ml-2">
                • {filters.checkIn.toLocaleDateString()} -{' '}
                {filters.checkOut.toLocaleDateString()}
              </span>
            )}
            {filters.guests > 1 && (
              <span className="ml-2">• {filters.guests} guests</span>
            )}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="px-3"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-transparent bg-white min-w-[200px]"
          >
            <option value="recommended">Sort by: Recommended</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
            <option value="reviews">Most Reviewed</option>
          </select>

          {/* Advanced Filters Button */}
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(true)}
            className="flex items-center gap-2 border-2 hover:bg-gray-50"
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Properties Grid/List */}
      <div
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-6'
        }
      >
        {sortedProperties.map((property) => (
          <Card
            key={property.id}
            className={`group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border-0 bg-white ${
              viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
            }`}
            onClick={() => handlePropertyClick(property)}
          >
            <div
              className={`relative overflow-hidden ${
                viewMode === 'list' ? 'md:w-1/3' : ''
              }`}
            >
              <img
                src={
                  property.images[currentImageIndex[property.id] || 0] ||
                  '/placeholder.svg'
                }
                alt={property.title}
                className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                  viewMode === 'list' ? 'w-full h-48 md:h-full' : 'w-full h-64'
                }`}
                onError={(e) => {
                  e.target.src = '/placeholder.svg?height=256&width=400';
                }}
              />

              {/* Image Navigation */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage(property.id, property.images.length);
                    }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
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
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
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

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-2">
                {property.featured && (
                  <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 shadow-lg">
                    <Award className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {property.host.superhost && (
                  <Badge className="bg-white text-gray-800 shadow-lg">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Superhost
                  </Badge>
                )}
                {property.instantBook && (
                  <Badge className="bg-blue-500 text-white shadow-lg">
                    Instant Book
                  </Badge>
                )}
              </div>

              {/* Action Buttons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(property.id);
                  }}
                  className="p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-lg"
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
                    if (
                      comparisonProperties.find((p) => p.id === property.id)
                    ) {
                      setComparisonProperties((prev) =>
                        prev.filter((p) => p.id !== property.id)
                      );
                    } else if (comparisonProperties.length < 3) {
                      setComparisonProperties((prev) => [...prev, property]);
                    }
                  }}
                  className={`p-2 rounded-full transition-all shadow-lg ${
                    comparisonProperties.find((p) => p.id === property.id)
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/80 hover:bg-white text-gray-600'
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
              </div>

              {/* Image Dots */}
              {property.images.length > 1 && (
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  {property.images.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === (currentImageIndex[property.id] || 0)
                          ? 'bg-white'
                          : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <CardContent
              className={`p-4 ${
                viewMode === 'list'
                  ? 'md:w-2/3 flex flex-col justify-between'
                  : ''
              }`}
            >
              {/* Location and Rating */}
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                  <span className="truncate">{property.shortLocation}</span>
                </div>
                <div className="flex items-center ml-2">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">
                    {property.rating}
                  </span>
                  <span className="ml-1 text-sm text-gray-600">
                    ({property.reviews})
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-rose-600 transition-colors">
                {property.title}
              </h3>

              {/* Property Details */}
              <div className="text-sm text-gray-600 mb-3">
                {property.bedrooms} bed • {property.bathrooms} bath •{' '}
                {property.guests} guests
              </div>

              {/* Amenities */}
              <div className="flex items-center space-x-3 mb-3 overflow-x-auto">
                {property.amenities.slice(0, 3).map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center text-xs text-gray-600 whitespace-nowrap"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-1">{amenity}</span>
                  </div>
                ))}
                {property.amenities.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{property.amenities.length - 3} more
                  </span>
                )}
              </div>

              {/* Price and Host */}
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    ${property.price}
                  </span>
                  <span className="text-sm text-gray-600"> / night</span>
                </div>
                <div className="text-sm text-gray-600">
                  Host: {property?.host && property.host.name.split(' ')[0]}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results State */}
      {sortedProperties.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <MapPin className="h-20 w-20 mx-auto" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-4">
            No properties found
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We couldn't find any properties matching your search criteria. Try
            adjusting your filters or search in a different location.
          </p>
          <Button
            onClick={() =>
              setFilters({
                location: '',
                checkIn: null,
                checkOut: null,
                guests: 1,
                priceRange: [0, 1000],
                propertyType: 'all',
                amenities: [],
              })
            }
            className="bg-rose-500 hover:bg-rose-600"
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Load More Button */}
      {sortedProperties.length > 0 && sortedProperties.length >= 8 && (
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="px-8 border-2 hover:bg-gray-50"
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => {
                setIsLoading(false);
              }, 1000);
            }}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More Properties'}
          </Button>
        </div>
      )}

      {/* Modals */}
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
