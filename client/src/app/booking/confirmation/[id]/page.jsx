'use client';

import { useState, useEffect } from 'react';
import {
  CheckCircle,
  Calendar,
  Users,
  Download,
  Share2,
  MessageCircle,
} from 'lucide-react';
import { Button } from '../../../../components/ui/button';
import { Card, CardContent } from '../../../../components/ui/card';
import { Badge } from '../../../../components/ui/badge';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar';

export default function BookingConfirmationPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    // Load booking details
    const bookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const foundBooking = bookings.find((b) => b.id.toString() === id);
    setBooking(foundBooking);
  }, [id]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p>Loading booking details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-xl text-gray-600">
            Your reservation has been successfully processed
          </p>
        </div>

        {/* Booking Details */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Property Info */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Your Reservation</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {booking.propertyTitle}
                    </h3>
                    <p className="text-gray-600">Booking ID: #{booking.id}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(booking.checkIn).toLocaleDateString()} -{' '}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {booking.guests} guests
                    </div>
                  </div>

                  <Badge className="bg-green-100 text-green-800">
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Payment Summary */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Paid</span>
                    <span>${booking.total}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Payment processed successfully
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Receipt
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share Trip
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Contact Host
          </Button>
        </div>

        {/* Next Steps */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-rose-600 text-sm font-semibold">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Check your email</h4>
                  <p className="text-sm text-gray-600">
                    We've sent confirmation details and check-in instructions
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-rose-600 text-sm font-semibold">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Contact your host</h4>
                  <p className="text-sm text-gray-600">
                    Introduce yourself and ask any questions about your stay
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-rose-600 text-sm font-semibold">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Prepare for your trip</h4>
                  <p className="text-sm text-gray-600">
                    Review house rules and prepare for an amazing stay
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-8">
          <Button onClick={() => navigate('/bookings')} variant="outline">
            View All Bookings
          </Button>
          <Button
            onClick={() => navigate('/dashboard')}
            className="bg-rose-500 hover:bg-rose-600"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
