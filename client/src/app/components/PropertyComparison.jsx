'use client';

import { useState } from 'react';
import {
  X,
  Star,
  MapPin,
  Wifi,
  Car,
  Waves,
  ChefHat,
  Users,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';
import { useNavigate } from 'react-router-dom';

export default function PropertyComparison({ properties, onClose }) {
  const [selectedProperties, setSelectedProperties] = useState(
    properties.slice(0, 3)
  );
  const navigate = useNavigate();

  const removeProperty = (propertyId) => {
    setSelectedProperties((prev) => prev.filter((p) => p.id !== propertyId));
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

  const handleViewProperty = (propertyId) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      navigate(`/property/${propertyId}`);
    } else {
      localStorage.setItem('returnUrl', `/property/${propertyId}`);
      navigate('/auth/login');
    }
  };

  if (selectedProperties.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              No Properties to Compare
            </h3>
            <p className="text-gray-600 mb-4">
              Add properties to your comparison list to see them here.
            </p>
            <Button onClick={onClose} className="bg-rose-500 hover:bg-rose-600">
              Close
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-2xl font-bold text-gray-900">
            Compare Properties
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="hover:bg-white/50"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Comparison Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            {/* Property Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {selectedProperties.map((property) => (
                <Card
                  key={property.id}
                  className="relative border-2 hover:shadow-lg transition-all"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
                    onClick={() => removeProperty(property.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="relative">
                    <img
                      src={property.images?.[0] || '/placeholder.svg'}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                      onError={(e) => {
                        e.target.src = '/placeholder.svg?height=192&width=400';
                      }}
                    />
                    <Badge className="absolute top-3 left-3 bg-white text-gray-800 shadow-lg">
                      ${property.price}/night
                    </Badge>
                    {property.featured && (
                      <Badge className="absolute top-3 right-12 bg-rose-500 text-white shadow-lg">
                        Featured
                      </Badge>
                    )}
                  </div>

                  <CardContent className="p-4 space-y-4">
                    {/* Basic Info */}
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="h-3 w-3 flex-shrink-0" />
                        <span className="truncate">{property.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{property.rating}</span>
                        <span className="text-sm text-gray-600">
                          ({property.reviews} reviews)
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Property Details */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Property Details</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {property.guests || 4} guests
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {property.bedrooms || 2} bedrooms
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Amenities */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Amenities</h4>
                      <div className="flex flex-wrap gap-1">
                        {property.amenities?.slice(0, 4).map((amenity) => (
                          <Badge
                            key={amenity}
                            variant="secondary"
                            className="text-xs flex items-center gap-1 bg-gray-100 hover:bg-gray-200"
                          >
                            {getAmenityIcon(amenity)}
                            {amenity}
                          </Badge>
                        ))}
                        {property.amenities?.length > 4 && (
                          <Badge variant="outline" className="text-xs">
                            +{property.amenities.length - 4} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Separator />

                    {/* Host Info */}
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Host</h4>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">
                            {property.host?.charAt(0) || 'H'}
                          </span>
                        </div>
                        <span className="text-sm">{property.host}</span>
                        {property.superhost && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-yellow-100 text-yellow-800"
                          >
                            Superhost
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                      onClick={() => handleViewProperty(property.id)}
                    >
                      View Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparison Table */}
            {selectedProperties.length > 1 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-500" />
                  Side-by-Side Comparison
                </h3>
                <div className="overflow-x-auto bg-white rounded-lg border">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-4 text-left font-semibold text-gray-900">
                          Feature
                        </th>
                        {selectedProperties.map((property) => (
                          <th
                            key={property.id}
                            className="border border-gray-200 p-4 text-left font-semibold text-gray-900 min-w-[200px]"
                          >
                            <div className="truncate">
                              {property.title.substring(0, 30)}...
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-4 font-medium bg-gray-50">
                          Price per night
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-4"
                          >
                            <span className="text-lg font-bold text-green-600">
                              ${property.price}
                            </span>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-4 font-medium bg-gray-50">
                          Rating
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-4"
                          >
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="font-medium">
                                {property.rating}
                              </span>
                              <span className="text-sm text-gray-500">
                                ({property.reviews} reviews)
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-4 font-medium bg-gray-50">
                          Location
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-4"
                          >
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-gray-400" />
                              <span className="text-sm">
                                {property.location}
                              </span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-4 font-medium bg-gray-50">
                          Capacity
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-4"
                          >
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-gray-400" />
                              <span>{property.guests || 4} guests</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-4 font-medium bg-gray-50">
                          Host
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-4"
                          >
                            <div className="flex items-center gap-2">
                              <span>{property.host}</span>
                              {property.superhost && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-yellow-100 text-yellow-800"
                                >
                                  Superhost
                                </Badge>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-200 p-4 font-medium bg-gray-50">
                          Key Amenities
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-4"
                          >
                            <div className="flex flex-wrap gap-1">
                              {property.amenities
                                ?.slice(0, 3)
                                .map((amenity) => (
                                  <Badge
                                    key={amenity}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {amenity}
                                  </Badge>
                                ))}
                              {property.amenities?.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{property.amenities.length - 3}
                                </Badge>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t bg-gray-50 p-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Comparing {selectedProperties.length}{' '}
              {selectedProperties.length === 1 ? 'property' : 'properties'}
            </p>
            <Button onClick={onClose} className="bg-rose-500 hover:bg-rose-600">
              Close Comparison
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
