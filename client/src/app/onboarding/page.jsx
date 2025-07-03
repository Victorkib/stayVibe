'use client';

import { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Heart,
  Sparkles,
  Globe,
  Zap,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import { Badge } from '../../components/ui/badge';
import { Progress } from '../../components/ui/progress';
import { useNavigate } from 'react-router-dom';

const onboardingSteps = [
  { id: 1, title: 'Welcome', description: "Let's personalize your experience" },
  { id: 2, title: 'Travel Style', description: 'How do you like to travel?' },
  { id: 3, title: 'Preferences', description: 'What matters most to you?' },
  {
    id: 4,
    title: 'Budget & Dates',
    description: 'Your travel planning details',
  },
  { id: 5, title: 'Destinations', description: 'Where do you dream of going?' },
  {
    id: 6,
    title: 'AI Insights',
    description: 'Let AI enhance your experience',
  },
];

const travelStyles = [
  {
    id: 'luxury',
    name: 'Luxury Traveler',
    icon: '✨',
    description: 'Premium experiences and high-end accommodations',
  },
  {
    id: 'adventure',
    name: 'Adventure Seeker',
    icon: '🏔️',
    description: 'Outdoor activities and unique experiences',
  },
  {
    id: 'cultural',
    name: 'Culture Explorer',
    icon: '🏛️',
    description: 'Museums, history, and local traditions',
  },
  {
    id: 'relaxation',
    name: 'Relaxation Focused',
    icon: '🧘',
    description: 'Peaceful retreats and wellness experiences',
  },
  {
    id: 'family',
    name: 'Family Traveler',
    icon: '👨‍👩‍👧‍👦',
    description: 'Family-friendly activities and accommodations',
  },
  {
    id: 'business',
    name: 'Business Traveler',
    icon: '💼',
    description: 'Work-friendly spaces and convenient locations',
  },
  {
    id: 'romantic',
    name: 'Romantic Getaway',
    icon: '💕',
    description: 'Intimate settings for couples',
  },
  {
    id: 'social',
    name: 'Social Butterfly',
    icon: '🎉',
    description: 'Meeting people and vibrant nightlife',
  },
];

const preferences = [
  { id: 'wifi', name: 'High-Speed WiFi', icon: '📶', category: 'tech' },
  { id: 'kitchen', name: 'Full Kitchen', icon: '🍳', category: 'amenities' },
  { id: 'pool', name: 'Swimming Pool', icon: '🏊', category: 'amenities' },
  { id: 'gym', name: 'Fitness Center', icon: '💪', category: 'amenities' },
  { id: 'parking', name: 'Free Parking', icon: '🚗', category: 'practical' },
  {
    id: 'petFriendly',
    name: 'Pet Friendly',
    icon: '🐕',
    category: 'practical',
  },
  {
    id: 'airConditioning',
    name: 'Air Conditioning',
    icon: '❄️',
    category: 'comfort',
  },
  { id: 'heating', name: 'Heating', icon: '🔥', category: 'comfort' },
  {
    id: 'workspace',
    name: 'Dedicated Workspace',
    icon: '💻',
    category: 'tech',
  },
  { id: 'hotTub', name: 'Hot Tub', icon: '🛁', category: 'luxury' },
  { id: 'beachAccess', name: 'Beach Access', icon: '🏖️', category: 'location' },
  { id: 'cityCenter', name: 'City Center', icon: '🏙️', category: 'location' },
];

const dreamDestinations = [
  {
    id: 'paris',
    name: 'Paris, France',
    image: '/placeholder.svg?height=200&width=300',
    continent: 'Europe',
  },
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    image: '/placeholder.svg?height=200&width=300',
    continent: 'Asia',
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    image: '/placeholder.svg?height=200&width=300',
    continent: 'Asia',
  },
  {
    id: 'nyc',
    name: 'New York, USA',
    image: '/placeholder.svg?height=200&width=300',
    continent: 'North America',
  },
  {
    id: 'london',
    name: 'London, UK',
    image: '/placeholder.svg?height=200&width=300',
    continent: 'Europe',
  },
  {
    id: 'dubai',
    name: 'Dubai, UAE',
    image: '/placeholder.svg?height=200&width=300',
    continent: 'Asia',
  },
  {
    id: 'sydney',
    name: 'Sydney, Australia',
    image: '/placeholder.svg?height=200&width=300',
    continent: 'Oceania',
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro, Brazil',
    image: '/placeholder.svg?height=200&width=300',
    continent: 'South America',
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userProfile, setUserProfile] = useState({
    name: '',
    email: '',
    avatar: '',
    travelStyles: [],
    preferences: [],
    budgetRange: [100, 500],
    preferredTripLength: [3, 7],
    dreamDestinations: [],
    travelFrequency: 'occasional',
    groupSize: 2,
    aiInsights: true,
    notifications: {
      deals: true,
      recommendations: true,
      bookingUpdates: true,
    },
  });

  const progress = (currentStep / onboardingSteps.length) * 100;

  const navigate = useNavigate();

  const nextStep = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleTravelStyle = (styleId) => {
    setUserProfile((prev) => ({
      ...prev,
      travelStyles: prev.travelStyles.includes(styleId)
        ? prev.travelStyles.filter((id) => id !== styleId)
        : [...prev.travelStyles, styleId],
    }));
  };

  const togglePreference = (prefId) => {
    setUserProfile((prev) => ({
      ...prev,
      preferences: prev.preferences.includes(prefId)
        ? prev.preferences.filter((id) => id !== prefId)
        : [...prev.preferences, prefId],
    }));
  };

  const toggleDestination = (destId) => {
    setUserProfile((prev) => ({
      ...prev,
      dreamDestinations: prev.dreamDestinations.includes(destId)
        ? prev.dreamDestinations.filter((id) => id !== destId)
        : [...prev.dreamDestinations, destId],
    }));
  };

  const completeOnboarding = () => {
    // Save user profile
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    // Check for return URL first
    const returnUrl = localStorage.getItem('returnUrl');

    if (returnUrl) {
      // Clear the return URL and redirect to it
      localStorage.removeItem('returnUrl');
      navigate(returnUrl);
    } else {
      // Default redirect to home
      navigate('/');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to DewdropBnb!
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Let's create a personalized experience just for you. We'll use
                AI and machine learning to recommend the perfect stays based on
                your preferences.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              <Card className="p-4">
                <div className="text-center">
                  <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                  <h3 className="font-semibold">AI-Powered</h3>
                  <p className="text-sm text-gray-600">Smart recommendations</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <Globe className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Global Network</h3>
                  <p className="text-sm text-gray-600">Worldwide properties</p>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <Heart className="h-8 w-8 text-rose-500 mx-auto mb-2" />
                  <h3 className="font-semibold">Personalized</h3>
                  <p className="text-sm text-gray-600">Tailored to you</p>
                </div>
              </Card>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What's Your Travel Style?
              </h2>
              <p className="text-xl text-gray-600">
                Select all that apply - this helps us understand your
                preferences
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {travelStyles.map((style) => (
                <Card
                  key={style.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    userProfile.travelStyles.includes(style.id)
                      ? 'ring-2 ring-rose-500 bg-rose-50'
                      : 'hover:shadow-md'
                  }`}
                  onClick={() => toggleTravelStyle(style.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{style.icon}</div>
                    <h3 className="font-semibold mb-2">{style.name}</h3>
                    <p className="text-sm text-gray-600">{style.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                What Amenities Matter Most?
              </h2>
              <p className="text-xl text-gray-600">
                Choose your must-have features
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {preferences.map((pref) => (
                <Badge
                  key={pref.id}
                  variant={
                    userProfile.preferences.includes(pref.id)
                      ? 'default'
                      : 'outline'
                  }
                  className={`cursor-pointer p-3 text-center justify-center h-auto flex-col space-y-1 transition-all ${
                    userProfile.preferences.includes(pref.id)
                      ? 'bg-rose-500 hover:bg-rose-600'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => togglePreference(pref.id)}
                >
                  <span className="text-lg">{pref.icon}</span>
                  <span className="text-xs">{pref.name}</span>
                </Badge>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Budget & Travel Details
              </h2>
              <p className="text-xl text-gray-600">
                Help us find stays within your preferences
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  Nightly Budget Range: ${userProfile.budgetRange[0]} - $
                  {userProfile.budgetRange[1]}
                </Label>
                <Slider
                  value={userProfile.budgetRange}
                  onValueChange={(value) =>
                    setUserProfile((prev) => ({ ...prev, budgetRange: value }))
                  }
                  max={1000}
                  min={50}
                  step={25}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  Preferred Trip Length: {userProfile.preferredTripLength[0]} -{' '}
                  {userProfile.preferredTripLength[1]} days
                </Label>
                <Slider
                  value={userProfile.preferredTripLength}
                  onValueChange={(value) =>
                    setUserProfile((prev) => ({
                      ...prev,
                      preferredTripLength: value,
                    }))
                  }
                  max={30}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  Typical Group Size
                </Label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() =>
                      setUserProfile((prev) => ({
                        ...prev,
                        groupSize: Math.max(1, prev.groupSize - 1),
                      }))
                    }
                  >
                    -
                  </Button>
                  <span className="text-2xl font-bold w-12 text-center">
                    {userProfile.groupSize}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      setUserProfile((prev) => ({
                        ...prev,
                        groupSize: prev.groupSize + 1,
                      }))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>

              <div>
                <Label className="text-lg font-semibold mb-4 block">
                  How often do you travel?
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {['rarely', 'occasional', 'frequent'].map((freq) => (
                    <Button
                      key={freq}
                      variant={
                        userProfile.travelFrequency === freq
                          ? 'default'
                          : 'outline'
                      }
                      onClick={() =>
                        setUserProfile((prev) => ({
                          ...prev,
                          travelFrequency: freq,
                        }))
                      }
                      className="capitalize"
                    >
                      {freq}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Dream Destinations
              </h2>
              <p className="text-xl text-gray-600">
                Where would you love to stay? Select your favorites
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {dreamDestinations.map((dest) => (
                <Card
                  key={dest.id}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg overflow-hidden ${
                    userProfile.dreamDestinations.includes(dest.id)
                      ? 'ring-2 ring-rose-500'
                      : ''
                  }`}
                  onClick={() => toggleDestination(dest.id)}
                >
                  <div className="relative">
                    <img
                      src={dest.image || '/placeholder.svg'}
                      alt={dest.name}
                      className="w-full h-32 object-cover"
                    />
                    {userProfile.dreamDestinations.includes(dest.id) && (
                      <div className="absolute top-2 right-2 bg-rose-500 text-white rounded-full p-1">
                        <Heart className="h-4 w-4 fill-current" />
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-semibold">{dest.name}</h3>
                    <p className="text-sm text-gray-600">{dest.continent}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                AI-Powered Insights
              </h2>
              <p className="text-xl text-gray-600">
                Let our AI enhance your travel experience
              </p>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Zap className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">
                      Smart Recommendations
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Get personalized property suggestions based on your
                      preferences and past bookings
                    </p>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={userProfile.aiInsights}
                        onChange={(e) =>
                          setUserProfile((prev) => ({
                            ...prev,
                            aiInsights: e.target.checked,
                          }))
                        }
                        className="rounded"
                      />
                      <span>Enable AI recommendations</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="font-semibold mb-4">Notification Preferences</h3>
                <div className="space-y-3">
                  {Object.entries(userProfile.notifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            setUserProfile((prev) => ({
                              ...prev,
                              notifications: {
                                ...prev.notifications,
                                [key]: e.target.checked,
                              },
                            }))
                          }
                          className="rounded"
                        />
                        <span className="capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </Card>

              <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-2">🎉 You're All Set!</h3>
                <p className="mb-4">
                  Based on your preferences, we've created a personalized
                  profile that will help us recommend the perfect stays for you.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Travel Styles:</strong>{' '}
                    {userProfile.travelStyles.length}
                  </div>
                  <div>
                    <strong>Preferences:</strong>{' '}
                    {userProfile.preferences.length}
                  </div>
                  <div>
                    <strong>Budget Range:</strong> ${userProfile.budgetRange[0]}
                    -${userProfile.budgetRange[1]}
                  </div>
                  <div>
                    <strong>Dream Destinations:</strong>{' '}
                    {userProfile.dreamDestinations.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Setup Your Profile
            </h1>
            <span className="text-sm text-gray-600">
              Step {currentStep} of {onboardingSteps.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {onboardingSteps.map((step) => (
              <span
                key={step.id}
                className={`${
                  currentStep >= step.id ? 'text-rose-600 font-medium' : ''
                }`}
              >
                {step.title}
              </span>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="mb-8 shadow-xl">
          <CardContent className="p-8">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          {currentStep === onboardingSteps.length ? (
            <Button
              onClick={completeOnboarding}
              className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white flex items-center gap-2"
            >
              Complete Setup
              <Sparkles className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-rose-500 hover:bg-rose-600 text-white flex items-center gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
