'use client';

import { useState } from 'react';
import { TrendingUp, MapPin, Award, Target } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Progress } from '../../components/ui/progress';
import { Badge } from '../../components/ui/badge';

export default function TravelInsightsWidget() {
  const [insights, setInsights] = useState({
    travelScore: 85,
    sustainabilityRating: 92,
    savingsThisYear: 1240,
    carbonFootprint: 2.3,
    travelGoals: {
      countriesTarget: 12,
      countriesVisited: 8,
      budgetTarget: 5000,
      budgetSpent: 3200,
    },
    recommendations: [
      'Book 2 weeks ahead to save 15% on average',
      'Tuesday departures are 23% cheaper',
      'Consider shoulder season for 30% savings',
    ],
  });

  const progressPercentage =
    (insights.travelGoals.countriesVisited /
      insights.travelGoals.countriesTarget) *
    100;
  const budgetPercentage =
    (insights.travelGoals.budgetSpent / insights.travelGoals.budgetTarget) *
    100;

  return (
    <div className="space-y-6">
      {/* Travel Score Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Your Travel Score
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-4xl font-bold mb-2">
                {insights.travelScore}/100
              </div>
              <p className="opacity-90">Excellent Traveler!</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">
                {insights.sustainabilityRating}%
              </div>
              <p className="text-sm opacity-90">Sustainability Rating</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Goals Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            2024 Travel Goals
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Countries Visited</span>
              <span className="text-sm text-gray-600">
                {insights.travelGoals.countriesVisited}/
                {insights.travelGoals.countriesTarget}
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Travel Budget</span>
              <span className="text-sm text-gray-600">
                ${insights.travelGoals.budgetSpent}/$
                {insights.travelGoals.budgetTarget}
              </span>
            </div>
            <Progress value={budgetPercentage} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            AI Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.recommendations.map((rec, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
              >
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-sm text-blue-800">{rec}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-600" />
            Environmental Impact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {insights.carbonFootprint}t
              </div>
              <p className="text-sm text-green-700">CO₂ This Year</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                ${insights.savingsThisYear}
              </div>
              <p className="text-sm text-blue-700">Total Saved</p>
            </div>
          </div>
          <div className="mt-4">
            <Badge
              variant="outline"
              className="text-green-600 border-green-600"
            >
              🌱 Eco-Friendly Traveler
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
