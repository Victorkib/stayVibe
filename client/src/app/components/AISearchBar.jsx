'use client';

import { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Calendar,
  Users,
  Mic,
  Camera,
  Wand2,
} from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

export default function AISearchBar() {
  const [query, setQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);

  const smartSuggestions = [
    'Romantic getaway for 2 in Paris under $300/night',
    'Family-friendly beach house with pool in California',
    'Cozy cabin in the mountains for winter skiing',
    'Business trip accommodation near downtown Tokyo',
    'Pet-friendly apartment in New York with kitchen',
  ];

  const handleVoiceSearch = () => {
    setIsListening(!isListening);
    // Voice search implementation would go here
  };

  const handleImageSearch = () => {
    // Image search implementation would go here
    console.log('Image search triggered');
  };

  const handleAISearch = () => {
    // AI-powered search implementation
    console.log('AI search for:', query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="shadow-2xl border-2 border-rose-100">
        <CardContent className="p-6">
          {/* Main Search Input */}
          <div className="relative mb-4">
            <div className="flex items-center space-x-2 p-4 border-2 border-gray-200 rounded-xl focus-within:border-rose-500 transition-colors">
              <Sparkles className="h-5 w-5 text-rose-500" />
              <Input
                placeholder="Try: 'Romantic villa in Tuscany with pool for honeymoon'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="border-0 focus:ring-0 text-lg flex-1"
              />
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleVoiceSearch}
                  className={`${
                    isListening ? 'text-red-500' : 'text-gray-500'
                  }`}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleImageSearch}>
                  <Camera className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleAISearch}
                  className="bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white px-6"
                >
                  <Wand2 className="h-4 w-4 mr-2" />
                  AI Search
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-rose-50"
            >
              <MapPin className="h-3 w-3 mr-1" />
              Anywhere
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-rose-50"
            >
              <Calendar className="h-3 w-3 mr-1" />
              Any week
            </Badge>
            <Badge
              variant="outline"
              className="cursor-pointer hover:bg-rose-50"
            >
              <Users className="h-3 w-3 mr-1" />
              Add guests
            </Badge>
          </div>

          {/* AI Suggestions */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">
              ✨ AI-Powered Suggestions:
            </p>
            <div className="space-y-2">
              {smartSuggestions.slice(0, 3).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setQuery(suggestion)}
                  className="w-full text-left p-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
