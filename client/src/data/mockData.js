// Centralized Mock Data for DewdropBnb Application
// This file contains all dummy data used across the application

// Host profiles - Enhanced with new hosts
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
  // New hosts for additional destinations
  5: {
    id: 5,
    name: 'Dimitris Papadopoulos',
    avatar: '/user.png',
    superhost: true,
    joinedYear: 2016,
    reviews: 312,
    responseRate: 99,
    responseTime: 'within an hour',
    verified: true,
    languages: ['English', 'Greek'],
    about:
      'Local Santorini host passionate about sharing the beauty of our island.',
  },
  6: {
    id: 6,
    name: 'Made Sutrisna',
    avatar: '/user.png',
    superhost: true,
    joinedYear: 2015,
    reviews: 445,
    responseRate: 98,
    responseTime: 'within an hour',
    verified: true,
    languages: ['English', 'Indonesian'],
    about: 'Balinese host dedicated to sharing authentic island experiences.',
  },
  7: {
    id: 7,
    name: 'Ahmed Al-Rashid',
    avatar: '/user.png',
    superhost: false,
    joinedYear: 2019,
    reviews: 156,
    responseRate: 95,
    responseTime: 'within a few hours',
    verified: true,
    languages: ['English', 'Arabic'],
    about:
      'Dubai resident passionate about luxury hospitality and local culture.',
  },
  8: {
    id: 8,
    name: 'Marco Benedetti',
    avatar: '/user.png',
    superhost: true,
    joinedYear: 2014,
    reviews: 389,
    responseRate: 99,
    responseTime: 'within an hour',
    verified: true,
    languages: ['English', 'Italian'],
    about:
      'Third-generation winemaker sharing the beauty of Tuscan countryside.',
  },
  9: {
    id: 9,
    name: 'Sophie Dubois',
    avatar: '/user.png',
    superhost: true,
    joinedYear: 2017,
    reviews: 234,
    responseRate: 97,
    responseTime: 'within an hour',
    verified: true,
    languages: ['English', 'French'],
    about: 'Parisian artist sharing the magic of Montmartre with travelers.',
  },
  10: {
    id: 10,
    name: 'Hiroshi Tanaka',
    avatar: '/user.png',
    superhost: false,
    joinedYear: 2018,
    reviews: 178,
    responseRate: 94,
    responseTime: 'within a few hours',
    verified: true,
    languages: ['English', 'Japanese'],
    about: 'Tokyo local passionate about modern Japanese culture and design.',
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
      'I started with just one room and now manage 3 properties. DewdropBnb made it incredibly easy to get started.',
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

// Complete property data - Enhanced with new properties
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
    destination: 'Malibu, California',
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
    destination: 'New York, USA',
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
    destination: 'Aspen, Colorado',
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
    destination: 'Boston, Massachusetts',
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
  // New properties for additional destinations
  101: {
    id: 101,
    title: 'Luxury Cave House with Caldera Views',
    location: 'Oia, Santorini, Greece',
    shortLocation: 'Santorini, Greece',
    price: 520,
    rating: 4.9,
    reviews: 89,
    images: [
      '/img/santorini1_1.avif',
      '/img/santorini1_2.avif',
      '/img/santorini1_3.avif',
    ],
    amenities: ['Wifi', 'Pool', 'Sea View', 'Terrace', 'Kitchen', 'Hot Tub'],
    type: 'Villa',
    hostId: 5,
    host: mockHosts[5],
    superhost: true,
    instantBook: true,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    beds: 2,
    featured: true,
    destination: 'Santorini, Greece',
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
    description: `Experience the magic of Santorini from this stunning cave house carved into the cliffs of Oia. Wake up to breathtaking caldera views and world-famous sunsets right from your private terrace.

This traditional Cycladic home features modern amenities while maintaining its authentic charm. The infinity pool seems to merge with the Aegean Sea, creating an unforgettable backdrop for your Greek island getaway.`,
    houseRules: [
      'No smoking',
      'No parties or events',
      'Respect quiet hours',
      'Maximum 4 guests',
    ],
    cancellationPolicy: 'Moderate cancellation policy',
    coordinates: { lat: 36.4618, lng: 25.3753 },
  },
  102: {
    id: 102,
    title: 'Traditional Windmill with Sunset Views',
    location: 'Imerovigli, Santorini, Greece',
    shortLocation: 'Santorini, Greece',
    price: 380,
    rating: 4.8,
    reviews: 156,
    images: [
      '/img/santorini2_1.avif',
      '/img/santorini2_2.avif',
      '/img/santorini2_3.avif',
    ],
    amenities: ['Wifi', 'Terrace', 'Sea View', 'Kitchen', 'Historic'],
    type: 'House',
    hostId: 5,
    host: mockHosts[5],
    superhost: true,
    instantBook: false,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    beds: 1,
    featured: false,
    destination: 'Santorini, Greece',
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
    description: `Stay in a beautifully restored traditional windmill offering panoramic views of the caldera and the most spectacular sunsets in Santorini. This unique accommodation combines historical charm with modern comfort.`,
    houseRules: [
      'No smoking',
      'No parties',
      'Respect quiet hours',
      'Maximum 2 guests',
    ],
    cancellationPolicy: 'Flexible cancellation policy',
    coordinates: { lat: 36.4167, lng: 25.4167 },
  },
  103: {
    id: 103,
    title: 'Luxury Villa with Rice Field Views',
    location: 'Ubud, Bali, Indonesia',
    shortLocation: 'Bali, Indonesia',
    price: 280,
    rating: 4.9,
    reviews: 203,
    images: ['/img/bali1_1.avif', '/img/bali1_2.avif', '/img/bali1_3.avif'],
    amenities: ['Wifi', 'Pool', 'Spa', 'Garden', 'Kitchen', 'Yoga Space'],
    type: 'Villa',
    hostId: 6,
    host: mockHosts[6],
    superhost: true,
    instantBook: true,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    beds: 3,
    featured: true,
    destination: 'Bali, Indonesia',
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    description: `Immerse yourself in the tranquility of Ubud's lush rice terraces from this stunning villa. Features include a private infinity pool, spa treatments, and daily yoga sessions in our dedicated pavilion.

Wake up to the sounds of nature and enjoy authentic Balinese breakfast prepared by our local chef. Perfect for those seeking wellness, culture, and natural beauty.`,
    houseRules: [
      'No smoking indoors',
      'Respect local customs',
      'Quiet hours after 10 PM',
      'Maximum 6 guests',
    ],
    cancellationPolicy: 'Moderate cancellation policy',
    coordinates: { lat: -8.5069, lng: 115.2625 },
  },
  104: {
    id: 104,
    title: 'Beachfront Bungalow in Seminyak',
    location: 'Seminyak, Bali, Indonesia',
    shortLocation: 'Bali, Indonesia',
    price: 180,
    rating: 4.7,
    reviews: 134,
    images: ['/img/bali2_1.avif', '/img/bali2_2.avif', '/img/bali2_3.avif'],
    amenities: ['Wifi', 'Beach Access', 'Pool', 'Kitchen', 'Surfboard'],
    type: 'Bungalow',
    hostId: 6,
    host: mockHosts[6],
    superhost: true,
    instantBook: true,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    beds: 2,
    featured: false,
    destination: 'Bali, Indonesia',
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    description: `Steps away from Seminyak's famous beach and vibrant nightlife, this charming bungalow offers the perfect blend of relaxation and excitement. Enjoy world-class surfing, beach clubs, and sunset cocktails.`,
    houseRules: [
      'No smoking indoors',
      'Respect neighbors',
      'Clean up after beach activities',
      'Maximum 4 guests',
    ],
    cancellationPolicy: 'Flexible cancellation policy',
    coordinates: { lat: -8.6905, lng: 115.1656 },
  },
  105: {
    id: 105,
    title: 'Luxury Penthouse with Burj Khalifa Views',
    location: 'Downtown Dubai, UAE',
    shortLocation: 'Dubai, UAE',
    price: 650,
    rating: 4.8,
    reviews: 98,
    images: ['/city/dubai.jpeg', '/img/dubai1_2.avif', '/img/dubai1_3.avif'],
    amenities: ['Wifi', 'Pool', 'Gym', 'City View', 'Concierge', 'Valet'],
    type: 'Apartment',
    hostId: 7,
    host: mockHosts[7],
    superhost: false,
    instantBook: true,
    bedrooms: 3,
    bathrooms: 3,
    guests: 6,
    beds: 3,
    featured: true,
    destination: 'Dubai, UAE',
    checkInTime: '3:00 PM',
    checkOutTime: '12:00 PM',
    description: `Experience Dubai's skyline from this stunning penthouse with direct views of the Burj Khalifa and Dubai Fountain. Located in the heart of Downtown Dubai with access to world-class shopping and dining.

Features include a private terrace, premium amenities, and concierge services to ensure an unforgettable stay in the city of gold.`,
    houseRules: [
      'No smoking',
      'Respect local customs',
      'Quiet hours after 11 PM',
      'Maximum 6 guests',
    ],
    cancellationPolicy: 'Strict cancellation policy',
    coordinates: { lat: 25.1972, lng: 55.2744 },
  },
  106: {
    id: 106,
    title: 'Historic Villa with Vineyard Views',
    location: 'Chianti, Tuscany, Italy',
    shortLocation: 'Tuscany, Italy',
    price: 420,
    rating: 4.9,
    reviews: 167,
    images: [
      '/img/tuscany1_1.avif',
      '/img/tuscany1_2.avif',
      '/img/tuscany1_3.avif',
    ],
    amenities: [
      'Wifi',
      'Pool',
      'Wine Cellar',
      'Garden',
      'Kitchen',
      'Fireplace',
    ],
    type: 'Villa',
    hostId: 8,
    host: mockHosts[8],
    superhost: true,
    instantBook: false,
    bedrooms: 4,
    bathrooms: 3,
    guests: 8,
    beds: 4,
    featured: true,
    destination: 'Tuscany, Italy',
    checkInTime: '4:00 PM',
    checkOutTime: '10:00 AM',
    description: `Escape to this 16th-century villa surrounded by rolling vineyards and olive groves in the heart of Chianti. Experience authentic Tuscan living with wine tastings, cooking classes, and breathtaking countryside views.

The villa features original frescoes, a private wine cellar, and a infinity pool overlooking the vineyards. Perfect for wine lovers and those seeking authentic Italian culture.`,
    houseRules: [
      'No smoking indoors',
      'Respect the historic property',
      'Quiet hours after 10 PM',
      'Maximum 8 guests',
    ],
    cancellationPolicy: 'Moderate cancellation policy',
    coordinates: { lat: 43.5403, lng: 11.3168 },
  },
  107: {
    id: 107,
    title: 'Charming Montmartre Apartment',
    location: 'Montmartre, Paris, France',
    shortLocation: 'Paris, France',
    price: 220,
    rating: 4.6,
    reviews: 89,
    images: ['/img/paris1_1.avif', '/img/paris1_2.avif', '/img/paris1_3.avif'],
    amenities: ['Wifi', 'Kitchen', 'Historic', 'City View', 'Balcony'],
    type: 'Apartment',
    hostId: 9,
    host: mockHosts[9],
    superhost: true,
    instantBook: true,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    beds: 1,
    featured: false,
    destination: 'Paris, France',
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
    description: `Experience the bohemian charm of Montmartre from this cozy apartment just steps from Sacré-Cœur. Enjoy authentic Parisian living in the historic artists' quarter with cobblestone streets and charming cafés.`,
    houseRules: [
      'No smoking',
      'Quiet hours after 10 PM',
      'Respect neighbors',
      'Maximum 2 guests',
    ],
    cancellationPolicy: 'Flexible cancellation policy',
    coordinates: { lat: 48.8867, lng: 2.3431 },
  },
  108: {
    id: 108,
    title: 'Modern Shibuya Loft',
    location: 'Shibuya, Tokyo, Japan',
    shortLocation: 'Tokyo, Japan',
    price: 190,
    rating: 4.7,
    reviews: 156,
    images: ['/img/tokyo1_1.avif', '/img/tokyo1_2.avif', '/img/tokyo1_3.avif'],
    amenities: ['Wifi', 'Kitchen', 'City View', 'Modern', 'Elevator'],
    type: 'Loft',
    hostId: 10,
    host: mockHosts[10],
    superhost: false,
    instantBook: true,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    beds: 1,
    featured: false,
    destination: 'Tokyo, Japan',
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
    description: `Immerse yourself in Tokyo's energy from this sleek loft in the heart of Shibuya. Experience the famous crossing, cutting-edge fashion, and incredible dining just steps from your door.`,
    houseRules: [
      'No smoking',
      'Remove shoes indoors',
      'Quiet hours after 10 PM',
      'Maximum 2 guests',
    ],
    cancellationPolicy: 'Moderate cancellation policy',
    coordinates: { lat: 35.6598, lng: 139.7006 },
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

// Enhanced destinations data with new destinations
export const mockDestinations = [
  {
    id: 1,
    name: 'Malibu, California',
    properties: 1200,
    image: '/city/paris.jpeg',
    heroImage: '/city/malibu-hero.jpeg',
    description: 'Luxury Beach Living',
    longDescription:
      'Experience the ultimate in luxury beach living with stunning ocean views, world-class dining, and exclusive beach access in this iconic California destination.',
    averagePrice: 450,
    rating: 4.8,
    trending: true,
    popularAmenities: ['Pool', 'Beach Access', 'Luxury'],
    climate: 'Mediterranean',
    bestTime: 'Year-round',
    highlights: ['Malibu Pier', 'Zuma Beach', 'Getty Villa', 'Wine Tasting'],
  },
  {
    id: 2,
    name: 'New York, USA',
    properties: 890,
    image: '/city/newyork.jpeg',
    heroImage: '/city/newyork-hero.jpeg',
    description: 'The Big Apple',
    longDescription:
      'Immerse yourself in the energy of the city that never sleeps, with world-class museums, Broadway shows, and iconic landmarks around every corner.',
    averagePrice: 180,
    rating: 4.9,
    trending: true,
    popularAmenities: ['WiFi', 'Gym', 'City Views'],
    climate: 'Continental',
    bestTime: 'April - June, September - November',
    highlights: [
      'Times Square',
      'Central Park',
      'Statue of Liberty',
      'Broadway',
    ],
  },
  {
    id: 3,
    name: 'Aspen, Colorado',
    properties: 650,
    image: '/city/tokyo.jpeg',
    heroImage: '/city/aspen-hero.jpeg',
    description: 'Mountain Paradise',
    longDescription:
      'Discover world-class skiing, luxury mountain resorts, and breathtaking alpine scenery in this premier Colorado destination.',
    averagePrice: 320,
    rating: 4.7,
    trending: false,
    popularAmenities: ['Hot Tub', 'Mountain Views', 'Ski Access'],
    climate: 'Alpine',
    bestTime: 'December - March (Skiing), June - September (Hiking)',
    highlights: [
      'Aspen Mountain',
      'Maroon Bells',
      'Snowmass',
      'Music Festival',
    ],
  },
  {
    id: 4,
    name: 'Boston, Massachusetts',
    properties: 780,
    image: '/city/paris.jpeg',
    heroImage: '/city/boston-hero.jpeg',
    description: 'Historic Capital',
    longDescription:
      'Walk through American history in this charming New England city, featuring cobblestone streets, historic landmarks, and world-renowned universities.',
    averagePrice: 220,
    rating: 4.6,
    trending: false,
    popularAmenities: ['WiFi', 'Historic', 'Garden'],
    climate: 'Continental',
    bestTime: 'April - October',
    highlights: [
      'Freedom Trail',
      'Harvard University',
      'Fenway Park',
      'Boston Tea Party Ships',
    ],
  },
  {
    id: 5,
    name: 'Paris, France',
    properties: 1500,
    image: '/city/paris.jpeg',
    heroImage: '/city/paris-hero.jpeg',
    description: 'City of Light',
    longDescription:
      'Experience the romance and elegance of Paris with its iconic landmarks, world-class cuisine, and unparalleled art and culture.',
    averagePrice: 200,
    rating: 4.9,
    trending: true,
    popularAmenities: ['WiFi', 'Kitchen', 'Historic'],
    climate: 'Oceanic',
    bestTime: 'April - June, September - October',
    highlights: [
      'Eiffel Tower',
      'Louvre Museum',
      'Notre-Dame',
      'Champs-Élysées',
    ],
  },
  {
    id: 6,
    name: 'Tokyo, Japan',
    properties: 2100,
    image: '/city/tokyo.jpeg',
    heroImage: '/city/tokyo-hero.jpeg',
    description: 'Modern Metropolis',
    longDescription:
      'Discover the perfect blend of ancient traditions and cutting-edge technology in this vibrant Japanese capital.',
    averagePrice: 280,
    rating: 4.8,
    trending: false,
    popularAmenities: ['WiFi', 'Modern', 'City Center'],
    climate: 'Humid Subtropical',
    bestTime: 'March - May, September - November',
    highlights: [
      'Shibuya Crossing',
      'Tokyo Skytree',
      'Senso-ji Temple',
      'Tsukiji Market',
    ],
  },
  // New destinations
  {
    id: 7,
    name: 'Santorini, Greece',
    properties: 450,
    image: '/city/santorini.jpeg',
    heroImage: '/city/santorini-hero.jpeg',
    description: 'Stunning Sunsets',
    longDescription:
      'Experience breathtaking sunsets, white-washed buildings, and crystal-clear waters in this iconic Greek island paradise.',
    averagePrice: 380,
    rating: 4.9,
    trending: true,
    popularAmenities: ['Pool', 'Sea View', 'Terrace'],
    climate: 'Mediterranean',
    bestTime: 'April - October',
    highlights: ['Oia Sunset', 'Red Beach', 'Wine Tasting', 'Volcanic Tours'],
  },
  {
    id: 8,
    name: 'Bali, Indonesia',
    properties: 890,
    image: '/city/bali.jpeg',
    heroImage: '/city/bali-hero.jpeg',
    description: 'Tropical Paradise',
    longDescription:
      'Immerse yourself in lush rice terraces, ancient temples, and pristine beaches in this Indonesian gem.',
    averagePrice: 150,
    rating: 4.8,
    trending: true,
    popularAmenities: ['Pool', 'Spa', 'Garden'],
    climate: 'Tropical',
    bestTime: 'April - October',
    highlights: [
      'Ubud Rice Terraces',
      'Temple Tours',
      'Beach Clubs',
      'Yoga Retreats',
    ],
  },
  {
    id: 9,
    name: 'Dubai, UAE',
    properties: 650,
    image: '/city/dubai.jpeg',
    heroImage: '/city/dubai-hero.jpg',
    description: 'Luxury & Innovation',
    longDescription:
      'Discover a city where modern luxury meets traditional Arabian culture, featuring world-class shopping and dining.',
    averagePrice: 420,
    rating: 4.7,
    trending: false,
    popularAmenities: ['Luxury', 'Pool', 'City View'],
    climate: 'Desert',
    bestTime: 'November - March',
    highlights: ['Burj Khalifa', 'Desert Safari', 'Gold Souk', 'Marina'],
  },
  {
    id: 10,
    name: 'Tuscany, Italy',
    properties: 720,
    image: '/city/tuscany.jpeg',
    heroImage: '/city/tuscany-hero.jpeg',
    description: 'Rolling Hills & Wine',
    longDescription:
      'Escape to rolling vineyards, medieval hilltop towns, and world-renowned cuisine in the heart of Italy.',
    averagePrice: 280,
    rating: 4.8,
    trending: true,
    popularAmenities: ['Wine Cellar', 'Garden', 'Historic'],
    climate: 'Mediterranean',
    bestTime: 'April - October',
    highlights: [
      'Wine Tours',
      'Florence Day Trips',
      'Cooking Classes',
      'Art Museums',
    ],
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

// Enhanced utility functions for destinations
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

// New destination-specific utility functions
export const getAllDestinations = () => {
  return mockDestinations;
};

export const getDestinationByName = (name) => {
  return mockDestinations.find(
    (dest) =>
      dest.name.toLowerCase() === name.toLowerCase() ||
      dest.name.toLowerCase().includes(name.toLowerCase())
  );
};

export const getPropertiesByDestination = (destinationName) => {
  return mockPropertiesArray.filter(
    (property) =>
      property.destination === destinationName ||
      property.location.toLowerCase().includes(destinationName.toLowerCase()) ||
      property.shortLocation
        .toLowerCase()
        .includes(destinationName.toLowerCase())
  );
};

export const searchPropertiesByDestination = (
  destinationName,
  filters = {}
) => {
  let results = getPropertiesByDestination(destinationName);

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

  if (filters.rating) {
    results = results.filter((property) => property.rating >= filters.rating);
  }

  return results;
};

export const searchProperties = (filters = {}) => {
  let results = [...mockPropertiesArray];

  if (filters.location) {
    const searchLocation = filters.location.toLowerCase();
    results = results.filter((property) => {
      const fullLocation = property.location.toLowerCase();
      const shortLocation = property.shortLocation.toLowerCase();
      const destination = property.destination?.toLowerCase() || '';

      // Direct match
      if (
        fullLocation.includes(searchLocation) ||
        shortLocation.includes(searchLocation) ||
        destination.includes(searchLocation)
      ) {
        return true;
      }

      // Handle common location variations
      const locationVariations = {
        'new york, usa': ['new york', 'ny'],
        'paris, france': ['paris'],
        'tokyo, japan': ['tokyo'],
        'london, uk': ['london'],
        'bali, indonesia': ['bali'],
        'dubai, uae': ['dubai'],
        'santorini, greece': ['santorini'],
        'tuscany, italy': ['tuscany'],
      };

      // Check if search matches any variation
      for (const [key, variations] of Object.entries(locationVariations)) {
        if (searchLocation.includes(key) || key.includes(searchLocation)) {
          return variations.some(
            (variation) =>
              fullLocation.includes(variation) ||
              shortLocation.includes(variation) ||
              destination.includes(variation)
          );
        }
      }

      return false;
    });
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
  // New destination functions
  getAllDestinations,
  getDestinationByName,
  getPropertiesByDestination,
  searchPropertiesByDestination,
};
