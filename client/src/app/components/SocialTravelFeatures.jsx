'use client';

import { useState } from 'react';
import {
  Users,
  Share2,
  MessageCircle,
  Camera,
  MapPin,
  Heart,
  Plus,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';

export default function SocialTravelFeatures() {
  const [activeTab, setActiveTab] = useState('feed');

  const travelPosts = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        avatar: '/placeholder.svg?height=40&width=40',
        verified: true,
      },
      location: 'Santorini, Greece',
      image: '/placeholder.svg?height=300&width=400',
      caption:
        'Sunset views from our villa were absolutely breathtaking! 🌅 #Santorini #Paradise',
      likes: 124,
      comments: 18,
      timestamp: '2 hours ago',
      property: 'Luxury Villa with Infinity Pool',
    },
    {
      id: 2,
      user: {
        name: 'Mike Chen',
        avatar: '/placeholder.svg?height=40&width=40',
        verified: false,
      },
      location: 'Tokyo, Japan',
      image: '/placeholder.svg?height=300&width=400',
      caption:
        'Traditional ryokan experience in the heart of Tokyo. The hospitality was incredible! 🏮',
      likes: 89,
      comments: 12,
      timestamp: '5 hours ago',
      property: 'Authentic Ryokan Experience',
    },
  ];

  const travelBuddies = [
    {
      id: 1,
      name: 'Emma Wilson',
      avatar: '/placeholder.svg?height=40&width=40',
      location: 'Paris, France',
      travelStyle: 'Culture Explorer',
      mutualFriends: 5,
      status: 'Looking for travel buddy',
    },
    {
      id: 2,
      name: 'David Kim',
      avatar: '/placeholder.svg?height=40&width=40',
      location: 'Bali, Indonesia',
      travelStyle: 'Adventure Seeker',
      mutualFriends: 3,
      status: 'Planning trip to Thailand',
    },
  ];

  const travelGroups = [
    {
      id: 1,
      name: 'Solo Female Travelers',
      members: 1247,
      image: '/placeholder.svg?height=60&width=60',
      description:
        'Safe travels and amazing experiences for solo female adventurers',
    },
    {
      id: 2,
      name: 'Digital Nomads Hub',
      members: 892,
      image: '/placeholder.svg?height=60&width=60',
      description: 'Remote work friendly accommodations and co-working spaces',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Social Navigation */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        <Button
          variant={activeTab === 'feed' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('feed')}
          className="flex-1"
        >
          <Camera className="h-4 w-4 mr-2" />
          Travel Feed
        </Button>
        <Button
          variant={activeTab === 'buddies' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('buddies')}
          className="flex-1"
        >
          <Users className="h-4 w-4 mr-2" />
          Find Buddies
        </Button>
        <Button
          variant={activeTab === 'groups' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setActiveTab('groups')}
          className="flex-1"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Groups
        </Button>
      </div>

      {/* Travel Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* Create Post */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Input
                  placeholder="Share your travel experience..."
                  className="flex-1"
                />
                <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                  <Camera className="h-4 w-4 mr-2" />
                  Post
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          {travelPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={post.user.avatar || '/placeholder.svg'}
                      />
                      <AvatarFallback>
                        {post.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-1">
                        <h4 className="font-semibold">{post.user.name}</h4>
                        {post.user.verified && (
                          <Badge variant="secondary" className="text-xs">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <MapPin className="h-3 w-3 mr-1" />
                        {post.location}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {post.timestamp}
                  </span>
                </div>
              </CardHeader>

              <div className="px-6 pb-3">
                <p className="text-gray-800">{post.caption}</p>
                <Badge variant="outline" className="mt-2 text-xs">
                  Stayed at: {post.property}
                </Badge>
              </div>

              <img
                src={post.image || '/placeholder.svg'}
                alt="Travel post"
                className="w-full h-64 object-cover"
              />

              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <Heart className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center space-x-1"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Travel Buddies */}
      {activeTab === 'buddies' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Find Travel Buddies</h3>
            <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Request
            </Button>
          </div>

          {travelBuddies.map((buddy) => (
            <Card key={buddy.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={buddy.avatar || '/placeholder.svg'} />
                      <AvatarFallback>{buddy.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{buddy.name}</h4>
                      <p className="text-sm text-gray-600 flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {buddy.location}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {buddy.travelStyle}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {buddy.mutualFriends} mutual connections
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-green-600 font-medium mb-2">
                      {buddy.status}
                    </p>
                    <Button size="sm" variant="outline">
                      Connect
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Travel Groups */}
      {activeTab === 'groups' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Travel Communities</h3>
            <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
              <Plus className="h-4 w-4 mr-2" />
              Create Group
            </Button>
          </div>

          {travelGroups.map((group) => (
            <Card key={group.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={group.image || '/placeholder.svg'}
                      alt={group.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{group.name}</h4>
                      <p className="text-sm text-gray-600">
                        {group.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {group.members.toLocaleString()} members
                      </p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
                    Join Group
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
