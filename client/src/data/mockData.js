// Centralized Mock Data for StayVibe Application
// This file contains all dummy data used across the application

// Host profiles
export const mockHosts = {
  1: {
    id: 1,
    name: 'Sarah Johnson',
    avatar: '/user.png',
    superhost: true,
    joinedYear: 2018,
    reviews: 234,
    responseRate: 98,
    responseTime: 'within an hour',
    verified: true,
    languages: ['English', 'Spanish'],
    about:
      "I'm a travel enthusiast who loves sharing beautiful spaces with guests from around the world.",
  },
  2: {
    id: 2,
    name: 'Michael Chen',
    avatar: '/user.png',
    superhost: false,
    joinedYear: 2020,
    reviews: 89,
    responseRate: 95,
    responseTime: 'within a few hours',
    verified: true,
    languages: ['English', 'Mandarin'],
    about: 'Local architect passionate about modern design and city living.',
  },
  3: {
    id: 3,
    name: 'Emma Wilson',
    avatar: '/user.png',
    superhost: true,
    joinedYear: 2017,
    reviews: 156,
    responseRate: 99,
    responseTime: 'within an hour',
    verified: true,
    languages: ['English', 'French'],
    about:
      'Mountain lover and outdoor adventure guide. Love hosting fellow nature enthusiasts.',
  },
  4: {
    id: 4,
    name: 'David Rodriguez',
    avatar: '/user.png',
    superhost: false,
    joinedYear: 2019,
    reviews: 73,
    responseRate: 92,
    responseTime: 'within a day',
    verified: true,
    languages: ['English', 'Spanish'],
    about:
      'History buff and local guide. My townhouse is perfect for exploring the historic district.',
  },
};

// Host stories/testimonials data
export const mockHostStories = [
  {
    id: 1,
    hostId: 1, // Links to Sarah Johnson in mockHosts
    name: 'Sarah Johnson',
    location: 'Malibu, CA',
    image: '/user.png',
    story:
      'Hosting has allowed me to meet amazing people from around the world while earning enough to pay my mortgage.',
    earnings: '$2,400/month',
    rating: 4.9,
    properties: 2,
    featured: true,
  },
  {
    id: 2,
    hostId: 2, // Links to Michael Chen in mockHosts
    name: 'Michael Chen',
    location: 'New York, NY',
    image: '/user.png',
    story:
      'I started with just one room and now manage 3 properties. StayVibe made it incredibly easy to get started.',
    earnings: '$3,800/month',
    rating: 4.8,
    properties: 3,
    featured: true,
  },
  {
    id: 3,
    hostId: 3, // Links to Emma Wilson in mockHosts
    name: 'Emma Wilson',
    location: 'Aspen, CO',
    image: '/user.png',
    story:
      'The extra income from hosting helped me renovate my cabin and turn it into my dream mountain retreat.',
    earnings: '$1,900/month',
    rating: 5.0,
    properties: 1,
    featured: true,
  },
  {
    id: 4,
    hostId: 4, // Links to David Rodriguez in mockHosts
    name: 'David Rodriguez',
    location: 'Boston, MA',
    image: '/user.png',
    story:
      'The platform gave me the confidence to start hosting. Now I have regular guests who feel like family.',
    earnings: '$1,600/month',
    rating: 4.7,
    properties: 1,
    featured: false,
  },
  {
    id: 5,
    hostId: 1, // Another story from Sarah Johnson
    name: 'Sarah Johnson',
    location: 'Malibu, CA',
    image: '/user.png',
    story:
      'What started as extra income became a passion. I love creating memorable experiences for my guests.',
    earnings: '$2,400/month',
    rating: 4.9,
    properties: 2,
    featured: false,
  },
];

