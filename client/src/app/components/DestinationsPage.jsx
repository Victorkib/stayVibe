'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  Filter,
  Grid3X3,
  List,
  TrendingUp,
  Award,
  Wifi,
  Car,
  Waves,
  ChefHat,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Slider } from '../../components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import {
  getDestinationByName,
  getPropertiesByDestination,
  getAllDestinations,
  searchPropertiesByDestination,
} from '../../data/mockData';

export default function DestinationsPage() {
  const { destination } = useParams();
  const navigate = useNavigate();
  const [destinationData, setDestinationData] = useState(null);
  const [properties, setProperties] = useState([]);
  const [allDestinations, setAllDestinations] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    propertyType: 'all',
    amenities: [],
    rating: 0,
    guests: 1,
  });

  // Load destination data and properties
  useEffect(() => {
    if (destination) {
      const decodedDestination = decodeURIComponent(destination);
      const destData = getDestinationByName(decodedDestination);
      const destProperties = getPropertiesByDestination(decodedDestination);

      setDestinationData(destData);
      setProperties(destProperties);
    } else {
      // Show all destinations if no specific destination
      setAllDestinations(getAllDestinations());
    }

    // Load favorites
    const savedFavorites = localStorage.getItem('userFavorites');
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, [destination]);

  // Apply filters and sorting
  useEffect(() => {
    if (destination && destinationData) {
      let filteredProperties = searchPropertiesByDestination(
        destination,
        filters
      );

      // Sort properties
      filteredProperties = filteredProperties.sort((a, b) => {
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

      setProperties(filteredProperties);
    }
  }, [filters, sortBy, destination, destinationData]);

  const toggleFavorite = (propertyId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(propertyId)) {
      newFavorites.delete(propertyId);
    } else {
      newFavorites.add(propertyId);
    }
    setFavorites(newFavorites);
    localStorage.setItem('userFavorites', JSON.stringify([...newFavorites]));
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

  const handlePropertyClick = (property) => {
    // Check authentication before proceeding
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      localStorage.setItem('returnUrl', `/property/${property.id}`);
      navigate('/auth/login');
      return;
    }

    localStorage.setItem('currentProperty', JSON.stringify(property));
    navigate(`/property/${property.id}`);
  };

  const handleDestinationClick = (dest) => {
    // Check authentication before proceeding
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      localStorage.setItem(
        'returnUrl',
        `/destinations/${encodeURIComponent(dest.name)}`
      );
      navigate('/auth/login');
      return;
    }

    navigate(`/destinations/${encodeURIComponent(dest.name)}`);
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

  // If showing all destinations
  if (!destination) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 hover:bg-gray-100 transition-all duration-200 rounded-full px-4"
                onClick={() => navigate('/')}
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  Explore Destinations
                </h1>
                <p className="text-gray-600 mt-1">
                  Discover amazing places around the world
                </p>
              </div>
              <div className="w-24"></div>
            </div>
          </div>
        </div>

        {/* All Destinations Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {getAllDestinations().map((dest) => (
              <Card
                key={dest.id}
                className="group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border-0 bg-white"
                onClick={() => handleDestinationClick(dest)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={dest.image || '/placeholder.svg?height=300&width=400'}
                    alt={dest.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {dest.trending && (
                    <Badge className="absolute top-4 left-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 shadow-lg">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}

                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-800">
                      {dest.rating}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
                    <p className="text-sm opacity-90 mb-2">
                      {dest.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {dest.properties}+ stays
                      </span>
                      <span className="text-sm font-medium">
                        from ${dest.averagePrice}/night
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // If showing specific destination
  if (!destinationData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading destination...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden">
        <div
          className="h-96 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${
              destinationData.heroImage ||
              destinationData.image ||
              '/placeholder.svg?height=400&width=1200'
            })`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-between py-8">
            <Button
              variant="ghost"
              size="sm"
              className="self-start flex items-center gap-2 text-white hover:bg-white/20 transition-all duration-200 rounded-full px-4 backdrop-blur-sm"
              onClick={() => navigate('/destinations')}
            >
              <ArrowLeft className="h-4 w-4" />
              All Destinations
            </Button>

            <div className="text-center text-white">
              <div className="flex items-center justify-center gap-3 mb-4">
                <h1 className="text-5xl md:text-6xl font-bold">
                  {destinationData.name}
                </h1>
                {destinationData.trending && (
                  <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white border-0 shadow-lg text-lg px-4 py-2">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Trending
                  </Badge>
                )}
              </div>
              <p className="text-xl md:text-2xl opacity-90 mb-6 max-w-2xl mx-auto">
                {destinationData.longDescription || destinationData.description}
              </p>
              <div className="flex items-center justify-center gap-8 text-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">
                    {destinationData.rating}
                  </span>
                  <span className="opacity-80">rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span className="font-semibold">{properties.length}</span>
                  <span className="opacity-80">properties</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    from ${destinationData.averagePrice}
                  </span>
                  <span className="opacity-80">per night</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {properties.length} {properties.length === 1 ? 'stay' : 'stays'}{' '}
                in {destinationData.name}
              </h2>
              <p className="text-gray-600 mt-1">
                Discover unique accommodations and experiences
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
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating: High to Low</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                </SelectContent>
              </Select>

              {/* Filters Button */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 border-2 hover:bg-gray-50"
              >
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 p-6 bg-white rounded-xl shadow-lg border">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Price Range
                  </label>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      setFilters({ ...filters, priceRange: value })
                    }
                    max={1000}
                    step={25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}+</span>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Property Type
                  </label>
                  <Select
                    value={filters.propertyType}
                    onValueChange={(value) =>
                      setFilters({ ...filters, propertyType: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="cabin">Cabin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Guests */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Guests
                  </label>
                  <Select
                    value={filters.guests.toString()}
                    onValueChange={(value) =>
                      setFilters({ ...filters, guests: Number.parseInt(value) })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Minimum Rating
                  </label>
                  <Select
                    value={filters.rating.toString()}
                    onValueChange={(value) =>
                      setFilters({
                        ...filters,
                        rating: Number.parseFloat(value),
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="4.5">4.5+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'space-y-8'
          }
        >
          {properties.map((property) => (
            <Card
              key={property.id}
              className={`group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border-0 bg-white ${
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
                    '/placeholder.svg?height=300&width=400'
                  }
                  alt={property.title}
                  className={`object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === 'list'
                      ? 'w-full h-48 md:h-full'
                      : 'w-full h-64'
                  }`}
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
                  {property.host?.superhost && (
                    <Badge className="bg-white text-gray-800 shadow-lg">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Superhost
                    </Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(property.id);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-lg"
                >
                  <Heart
                    className={`h-5 w-5 ${
                      favorites.has(property.id)
                        ? 'fill-rose-500 text-rose-500'
                        : 'text-gray-600'
                    }`}
                  />
                </button>
              </div>

              <CardContent
                className={`p-6 ${
                  viewMode === 'list'
                    ? 'md:w-2/3 flex flex-col justify-between'
                    : ''
                }`}
              >
                {/* Location and Rating */}
                <div className="flex justify-between items-start mb-3">
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
                <h3 className="font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors">
                  {property.title}
                </h3>

                {/* Property Details */}
                <div className="text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-4">
                    <span>{property.bedrooms} bed</span>
                    <span>{property.bathrooms} bath</span>
                    <span>{property.guests} guests</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex items-center space-x-3 mb-4 overflow-x-auto">
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
                    <span className="text-xl font-bold text-gray-900">
                      ${property.price}
                    </span>
                    <span className="text-sm text-gray-600"> / night</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Host: {property.host?.name?.split(' ')[0] || 'Host'}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {properties.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-6">
              <MapPin className="h-20 w-20 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              No properties found
            </h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your filters to see more results in{' '}
              {destinationData.name}.
            </p>
            <Button
              onClick={() =>
                setFilters({
                  priceRange: [0, 1000],
                  propertyType: 'all',
                  amenities: [],
                  rating: 0,
                  guests: 1,
                })
              }
              className="bg-rose-500 hover:bg-rose-600"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
