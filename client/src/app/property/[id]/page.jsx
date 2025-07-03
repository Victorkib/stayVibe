'use client';

import { useState, useEffect } from 'react';
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
  Award,
  CheckCircle,
  Phone,
  Mail,
  MessageCircle,
  Grid3X3,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  X,
  AlertCircle,
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
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';
import PaystackCheckout from '../../components/PaystackCheckout';
import { getPropertyById } from '../../../data/mockData';
import { useParams } from 'react-router-dom';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(2);
  const [showImageGallery, setShowImageGallery] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Booking step management
  const [bookingStep, setBookingStep] = useState('dates'); // 'dates', 'details', 'review', 'payment'

  // Customer information state - Start with empty values
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    arrivalTime: '',
    purpose: 'leisure', // leisure, business, other
  });

  // Form validation state
  const [validationErrors, setValidationErrors] = useState({});

  // Booking calculation state
  const [bookingCalculation, setBookingCalculation] = useState(null);

  // Load property data
  useEffect(() => {
    const storedProperty = localStorage.getItem('currentProperty');
    if (storedProperty) {
      setPropertyData(JSON.parse(storedProperty));
    } else {
      const property = getPropertyById(id);
      if (property) {
        setPropertyData(property);
        localStorage.setItem('currentProperty', JSON.stringify(property));
      }
    }

    const savedFavorites = localStorage.getItem('userFavorites');
    if (savedFavorites) {
      const favorites = new Set(JSON.parse(savedFavorites));
      setIsFavorite(favorites.has(Number.parseInt(id)));
    }
  }, [id]);

  // Calculate booking details whenever dates or guests change
  useEffect(() => {
    if (checkIn && checkOut && guests && propertyData) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil(
        (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
      );

      if (nights > 0) {
        const baseAmount = propertyData.price * nights;
        const cleaningFee = 75;
        const serviceFee = Math.round(baseAmount * 0.12);
        const taxes = Math.round(baseAmount * 0.08);
        const totalAmount = baseAmount + cleaningFee + serviceFee + taxes;

        setBookingCalculation({
          nights,
          baseAmount,
          cleaningFee,
          serviceFee,
          taxes,
          totalAmount,
        });
      }
    }
  }, [checkIn, checkOut, guests, propertyData]);

  const nextImage = () => {
    if (propertyData) {
      setCurrentImageIndex((prev) => (prev + 1) % propertyData.images.length);
    }
  };

  const prevImage = () => {
    if (propertyData) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + propertyData.images.length) % propertyData.images.length
      );
    }
  };

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateBookingStep = (step) => {
    const errors = {};

    if (step === 'dates') {
      if (!checkIn) errors.checkIn = 'Check-in date is required';
      if (!checkOut) errors.checkOut = 'Check-out date is required';
      if (!guests || guests < 1) errors.guests = 'At least 1 guest is required';
      if (guests > propertyData?.guests) {
        errors.guests = `Maximum ${propertyData.guests} guests allowed`;
      }
    }

    if (step === 'details') {
      if (!customerInfo.firstName.trim())
        errors.firstName = 'First name is required';
      if (!customerInfo.lastName.trim())
        errors.lastName = 'Last name is required';
      if (!customerInfo.email.trim()) errors.email = 'Email is required';
      if (customerInfo.email && !/^\S+@\S+\.\S+$/.test(customerInfo.email)) {
        errors.email = 'Please enter a valid email address';
      }
      if (!customerInfo.phone.trim()) errors.phone = 'Phone number is required';
      if (!customerInfo.arrivalTime)
        errors.arrivalTime = 'Expected arrival time is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (bookingStep === 'dates' && validateBookingStep('dates')) {
      setBookingStep('details');
    } else if (bookingStep === 'details' && validateBookingStep('details')) {
      setBookingStep('review');
    } else if (bookingStep === 'review') {
      setBookingStep('payment');
    }
  };

  const handlePrevStep = () => {
    if (bookingStep === 'details') {
      setBookingStep('dates');
    } else if (bookingStep === 'review') {
      setBookingStep('details');
    } else if (bookingStep === 'payment') {
      setBookingStep('review');
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem('userFavorites');
    const favorites = new Set(savedFavorites ? JSON.parse(savedFavorites) : []);

    if (favorites.has(Number.parseInt(id))) {
      favorites.delete(Number.parseInt(id));
    } else {
      favorites.add(Number.parseInt(id));
    }

    localStorage.setItem('userFavorites', JSON.stringify([...favorites]));
    setIsFavorite(!isFavorite);
  };

  const getAmenityIcon = (amenity) => {
    const iconMap = {
      Wifi: <Wifi className="h-5 w-5 text-blue-500" />,
      Parking: <Car className="h-5 w-5 text-green-500" />,
      Pool: <Waves className="h-5 w-5 text-cyan-500" />,
      Kitchen: <ChefHat className="h-5 w-5 text-orange-500" />,
      'Hot Tub': <Waves className="h-5 w-5 text-purple-500" />,
      Gym: <Shield className="h-5 w-5 text-red-500" />,
      'Beach Access': <Waves className="h-5 w-5 text-teal-500" />,
    };
    return iconMap[amenity] || <Shield className="h-5 w-5 text-gray-500" />;
  };

  // Prepare booking data for PaystackCheckout
  const bookingData = {
    checkIn,
    checkOut,
    guests,
    customerInfo,
    totalAmount: bookingCalculation?.totalAmount || 0,
    cleaningFee: bookingCalculation?.cleaningFee || 75,
    serviceFee: bookingCalculation?.serviceFee || 0,
    taxes: bookingCalculation?.taxes || 0,
    propertyId: propertyData?.id,
    propertyTitle: propertyData?.title,
  };

  // Payment event handlers
  const handlePaymentSuccess = (successData) => {
    console.log('Payment successful:', successData);
    alert(
      `🎉 Booking Confirmed!\n\nYour reservation for ${propertyData.title} has been confirmed.\nBooking Reference: ${successData.paymentReference}\n\nA confirmation email has been sent to ${customerInfo.email}`
    );
  };

  const handlePaymentError = (errorData) => {
    console.error('Payment error:', errorData);
  };

  const handlePaymentCancel = (cancelData) => {
    console.log('Payment cancelled:', cancelData);
  };

  // Check if current step is valid
  const isCurrentStepValid = () => {
    if (bookingStep === 'dates') {
      return (
        checkIn && checkOut && guests && guests <= (propertyData?.guests || 0)
      );
    }
    if (bookingStep === 'details') {
      return (
        customerInfo.firstName &&
        customerInfo.lastName &&
        customerInfo.email &&
        customerInfo.phone &&
        customerInfo.arrivalTime &&
        /^\S+@\S+\.\S+$/.test(customerInfo.email)
      );
    }
    return true;
  };

  // Loading state
  if (!propertyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading property details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 hover:bg-gray-100 transition-all duration-200 rounded-full px-4"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              Back to results
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 hover:bg-gray-100 transition-all duration-200 rounded-full px-4"
                onClick={handleShare}
              >
                <Share className="h-4 w-4" />
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-2 transition-all duration-200 rounded-full px-4 ${
                  isFavorite
                    ? 'bg-rose-50 hover:bg-rose-100 text-rose-600'
                    : 'hover:bg-gray-100'
                }`}
                onClick={toggleFavorite}
              >
                <Heart
                  className={`h-4 w-4 transition-all duration-200 ${
                    isFavorite ? 'fill-rose-500 text-rose-500 scale-110' : ''
                  }`}
                />
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Title Section */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {propertyData.title}
              </h1>
              <div className="flex items-center gap-6 text-sm flex-wrap">
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="font-semibold text-yellow-700">
                    {propertyData.rating}
                  </span>
                  <span className="text-yellow-600">
                    ({propertyData.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4 text-rose-500" />
                  <span className="font-medium">{propertyData.location}</span>
                </div>
                {propertyData.instantBook && (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Instant Book
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Image Gallery */}
        <div className="mb-12">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            <img
              src={propertyData.images[currentImageIndex] || '/placeholder.svg'}
              alt={propertyData.title}
              className="w-full h-96 md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Enhanced Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="h-6 w-6 text-gray-700" />
            </button>

            {/* Enhanced Image Counter & Gallery Button */}
            <div className="absolute bottom-6 right-6 flex items-center gap-3">
              <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {currentImageIndex + 1} / {propertyData.images.length}
              </div>
              <Button
                onClick={() => setShowImageGallery(true)}
                className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-700 hover:text-gray-900 shadow-lg rounded-full px-4 py-2 transition-all duration-300"
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                View all photos
              </Button>
            </div>
          </div>

          {/* Enhanced Thumbnail Strip */}
          <div className="flex gap-3 mt-6 overflow-x-auto pb-2">
            {propertyData.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                  index === currentImageIndex
                    ? 'ring-3 ring-rose-500 shadow-lg scale-105'
                    : 'ring-2 ring-transparent hover:ring-gray-300 hover:scale-105'
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Enhanced Main Content */}
          <div className="lg:col-span-2 space-y-10">
            {/* Enhanced Property Info */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                      {propertyData.type} hosted by {propertyData.host.name}
                    </h2>
                    <div className="flex items-center gap-6 text-gray-600 flex-wrap">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-rose-500" />
                        <span>{propertyData.guests} guests</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{propertyData.bedrooms} bedrooms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{propertyData.beds} beds</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{propertyData.bathrooms} bathrooms</span>
                      </div>
                    </div>
                  </div>
                  <Avatar className="h-16 w-16 ring-4 ring-rose-100">
                    <AvatarImage
                      src={propertyData.host.avatar || '/placeholder.svg'}
                    />
                    <AvatarFallback className="bg-rose-100 text-rose-600 text-xl font-semibold">
                      {propertyData.host.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {propertyData.host.superhost && (
                  <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold">
                    <Award className="h-4 w-4 mr-2" />
                    Superhost
                  </Badge>
                )}
              </CardContent>
            </Card>

            {/* Enhanced Features */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  What makes this place special
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
                    <div className="bg-blue-500 p-3 rounded-full">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Great for groups
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Spacious accommodation for up to {propertyData.guests}{' '}
                        guests
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
                    <div className="bg-green-500 p-3 rounded-full">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Self check-in
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Easy access with smart lock system
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100">
                    <div className="bg-purple-500 p-3 rounded-full">
                      <Star className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Highly rated
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Recent guests gave this place a {propertyData.rating}
                        -star rating
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100">
                    <div className="bg-orange-500 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Great location
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Prime location in {propertyData.shortLocation}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Description */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  About this place
                </h3>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                    {propertyData.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Amenities */}
            <Card className="border-0 shadow-lg bg-white/70 backdrop-blur-sm">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  What this place offers
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {propertyData.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="font-medium text-gray-900">
                        {amenity}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Enhanced Host Section */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-rose-50 to-pink-50">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
                    <AvatarImage
                      src={propertyData.host.avatar || '/placeholder.svg'}
                    />
                    <AvatarFallback className="bg-rose-500 text-white text-2xl font-bold">
                      {propertyData.host.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Meet {propertyData.host.name}
                      </h3>
                      {propertyData.host.superhost && (
                        <Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                          <Award className="h-3 w-3 mr-1" />
                          Superhost
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="font-bold text-lg text-gray-900">
                          {propertyData.host.reviews}
                        </div>
                        <div className="text-sm text-gray-600">Reviews</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="font-bold text-lg text-gray-900">
                          {propertyData.host.responseRate}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Response rate
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="font-bold text-lg text-gray-900">
                          {propertyData.host.responseTime}
                        </div>
                        <div className="text-sm text-gray-600">
                          Response time
                        </div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg shadow-sm">
                        <div className="font-bold text-lg text-gray-900">
                          {new Date().getFullYear() -
                            propertyData.host.joinedYear}
                        </div>
                        <div className="text-sm text-gray-600">
                          Years hosting
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6">
                      {propertyData.host.about}
                    </p>
                    <div className="flex gap-3">
                      <Button className="bg-rose-500 hover:bg-rose-600 text-white">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Contact Host
                      </Button>
                      <Button
                        variant="outline"
                        className="border-rose-200 hover:bg-rose-50"
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Booking Card with Multi-Step Process */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-2xl bg-white/90 backdrop-blur-sm z-30">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    ${propertyData.price}
                    <span className="text-lg font-normal text-gray-600">
                      {' '}
                      / night
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold">{propertyData.rating}</span>
                    <span className="text-gray-600">
                      ({propertyData.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Booking Progress Indicator */}
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`flex items-center gap-2 ${
                      bookingStep === 'dates'
                        ? 'text-rose-600'
                        : bookingStep === 'details' ||
                          bookingStep === 'review' ||
                          bookingStep === 'payment'
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        bookingStep === 'dates'
                          ? 'bg-rose-100 text-rose-600'
                          : bookingStep === 'details' ||
                            bookingStep === 'review' ||
                            bookingStep === 'payment'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      1
                    </div>
                    <span className="text-sm font-medium">Dates</span>
                  </div>
                  <div
                    className={`w-12 h-0.5 ${
                      bookingStep === 'details' ||
                      bookingStep === 'review' ||
                      bookingStep === 'payment'
                        ? 'bg-green-300'
                        : 'bg-gray-200'
                    }`}
                  ></div>
                  <div
                    className={`flex items-center gap-2 ${
                      bookingStep === 'details'
                        ? 'text-rose-600'
                        : bookingStep === 'review' || bookingStep === 'payment'
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        bookingStep === 'details'
                          ? 'bg-rose-100 text-rose-600'
                          : bookingStep === 'review' ||
                            bookingStep === 'payment'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      2
                    </div>
                    <span className="text-sm font-medium">Details</span>
                  </div>
                  <div
                    className={`w-12 h-0.5 ${
                      bookingStep === 'review' || bookingStep === 'payment'
                        ? 'bg-green-300'
                        : 'bg-gray-200'
                    }`}
                  ></div>
                  <div
                    className={`flex items-center gap-2 ${
                      bookingStep === 'review'
                        ? 'text-rose-600'
                        : bookingStep === 'payment'
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        bookingStep === 'review'
                          ? 'bg-rose-100 text-rose-600'
                          : bookingStep === 'payment'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      3
                    </div>
                    <span className="text-sm font-medium">Review</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Step 1: Date Selection */}
                  {bookingStep === 'dates' && (
                    <>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Check-in
                          </Label>
                          <div className="relative">
                            <input
                              type="date"
                              value={
                                checkIn
                                  ? checkIn.toISOString().split('T')[0]
                                  : ''
                              }
                              onChange={(e) =>
                                setCheckIn(
                                  e.target.value
                                    ? new Date(e.target.value)
                                    : null
                                )
                              }
                              min={new Date().toISOString().split('T')[0]}
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white hover:border-rose-300 transition-colors duration-200 text-gray-900 font-medium ${
                                validationErrors.checkIn
                                  ? 'border-red-300 focus:border-red-500'
                                  : 'border-gray-200 focus:border-rose-500'
                              }`}
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-rose-500 pointer-events-none" />
                          </div>
                          {validationErrors.checkIn && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {validationErrors.checkIn}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                            Check-out
                          </Label>
                          <div className="relative">
                            <input
                              type="date"
                              value={
                                checkOut
                                  ? checkOut.toISOString().split('T')[0]
                                  : ''
                              }
                              onChange={(e) =>
                                setCheckOut(
                                  e.target.value
                                    ? new Date(e.target.value)
                                    : null
                                )
                              }
                              min={
                                checkIn
                                  ? new Date(
                                      checkIn.getTime() + 24 * 60 * 60 * 1000
                                    )
                                      .toISOString()
                                      .split('T')[0]
                                  : new Date().toISOString().split('T')[0]
                              }
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none bg-white hover:border-rose-300 transition-colors duration-200 text-gray-900 font-medium ${
                                validationErrors.checkOut
                                  ? 'border-red-300 focus:border-red-500'
                                  : 'border-gray-200 focus:border-rose-500'
                              }`}
                            />
                            <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-rose-500 pointer-events-none" />
                          </div>
                          {validationErrors.checkOut && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {validationErrors.checkOut}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-semibold text-gray-700 mb-2 block">
                          Guests
                        </Label>
                        <div
                          className={`flex items-center justify-between p-4 border-2 rounded-lg transition-colors ${
                            validationErrors.guests
                              ? 'border-red-300'
                              : 'border-gray-200 hover:border-rose-300 focus-within:border-rose-500'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-rose-500" />
                            <span className="font-medium">{guests} guests</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setGuests(Math.max(1, guests - 1))}
                              className="h-8 w-8 p-0 rounded-full"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold">
                              {guests}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setGuests(
                                  Math.min(propertyData.guests, guests + 1)
                                )
                              }
                              className="h-8 w-8 p-0 rounded-full"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        {validationErrors.guests && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            {validationErrors.guests}
                          </p>
                        )}
                      </div>

                      <Button
                        onClick={handleNextStep}
                        disabled={!isCurrentStepValid()}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continue to Guest Details
                      </Button>
                    </>
                  )}

                  {/* Step 2: Guest Details */}
                  {bookingStep === 'details' && (
                    <>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Guest Information
                        </h4>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label
                              htmlFor="firstName"
                              className="text-sm font-medium text-gray-700"
                            >
                              First Name *
                            </Label>
                            <Input
                              id="firstName"
                              value={customerInfo.firstName}
                              onChange={(e) =>
                                handleCustomerInfoChange(
                                  'firstName',
                                  e.target.value
                                )
                              }
                              className={`mt-1 ${
                                validationErrors.firstName
                                  ? 'border-red-300 focus:border-red-500'
                                  : ''
                              }`}
                              placeholder="Enter first name"
                            />
                            {validationErrors.firstName && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {validationErrors.firstName}
                              </p>
                            )}
                          </div>

                          <div>
                            <Label
                              htmlFor="lastName"
                              className="text-sm font-medium text-gray-700"
                            >
                              Last Name *
                            </Label>
                            <Input
                              id="lastName"
                              value={customerInfo.lastName}
                              onChange={(e) =>
                                handleCustomerInfoChange(
                                  'lastName',
                                  e.target.value
                                )
                              }
                              className={`mt-1 ${
                                validationErrors.lastName
                                  ? 'border-red-300 focus:border-red-500'
                                  : ''
                              }`}
                              placeholder="Enter last name"
                            />
                            {validationErrors.lastName && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {validationErrors.lastName}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <Label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                          >
                            Email Address *
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) =>
                              handleCustomerInfoChange('email', e.target.value)
                            }
                            className={`mt-1 ${
                              validationErrors.email
                                ? 'border-red-300 focus:border-red-500'
                                : ''
                            }`}
                            placeholder="Enter your email"
                          />
                          {validationErrors.email && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {validationErrors.email}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label
                            htmlFor="phone"
                            className="text-sm font-medium text-gray-700"
                          >
                            Phone Number *
                          </Label>
                          <Input
                            id="phone"
                            value={customerInfo.phone}
                            onChange={(e) =>
                              handleCustomerInfoChange('phone', e.target.value)
                            }
                            className={`mt-1 ${
                              validationErrors.phone
                                ? 'border-red-300 focus:border-red-500'
                                : ''
                            }`}
                            placeholder="Enter your phone number"
                          />
                          {validationErrors.phone && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {validationErrors.phone}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label
                            htmlFor="arrivalTime"
                            className="text-sm font-medium text-gray-700"
                          >
                            Expected Arrival Time *
                          </Label>
                          <select
                            id="arrivalTime"
                            value={customerInfo.arrivalTime}
                            onChange={(e) =>
                              handleCustomerInfoChange(
                                'arrivalTime',
                                e.target.value
                              )
                            }
                            className={`mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                              validationErrors.arrivalTime
                                ? 'border-red-300'
                                : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select arrival time</option>
                            <option value="morning">
                              Morning (8:00 AM - 12:00 PM)
                            </option>
                            <option value="afternoon">
                              Afternoon (12:00 PM - 6:00 PM)
                            </option>
                            <option value="evening">
                              Evening (6:00 PM - 10:00 PM)
                            </option>
                            <option value="late">
                              Late Night (After 10:00 PM)
                            </option>
                          </select>
                          {validationErrors.arrivalTime && (
                            <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              {validationErrors.arrivalTime}
                            </p>
                          )}
                        </div>

                        <div>
                          <Label
                            htmlFor="purpose"
                            className="text-sm font-medium text-gray-700"
                          >
                            Purpose of Visit
                          </Label>
                          <select
                            id="purpose"
                            value={customerInfo.purpose}
                            onChange={(e) =>
                              handleCustomerInfoChange(
                                'purpose',
                                e.target.value
                              )
                            }
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-rose-500"
                          >
                            <option value="leisure">Leisure/Vacation</option>
                            <option value="business">Business</option>
                            <option value="family">Family Visit</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <Label
                            htmlFor="specialRequests"
                            className="text-sm font-medium text-gray-700"
                          >
                            Special Requests (Optional)
                          </Label>
                          <Textarea
                            id="specialRequests"
                            value={customerInfo.specialRequests}
                            onChange={(e) =>
                              handleCustomerInfoChange(
                                'specialRequests',
                                e.target.value
                              )
                            }
                            className="mt-1"
                            placeholder="Any special requests or requirements..."
                            rows={3}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button
                          onClick={handlePrevStep}
                          variant="outline"
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleNextStep}
                          disabled={!isCurrentStepValid()}
                          className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Review Booking
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Step 3: Review Booking */}
                  {bookingStep === 'review' && (
                    <>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Review Your Booking
                        </h4>

                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Dates:</span>
                            <span className="font-medium">
                              {checkIn?.toLocaleDateString()} -{' '}
                              {checkOut?.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Guests:</span>
                            <span className="font-medium">{guests} guests</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Guest:</span>
                            <span className="font-medium">
                              {customerInfo.firstName} {customerInfo.lastName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">
                              {customerInfo.email}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">
                              {customerInfo.phone}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Arrival:</span>
                            <span className="font-medium capitalize">
                              {customerInfo.arrivalTime}
                            </span>
                          </div>
                          {customerInfo.specialRequests && (
                            <div>
                              <span className="text-gray-600">
                                Special Requests:
                              </span>
                              <p className="text-sm text-gray-700 mt-1">
                                {customerInfo.specialRequests}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Price Breakdown */}
                      {bookingCalculation && (
                        <div className="space-y-3 pt-6 border-t border-gray-200">
                          <div className="flex justify-between text-gray-700">
                            <span>
                              ${propertyData.price} ×{' '}
                              {bookingCalculation.nights} nights
                            </span>
                            <span>${bookingCalculation.baseAmount}</span>
                          </div>
                          <div className="flex justify-between text-gray-700">
                            <span>Cleaning fee</span>
                            <span>${bookingCalculation.cleaningFee}</span>
                          </div>
                          <div className="flex justify-between text-gray-700">
                            <span>Service fee</span>
                            <span>${bookingCalculation.serviceFee}</span>
                          </div>
                          <div className="flex justify-between text-gray-700">
                            <span>Taxes</span>
                            <span>${bookingCalculation.taxes}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between text-xl font-bold text-gray-900">
                            <span>Total</span>
                            <span>${bookingCalculation.totalAmount}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3">
                        <Button
                          onClick={handlePrevStep}
                          variant="outline"
                          className="flex-1"
                        >
                          Back
                        </Button>
                        <Button
                          onClick={handleNextStep}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          Proceed to Payment
                        </Button>
                      </div>
                    </>
                  )}

                  {/* Step 4: Payment */}
                  {bookingStep === 'payment' && (
                    <>
                      <div className="text-center space-y-4">
                        <h4 className="font-semibold text-gray-900 mb-4">
                          Complete Your Booking
                        </h4>
                        <p className="text-gray-600 text-sm">
                          You're about to book {bookingCalculation?.nights}{' '}
                          nights at {propertyData.title}
                        </p>
                        <div className="text-2xl font-bold text-gray-900">
                          Total: ${bookingCalculation?.totalAmount}
                        </div>
                      </div>

                      <PaystackCheckout
                        bookingData={bookingData}
                        onSuccess={handlePaymentSuccess}
                        onError={handlePaymentError}
                        onCancel={handlePaymentCancel}
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                      />

                      <Button
                        onClick={handlePrevStep}
                        variant="outline"
                        className="w-full"
                      >
                        Back to Review
                      </Button>
                    </>
                  )}

                  <div className="text-center text-sm text-gray-600 pt-4">
                    <Shield className="h-4 w-4 inline mr-1" />
                    {bookingStep === 'payment'
                      ? 'Secure payment processing'
                      : "You won't be charged yet"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md bg-white shadow-2xl border-0 animate-in fade-in-0 zoom-in-95">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center justify-between text-gray-900 text-lg font-semibold">
                Share this property
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowShareModal(false)}
                  className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <Input
                  value={window.location.href}
                  readOnly
                  className="flex-1 bg-transparent border-0 focus:ring-0 text-sm text-gray-700"
                />
                <Button
                  onClick={() => copyToClipboard(window.location.href)}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs font-medium"
                >
                  Copy
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 py-2.5 border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700"
                >
                  <Mail className="h-4 w-4" />
                  Email
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 py-2.5 border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Image Gallery Modal */}
      {showImageGallery && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowImageGallery(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 text-white"
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={propertyData.images[currentImageIndex] || '/placeholder.svg'}
              alt={propertyData.title}
              className="max-w-full max-h-full object-contain"
            />
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-3"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