// Host benefits data for the hosting section
export const mockHostBenefits = [
  {
    icon: 'DollarSign',
    title: 'Earn Extra Income',
    description:
      'Make money from your unused space and turn your property into a source of passive income.',
    stat: 'Average $924/month',
  },
  {
    icon: 'Shield',
    title: 'Host Protection',
    description:
      'Comprehensive insurance coverage and 24/7 support to protect you and your property.',
    stat: '$1M+ coverage',
  },
  {
    icon: 'Users',
    title: 'Global Community',
    description:
      'Join millions of hosts worldwide and connect with travelers from every corner of the globe.',
    stat: '4M+ hosts',
  },
  {
    icon: 'Calendar',
    title: 'Flexible Hosting',
    description:
      'Host on your schedule. You control when your space is available and set your own rules.',
    stat: 'Your schedule',
  },
];

// Complete property data
export const mockProperties = {
  1: {
    id: 1,
    title: 'Luxury Beachfront Villa with Infinity Pool',
    location: 'Malibu, California, United States',
    shortLocation: 'Malibu, California',
    price: 450,
    rating: 4.9,
    reviews: 127,
    images: [
      '/img/airbnb1_1.avif',
      '/img/airbnb1_2.avif',
      '/img/airbnb1_3.avif',
      '/img/airbnb1_4.avif',
    ],
    amenities: [
      'Wifi',
      'Pool',
      'Parking',
      'Kitchen',
      'Hot Tub',
      'Gym',
      'Beach Access',
    ],
    type: 'Villa',
    hostId: 1,
    host: mockHosts[1],
    superhost: true,
    instantBook: true,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    beds: 5,
    featured: true,
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
    description: `Welcome to our stunning beachfront villa in Malibu! This luxurious property offers breathtaking ocean views, direct beach access, and world-class amenities. Perfect for families, couples, or groups looking for an unforgettable getaway.
  
  The villa features 4 spacious bedrooms, 3 full bathrooms, a gourmet kitchen, and an infinity pool that seems to merge with the ocean horizon. Wake up to the sound of waves and enjoy spectacular sunsets from your private terrace.`,
    houseRules: [
      'No smoking',
      'No pets allowed',
      'No parties or events',
      'Check-in after 3:00 PM',
      'Check-out before 11:00 AM',
    ],
    cancellationPolicy: 'Free cancellation until 48 hours before check-in',
    coordinates: { lat: 34.0259, lng: -118.7798 },
  },
  2: {
    id: 2,
    title: 'Modern Downtown Apartment with City Views',
    location: 'New York, NY, United States',
    shortLocation: 'New York, NY',
    price: 180,
    rating: 4.7,
    reviews: 89,
    images: [
      '/img/airbnb2_1.avif',
      '/img/airbnb2_2.avif',
      '/img/airbnb2_3.avif',
    ],
    amenities: ['Wifi', 'Kitchen', 'Gym', 'Rooftop', 'Elevator', 'Doorman'],
    type: 'Apartment',
    hostId: 2,
    host: mockHosts[2],
    superhost: false,
    instantBook: true,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    beds: 2,
    featured: false,
    checkInTime: '4:00 PM',
    checkOutTime: '11:00 AM',
    description: `Experience the heart of Manhattan from this sleek, modern apartment with stunning city views. Located in a luxury building with 24/7 doorman service and rooftop access.
  
  The apartment features floor-to-ceiling windows, a fully equipped kitchen, and access to building amenities including a fitness center and rooftop terrace. Perfect for business travelers and city explorers.`,
    houseRules: [
      'No smoking',
      'Pets allowed with approval',
      'Quiet hours after 10 PM',
      'Maximum 4 guests',
    ],
    cancellationPolicy: 'Moderate cancellation policy',
    coordinates: { lat: 40.7589, lng: -73.9851 },
  },
  3: {
    id: 3,
    title: 'Cozy Mountain Cabin with Hot Tub',
    location: 'Aspen, Colorado, United States',
    shortLocation: 'Aspen, Colorado',
    price: 320,
    rating: 4.8,
    reviews: 156,
    images: [
      '/img/airbnb3_1.avif',
      '/img/airbnb3_2.avif',
      '/img/airbnb3_3.avif',
    ],
    amenities: [
      'Wifi',
      'Hot Tub',
      'Parking',
      'Fireplace',
      'Ski Storage',
      'Mountain Views',
    ],
    type: 'Cabin',
    hostId: 3,
    host: mockHosts[3],
    superhost: true,
    instantBook: false,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    beds: 4,
    featured: true,
    checkInTime: '4:00 PM',
    checkOutTime: '10:00 AM',
    description: `Escape to this charming mountain cabin nestled in the Colorado Rockies. Perfect for ski trips, hiking adventures, or simply relaxing in nature.
  
  The cabin features rustic charm with modern amenities, including a private hot tub, stone fireplace, and stunning mountain views from every window. Ski slopes are just minutes away.`,
    houseRules: [
      'No smoking indoors',
      'Pets welcome',
      'No parties',
      'Respect quiet hours',
      'Clean up after outdoor activities',
    ],
    cancellationPolicy: 'Strict cancellation policy',
    coordinates: { lat: 39.1911, lng: -106.8175 },
  },
  4: {
    id: 4,
    title: 'Historic Townhouse in Back Bay',
    location: 'Boston, MA, United States',
    shortLocation: 'Boston, MA',
    price: 220,
    rating: 4.6,
    reviews: 73,
    images: [
      '/img/airbnb4_1.avif',
      '/img/airbnb4_2.avif',
      '/img/airbnb4_3.avif',
      '/img/airbnb4_4.avif',
    ],
    amenities: ['Wifi', 'Kitchen', 'Parking', 'Historic', 'Garden', 'Library'],
    type: 'Townhouse',
    hostId: 4,
    host: mockHosts[4],
    superhost: false,
    instantBook: true,
    bedrooms: 3,
    bathrooms: 2,
    guests: 6,
    beds: 4,
    featured: false,
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
    description: `Step back in time in this beautifully preserved Victorian townhouse in Boston's prestigious Back Bay neighborhood. Rich in history and character, with modern comforts.
  
  Features original hardwood floors, period details, a private garden, and a cozy library. Walking distance to the Freedom Trail, museums, and excellent restaurants.`,
    houseRules: [
      'No smoking',
      'No pets',
      'Respect the historic nature of the property',
      'Quiet hours after 9 PM',
      'Maximum 6 guests',
    ],
    cancellationPolicy: 'Flexible cancellation policy',
    coordinates: { lat: 42.3505, lng: -71.0759 },
  },
};

