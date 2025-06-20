'use client';

import { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  MapPin,
  Wifi,
  Car,
  Waves,
  ChefHat,
  Users,
  Calendar,
  Shield,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../components/ui/avatar';
import { Badge } from '../../../components/ui/badge';
import { Separator } from '../../../components/ui/separator';
import { Calendar as CalendarComponent } from '../../../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';
import PaystackCheckout from '../../components/PaystackCheckout';

// Mock property data
const propertyData = {
  id: 1,
  title: 'Luxury Beachfront Villa with Infinity Pool',
  location: 'Malibu, California, United States',
  price: 450,
  rating: 4.9,
  reviews: 127,
  images: [
      '/img/airbnb1_1.avif',
      '/img/airbnb1_2.avif',
      '/img/airbnb1_3.avif',
      '/img/airbnb1_4.avif',
    ],
  amenities: [
    'Wifi',
    'Pool',
    'Parking',
    'Kitchen',
    'Hot Tub',
    'Gym',
    'Beach Access',
  ],
  type: 'Villa',
  host: {
    name: 'Sarah Johnson',
    avatar: '/placeholder-user.jpg',
    superhost: true,
    joinedYear: 2018,
    reviews: 234,
  },
  description: `Welcome to our stunning beachfront villa in Malibu! This luxurious property offers breathtaking ocean views, 
  direct beach access, and world-class amenities. Perfect for families, couples, or groups looking for an unforgettable getaway.
  
  The villa features 4 spacious bedrooms, 3 full bathrooms, a gourmet kitchen, and an infinity pool that seems to merge with the ocean horizon. 
  Wake up to the sound of waves and enjoy spectacular sunsets from your private terrace.`,
  bedrooms: 4,
  bathrooms: 3,
  guests: 8,
  beds: 5,
};

const getAmenityIcon = (amenity) => {
  switch (amenity) {
    case 'Wifi':
      return <Wifi className="h-5 w-5" />;
    case 'Parking':
      return <Car className="h-5 w-5" />;
    case 'Pool':
      return <Waves className="h-5 w-5" />;
    case 'Kitchen':
      return <ChefHat className="h-5 w-5" />;
    default:
      return <Shield className="h-5 w-5" />;
  }
};

export default function PropertyDetailPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + propertyData.images.length) % propertyData.images.length
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to results
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Share className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isFavorite ? 'fill-rose-500 text-rose-500' : ''
                  }`}
                />
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {propertyData.title}
          </h1>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="font-medium">{propertyData.rating}</span>
              <span className="text-gray-600">
                ({propertyData.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="h-4 w-4" />
              {propertyData.location}
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative rounded-2xl overflow-hidden">
            <img
              src={propertyData.images[currentImageIndex] || '/placeholder.svg'}
              alt={propertyData.title}
              className="w-full h-96 md:h-[500px] object-cover"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {propertyData.images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {propertyData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  index === currentImageIndex
                    ? 'border-rose-500'
                    : 'border-transparent'
                }`}
              >
                <img
                  src={image || '/placeholder.svg'}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Info */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">
                    {propertyData.type} hosted by {propertyData.host.name}
                  </h2>
                  <p className="text-gray-600">
                    {propertyData.guests} guests · {propertyData.bedrooms}{' '}
                    bedrooms · {propertyData.beds} beds ·{' '}
                    {propertyData.bathrooms} bathrooms
                  </p>
                </div>
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={propertyData.host.avatar || '/placeholder.svg'}
                  />
                  <AvatarFallback>
                    {propertyData.host.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {propertyData.host.superhost && (
                <Badge className="mb-4">Superhost</Badge>
              )}
            </div>

            <Separator />

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Great for groups</h3>
                  <p className="text-gray-600">
                    This place can accommodate up to {propertyData.guests}{' '}
                    guests
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Prime location</h3>
                  <p className="text-gray-600">
                    Direct beach access with stunning ocean views
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-gray-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Enhanced Clean</h3>
                  <p className="text-gray-600">
                    This host committed to enhanced cleaning protocol
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-xl font-semibold mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {propertyData.description}
              </p>
            </div>

            <Separator />

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-semibold mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {propertyData.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3">
                    {getAmenityIcon(amenity)}
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Host Info */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Meet your host</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={propertyData.host.avatar || '/placeholder.svg'}
                      />
                      <AvatarFallback>
                        {propertyData.host.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="text-lg font-semibold">
                        {propertyData.host.name}
                      </h4>
                      {propertyData.host.superhost && (
                        <Badge className="mb-1">Superhost</Badge>
                      )}
                      <p className="text-gray-600">
                        Joined in {propertyData.host.joinedYear}
                      </p>
                      <p className="text-gray-600">
                        {propertyData.host.reviews} reviews
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full">
                    Contact Host
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-2xl">
                    ${propertyData.price}{' '}
                    <span className="text-base font-normal text-gray-600">
                      / night
                    </span>
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm">
                      {propertyData.rating} ({propertyData.reviews})
                    </span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Date Selection */}
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {checkIn ? checkIn.toDateString() : 'Check in'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={checkIn}
                        onSelect={setCheckIn}
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {checkOut ? checkOut.toDateString() : 'Check out'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={checkOut}
                        onSelect={setCheckOut}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Guest Selection */}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      {guests} guest{guests !== 1 ? 's' : ''}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="flex items-center justify-between">
                      <span>Guests</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{guests}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setGuests(Math.min(propertyData.guests, guests + 1))
                          }
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                {/* Reserve Button */}
                {/* <Button
                  size="lg"
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white"
                >
                  Reserve
                </Button> */}
                <PaystackCheckout/>

                <p className="text-center text-sm text-gray-600">
                  You won't be charged yet
                </p>

                {/* Price Breakdown */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>${propertyData.price} x 5 nights</span>
                    <span>${propertyData.price * 5}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>$75</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>$150</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${propertyData.price * 5 + 75 + 150}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
