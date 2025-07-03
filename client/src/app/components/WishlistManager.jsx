'use client';

import { useState, useEffect } from 'react';
import { Heart, X, Share2, Calendar, Users } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';

export default function WishlistManager() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = JSON.parse(
      localStorage.getItem('userWishlist') || '[]'
    );
    setWishlistItems(savedWishlist);
  }, []);

  const removeFromWishlist = (propertyId) => {
    const updatedWishlist = wishlistItems.filter(
      (item) => item.id !== propertyId
    );
    setWishlistItems(updatedWishlist);
    localStorage.setItem('userWishlist', JSON.stringify(updatedWishlist));
  };

  const shareWishlist = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Travel Wishlist',
        text: 'Check out my travel wishlist on DewdropBnb!',
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Wishlist link copied to clipboard!');
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="text-center py-12">
        <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Your Wishlist is Empty
        </h3>
        <p className="text-gray-600 mb-6">
          Start saving properties you love to build your dream trip list
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-rose-500 hover:bg-rose-600"
        >
          Explore Properties
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
          <p className="text-gray-600">
            {wishlistItems.length} saved properties
          </p>
        </div>
        <Button
          variant="outline"
          onClick={shareWishlist}
          className="flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share Wishlist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((property) => (
          <Card
            key={property.id}
            className="group cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={property.image || '/placeholder.svg'}
                alt={property.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromWishlist(property.id);
                }}
                className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-90 hover:bg-opacity-100 transition-all"
              >
                <X className="h-4 w-4 text-gray-600" />
              </button>
              <Badge className="absolute top-3 left-3 bg-white text-gray-800">
                ${property.price}/night
              </Badge>
            </div>

            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                {property.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">{property.location}</p>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {property.guests || 4} guests
                </div>
                <div className="flex items-center gap-1">
                  ⭐ {property.rating}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/property/${property.id}`)}
                  className="flex-1 bg-rose-500 hover:bg-rose-600"
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate(`/booking/${property.id}`)}
                  className="flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  Book
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