// Convert to array for components that need it
export const mockPropertiesArray = Object.values(mockProperties);

// Notification data
export const mockNotifications = [
  {
    id: 1,
    type: 'price_drop',
    title: 'Price Drop Alert! 🎉',
    message: 'The villa in Malibu you saved dropped by $50/night',
    timestamp: '2 hours ago',
    action: 'View Deal',
    actionUrl: '/property/1',
    propertyId: 1,
    priority: 'high',
  },
  {
    id: 2,
    type: 'ai_recommendation',
    title: 'Perfect Match Found! ✨',
    message: 'New property in New York matches your preferences 95%',
    timestamp: '4 hours ago',
    action: 'See Property',
    actionUrl: '/property/2',
    propertyId: 2,
    priority: 'medium',
  },
  {
    id: 3,
    type: 'booking_reminder',
    title: 'Trip Reminder 📅',
    message: 'Your Aspen trip is in 3 days. Check-in details ready!',
    timestamp: '1 day ago',
    action: 'View Trip',
    actionUrl: '/bookings',
    propertyId: 3,
    priority: 'high',
  },
  {
    id: 4,
    type: 'wishlist_available',
    title: 'Wishlist Property Available! ❤️',
    message: 'The cabin in Aspen is now available for your dates',
    timestamp: '2 days ago',
    action: 'Book Now',
    actionUrl: '/property/3',
    propertyId: 3,
    priority: 'medium',
  },
];

