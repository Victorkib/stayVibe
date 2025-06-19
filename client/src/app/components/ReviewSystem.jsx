'use client';

import { useState } from 'react';
import { Star, ThumbsUp, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

export default function ReviewSystem({
  propertyId,
  reviews = [],
  onAddReview,
}) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    comment: '',
    categories: {
      cleanliness: 0,
      accuracy: 0,
      communication: 0,
      location: 0,
      checkin: 0,
      value: 0,
    },
  });

  const mockReviews = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: '/placeholder.svg?height=40&width=40',
        verified: true,
        reviewCount: 23,
      },
      rating: 5,
      title: 'Amazing stay with incredible views!',
      comment:
        'This place exceeded all our expectations. The view from the balcony was breathtaking, and the host was incredibly responsive. The apartment was spotless and had everything we needed for our week-long stay.',
      date: 'November 2024',
      helpful: 12,
      categories: {
        cleanliness: 5,
        accuracy: 5,
        communication: 5,
        location: 4,
        checkin: 5,
        value: 4,
      },
      photos: [
        '/placeholder.svg?height=100&width=150',
        '/placeholder.svg?height=100&width=150',
      ],
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: '/placeholder.svg?height=40&width=40',
        verified: false,
        reviewCount: 8,
      },
      rating: 4,
      title: 'Great location, minor issues',
      comment:
        'Perfect location for exploring the city. Walking distance to all major attractions. The only downside was the WiFi was a bit slow, but overall a great experience.',
      date: 'October 2024',
      helpful: 8,
      categories: {
        cleanliness: 4,
        accuracy: 4,
        communication: 4,
        location: 5,
        checkin: 4,
        value: 4,
      },
    },
    {
      id: 3,
      user: {
        name: 'Emma Wilson',
        avatar: '/placeholder.svg?height=40&width=40',
        verified: true,
        reviewCount: 45,
      },
      rating: 5,
      title: 'Perfect for families!',
      comment:
        'Traveled with my family of 4 and this place was perfect. Kids loved the pool, and the kitchen was well-equipped for cooking meals. Host provided great local recommendations.',
      date: 'September 2024',
      helpful: 15,
      categories: {
        cleanliness: 5,
        accuracy: 5,
        communication: 5,
        location: 4,
        checkin: 5,
        value: 5,
      },
    },
  ];

  const allReviews = [...mockReviews, ...reviews];

  const averageRating = allReviews.length
    ? allReviews.reduce((sum, review) => sum + review.rating, 0) /
      allReviews.length
    : 0;

  const categoryAverages = allReviews.length
    ? Object.keys(newReview.categories).reduce((acc, category) => {
        acc[category] =
          allReviews.reduce(
            (sum, review) => sum + (review.categories?.[category] || 0),
            0
          ) / allReviews.length;
        return acc;
      }, {})
    : {};

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: allReviews.filter((review) => review.rating === rating).length,
    percentage: allReviews.length
      ? (allReviews.filter((review) => review.rating === rating).length /
          allReviews.length) *
        100
      : 0,
  }));

  const handleSubmitReview = () => {
    if (newReview.rating === 0 || !newReview.comment.trim()) {
      alert('Please provide a rating and comment');
      return;
    }

    const review = {
      id: Date.now(),
      user: {
        name: localStorage.getItem('userName') || 'Anonymous User',
        avatar: '/placeholder.svg?height=40&width=40',
        verified: true,
        reviewCount: 1,
      },
      ...newReview,
      date: new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      helpful: 0,
    };

    onAddReview?.(review);
    setNewReview({
      rating: 0,
      title: '',
      comment: '',
      categories: {
        cleanliness: 0,
        accuracy: 0,
        communication: 0,
        location: 0,
        checkin: 0,
        value: 0,
      },
    });
    setShowReviewForm(false);
  };

  const renderStars = (
    rating,
    size = 'h-4 w-4',
    interactive = false,
    onRate = null
  ) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate?.(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Reviews Summary */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Overall Rating */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">
                    {averageRating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center mb-1">
                    {renderStars(Math.round(averageRating))}
                  </div>
                  <div className="text-sm text-gray-600">
                    {allReviews.length} reviews
                  </div>
                </div>
                <div className="flex-1">
                  {ratingDistribution.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center gap-2 mb-1">
                      <span className="text-sm w-8">{rating}</span>
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600 w-8">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Category Ratings */}
            <div>
              <h4 className="font-semibold mb-4">Rating Breakdown</h4>
              <div className="space-y-3">
                {Object.entries(categoryAverages).map(([category, average]) => (
                  <div
                    key={category}
                    className="flex items-center justify-between"
                  >
                    <span className="text-sm capitalize">{category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-rose-500 h-2 rounded-full"
                          style={{ width: `${(average / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium w-8">
                        {average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <Button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-rose-500 hover:bg-rose-600"
          >
            Write a Review
          </Button>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Write Your Review</h3>

            <div className="space-y-6">
              {/* Overall Rating */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {renderStars(newReview.rating, 'h-6 w-6', true, (rating) =>
                    setNewReview({ ...newReview, rating })
                  )}
                  <span className="text-sm text-gray-600 ml-2">
                    {newReview.rating === 0
                      ? 'Select rating'
                      : `${newReview.rating} star${
                          newReview.rating !== 1 ? 's' : ''
                        }`}
                  </span>
                </div>
              </div>

              {/* Category Ratings */}
              <div>
                <label className="block text-sm font-medium mb-3">
                  Rate Categories
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(newReview.categories).map(
                    ([category, rating]) => (
                      <div
                        key={category}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm capitalize">{category}</span>
                        {renderStars(rating, 'h-4 w-4', true, (newRating) =>
                          setNewReview({
                            ...newReview,
                            categories: {
                              ...newReview.categories,
                              [category]: newRating,
                            },
                          })
                        )}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Review Title */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  placeholder="Summarize your experience"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  value={newReview.title}
                  onChange={(e) =>
                    setNewReview({ ...newReview, title: e.target.value })
                  }
                />
              </div>

              {/* Review Comment */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Your Review
                </label>
                <textarea
                  placeholder="Share your experience with future guests..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleSubmitReview}
                  className="bg-rose-500 hover:bg-rose-600"
                >
                  Submit Review
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowReviewForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold">Guest Reviews</h3>

        {allReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.user.avatar || '/placeholder.svg'} />
                  <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold">{review.user.name}</h4>
                    {review.user.verified && (
                      <Badge variant="secondary" className="text-xs">
                        Verified
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500">
                      • {review.user.reviewCount} reviews
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600">
                      • {review.date}
                    </span>
                  </div>

                  {review.title && (
                    <h5 className="font-medium mb-2">{review.title}</h5>
                  )}

                  <p className="text-gray-700 mb-4">{review.comment}</p>

                  {review.photos && review.photos.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo || '/placeholder.svg'}
                          alt={`Review photo ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                      <ThumbsUp className="h-4 w-4" />
                      Helpful ({review.helpful})
                    </button>
                    <button className="flex items-center gap-1 text-gray-600 hover:text-gray-900">
                      <Flag className="h-4 w-4" />
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
