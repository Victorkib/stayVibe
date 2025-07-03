'use client';

import { useState, useEffect } from 'react';
import { MapPin, Calendar, Camera, Shield } from 'lucide-react';
import { Button } from '../../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../components/ui/tabs';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../components/ui/avatar';
import { Badge } from '../../components/ui/badge';
import { useNavigate } from 'react-router-dom';
import AuthGuard from '../components/AuthGuard';
import Navbar from '../components/Navbar';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
    dateOfBirth: '',
    avatar: '',
    verified: false,
    joinDate: '2024',
    languages: ['English'],
    emergencyContact: {
      name: '',
      phone: '',
      relationship: '',
    },
    preferences: {
      currency: 'USD',
      language: 'English',
      timezone: 'UTC-8',
      notifications: {
        email: true,
        sms: false,
        push: true,
        marketing: false,
      },
    },
    privacy: {
      showProfile: true,
      showReviews: true,
      showWishlist: false,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    // Load profile data
    const savedProfile = localStorage.getItem('userProfile');
    const userEmail = localStorage.getItem('userEmail');
    const userName = localStorage.getItem('userName');

    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      setProfileData((prev) => ({ ...prev, ...profile }));
    }

    if (userEmail) {
      setProfileData((prev) => ({ ...prev, email: userEmail }));
    }

    if (userName) {
      const [firstName, lastName] = userName.split(' ');
      setProfileData((prev) => ({
        ...prev,
        firstName,
        lastName: lastName || '',
      }));
    }
  }, []);

  const handleSaveProfile = () => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
    setIsEditing(false);
    // Show success message
    alert('Profile updated successfully!');
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData({ ...profileData, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={profileData.avatar || '/placeholder.svg'}
                    />
                    <AvatarFallback className="text-2xl">
                      {profileData.firstName?.charAt(0)}
                      {profileData.lastName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute bottom-0 right-0 bg-rose-500 text-white rounded-full p-2 cursor-pointer hover:bg-rose-600">
                    <Camera className="h-4 w-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    {profileData.verified && (
                      <Badge className="bg-blue-100 text-blue-800">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600 mb-2">
                    {profileData.bio || 'No bio added yet'}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {profileData.location || 'Location not set'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Joined {profileData.joinDate}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? 'outline' : 'default'}
                  className={isEditing ? '' : 'bg-rose-500 hover:bg-rose-600'}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            firstName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            lastName: e.target.value,
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={profileData.email} disabled />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          phone: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24"
                      value={profileData.bio}
                      onChange={(e) =>
                        setProfileData({ ...profileData, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          location: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          dateOfBirth: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>

                  {isEditing && (
                    <Button
                      onClick={handleSaveProfile}
                      className="bg-rose-500 hover:bg-rose-600"
                    >
                      Save Changes
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="emergencyName">Contact Name</Label>
                    <Input
                      id="emergencyName"
                      value={profileData.emergencyContact.name}
                      onChange={(e) =>
                        setProfileData({
                          ...profileData,
                          emergencyContact: {
                            ...profileData.emergencyContact,
                            name: e.target.value,
                          },
                        })
                      }
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyPhone">Phone Number</Label>
                      <Input
                        id="emergencyPhone"
                        value={profileData.emergencyContact.phone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            emergencyContact: {
                              ...profileData.emergencyContact,
                              phone: e.target.value,
                            },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div>
                      <Label htmlFor="relationship">Relationship</Label>
                      <Input
                        id="relationship"
                        value={profileData.emergencyContact.relationship}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            emergencyContact: {
                              ...profileData.emergencyContact,
                              relationship: e.target.value,
                            },
                          })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Regional Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="currency">Currency</Label>
                      <select
                        id="currency"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={profileData.preferences.currency}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            preferences: {
                              ...profileData.preferences,
                              currency: e.target.value,
                            },
                          })
                        }
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <select
                        id="language"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={profileData.preferences.language}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            preferences: {
                              ...profileData.preferences,
                              language: e.target.value,
                            },
                          })
                        }
                      >
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <select
                        id="timezone"
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        value={profileData.preferences.timezone}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            preferences: {
                              ...profileData.preferences,
                              timezone: e.target.value,
                            },
                          })
                        }
                      >
                        <option value="UTC-8">Pacific Time (UTC-8)</option>
                        <option value="UTC-5">Eastern Time (UTC-5)</option>
                        <option value="UTC+0">GMT (UTC+0)</option>
                        <option value="UTC+1">
                          Central European Time (UTC+1)
                        </option>
                      </select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-gray-600">
                        Last updated 3 months ago
                      </p>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">Login Sessions</h4>
                      <p className="text-sm text-gray-600">
                        Manage your active sessions
                      </p>
                    </div>
                    <Button variant="outline">View Sessions</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {profileData?.preferences?.notifications &&
                    Object?.entries(
                      profileData?.preferences?.notifications
                    ).map(([key, value]) => (
                      <div
                        key={key}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {key === 'email' &&
                              'Receive notifications via email'}
                            {key === 'sms' && 'Receive notifications via SMS'}
                            {key === 'push' && 'Receive push notifications'}
                            {key === 'marketing' &&
                              'Receive marketing and promotional emails'}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              preferences: {
                                ...profileData.preferences,
                                notifications: {
                                  ...profileData.preferences.notifications,
                                  [key]: e.target.checked,
                                },
                              },
                            })
                          }
                          className="rounded"
                        />
                      </div>
                    ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(profileData.privacy).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {key === 'showProfile' &&
                            'Allow others to view your profile'}
                          {key === 'showReviews' &&
                            'Show your reviews publicly'}
                          {key === 'showWishlist' &&
                            'Make your wishlist visible to others'}
                        </p>
                      </div>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setProfileData({
                            ...profileData,
                            privacy: {
                              ...profileData.privacy,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="rounded"
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h4 className="font-medium text-red-800">
                        Delete Account
                      </h4>
                      <p className="text-sm text-red-600">
                        Permanently delete your account and all data
                      </p>
                    </div>
                    <Button variant="destructive">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AuthGuard>
  );
}
