'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Calendar,
  MapPin,
  Star,
  Shield,
  CreditCard,
  CheckCircle,
} from 'lucide-react';
import { Button } from '../../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Separator } from '../../../components/ui/separator';
import { getPropertyById, createBooking } from '../../../data/mockData';
import PaystackCheckout from '../../components/PaystackCheckout';

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingStep, setBookingStep] = useState(1); // 1: Details, 2: Payment, 3: Confirmation
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [paymentData, setPaymentData] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      localStorage.setItem('returnUrl', `/booking/${id}`);
      navigate('/auth/login');
      return;
    }

    loadProperty();
    loadUserData();
  }, [id, navigate]);

  const loadProperty = () => {
    const foundProperty = getPropertyById(id);
    if (foundProperty) {
      setProperty(foundProperty);
    } else {
      navigate('/');
    }
    setLoading(false);
  };

  const loadUserData = () => {
    const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');

    setBookingData((prev) => ({
      ...prev,
      firstName: userProfile.firstName || userName?.split(' ')[0] || '',
      lastName: userProfile.lastName || userName?.split(' ')[1] || '',
      email: userProfile.email || userEmail || '',
      phone: userProfile.phone || '',
    }));
  };

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const checkIn = new Date(bookingData.checkIn);
    const checkOut = new Date(bookingData.checkOut);
    const diffTime = Math.abs(checkOut - checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const subtotal = nights * property.price;
    const serviceFee = subtotal * 0.12;
    const taxes = subtotal * 0.08;
    return {
      nights,
      subtotal,
      serviceFee,
      taxes,
      total: subtotal + serviceFee + taxes,
    };
  };

  const handleInputChange = (field, value) => {
    setBookingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNextStep = () => {
    if (bookingStep === 1) {
      // Validate booking details
      if (
        !bookingData.checkIn ||
        !bookingData.checkOut ||
        !bookingData.firstName ||
        !bookingData.lastName ||
        !bookingData.email
      ) {
        alert('Please fill in all required fields');
        return;
      }
      setBookingStep(2);
    }
  };

  const handlePaymentSuccess = (paymentData) => {
    setPaymentData(paymentData);

    // Create booking record using centralized function
    const booking = createBooking({
      propertyId: property.id,
      propertyTitle: property.title,
      ...bookingData,
      ...calculateTotal(),
      paymentReference: paymentData.reference,
      status: 'confirmed',
    });

    setBookingConfirmed(true);
    setBookingStep(3);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-500"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Property not found
          </h2>
          <Button
            onClick={() => navigate('/')}
            className="bg-rose-500 hover:bg-rose-600"
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const pricing = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(`/property/${id}`)}
            className="mb-4 text-rose-600 hover:text-rose-700"
          >
            ← Back to property
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            {bookingStep === 1 && 'Booking Details'}
            {bookingStep === 2 && 'Payment'}
            {bookingStep === 3 && 'Booking Confirmed'}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {bookingStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-rose-500" />
                    Booking Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="checkIn">Check-in Date *</Label>
                      <Input
                        id="checkIn"
                        type="date"
                        value={bookingData.checkIn}
                        onChange={(e) =>
                          handleInputChange('checkIn', e.target.value)
                        }
                        min={new Date().toISOString().split('T')[0]}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="checkOut">Check-out Date *</Label>
                      <Input
                        id="checkOut"
                        type="date"
                        value={bookingData.checkOut}
                        onChange={(e) =>
                          handleInputChange('checkOut', e.target.value)
                        }
                        min={
                          bookingData.checkIn ||
                          new Date().toISOString().split('T')[0]
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <Label htmlFor="guests">Number of Guests *</Label>
                    <select
                      id="guests"
                      value={bookingData.guests}
                      onChange={(e) =>
                        handleInputChange(
                          'guests',
                          Number.parseInt(e.target.value)
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-500 focus:outline-none focus:ring-rose-500"
                    >
                      {[...Array(property.guests || 8)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i + 1 === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Separator />

                  {/* Guest Information */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Guest Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={bookingData.firstName}
                          onChange={(e) =>
                            handleInputChange('firstName', e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={bookingData.lastName}
                          onChange={(e) =>
                            handleInputChange('lastName', e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingData.email}
                          onChange={(e) =>
                            handleInputChange('email', e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={bookingData.phone}
                          onChange={(e) =>
                            handleInputChange('phone', e.target.value)
                          }
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="specialRequests">Special Requests</Label>
                    <textarea
                      id="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={(e) =>
                        handleInputChange('specialRequests', e.target.value)
                      }
                      rows={3}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-rose-500 focus:outline-none focus:ring-rose-500"
                      placeholder="Any special requests or requirements..."
                    />
                  </div>

                  <Button
                    onClick={handleNextStep}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white py-3"
                    disabled={
                      !bookingData.checkIn ||
                      !bookingData.checkOut ||
                      !bookingData.firstName ||
                      !bookingData.lastName ||
                      !bookingData.email
                    }
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {bookingStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-rose-500" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {/* Security Notice */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-green-600" />
                        <span className="font-medium text-green-800">
                          Secure Payment
                        </span>
                      </div>
                      <p className="text-sm text-green-700 mt-1">
                        Your payment information is encrypted and secure. We use
                        industry-standard security measures.
                      </p>
                    </div>

                    {/* Paystack Checkout */}
                    <PaystackCheckout
                      amount={pricing.total}
                      email={bookingData.email}
                      firstName={bookingData.firstName}
                      lastName={bookingData.lastName}
                      onSuccess={handlePaymentSuccess}
                      onClose={() => console.log('Payment closed')}
                      metadata={{
                        propertyId: property.id,
                        propertyTitle: property.title,
                        checkIn: bookingData.checkIn,
                        checkOut: bookingData.checkOut,
                        guests: bookingData.guests,
                        nights: pricing.nights,
                      }}
                    />

                    <Button
                      variant="outline"
                      onClick={() => setBookingStep(1)}
                      className="w-full border-gray-300 hover:bg-gray-50"
                    >
                      Back to Booking Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {bookingStep === 3 && bookingConfirmed && (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Booking Confirmed!
                  </h2>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Your booking has been confirmed. You'll receive a
                    confirmation email shortly with all the details.
                  </p>

                  <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left max-w-md mx-auto">
                    <h3 className="font-semibold mb-4">Booking Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Booking Reference:</span>
                        <span className="font-medium">
                          {paymentData?.reference}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-in:</span>
                        <span>
                          {new Date(bookingData.checkIn).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Check-out:</span>
                        <span>
                          {new Date(bookingData.checkOut).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Guests:</span>
                        <span>{bookingData.guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Paid:</span>
                        <span className="font-semibold">
                          ${pricing.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={() => navigate('/bookings')}
                      className="bg-rose-500 hover:bg-rose-600 text-white"
                    >
                      View My Bookings
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/')}
                      className="border-gray-300 hover:bg-gray-50"
                    >
                      Back to Home
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                {/* Property Info */}
                <div className="flex gap-4 mb-6">
                  <img
                    src={property.images?.[0] || '/placeholder.svg'}
                    alt={property.title}
                    className="w-20 h-20 rounded-lg object-cover"
                    onError={(e) => {
                      e.target.src = '/placeholder.svg?height=80&width=80';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold line-clamp-2 mb-1">
                      {property.title}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate">{property.shortLocation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">
                        {property.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({property.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Booking Summary */}
                {bookingData.checkIn && bookingData.checkOut && (
                  <>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-sm">
                        <span>Check-in</span>
                        <span>
                          {new Date(bookingData.checkIn).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Check-out</span>
                        <span>
                          {new Date(bookingData.checkOut).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Guests</span>
                        <span>{bookingData.guests}</span>
                      </div>
                    </div>

                    <Separator className="my-6" />

                    {/* Price Breakdown */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>
                          ${property.price} × {pricing.nights} nights
                        </span>
                        <span>${pricing.subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Service fee</span>
                        <span>${pricing.serviceFee.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Taxes</span>
                        <span>${pricing.taxes.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${pricing.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}

                {/* Cancellation Policy */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">
                    Cancellation Policy
                  </h4>
                  <p className="text-xs text-gray-600">
                    {property.cancellationPolicy}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
