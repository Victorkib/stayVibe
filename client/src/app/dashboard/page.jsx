'use client';

import { useState, useEffect } from 'react';
import {
  Bell,
  Calendar,
  Heart,
  MapPin,
  Settings,
  Star,
  TrendingUp,
  Zap,
  Filter,
  BarChart3,
  Globe,
  Wallet,
  MessageCircle,
  Award,
  Target,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Input } from '../../components/ui/input';

export default function DashboardPage() {
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Load user profile from localStorage or API
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    }
  }, []);

  const aiRecommendations = [
    {
      id: 1,
      title: 'Luxury Beach Villa in Santorini',
      location: 'Santorini, Greece',
      price: 380,
      rating: 4.9,
      image: '/placeholder.svg?height=200&width=300',
      matchScore: 95,
      reasons: [
        'Matches your luxury travel style',
        'Beach access preference',
        'Perfect for couples',
      ],
    },
    {
      id: 2,
      title: 'Modern Loft in Tokyo',
      location: 'Shibuya, Tokyo',
      price: 220,
      rating: 4.8,
      image: '/placeholder.svg?height=200&width=300',
      matchScore: 88,
      reasons: [
        'Cultural exploration focus',
        'City center location',
        'High-speed WiFi',
      ],
    },
    {
      id: 3,
      title: 'Cozy Cabin in Swiss Alps',
      location: 'Zermatt, Switzerland',
      price: 450,
      rating: 4.9,
      image: '/placeholder.svg?height=200&width=300',
      matchScore: 92,
      reasons: ['Adventure seeker style', 'Mountain views', 'Romantic setting'],
    },
  ];

  const upcomingTrips = [
    {
      id: 1,
      destination: 'Paris, France',
      dates: 'Dec 15-22, 2024',
      property: 'Charming Apartment in Montmartre',
      status: 'confirmed',
      image: '/placeholder.svg?height=100&width=150',
    },
    {
      id: 2,
      destination: 'Tokyo, Japan',
      dates: 'Jan 10-17, 2025',
      property: 'Modern Studio in Shibuya',
      status: 'pending',
      image: '/placeholder.svg?height=100&width=150',
    },
  ];

  const travelInsights = {
    totalTrips: 12,
    countriesVisited: 8,
    favoriteDestination: 'Paris, France',
    averageRating: 4.7,
    totalSaved: 2340,
    carbonOffset: 145,
  };

  const personalizedDeals = [
    {
      id: 1,
      title: '25% off Beach Properties',
      description: 'Perfect for your upcoming summer plans',
      validUntil: 'Dec 31, 2024',
      code: 'BEACH25',
    },
    {
      id: 2,
      title: 'Free Breakfast Upgrade',
      description: 'At luxury properties in Europe',
      validUntil: 'Jan 15, 2025',
      code: 'BREAKFAST',
    },
  ];

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p>Loading your personalized dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-rose-500">StayVibe</h1>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
              >
                <Zap className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Avatar>
                <AvatarImage src={userProfile.avatar || '/placeholder.svg'} />
                <AvatarFallback>
                  {userProfile.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, {userProfile.name || 'Traveler'}! ✨
                </h2>
                <p className="text-lg opacity-90">
                  Your next adventure awaits. Here's what we've found for you.
                </p>
              </div>
              <div className="hidden md:block">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {travelInsights.totalTrips}
                    </div>
                    <div className="text-sm opacity-80">Total Trips</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              AI Picks
            </TabsTrigger>
            <TabsTrigger value="trips" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              My Trips
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="insights" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Insights
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Countries Visited
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {travelInsights.countriesVisited}
                      </p>
                    </div>
                    <Globe className="h-8 w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Average Rating
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {travelInsights.averageRating}
                      </p>
                    </div>
                    <Star className="h-8 w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Total Saved
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        ${travelInsights.totalSaved}
                      </p>
                    </div>
                    <Wallet className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        CO₂ Offset
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {travelInsights.carbonOffset}kg
                      </p>
                    </div>
                    <Award className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Trips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex items-center space-x-4 p-4 border rounded-lg"
                    >
                      <img
                        src={trip.image || '/placeholder.svg'}
                        alt={trip.destination}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{trip.destination}</h3>
                        <p className="text-sm text-gray-600">{trip.property}</p>
                        <p className="text-sm text-gray-500">{trip.dates}</p>
                      </div>
                      <Badge
                        variant={
                          trip.status === 'confirmed' ? 'default' : 'secondary'
                        }
                      >
                        {trip.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personalized Deals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Personalized Deals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalizedDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-4 border rounded-lg bg-gradient-to-r from-rose-50 to-pink-50"
                    >
                      <h3 className="font-semibold text-rose-700">
                        {deal.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {deal.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">
                          Valid until {deal.validUntil}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-rose-600 border-rose-600"
                        >
                          {deal.code}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  AI-Powered Recommendations
                </h2>
                <p className="text-gray-600">
                  Personalized picks based on your preferences and travel
                  history
                </p>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Refine
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {aiRecommendations.map((property) => (
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={property.image || '/placeholder.svg'}
                      alt={property.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {property.matchScore}% Match
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold line-clamp-2">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{property.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {property.location}
                    </p>
                    <div className="mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Why this matches you:
                      </p>
                      <div className="space-y-1">
                        {property.reasons.slice(0, 2).map((reason, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs mr-1"
                          >
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">
                        ${property.price}/night
                      </span>
                      <Button
                        size="sm"
                        className="bg-rose-500 hover:bg-rose-600"
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trips" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">My Trips</h2>
              <Button className="bg-rose-500 hover:bg-rose-600">
                Plan New Trip
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingTrips.map((trip) => (
                <Card key={trip.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={trip.image || '/placeholder.svg'}
                      alt={trip.destination}
                      className="w-full h-32 object-cover"
                    />
                    <Badge
                      className="absolute top-3 right-3"
                      variant={
                        trip.status === 'confirmed' ? 'default' : 'secondary'
                      }
                    >
                      {trip.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg mb-1">
                      {trip.destination}
                    </h3>
                    <p className="text-gray-600 mb-2">{trip.property}</p>
                    <p className="text-sm text-gray-500 mb-4">{trip.dates}</p>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-rose-500 hover:bg-rose-600"
                      >
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your Wishlist is Empty
              </h3>
              <p className="text-gray-600 mb-6">
                Start saving properties you love to build your dream trip list
              </p>
              <Button className="bg-rose-500 hover:bg-rose-600">
                Explore Properties
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Travel Insights
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Beach Destinations</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>City Breaks</span>
                        <span>35%</span>
                      </div>
                      <Progress value={35} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span>Mountain Retreats</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Spending Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Average per night</span>
                      <span className="font-semibold">$285</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total saved this year</span>
                      <span className="font-semibold text-green-600">
                        $1,240
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Favorite price range</span>
                      <span className="font-semibold">$200-$400</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Profile Settings
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Travel Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Travel Styles
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {userProfile.travelStyles?.map((style) => (
                        <Badge key={style} variant="secondary">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <p className="text-gray-600">
                      ${userProfile.budgetRange?.[0]} - $
                      {userProfile.budgetRange?.[1]} per night
                    </p>
                  </div>
                  <Button variant="outline">Update Preferences</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input value={userProfile.email || ''} readOnly />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Notifications
                    </label>
                    <div className="space-y-2">
                      {Object.entries(userProfile.notifications || {}).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center space-x-2"
                          >
                            <input type="checkbox" checked={value} readOnly />
                            <span className="capitalize text-sm">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <Button variant="outline">Update Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
