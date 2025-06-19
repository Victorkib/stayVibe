'use client';

import { useState } from 'react';
import { Filter, X, DollarSign, Home, Star, Zap } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';

export default function AdvancedFilters({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}) {
  const [localFilters, setLocalFilters] = useState(filters);

  const propertyTypes = [
    { id: 'house', name: 'House', icon: '🏠' },
    { id: 'apartment', name: 'Apartment', icon: '🏢' },
    { id: 'villa', name: 'Villa', icon: '🏖️' },
    { id: 'cabin', name: 'Cabin', icon: '🏕️' },
    { id: 'loft', name: 'Loft', icon: '🏭' },
    { id: 'townhouse', name: 'Townhouse', icon: '🏘️' },
    { id: 'castle', name: 'Castle', icon: '🏰' },
    { id: 'treehouse', name: 'Treehouse', icon: '🌳' },
  ];

  const amenities = [
    { id: 'wifi', name: 'WiFi', icon: '📶', category: 'essentials' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳', category: 'essentials' },
    { id: 'parking', name: 'Free Parking', icon: '🚗', category: 'essentials' },
    { id: 'pool', name: 'Pool', icon: '🏊', category: 'luxury' },
    { id: 'hotTub', name: 'Hot Tub', icon: '🛁', category: 'luxury' },
    { id: 'gym', name: 'Gym', icon: '💪', category: 'luxury' },
    { id: 'spa', name: 'Spa', icon: '🧘', category: 'luxury' },
    {
      id: 'beachAccess',
      name: 'Beach Access',
      icon: '🏖️',
      category: 'location',
    },
    {
      id: 'mountainView',
      name: 'Mountain View',
      icon: '🏔️',
      category: 'location',
    },
    { id: 'cityView', name: 'City View', icon: '🏙️', category: 'location' },
    {
      id: 'petFriendly',
      name: 'Pet Friendly',
      icon: '🐕',
      category: 'policies',
    },
    {
      id: 'smokingAllowed',
      name: 'Smoking Allowed',
      icon: '🚬',
      category: 'policies',
    },
    {
      id: 'wheelchairAccessible',
      name: 'Wheelchair Accessible',
      icon: '♿',
      category: 'accessibility',
    },
    { id: 'elevator', name: 'Elevator', icon: '🛗', category: 'accessibility' },
  ];

  const hostTypes = [
    {
      id: 'superhost',
      name: 'Superhost',
      description: 'Experienced hosts with excellent ratings',
    },
    {
      id: 'instantBook',
      name: 'Instant Book',
      description: 'Book immediately without waiting for approval',
    },
    {
      id: 'newHost',
      name: 'New Host',
      description: 'Support new hosts in the community',
    },
  ];

  const bookingOptions = [
    {
      id: 'selfCheckIn',
      name: 'Self Check-in',
      description: 'Check in without meeting the host',
    },
    {
      id: 'flexibleCancellation',
      name: 'Flexible Cancellation',
      description: 'Free cancellation options',
    },
    {
      id: 'longTermStays',
      name: 'Long-term Stays',
      description: 'Monthly discounts available',
    },
  ];

  const applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const resetFilters = () => {
    const resetFilters = {
      location: '',
      checkIn: null,
      checkOut: null,
      guests: 1,
      priceRange: [0, 1000],
      propertyTypes: [],
      amenities: [],
      hostTypes: [],
      bookingOptions: [],
      rating: 0,
      bedrooms: 0,
      bathrooms: 0,
      instantBook: false,
    };
    setLocalFilters(resetFilters);
  };

  const toggleArrayFilter = (filterKey, value) => {
    setLocalFilters((prev) => ({
      ...prev,
      [filterKey]: prev[filterKey].includes(value)
        ? prev[filterKey].filter((item) => item !== value)
        : [...prev[filterKey], value],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Filter className="h-6 w-6" />
            Advanced Filters
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-auto max-h-[calc(90vh-140px)] p-6 space-y-8">
          {/* Price Range */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Price Range
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>${localFilters.priceRange[0]}</span>
                <span>${localFilters.priceRange[1]}+</span>
              </div>
              <Slider
                value={localFilters.priceRange}
                onValueChange={(value) =>
                  setLocalFilters({ ...localFilters, priceRange: value })
                }
                max={1000}
                step={25}
                className="w-full"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Min Price</Label>
                  <Input
                    type="number"
                    value={localFilters.priceRange[0]}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        priceRange: [
                          Number.parseInt(e.target.value) || 0,
                          localFilters.priceRange[1],
                        ],
                      })
                    }
                  />
                </div>
                <div>
                  <Label>Max Price</Label>
                  <Input
                    type="number"
                    value={localFilters.priceRange[1]}
                    onChange={(e) =>
                      setLocalFilters({
                        ...localFilters,
                        priceRange: [
                          localFilters.priceRange[0],
                          Number.parseInt(e.target.value) || 1000,
                        ],
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Property Type */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Home className="h-5 w-5" />
              Property Type
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {propertyTypes.map((type) => (
                <Card
                  key={type.id}
                  className={`cursor-pointer transition-all ${
                    localFilters.propertyTypes?.includes(type.id)
                      ? 'ring-2 ring-rose-500 bg-rose-50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleArrayFilter('propertyTypes', type.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm font-medium">{type.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Separator />

          {/* Rooms & Beds */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Rooms & Beds</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Bedrooms
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setLocalFilters({
                        ...localFilters,
                        bedrooms: Math.max(0, localFilters.bedrooms - 1),
                      })
                    }
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">
                    {localFilters.bedrooms || 'Any'}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setLocalFilters({
                        ...localFilters,
                        bedrooms: (localFilters.bedrooms || 0) + 1,
                      })
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Bathrooms
                </Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setLocalFilters({
                        ...localFilters,
                        bathrooms: Math.max(0, localFilters.bathrooms - 1),
                      })
                    }
                  >
                    -
                  </Button>
                  <span className="w-12 text-center">
                    {localFilters.bathrooms || 'Any'}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setLocalFilters({
                        ...localFilters,
                        bathrooms: (localFilters.bathrooms || 0) + 1,
                      })
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Amenities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Amenities</h3>
            <div className="space-y-4">
              {[
                'essentials',
                'luxury',
                'location',
                'policies',
                'accessibility',
              ].map((category) => (
                <div key={category}>
                  <h4 className="font-medium text-sm mb-2 capitalize">
                    {category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {amenities
                      .filter((amenity) => amenity.category === category)
                      .map((amenity) => (
                        <Badge
                          key={amenity.id}
                          variant={
                            localFilters.amenities?.includes(amenity.id)
                              ? 'default'
                              : 'outline'
                          }
                          className="cursor-pointer p-2 flex items-center gap-1"
                          onClick={() =>
                            toggleArrayFilter('amenities', amenity.id)
                          }
                        >
                          <span>{amenity.icon}</span>
                          {amenity.name}
                        </Badge>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Host & Booking Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Star className="h-5 w-5" />
                Host Type
              </h3>
              <div className="space-y-3">
                {hostTypes.map((host) => (
                  <Card
                    key={host.id}
                    className={`cursor-pointer transition-all ${
                      localFilters.hostTypes?.includes(host.id)
                        ? 'ring-2 ring-rose-500 bg-rose-50'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => toggleArrayFilter('hostTypes', host.id)}
                  >
                    <CardContent className="p-4">
                      <h4 className="font-medium">{host.name}</h4>
                      <p className="text-sm text-gray-600">
                        {host.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Booking Options
              </h3>
              <div className="space-y-3">
                {bookingOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all ${
                      localFilters.bookingOptions?.includes(option.id)
                        ? 'ring-2 ring-rose-500 bg-rose-50'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() =>
                      toggleArrayFilter('bookingOptions', option.id)
                    }
                  >
                    <CardContent className="p-4">
                      <h4 className="font-medium">{option.name}</h4>
                      <p className="text-sm text-gray-600">
                        {option.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Separator />

          {/* Rating Filter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Minimum Rating</h3>
            <div className="flex items-center space-x-4">
              {[0, 3, 4, 4.5].map((rating) => (
                <Button
                  key={rating}
                  variant={
                    localFilters.rating === rating ? 'default' : 'outline'
                  }
                  onClick={() => setLocalFilters({ ...localFilters, rating })}
                  className="flex items-center gap-1"
                >
                  <Star className="h-4 w-4" />
                  {rating === 0 ? 'Any' : `${rating}+`}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={resetFilters}>
            Clear All
          </Button>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={applyFilters}
              className="bg-rose-500 hover:bg-rose-600"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
