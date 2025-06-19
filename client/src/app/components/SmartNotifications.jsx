'use client';

import { useState, useEffect } from 'react';
import { Bell, X, Calendar, TrendingDown, Zap, Heart } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function SmartNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const mockNotifications = [
    {
      id: 1,
      type: 'price_drop',
      title: 'Price Drop Alert! 🎉',
      message: 'The villa in Santorini you saved dropped by $50/night',
      timestamp: '2 hours ago',
      action: 'View Deal',
      icon: <TrendingDown className="h-5 w-5 text-green-500" />,
      priority: 'high',
    },
    {
      id: 2,
      type: 'ai_recommendation',
      title: 'Perfect Match Found! ✨',
      message: 'New property in Tokyo matches your preferences 95%',
      timestamp: '4 hours ago',
      action: 'See Property',
      icon: <Zap className="h-5 w-5 text-purple-500" />,
      priority: 'medium',
    },
    {
      id: 3,
      type: 'booking_reminder',
      title: 'Trip Reminder 📅',
      message: 'Your Paris trip is in 3 days. Check-in details ready!',
      timestamp: '1 day ago',
      action: 'View Trip',
      icon: <Calendar className="h-5 w-5 text-blue-500" />,
      priority: 'high',
    },
    {
      id: 4,
      type: 'wishlist_available',
      title: 'Wishlist Property Available! ❤️',
      message: 'The cabin in Swiss Alps is now available for your dates',
      timestamp: '2 days ago',
      action: 'Book Now',
      icon: <Heart className="h-5 w-5 text-rose-500" />,
      priority: 'medium',
    },
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-rose-500">
            {unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-12 w-96 z-50">
          <Card className="shadow-2xl border-2">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Smart Notifications</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-0 max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No new notifications</p>
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b hover:bg-gray-50 transition-colors ${
                        notification.priority === 'high'
                          ? 'border-l-4 border-l-rose-500'
                          : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 mt-1">
                          {notification.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-gray-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-xs text-gray-500">
                              {notification.timestamp}
                            </span>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs h-6"
                                onClick={() =>
                                  dismissNotification(notification.id)
                                }
                              >
                                Dismiss
                              </Button>
                              <Button
                                size="sm"
                                className="text-xs h-6 bg-rose-500 hover:bg-rose-600"
                              >
                                {notification.action}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
