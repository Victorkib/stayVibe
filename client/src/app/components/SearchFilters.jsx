'use client';

import { useState } from 'react';
import {
  Search,
  MapPin,
  Calendar,
  Users,
  SlidersHorizontal,
  X,
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

  const propertyTypes = [
    'House',
    'Apartment',
    'Villa',
    'Cabin',
    'Loft',
    'Townhouse',
  ];

  const amenities = [
    'WiFi',
    'Kitchen',
    'Parking',
    'Pool',
    'Hot Tub',
    'Gym',
    'Pet Friendly',
    'Air Conditioning',
  ];

  const applyFilters = () => {
    setFilters(tempFilters);
    setShowAdvanced(false);
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

  return (
    <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Main Search Bar */}
        <Card className="shadow-lg border-2 hover:shadow-xl transition-shadow">
          <CardContent className="p-2">
            <div className="flex flex-col lg:flex-row lg:items-center gap-2">
              {/* Location */}
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Where are you going?"
                    value={tempFilters.location}
                    onChange={(e) =>
                      setTempFilters({
                        ...tempFilters,
                        location: e.target.value,
                      })
                    }
                    className="pl-10 border-0 focus:ring-0 text-lg"
                  />
                </div>
              </div>

              <div className="hidden lg:block w-px h-8 bg-gray-300" />

              {/* Check-in */}
              <div className="flex-1 min-w-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                      {tempFilters.checkIn
                        ? tempFilters.checkIn.toDateString()
                        : 'Check in'}
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

              <div className="hidden lg:block w-px h-8 bg-gray-300" />

              {/* Check-out */}
              <div className="flex-1 min-w-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Calendar className="mr-2 h-5 w-5 text-gray-400" />
                      {tempFilters.checkOut
                        ? tempFilters.checkOut.toDateString()
                        : 'Check out'}
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

              <div className="hidden lg:block w-px h-8 bg-gray-300" />

              {/* Guests */}
              <div className="flex-1 min-w-0">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Users className="mr-2 h-5 w-5 text-gray-400" />
                      {tempFilters.guests} guest
                      {tempFilters.guests !== 1 ? 's' : ''}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Guests</span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              setTempFilters({
                                ...tempFilters,
                                guests: Math.max(1, tempFilters.guests - 1),
                              })
                            }
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">
                            {tempFilters.guests}
                          </span>
                          <Button
                            variant="outline"
                            size="sm"
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
                className="bg-rose-500 hover:bg-rose-600 text-white px-8"
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
                className="px-4"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Filters */}
        {showAdvanced && (
          <Card className="mt-4 shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Advanced Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvanced(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price Range: ${tempFilters.priceRange[0]} - $
                    {tempFilters.priceRange[1]}
                  </label>
                  <Slider
                    value={tempFilters.priceRange}
                    onValueChange={(value) =>
                      setTempFilters({ ...tempFilters, priceRange: value })
                    }
                    max={1000}
                    step={10}
                    className="w-full"
                  />
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Property Type
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant={
                        tempFilters.propertyType === 'all'
                          ? 'default'
                          : 'outline'
                      }
                      className="cursor-pointer"
                      onClick={() =>
                        setTempFilters({ ...tempFilters, propertyType: 'all' })
                      }
                    >
                      All
                    </Badge>
                    {propertyTypes.map((type) => (
                      <Badge
                        key={type}
                        variant={
                          tempFilters.propertyType === type
                            ? 'default'
                            : 'outline'
                        }
                        className="cursor-pointer"
                        onClick={() =>
                          setTempFilters({ ...tempFilters, propertyType: type })
                        }
                      >
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Amenities
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((amenity) => (
                      <Badge
                        key={amenity}
                        variant={
                          tempFilters.amenities.includes(amenity)
                            ? 'default'
                            : 'outline'
                        }
                        className="cursor-pointer"
                        onClick={() => {
                          const newAmenities = tempFilters.amenities.includes(
                            amenity
                          )
                            ? tempFilters.amenities.filter((a) => a !== amenity)
                            : [...tempFilters.amenities, amenity];
                          setTempFilters({
                            ...tempFilters,
                            amenities: newAmenities,
                          });
                        }}
                      >
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6">
                <Button variant="outline" onClick={clearFilters}>
                  Clear All
                </Button>
                <Button
                  onClick={applyFilters}
                  className="bg-rose-500 hover:bg-rose-600"
                >
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