// Booking data
export const mockBookings = [
  {
    id: 1001,
    propertyId: 1,
    property: mockProperties[1],
    checkIn: new Date('2024-07-15'),
    checkOut: new Date('2024-07-20'),
    guests: 4,
    totalAmount: 2500,
    status: 'confirmed',
    bookingDate: new Date('2024-06-15'),
    confirmationCode: 'SV-1001-MALIBU',
  },
  {
    id: 1002,
    propertyId: 3,
    property: mockProperties[3],
    checkIn: new Date('2024-08-10'),
    checkOut: new Date('2024-08-15'),
    guests: 6,
    totalAmount: 1800,
    status: 'upcoming',
    bookingDate: new Date('2024-07-01'),
    confirmationCode: 'SV-1002-ASPEN',
  },
];

// Featured destinations data
export const mockDestinations = [
  {
    id: 1,
    name: 'Paris, France',
    properties: 1200,
    image: '/city/paris.jpeg',
    description: 'City of Light',
    averagePrice: 180,
    rating: 4.8,
    trending: true,
    popularAmenities: ['WiFi', 'Kitchen', 'Historic'],
  },
  {
    id: 2,
    name: 'Tokyo, Japan',
    properties: 890,
    image: '/city/tokyo.jpeg',
    description: 'Modern Metropolis',
    averagePrice: 220,
    rating: 4.9,
    trending: true,
    popularAmenities: ['WiFi', 'Modern', 'City Center'],
  },
  {
    id: 3,
    name: 'New York, USA',
    properties: 2100,
    image: '/city/newyork.jpeg',
    description: 'The Big Apple',
    averagePrice: 280,
    rating: 4.7,
    trending: false,
    popularAmenities: ['WiFi', 'Gym', 'Rooftop'],
  },
  {
    id: 4,
    name: 'London, UK',
    properties: 1500,
    image: '/city/paris.jpeg',
    description: 'Historic Capital',
    averagePrice: 200,
    rating: 4.6,
    trending: false,
    popularAmenities: ['WiFi', 'Historic', 'Garden'],
  },
  {
    id: 5,
    name: 'Bali, Indonesia',
    properties: 650,
    image: '/city/paris.jpeg',
    description: 'Tropical Paradise',
    averagePrice: 120,
    rating: 4.9,
    trending: true,
    popularAmenities: ['Pool', 'Beach', 'Spa'],
  },
  {
    id: 6,
    name: 'Dubai, UAE',
    properties: 780,
    image: '/city/paris.jpeg',
    description: 'Desert Oasis',
    averagePrice: 350,
    rating: 4.8,
    trending: false,
    popularAmenities: ['Luxury', 'Pool', 'Desert'],
  },
];

