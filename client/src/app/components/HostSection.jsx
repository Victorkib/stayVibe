'use client';

import { useState } from 'react';
import {
  Star,
  Home,
  DollarSign,
  Shield,
  ArrowRight,
  Users,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { mockHostBenefits, getFeaturedHostStories } from '../../data/mockData';

export default function HostSection() {
  const [activeStory, setActiveStory] = useState(0);

  // Get data from centralized mock data
  const hostBenefits = mockHostBenefits;
  const hostStories = getFeaturedHostStories();

  return (
    <section className="py-16 bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Home className="h-4 w-4" />
            Become a Host
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Turn Your Space Into Income
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join millions of hosts earning extra income by sharing their homes
            with travelers from around the world. It's easier than you think to
            get started.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Home className="h-5 w-5 mr-2" />
            Start Hosting Today
          </Button>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {hostBenefits.map((benefit, index) => {
            // Map icon strings to actual icon components
            const iconMap = {
              DollarSign,
              Shield,
              Users,
              Calendar,
            };
            const IconComponent = iconMap[benefit.icon] || DollarSign;

            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 bg-white"
              >
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full mb-4 group-hover:from-rose-200 group-hover:to-pink-200 transition-all duration-300">
                    <IconComponent className="h-8 w-8 text-rose-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {benefit.description}
                  </p>
                  <Badge className="bg-rose-50 text-rose-600 border-rose-200 font-semibold">
                    {benefit.stat}
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Host Stories Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Real Stories from Real Hosts
            </h3>
            <p className="text-gray-600">
              Discover how hosting has transformed the lives of people just like
              you
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {hostStories.map((story, index) => (
              <Card
                key={story.id}
                className={`cursor-pointer transition-all duration-300 border-2 ${
                  activeStory === index
                    ? 'border-rose-500 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-rose-300 hover:shadow-md'
                }`}
                onClick={() => setActiveStory(index)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={story.image || '/placeholder.svg'}
                      alt={story.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                      onError={(e) => {
                        e.target.src = '/placeholder.svg?height=64&width=64';
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {story.name}
                      </h4>
                      <p className="text-sm text-gray-600">{story.location}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">
                          {story.rating}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">
                          {story.properties}{' '}
                          {story.properties === 1 ? 'property' : 'properties'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <blockquote className="text-gray-700 italic mb-4">
                    "{story.story}"
                  </blockquote>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-green-50 text-green-600 border-green-200">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {story.earnings}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-rose-600 hover:text-rose-700"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Getting Started Steps */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
            Getting Started is Easy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                List Your Space
              </h4>
              <p className="text-gray-600">
                Create your listing with photos and details about your property
                in just a few minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Welcome Guests
              </h4>
              <p className="text-gray-600">
                Set your availability, pricing, and house rules. We'll handle
                the bookings and payments.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Start Earning
              </h4>
              <p className="text-gray-600">
                Get paid 24 hours after your guests check in. It's that simple
                to start earning extra income.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Start Your Hosting Journey?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Join our community of hosts and start earning money from your space
            today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-rose-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold"
            >
              Calculate Your Earnings
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-rose-600 px-8 py-3 rounded-xl font-semibold"
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
