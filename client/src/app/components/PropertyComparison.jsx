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
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Separator } from '../../components/ui/separator';

export default function PropertyComparison({ properties, onClose }) {
  const [selectedProperties, setSelectedProperties] = useState(
    properties.slice(0, 3)
  );

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

  if (selectedProperties.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">
              No Properties to Compare
            </h3>
            <p className="text-gray-600 mb-4">
              Add properties to your comparison list to see them here.
            </p>
            <Button onClick={onClose}>Close</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold">Compare Properties</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Comparison Content */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedProperties.map((property) => (
                <Card key={property.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => removeProperty(property.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <div className="relative">
                    <img
                      src={property.images?.[0] || '/placeholder.svg'}
                      alt={property.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <Badge className="absolute top-3 left-3 bg-white text-gray-800">
                      ${property.price}/night
                    </Badge>
                  </div>

                  <CardContent className="p-4 space-y-4">
                    {/* Basic Info */}
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-2 mb-2">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="h-3 w-3" />
                        {property.location}
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
                            className="text-xs flex items-center gap-1"
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
                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                        <span className="text-sm">{property.host}</span>
                        {property.superhost && (
                          <Badge variant="secondary" className="text-xs">
                            Superhost
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <Button className="w-full bg-rose-500 hover:bg-rose-600">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Comparison Table */}
            {selectedProperties.length > 1 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">
                  Side-by-Side Comparison
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 p-3 text-left font-medium">
                          Feature
                        </th>
                        {selectedProperties.map((property) => (
                          <th
                            key={property.id}
                            className="border border-gray-200 p-3 text-left font-medium"
                          >
                            {property.title.substring(0, 30)}...
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-200 p-3 font-medium">
                          Price per night
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-3"
                          >
                            ${property.price}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3 font-medium">
                          Rating
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-3"
                          >
                            ⭐ {property.rating} ({property.reviews} reviews)
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3 font-medium">
                          Location
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-3"
                          >
                            {property.location}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3 font-medium">
                          Capacity
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-3"
                          >
                            {property.guests || 4} guests
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="border border-gray-200 p-3 font-medium">
                          Host
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-3"
                          >
                            {property.host}
                            {property.superhost && (
                              <Badge
                                variant="secondary"
                                className="ml-2 text-xs"
                              >
                                Superhost
                              </Badge>
                            )}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-200 p-3 font-medium">
                          Key Amenities
                        </td>
                        {selectedProperties.map((property) => (
                          <td
                            key={property.id}
                            className="border border-gray-200 p-3"
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
      </div>
    </div>
  );
}
