'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  Download,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import { Separator } from '../../components/ui/separator';

export default function BookingManagement() {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');

  useEffect(() => {
    // Load bookings from localStorage
    const savedBookings = JSON.parse(
      localStorage.getItem('userBookings') || '[]'
    );
    setBookings(savedBookings);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filterBookings = (filter) => {
    const now = new Date();
    return bookings.filter((booking) => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);

      switch (filter) {
        case 'upcoming':
          return checkIn > now && booking.status !== 'cancelled';
        case 'current':
          return (
            checkIn <= now && checkOut >= now && booking.status === 'confirmed'
          );
        case 'past':
          return checkOut < now;
        case 'cancelled':
          return booking.status === 'cancelled';
        default:
          return true;
      }
    });
  };

  const handleCancelBooking = (bookingId) => {
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
  };

  const handleContactHost = (booking) => {
    // In a real app, this would open a messaging interface
    alert(`Contacting host for ${booking.propertyTitle}`);
  };

  const handleDownloadReceipt = (booking) => {
    // In a real app, this would generate and download a PDF receipt
    alert(`Downloading receipt for booking #${booking.id}`);
  };

  const renderBookingCard = (booking) => (
    <Card key={booking.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-lg mb-2">
              {booking.propertyTitle}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
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
            <div className="flex items-center gap-2">
              {getStatusIcon(booking.status)}
              <Badge className={getStatusColor(booking.status)}>
                {booking.status.charAt(0).toUpperCase() +
                  booking.status.slice(1)}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">
              ${booking.total}
            </div>
            <div className="text-sm text-gray-600">Total</div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">Booking ID: #{booking.id}</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleContactHost(booking)}
              className="flex items-center gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              Contact Host
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDownloadReceipt(booking)}
              className="flex items-center gap-1"
            >
              <Download className="h-4 w-4" />
              Receipt
            </Button>
            {booking.status === 'confirmed' &&
              new Date(booking.checkIn) > new Date() && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancelBooking(booking.id)}
                >
                  Cancel
                </Button>
              )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">My Bookings</h2>
        <p className="text-gray-600">
          Manage your reservations and travel plans
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="upcoming" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Upcoming ({filterBookings('upcoming').length})
          </TabsTrigger>
          <TabsTrigger value="current" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Current ({filterBookings('current').length})
          </TabsTrigger>
          <TabsTrigger value="past" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Past ({filterBookings('past').length})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex items-center gap-2">
            <XCircle className="h-4 w-4" />
            Cancelled ({filterBookings('cancelled').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {filterBookings('upcoming').length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Upcoming Trips
                </h3>
                <p className="text-gray-600 mb-4">
                  Start planning your next adventure!
                </p>
                <Button className="bg-rose-500 hover:bg-rose-600">
                  Explore Properties
                </Button>
              </CardContent>
            </Card>
          ) : (
            filterBookings('upcoming').map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="current" className="space-y-4">
          {filterBookings('current').length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Current Stays
                </h3>
                <p className="text-gray-600">
                  You don't have any active bookings right now.
                </p>
              </CardContent>
            </Card>
          ) : (
            filterBookings('current').map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {filterBookings('past').length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Past Trips
                </h3>
                <p className="text-gray-600">
                  Your travel history will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            filterBookings('past').map(renderBookingCard)
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {filterBookings('cancelled').length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <XCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Cancelled Bookings
                </h3>
                <p className="text-gray-600">
                  You haven't cancelled any bookings.
                </p>
              </CardContent>
            </Card>
          ) : (
            filterBookings('cancelled').map(renderBookingCard)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
