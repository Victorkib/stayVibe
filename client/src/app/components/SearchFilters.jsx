'use client';

import { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  SlidersHorizontal,
  X,
  Filter,
  Star,
  Wifi,
  Car,
  Waves,
  Home,
  Building,
  TreePine,
  Coffee,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Slider } from '../../components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';
import { Calendar as CalendarComponent } from '../../components/ui/calendar';

export default function SearchFilters({ filters, setFilters }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilterCount, setActiveFilterCount] = useState(0);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Count active filters
  useEffect(() => {
    let count = 0;
    if (tempFilters.location) count++;
    if (tempFilters.checkIn) count++;
    if (tempFilters.checkOut) count++;
    if (tempFilters.guests > 1) count++;
    if (tempFilters.priceRange[0] > 0 || tempFilters.priceRange[1] < 1000)
      count++;
    if (tempFilters.propertyType !== 'all') count++;
    if (tempFilters.amenities.length > 0) count++;
    setActiveFilterCount(count);
  }, [tempFilters]);

  const propertyTypes = [
    { id: 'house', name: 'House', icon: Home },
    { id: 'apartment', name: 'Apartment', icon: Building },
    { id: 'villa', name: 'Villa', icon: Star },
    { id: 'cabin', name: 'Cabin', icon: TreePine },
    { id: 'loft', name: 'Loft', icon: Building },
    { id: 'townhouse', name: 'Townhouse', icon: Home },
  ];

  const amenities = [
    { id: 'wifi', name: 'WiFi', icon: Wifi },
    { id: 'kitchen', name: 'Kitchen', icon: Coffee },
    { id: 'parking', name: 'Parking', icon: Car },
    { id: 'pool', name: 'Pool', icon: Waves },
    { id: 'hot-tub', name: 'Hot Tub', icon: Waves },
    { id: 'gym', name: 'Gym', icon: Star },
    { id: 'pet-friendly', name: 'Pet Friendly', icon: Star },
    { id: 'ac', name: 'Air Conditioning', icon: Star },
  ];

  const applyFilters = () => {
    setFilters(tempFilters);
    if (isMobile) {
      setShowAdvanced(false);
    }
  };

  const clearFilters = () => {
    const clearedFilters = {
      location: '',
      checkIn: null,
      checkOut: null,
      guests: 1,
      priceRange: [0, 1000],
      propertyType: 'all',
      amenities: [],
    };
    setTempFilters(clearedFilters);
    setFilters(clearedFilters);
  };

  const formatDate = (date) => {
    if (!date) return null;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const toggleAmenity = (amenityId) => {
    const newAmenities = tempFilters.amenities.includes(amenityId)
      ? tempFilters.amenities.filter((a) => a !== amenityId)
      : [...tempFilters.amenities, amenityId];
    setTempFilters({
      ...tempFilters,
      amenities: newAmenities,
    });
  };

  return (
    <div className="sticky top-16 z-40 bg-white/95 backdrop-blur-md border-b shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Mobile Search Bar */}
        {isMobile ? (
          <div className="space-y-3">
            {/* Compact Search Input */}
            <Card className="shadow-lg border-2 hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-white to-gray-50">
              <CardContent className="p-3">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-rose-500" />
                  <Input
                    placeholder="Where are you going?"
                    value={tempFilters.location}
                    onChange={(e) =>
                      setTempFilters({
                        ...tempFilters,
                        location: e.target.value,
                      })
                    }
                    className="pl-10 pr-4 py-3 border-0 focus:ring-2 focus:ring-rose-500 text-base bg-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Mobile Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {/* Dates Button */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-shrink-0 bg-white hover:bg-gray-50 border-2 px-4 py-2 rounded-full"
                  >
                    <Calendar className="mr-2 h-4 w-4 text-rose-500" />
                    <span className="text-sm">
                      {tempFilters.checkIn && tempFilters.checkOut
                        ? `${formatDate(tempFilters.checkIn)} - ${formatDate(
                            tempFilters.checkOut
                          )}`
                        : 'Dates'}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <div className="p-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Check-in
                      </label>
                      <CalendarComponent
                        mode="single"
                        selected={tempFilters.checkIn}
                        onSelect={(date) =>
                          setTempFilters({ ...tempFilters, checkIn: date })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Check-out
                      </label>
                      <CalendarComponent
                        mode="single"
                        selected={tempFilters.checkOut}
                        onSelect={(date) =>
                          setTempFilters({ ...tempFilters, checkOut: date })
                        }
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Guests Button */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex-shrink-0 bg-white hover:bg-gray-50 border-2 px-4 py-2 rounded-full"
                  >
                    <Users className="mr-2 h-4 w-4 text-rose-500" />
                    <span className="text-sm">
                      {tempFilters.guests} guest
                      {tempFilters.guests !== 1 ? 's' : ''}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Guests</span>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            setTempFilters({
                              ...tempFilters,
                              guests: Math.max(1, tempFilters.guests - 1),
                            })
                          }
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {tempFilters.guests}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-full"
                          onClick={() =>
                            setTempFilters({
                              ...tempFilters,
                              guests: tempFilters.guests + 1,
                            })
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>

              {/* Filters Button */}
              <Button
                variant="outline"
                className="flex-shrink-0 bg-white hover:bg-gray-50 border-2 px-4 py-2 rounded-full relative"
                onClick={() => setShowAdvanced(!showAdvanced)}
              >
                <Filter className="mr-2 h-4 w-4 text-rose-500" />
                <span className="text-sm">Filters</span>
                {activeFilterCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-rose-500 text-white text-xs">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Mobile Search Button */}
            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white py-3 rounded-xl shadow-lg"
              onClick={applyFilters}
            >
              <Search className="h-5 w-5 mr-2" />
              Search Properties
            </Button>
          </div>
        ) : (
          /* Desktop Search Bar */
          <Card className="shadow-xl border-2 hover:shadow-2xl transition-all duration-300 bg-gradient-to-r from-white via-gray-50 to-white">
            <CardContent className="p-2">
              <div className="flex items-center gap-1">
                {/* Location */}
                <div className="flex-1 min-w-0 group">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-rose-500 group-hover:text-rose-600 transition-colors" />
                    <Input
                      placeholder="Where are you going?"
                      value={tempFilters.location}
                      onChange={(e) =>
                        setTempFilters({
                          ...tempFilters,
                          location: e.target.value,
                        })
                      }
                      className="pl-12 pr-4 py-4 border-0 focus:ring-2 focus:ring-rose-500 text-base bg-transparent hover:bg-gray-50/50 transition-colors rounded-xl"
                    />
                  </div>
                </div>

                <div className="w-px h-12 bg-gray-200" />

                {/* Check-in */}
                <div className="flex-1 min-w-0">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left font-normal py-4 px-4 hover:bg-gray-50/50 rounded-xl transition-colors"
                      >
                        <Calendar className="mr-3 h-5 w-5 text-rose-500" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                            Check in
                          </span>
                          <span className="text-sm font-medium">
                            {tempFilters.checkIn
                              ? formatDate(tempFilters.checkIn)
                              : 'Add dates'}
                          </span>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={tempFilters.checkIn}
                        onSelect={(date) =>
                          setTempFilters({ ...tempFilters, checkIn: date })
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="w-px h-12 bg-gray-200" />

                {/* Check-out */}
                <div className="flex-1 min-w-0">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left font-normal py-4 px-4 hover:bg-gray-50/50 rounded-xl transition-colors"
                      >
                        <Calendar className="mr-3 h-5 w-5 text-rose-500" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                            Check out
                          </span>
                          <span className="text-sm font-medium">
                            {tempFilters.checkOut
                              ? formatDate(tempFilters.checkOut)
                              : 'Add dates'}
                          </span>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={tempFilters.checkOut}
                        onSelect={(date) =>
                          setTempFilters({ ...tempFilters, checkOut: date })
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="w-px h-12 bg-gray-200" />

                {/* Guests */}
                <div className="flex-1 min-w-0">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left font-normal py-4 px-4 hover:bg-gray-50/50 rounded-xl transition-colors"
                      >
                        <Users className="mr-3 h-5 w-5 text-rose-500" />
                        <div className="flex flex-col">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">
                            Who
                          </span>
                          <span className="text-sm font-medium">
                            {tempFilters.guests} guest
                            {tempFilters.guests !== 1 ? 's' : ''}
                          </span>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold">Guests</span>
                            <p className="text-sm text-gray-500">
                              Ages 13 or above
                            </p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 rounded-full border-2"
                              onClick={() =>
                                setTempFilters({
                                  ...tempFilters,
                                  guests: Math.max(1, tempFilters.guests - 1),
                                })
                              }
                            >
                              -
                            </Button>
                            <span className="w-8 text-center font-semibold">
                              {tempFilters.guests}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 rounded-full border-2"
                              onClick={() =>
                                setTempFilters({
                                  ...tempFilters,
                                  guests: tempFilters.guests + 1,
                                })
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Search Button */}
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ml-2"
                  onClick={applyFilters}
                >
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>

                {/* Advanced Filters Toggle */}
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="px-4 py-4 rounded-xl border-2 hover:bg-gray-50 transition-colors relative ml-2"
                >
                  <SlidersHorizontal className="h-5 w-5 text-rose-500" />
                  {activeFilterCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-rose-500 text-white text-xs">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Advanced Filters Panel */}
        {showAdvanced && (
          <Card className="mt-4 shadow-xl border-2 bg-gradient-to-br from-white to-gray-50 animate-in slide-in-from-top-2 duration-300">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Advanced Filters
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Refine your search to find the perfect stay
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(false)}
                  className="rounded-full hover:bg-gray-100"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-8">
                {/* Price Range */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="text-base font-semibold text-gray-900">
                      Price Range
                    </label>
                    <span className="text-sm font-medium text-rose-600 bg-rose-50 px-3 py-1 rounded-full">
                      ${tempFilters.priceRange[0]} - $
                      {tempFilters.priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    value={tempFilters.priceRange}
                    onValueChange={(value) =>
                      setTempFilters({ ...tempFilters, priceRange: value })
                    }
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>$0</span>
                    <span>$1000+</span>
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-4">
                    Property Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
                    <Button
                      variant={
                        tempFilters.propertyType === 'all'
                          ? 'default'
                          : 'outline'
                      }
                      className={`h-auto p-4 flex flex-col items-center space-y-2 rounded-xl transition-all duration-200 ${
                        tempFilters.propertyType === 'all'
                          ? 'bg-rose-500 text-white shadow-lg'
                          : 'hover:bg-gray-50 border-2'
                      }`}
                      onClick={() =>
                        setTempFilters({ ...tempFilters, propertyType: 'all' })
                      }
                    >
                      <Star className="h-6 w-6" />
                      <span className="text-sm font-medium">All</span>
                    </Button>
                    {propertyTypes.map((type) => {
                      const IconComponent = type.icon;
                      return (
                        <Button
                          key={type.id}
                          variant={
                            tempFilters.propertyType === type.id
                              ? 'default'
                              : 'outline'
                          }
                          className={`h-auto p-4 flex flex-col items-center space-y-2 rounded-xl transition-all duration-200 ${
                            tempFilters.propertyType === type.id
                              ? 'bg-rose-500 text-white shadow-lg'
                              : 'hover:bg-gray-50 border-2'
                          }`}
                          onClick={() =>
                            setTempFilters({
                              ...tempFilters,
                              propertyType: type.id,
                            })
                          }
                        >
                          <IconComponent className="h-6 w-6" />
                          <span className="text-sm font-medium">
                            {type.name}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-4">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {amenities.map((amenity) => {
                      const IconComponent = amenity.icon;
                      const isSelected = tempFilters.amenities.includes(
                        amenity.id
                      );
                      return (
                        <Button
                          key={amenity.id}
                          variant={isSelected ? 'default' : 'outline'}
                          className={`h-auto p-4 flex items-center space-x-3 rounded-xl transition-all duration-200 ${
                            isSelected
                              ? 'bg-rose-500 text-white shadow-lg'
                              : 'hover:bg-gray-50 border-2 justify-start'
                          }`}
                          onClick={() => toggleAmenity(amenity.id)}
                        >
                          <IconComponent className="h-5 w-5 flex-shrink-0" />
                          <span className="text-sm font-medium">
                            {amenity.name}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t">
                <div className="text-sm text-gray-600">
                  {activeFilterCount > 0 && (
                    <span>
                      {activeFilterCount} filter
                      {activeFilterCount !== 1 ? 's' : ''} applied
                    </span>
                  )}
                </div>
                <div className="flex space-x-4 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="flex-1 sm:flex-none px-6 py-2 rounded-xl border-2 hover:bg-gray-50"
                  >
                    Clear All
                  </Button>
                  <Button
                    onClick={applyFilters}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 px-8 py-2 rounded-xl shadow-lg"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
