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
  Menu,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Load user profile from localStorage or API
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      setUserProfile(JSON.parse(savedProfile));
    } else {
      // Set default profile for demo
      setUserProfile({
        name: 'Alex Johnson',
        email: 'alex@example.com',
        avatar: '/placeholder.svg?height=40&width=40',
        travelStyles: ['Luxury', 'Beach', 'Cultural'],
        budgetRange: [200, 500],
        notifications: {
          deals: true,
          trips: true,
          recommendations: false,
        },
      });
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
      <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Loading your personalized dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <h1
                className="text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent cursor-pointer"
                onClick={() => navigate('/')}
              >
                DewdropBnb
              </h1>
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hidden sm:flex"
              >
                <Zap className="h-3 w-3 mr-1" />
                AI Powered
              </Badge>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-rose-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src={userProfile.avatar || '/placeholder.svg'} />
                <AvatarFallback className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                  {userProfile.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={userProfile.avatar || '/placeholder.svg'}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                      {userProfile.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{userProfile.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon">
                    <Bell className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                  Welcome back, {userProfile.name || 'Traveler'}! ✨
                </h2>
                <p className="text-base sm:text-lg opacity-90">
                  Your next adventure awaits. Here's what we've found for you.
                </p>
              </div>
              <div className="w-full sm:w-auto">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center min-w-[120px]">
                  <div className="text-2xl sm:text-3xl font-bold">
                    {travelInsights.totalTrips}
                  </div>
                  <div className="text-sm opacity-80">Total Trips</div>
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
          {/* Mobile Tabs - Scrollable */}
          <div className="sm:hidden">
            <TabsList className="grid grid-cols-3 w-full h-auto p-1">
              <TabsTrigger
                value="overview"
                className="flex flex-col items-center gap-1 py-3 text-xs"
              >
                <BarChart3 className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="flex flex-col items-center gap-1 py-3 text-xs"
              >
                <Zap className="h-4 w-4" />
                AI Picks
              </TabsTrigger>
              <TabsTrigger
                value="trips"
                className="flex flex-col items-center gap-1 py-3 text-xs"
              >
                <Calendar className="h-4 w-4" />
                Trips
              </TabsTrigger>
            </TabsList>
            <div className="flex gap-2 mt-2">
              <TabsList className="grid grid-cols-3 w-full h-auto p-1">
                <TabsTrigger
                  value="wishlist"
                  className="flex flex-col items-center gap-1 py-3 text-xs"
                >
                  <Heart className="h-4 w-4" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger
                  value="insights"
                  className="flex flex-col items-center gap-1 py-3 text-xs"
                >
                  <TrendingUp className="h-4 w-4" />
                  Insights
                </TabsTrigger>
                <TabsTrigger
                  value="profile"
                  className="flex flex-col items-center gap-1 py-3 text-xs"
                >
                  <Settings className="h-4 w-4" />
                  Profile
                </TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden sm:block">
            <TabsList className="grid w-full grid-cols-6 h-12">
              <TabsTrigger value="overview" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                <span className="hidden lg:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger
                value="recommendations"
                className="flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                <span className="hidden lg:inline">AI Picks</span>
              </TabsTrigger>
              <TabsTrigger value="trips" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="hidden lg:inline">My Trips</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                <span className="hidden lg:inline">Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden lg:inline">Insights</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="hidden lg:inline">Profile</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        Countries Visited
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {travelInsights.countriesVisited}
                      </p>
                    </div>
                    <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        Average Rating
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {travelInsights.averageRating}
                      </p>
                    </div>
                    <Star className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        Total Saved
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                        ${travelInsights.totalSaved}
                      </p>
                    </div>
                    <Wallet className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-gray-600">
                        CO₂ Offset
                      </p>
                      <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                        {travelInsights.carbonOffset}kg
                      </p>
                    </div>
                    <Award className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Upcoming Trips */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Calendar className="h-5 w-5" />
                  Upcoming Trips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingTrips.map((trip) => (
                    <div
                      key={trip.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 border border-gray-200/50 rounded-xl bg-white/50 hover:bg-white/80 transition-all duration-300"
                    >
                      <img
                        src={trip.image || '/placeholder.svg'}
                        alt={trip.destination}
                        className="w-full sm:w-16 h-32 sm:h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 w-full">
                        <h3 className="font-semibold text-lg">
                          {trip.destination}
                        </h3>
                        <p className="text-sm text-gray-600">{trip.property}</p>
                        <p className="text-sm text-gray-500">{trip.dates}</p>
                      </div>
                      <Badge
                        variant={
                          trip.status === 'confirmed' ? 'default' : 'secondary'
                        }
                        className="self-start sm:self-center"
                      >
                        {trip.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personalized Deals */}
            <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <Target className="h-5 w-5" />
                  Personalized Deals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {personalizedDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-4 sm:p-6 border border-rose-200 rounded-xl bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 transition-all duration-300"
                    >
                      <h3 className="font-semibold text-rose-700 text-lg mb-2">
                        {deal.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {deal.description}
                      </p>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <span className="text-xs text-gray-500">
                          Valid until {deal.validUntil}
                        </span>
                        <Badge
                          variant="outline"
                          className="text-rose-600 border-rose-600 bg-white/80"
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  AI-Powered Recommendations
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Personalized picks based on your preferences and travel
                  history
                </p>
              </div>
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white/80"
              >
                <Filter className="h-4 w-4" />
                Refine
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {aiRecommendations.map((property) => (
                <Card
                  key={property.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={property.image || '/placeholder.svg'}
                      alt={property.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                      {property.matchScore}% Match
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold line-clamp-2 text-base">
                        {property.title}
                      </h3>
                      <div className="flex items-center gap-1 ml-2">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">
                          {property.rating}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                      {property.location}
                    </p>
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Why this matches you:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {property.reasons.slice(0, 2).map((reason, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-gray-100 text-gray-700"
                          >
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        ${property.price}/night
                      </span>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 border-0"
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                My Trips
              </h2>
              <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 border-0">
                Plan New Trip
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {upcomingTrips.map((trip) => (
                <Card
                  key={trip.id}
                  className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={trip.image || '/placeholder.svg'}
                      alt={trip.destination}
                      className="w-full h-32 sm:h-40 object-cover"
                    />
                    <Badge
                      className="absolute top-3 right-3 shadow-lg"
                      variant={
                        trip.status === 'confirmed' ? 'default' : 'secondary'
                      }
                    >
                      {trip.status}
                    </Badge>
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="font-semibold text-lg mb-1">
                      {trip.destination}
                    </h3>
                    <p className="text-gray-600 mb-2">{trip.property}</p>
                    <p className="text-sm text-gray-500 mb-4">{trip.dates}</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-white/80"
                      >
                        View Details
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 border-0"
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
            <div className="text-center py-12 sm:py-16">
              <div className="bg-white/50 backdrop-blur-sm rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Heart className="h-12 w-12 text-gray-300" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Your Wishlist is Empty
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Start saving properties you love to build your dream trip list
              </p>
              <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 border-0">
                Explore Properties
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Travel Insights
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Travel Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Beach Destinations
                        </span>
                        <span className="text-sm font-bold">40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">City Breaks</span>
                        <span className="text-sm font-bold">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">
                          Mountain Retreats
                        </span>
                        <span className="text-sm font-bold">25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Spending Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-medium">
                        Average per night
                      </span>
                      <span className="font-semibold text-lg">$285</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-sm font-medium">
                        Total saved this year
                      </span>
                      <span className="font-semibold text-lg text-green-600">
                        $1,240
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm font-medium">
                        Favorite price range
                      </span>
                      <span className="font-semibold text-lg">$200-$400</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              Profile Settings
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
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
                        <Badge
                          key={style}
                          variant="secondary"
                          className="bg-rose-100 text-rose-700"
                        >
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
                  <Button variant="outline" className="bg-white/80">
                    Update Preferences
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      value={userProfile.email || ''}
                      readOnly
                      className="bg-white/80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Notifications
                    </label>
                    <div className="space-y-3">
                      {Object.entries(userProfile.notifications || {}).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50/80"
                          >
                            <input
                              type="checkbox"
                              checked={value}
                              readOnly
                              className="rounded border-gray-300"
                            />
                            <span className="capitalize text-sm font-medium">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <Button variant="outline" className="bg-white/80">
                    Update Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
