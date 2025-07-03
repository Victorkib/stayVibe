'use client';

import { useState } from 'react';
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function HelpPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const helpCategories = [
    {
      title: 'Booking & Reservations',
      icon: '📅',
      topics: [
        'How to book',
        'Cancellation policy',
        'Payment methods',
        'Booking modifications',
      ],
    },
    {
      title: 'During Your Stay',
      icon: '🏠',
      topics: [
        'Check-in process',
        'House rules',
        'Amenities',
        'Emergency contacts',
      ],
    },
    {
      title: 'Host Support',
      icon: '👥',
      topics: [
        'Become a host',
        'Listing your property',
        'Host guidelines',
        'Pricing tips',
      ],
    },
    {
      title: 'Account & Profile',
      icon: '⚙️',
      topics: [
        'Profile settings',
        'Verification',
        'Privacy settings',
        'Account security',
      ],
    },
  ];

  const faqs = [
    {
      question: 'How do I cancel my booking?',
      answer:
        "You can cancel your booking by going to 'My Bookings' in your dashboard and clicking the 'Cancel' button. Please note that cancellation policies vary by property.",
    },
    {
      question: 'What payment methods do you accept?',
      answer:
        'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. Payment is processed securely through our encrypted payment system.',
    },
    {
      question: 'How do I contact my host?',
      answer:
        "Once your booking is confirmed, you can message your host directly through our messaging system. Go to 'My Bookings' and click 'Contact Host' on your reservation.",
    },
    {
      question: 'What if I need to modify my booking dates?',
      answer:
        "Booking modifications depend on the property's availability and cancellation policy. Contact your host through our messaging system to discuss possible changes.",
    },
    {
      question: 'Is my personal information secure?',
      answer:
        'Yes, we use industry-standard encryption and security measures to protect your personal and payment information. We never share your data with third parties without your consent.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How can we help you?
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find answers to common questions or get in touch with our support
            team
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search for help topics..."
              className="pl-12 h-14 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-rose-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                Get instant help from our support team
              </p>
              <Button className="bg-rose-500 hover:bg-rose-600">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Phone className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our support team
              </p>
              <Button variant="outline">+1 (555) 123-4567</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Mail className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-lg mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us a detailed message</p>
              <Button variant="outline">support@DewdropBnb.com</Button>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="font-semibold text-lg mb-3">
                    {category.title}
                  </h3>
                  <div className="space-y-2">
                    {category.topics.map((topic, topicIndex) => (
                      <div
                        key={topicIndex}
                        className="text-sm text-gray-600 hover:text-rose-600 cursor-pointer"
                      >
                        {topic}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-0">
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === index ? null : index)
                    }
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50"
                  >
                    <h3 className="font-semibold text-lg">{faq.question}</h3>
                    {expandedFAQ === index ? (
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-500" />
                    )}
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Still need help? Contact us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
            </div>
            <Input placeholder="Email Address" />
            <Input placeholder="Subject" />
            <textarea
              placeholder="Describe your issue in detail..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-32"
            />
            <Button className="bg-rose-500 hover:bg-rose-600">
              Send Message
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
