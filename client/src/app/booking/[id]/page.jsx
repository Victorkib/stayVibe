'use client';

import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Users,
  Shield,
  CreditCard,
  Lock,
  AlertCircle,
  Check,
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
import { Calendar as CalendarComponent } from '../../../components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover';
import { Link, useNavigate } from 'react-router-dom';

export default function BookingPage({ params }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [bookingData, setBookingData] = useState({
    checkIn: null,
    checkOut: null,
    guests: 2,
    specialRequests: '',
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock property data
  const property = {
    id: params.id,
    title: 'Luxury Beachfront Villa with Infinity Pool',
    location: 'Malibu, California',
    price: 450,
    rating: 4.9,
    reviews: 127,
    image: '/placeholder.svg?height=300&width=400',
    host: 'Sarah Johnson',
    amenities: ['WiFi', 'Pool', 'Parking', 'Kitchen'],
    cancellationPolicy: 'Free cancellation until 48 hours before check-in',
  };

  useEffect(() => {
    // Check authentication status
    const authStatus = localStorage.getItem('isAuthenticated');
    if (!authStatus) {
      // Redirect to login with return URL
      navigate(`/auth/login?returnUrl=/booking/${params.id}`);
      return;
    }
    setIsAuthenticated(true);
  }, [params.id]);

  const calculateNights = () => {
    if (!bookingData.checkIn || !bookingData.checkOut) return 0;
    const diffTime = Math.abs(bookingData.checkOut - bookingData.checkIn);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateTotal = () => {
    const nights = calculateNights();
    const subtotal = nights * property.price;
    const cleaningFee = 75;
    const serviceFee = Math.round(subtotal * 0.12);
    const taxes = Math.round(subtotal * 0.08);
    return {
      nights,
      subtotal,
      cleaningFee,
      serviceFee,
      taxes,
      total: subtotal + cleaningFee + serviceFee + taxes,
    };
  };

  const handleBooking = async () => {
    setIsLoading(true);

    // Simulate booking process
    setTimeout(() => {
      // Store booking data
      const booking = {
        id: Date.now(),
        propertyId: property.id,
        propertyTitle: property.title,
        checkIn: bookingData.checkIn,
        checkOut: bookingData.checkOut,
        guests: bookingData.guests,
        total: calculateTotal().total,
        status: 'confirmed',
        bookingDate: new Date(),
      };

      // Save to localStorage (in real app, this would be API call)
      const existingBookings = JSON.parse(
        localStorage.getItem('userBookings') || '[]'
      );
      existingBookings.push(booking);
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));

      // Redirect to confirmation
      navigate(`/booking/confirmation/${booking.id}`);
      setIsLoading(false);
    }, 3000);
  };

  const pricing = calculateTotal();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={`/property/${property.id}`}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to property
            </Link>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Secure Booking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= 1 ? 'bg-rose-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {currentStep > 1 ? <Check className="h-4 w-4" /> : '1'}
                </div>
                <span
                  className={`text-sm ${
                    currentStep >= 1
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500'
                  }`}
                >
                  Trip Details
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-200 mx-4"></div>
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= 2 ? 'bg-rose-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {currentStep > 2 ? <Check className="h-4 w-4" /> : '2'}
                </div>
                <span
                  className={`text-sm ${
                    currentStep >= 2
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500'
                  }`}
                >
                  Payment
                </span>
              </div>
              <div className="flex-1 h-px bg-gray-200 mx-4"></div>
              <div className="flex items-center space-x-4">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    currentStep >= 3 ? 'bg-rose-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  {currentStep > 3 ? <Check className="h-4 w-4" /> : '3'}
                </div>
                <span
                  className={`text-sm ${
                    currentStep >= 3
                      ? 'text-gray-900 font-medium'
                      : 'text-gray-500'
                  }`}
                >
                  Confirmation
                </span>
              </div>
            </div>

            {/* Step 1: Trip Details */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Dates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Check-in</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {bookingData.checkIn
                              ? bookingData.checkIn.toDateString()
                              : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={bookingData.checkIn}
                            onSelect={(date) =>
                              setBookingData({ ...bookingData, checkIn: date })
                            }
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <Label>Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <Calendar className="mr-2 h-4 w-4" />
                            {bookingData.checkOut
                              ? bookingData.checkOut.toDateString()
                              : 'Select date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <CalendarComponent
                            mode="single"
                            selected={bookingData.checkOut}
                            onSelect={(date) =>
                              setBookingData({ ...bookingData, checkOut: date })
                            }
                            disabled={(date) =>
                              date <= (bookingData.checkIn || new Date())
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <Label>Guests</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Users className="mr-2 h-4 w-4" />
                          {bookingData.guests} guest
                          {bookingData.guests !== 1 ? 's' : ''}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-80">
                        <div className="flex items-center justify-between">
                          <span>Guests</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setBookingData({
                                  ...bookingData,
                                  guests: Math.max(1, bookingData.guests - 1),
                                })
                              }
                            >
                              -
                            </Button>
                            <span className="w-8 text-center">
                              {bookingData.guests}
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                setBookingData({
                                  ...bookingData,
                                  guests: bookingData.guests + 1,
                                })
                              }
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <Label htmlFor="requests">
                      Special Requests (Optional)
                    </Label>
                    <textarea
                      id="requests"
                      placeholder="Any special requests or requirements..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24"
                      value={bookingData.specialRequests}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          specialRequests: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Button
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-rose-500 hover:bg-rose-600"
                    disabled={!bookingData.checkIn || !bookingData.checkOut}
                  >
                    Continue to Payment
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Security Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">
                          Secure Payment
                        </h4>
                        <p className="text-sm text-blue-700">
                          Your payment information is encrypted and secure. We
                          never store your card details.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Card Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={paymentData.cardNumber}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            cardNumber: e.target.value,
                          })
                        }
                        maxLength={19}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input
                          id="expiry"
                          placeholder="MM/YY"
                          value={paymentData.expiryDate}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              expiryDate: e.target.value,
                            })
                          }
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={paymentData.cvv}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              cvv: e.target.value,
                            })
                          }
                          maxLength={4}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardholderName">Cardholder Name</Label>
                      <Input
                        id="cardholderName"
                        placeholder="John Doe"
                        value={paymentData.cardholderName}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            cardholderName: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Billing Address */}
                  <div>
                    <h4 className="font-medium mb-4">Billing Address</h4>
                    <div className="space-y-4">
                      <Input
                        placeholder="Street Address"
                        value={paymentData.billingAddress.street}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            billingAddress: {
                              ...paymentData.billingAddress,
                              street: e.target.value,
                            },
                          })
                        }
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="City"
                          value={paymentData.billingAddress.city}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              billingAddress: {
                                ...paymentData.billingAddress,
                                city: e.target.value,
                              },
                            })
                          }
                        />
                        <Input
                          placeholder="State"
                          value={paymentData.billingAddress.state}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              billingAddress: {
                                ...paymentData.billingAddress,
                                state: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="ZIP Code"
                          value={paymentData.billingAddress.zipCode}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              billingAddress: {
                                ...paymentData.billingAddress,
                                zipCode: e.target.value,
                              },
                            })
                          }
                        />
                        <Input
                          placeholder="Country"
                          value={paymentData.billingAddress.country}
                          onChange={(e) =>
                            setPaymentData({
                              ...paymentData,
                              billingAddress: {
                                ...paymentData.billingAddress,
                                country: e.target.value,
                              },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleBooking}
                      className="flex-1 bg-rose-500 hover:bg-rose-600"
                      disabled={
                        isLoading ||
                        !paymentData.cardNumber ||
                        !paymentData.cardholderName
                      }
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Processing...
                        </div>
                      ) : (
                        `Pay $${pricing.total}`
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                {/* Property Info */}
                <div className="flex gap-4 mb-6">
                  <img
                    src={property.image || '/placeholder.svg'}
                    alt={property.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold line-clamp-2">
                      {property.title}
                    </h3>
                    <p className="text-sm text-gray-600">{property.location}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm">⭐ {property.rating}</span>
                      <span className="text-sm text-gray-500">
                        ({property.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Booking Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Check-in</span>
                    <span>
                      {bookingData.checkIn
                        ? bookingData.checkIn.toLocaleDateString()
                        : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Check-out</span>
                    <span>
                      {bookingData.checkOut
                        ? bookingData.checkOut.toLocaleDateString()
                        : 'Not selected'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests</span>
                    <span>{bookingData.guests}</span>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Price Breakdown */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>
                      ${property.price} × {pricing.nights} nights
                    </span>
                    <span>${pricing.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cleaning fee</span>
                    <span>${pricing.cleaningFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>${pricing.serviceFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>${pricing.taxes}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${pricing.total}</span>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-sm">
                        Cancellation Policy
                      </h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {property.cancellationPolicy}
                      </p>
                    </div>
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