// Hero content data
export const mockHeroContent = [
  {
    title: 'Luxury Beach Villa',
    subtitle: 'in Santorini',
    location: 'Santorini, Greece',
    description: 'Wake up to breathtaking sunsets over the Aegean Sea',
    image:
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    videoPreview:
      'https://commondatastorage.googleapis.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    title: 'Modern City Loft',
    subtitle: 'in Tokyo',
    location: 'Shibuya, Tokyo',
    description: "Experience the pulse of Japan's vibrant capital",
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    videoPreview:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    title: 'Mountain Retreat',
    subtitle: 'in Swiss Alps',
    location: 'Zermatt, Switzerland',
    description: 'Find serenity among snow-capped peaks',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
    videoPreview:
      'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
];

// Wishlist management functions
export const getWishlistProperties = () => {
  const wishlistIds = JSON.parse(localStorage.getItem('userWishlist') || '[]');
  return wishlistIds.map((id) => mockProperties[id]).filter(Boolean);
};

export const toggleWishlist = (propertyId) => {
  const wishlist = JSON.parse(localStorage.getItem('userWishlist') || '[]');
  const index = wishlist.indexOf(propertyId);

  if (index > -1) {
    wishlist.splice(index, 1);
  } else {
    wishlist.push(propertyId);
  }

  localStorage.setItem('userWishlist', JSON.stringify(wishlist));
  return wishlist;
};

export const isInWishlist = (propertyId) => {
  const wishlist = JSON.parse(localStorage.getItem('userWishlist') || '[]');
  return wishlist.includes(propertyId);
};

// Booking management functions
export const createBooking = (bookingData) => {
  const booking = {
    id: Date.now(),
    ...bookingData,
    bookingDate: new Date(),
    status: 'confirmed',
  };

  const existingBookings = JSON.parse(
    localStorage.getItem('userBookings') || '[]'
  );
  existingBookings.push(booking);
  localStorage.setItem('userBookings', JSON.stringify(existingBookings));

  return booking;
};

export const getUserBookings = () => {
  return JSON.parse(localStorage.getItem('userBookings') || '[]');
};

export const getBookingById = (id) => {
  const bookings = getUserBookings();
  return bookings.find((booking) => booking.id.toString() === id.toString());
};

// Utility functions
export const getPropertyById = (id) => {
  return mockProperties[Number.parseInt(id)];
};

export const getHostById = (id) => {
  return mockHosts[Number.parseInt(id)];
};

export const getPropertiesByHostId = (hostId) => {
  return mockPropertiesArray.filter(
    (property) => property.hostId === Number.parseInt(hostId)
  );
};

export const getFeaturedProperties = () => {
  return mockPropertiesArray.filter((property) => property.featured);
};

export const getPropertiesByType = (type) => {
  return mockPropertiesArray.filter(
    (property) => property.type.toLowerCase() === type.toLowerCase()
  );
};

export const searchProperties = (filters = {}) => {
  let results = [...mockPropertiesArray];

  if (filters.location) {
    results = results.filter(
      (property) =>
        property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase()) ||
        property.shortLocation
          .toLowerCase()
          .includes(filters.location.toLowerCase())
    );
  }

  if (filters.priceRange) {
    results = results.filter(
      (property) =>
        property.price >= filters.priceRange[0] &&
        property.price <= filters.priceRange[1]
    );
  }

  if (filters.propertyType && filters.propertyType !== 'all') {
    results = results.filter(
      (property) =>
        property.type.toLowerCase() === filters.propertyType.toLowerCase()
    );
  }

  if (filters.amenities && filters.amenities.length > 0) {
    results = results.filter((property) =>
      filters.amenities.every((amenity) => property.amenities.includes(amenity))
    );
  }

  if (filters.guests) {
    results = results.filter((property) => property.guests >= filters.guests);
  }

  return results;
};

// Host story utility functions
export const getFeaturedHostStories = () => {
  return mockHostStories.filter((story) => story.featured);
};

export const getHostStoriesByHostId = (hostId) => {
  return mockHostStories.filter(
    (story) => story.hostId === Number.parseInt(hostId)
  );
};

export const getAllHostStories = () => {
  return mockHostStories;
};

// Default export for easy importing
export default {
  properties: mockProperties,
  propertiesArray: mockPropertiesArray,
  hosts: mockHosts,
  hostStories: mockHostStories,
  hostBenefits: mockHostBenefits,
  notifications: mockNotifications,
  bookings: mockBookings,
  destinations: mockDestinations,
  heroContent: mockHeroContent,
  getPropertyById,
  getHostById,
  getPropertiesByHostId,
  getFeaturedProperties,
  getPropertiesByType,
  searchProperties,
  getWishlistProperties,
  toggleWishlist,
  isInWishlist,
  createBooking,
  getUserBookings,
  getBookingById,
  getFeaturedHostStories,
  getHostStoriesByHostId,
  getAllHostStories,
};
