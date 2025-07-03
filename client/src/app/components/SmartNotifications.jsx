'use client';

import { useState, useEffect } from 'react';
import {
  Bell,
  X,
  Calendar,
  TrendingDown,
  Zap,
  Heart,
  Clock,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { mockNotifications, getPropertyById } from '../../data/mockData';

export default function SmartNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load notifications and enrich with property data
    const enrichedNotifications = mockNotifications.map((notification) => ({
      ...notification,
      property: notification.propertyId
        ? getPropertyById(notification.propertyId)
        : null,
      icon: getNotificationIcon(notification.type),
    }));
    setNotifications(enrichedNotifications);
  }, []);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'price_drop':
        return <TrendingDown className="h-5 w-5 text-green-500" />;
      case 'ai_recommendation':
        return <Zap className="h-5 w-5 text-purple-500" />;
      case 'booking_reminder':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'wishlist_available':
        return <Heart className="h-5 w-5 text-rose-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleNotificationAction = (notification) => {
    if (notification.propertyId) {
      // Store property data for navigation
      const property = getPropertyById(notification.propertyId);
      if (property) {
        localStorage.setItem('currentProperty', JSON.stringify(property));
      }
    }

    if (notification.actionUrl) {
      navigate(notification.actionUrl);
      setIsOpen(false);
    }

    console.log('Notification action clicked:', notification.type);
  };

  const markAllAsRead = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.length;

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative hover:bg-gray-100 transition-colors"
      >
        <Bell className="h-5 w-5 text-gray-600" />
        {unreadCount > 0 && (
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-rose-500 text-white animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Notification Panel */}
          <div className="absolute right-0 top-12 w-96 z-50 bg-white shadow-2xl border rounded-xl overflow-hidden">
            <Card className="shadow-none border-0">
              {/* Header */}
              <div className="p-4 border-b bg-gradient-to-r from-rose-50 to-pink-50">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg text-gray-900">
                    Smart Notifications
                  </h3>
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs"
                      >
                        Mark all read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600 mt-1">
                    You have {unreadCount} new{' '}
                    {unreadCount === 1 ? 'notification' : 'notifications'}
                  </p>
                )}
              </div>

              {/* Notifications List */}
              <CardContent className="p-0 max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p className="font-medium">All caught up!</p>
                    <p className="text-sm">No new notifications</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                          notification.priority === 'high'
                            ? 'border-l-4 border-l-rose-500 bg-rose-50/30'
                            : ''
                        }`}
                        onClick={() => handleNotificationAction(notification)}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 mt-1">
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <h4 className="font-medium text-sm text-gray-900 line-clamp-1">
                                {notification.title}
                              </h4>
                              {notification.priority === 'high' && (
                                <Badge className="ml-2 bg-rose-100 text-rose-700 text-xs">
                                  High
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            {notification.property && (
                              <div className="flex items-center gap-2 mt-2 p-2 bg-gray-50 rounded-lg">
                                <img
                                  src={
                                    notification.property.images[0] ||
                                    '/placeholder.svg'
                                  }
                                  alt={notification.property.title}
                                  className="w-8 h-8 rounded object-cover"
                                />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-medium text-gray-900 truncate">
                                    {notification.property.title}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    ${notification.property.price}/night
                                  </p>
                                </div>
                              </div>
                            )}
                            <div className="flex justify-between items-center mt-3">
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                {notification.timestamp}
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-xs h-6 px-2 hover:bg-gray-200"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    dismissNotification(notification.id);
                                  }}
                                >
                                  Dismiss
                                </Button>
                                <Button
                                  size="sm"
                                  className="text-xs h-6 px-3 bg-rose-500 hover:bg-rose-600 text-white"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleNotificationAction(notification);
                                  }}
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

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t bg-gray-50">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full text-sm text-gray-600 hover:text-gray-900"
                    onClick={() => {
                      navigate('/notifications');
                      setIsOpen(false);
                    }}
                  >
                    View all notifications
                  </Button>
                </div>
              )}
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
