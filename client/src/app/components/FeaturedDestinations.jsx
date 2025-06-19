'use client';

import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';

const destinations = [
  {
    id: 1,
    name: 'Paris, France',
    properties: 1200,
    image: '/placeholder.svg?height=400&width=600',
    description: 'City of Light',
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    properties: 890,
    image: '/placeholder.svg?height=400&width=600',
    description: 'Modern Metropolis',
  },
  {
    id: 3,
    name: 'New York, USA',
    properties: 2100,
    image: '/placeholder.svg?height=400&width=600',
    description: 'The Big Apple',
  },
  {
    id: 4,
    name: 'London, UK',
    properties: 1500,
    image: '/placeholder.svg?height=400&width=600',
    description: 'Historic Capital',
  },
  {
    id: 5,
    name: 'Bali, Indonesia',
    properties: 650,
    image: '/placeholder.svg?height=400&width=600',
    description: 'Tropical Paradise',
  },
  {
    id: 6,
    name: 'Dubai, UAE',
    properties: 780,
    image: '/placeholder.svg?height=400&width=600',
    description: 'Desert Oasis',
  },
];

export default function FeaturedDestinations() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover amazing places around the world with unique stays and
            experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative">
                <img
                  src={destination.image || '/placeholder.svg'}
                  alt={destination.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    {destination.name}
                  </h3>
                  <p className="text-sm opacity-90">
                    {destination.description}
                  </p>
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                  <span className="text-sm font-semibold text-gray-800">
                    {destination.properties}+ stays
                  </span>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {destination.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {destination.properties} properties available
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="group-hover:bg-rose-50 group-hover:text-rose-600"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            View All Destinations
          </Button>
        </div>
      </div>
    </section>
  );
}
