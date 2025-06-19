'use client';

import { Home, DollarSign, Shield, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';

const benefits = [
  {
    icon: <DollarSign className="h-8 w-8 text-green-500" />,
    title: 'Earn Extra Income',
    description:
      'Make money by sharing your space with travelers from around the world',
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: 'Host Protection',
    description:
      'Comprehensive insurance coverage and 24/7 support for peace of mind',
  },
  {
    icon: <Users className="h-8 w-8 text-purple-500" />,
    title: 'Meet New People',
    description: 'Connect with interesting guests and share local experiences',
  },
  {
    icon: <Home className="h-8 w-8 text-rose-500" />,
    title: 'Easy Management',
    description:
      'Simple tools to manage bookings, communicate with guests, and track earnings',
  },
];

export default function HostSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Become a Host and Start Earning
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join millions of hosts who are earning extra income by sharing
              their homes with travelers. It's easy to get started and we're
              here to help every step of the way.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">{benefit.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-rose-500 hover:bg-rose-600 text-white px-8"
              >
                Start Hosting Today
              </Button>
              <Button size="lg" variant="outline" className="px-8">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <img
              src="/placeholder.svg?height=600&width=500"
              alt="Happy host"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />

            {/* Floating Cards */}
            <Card className="absolute -top-4 -left-4 bg-white shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">$2,340</p>
                    <p className="text-sm text-gray-600">This month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="absolute -bottom-4 -right-4 bg-white shadow-lg">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">4.9 ★</p>
                    <p className="text-sm text-gray-600">Host rating</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
