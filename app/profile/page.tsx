'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User,
  Mail,
  MapPin,
  Phone,
  Camera,
  Edit,
  Save,
  X,
  Plus,
  Trash2,
  Building,
  DollarSign,
  Calendar,
  Award,
  CheckCircle2,
  Settings,
  Shield,
  Bell,
  Eye,
  Star,
  TrendingUp,
  FileText,
  Globe
} from 'lucide-react';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profileImage: string;
  userType: 'buyer' | 'seller';
  isVerified: boolean;
  joinedDate: Date;
  lastActive: Date;
  
  // Social links
  linkedinUrl?: string;
  twitterUrl?: string;
  websiteUrl?: string;
  
  // Buyer-specific
  buyerProfile?: {
    interestedIndustries: string[];
    budgetRange: { min: number; max: number };
    locationPreferences: string[];
    acquisitionType: 'majority' | 'minority' | 'both';
    investmentTimeline: string;
    experienceLevel: string;
    preferredDealSize: string;
    pastAcquisitions: PastAcquisition[];
  };
  
  // Seller-specific
  sellerProfile?: {
    businessName: string;
    industry: string;
    revenueRange: { min: number; max: number };
    businessStage: string;
    sellingReason: string;
    idealBuyerProfile: string;
    businessDescription: string;
    foundedYear: number;
    employeeCount: number;
    assetValue: number;
    hasDebts: boolean;
    debtAmount?: number;
    expectedTimeline: string;
  };
  
  // Activity stats
  stats: {
    profileViews: number;
    matches: number;
    dealsCompleted: number;
    responseRate: number;
  };
}

interface PastAcquisition {
  id: string;
  businessName: string;
  industry: string;
  dealValue: number;
  year: number;
  outcome: 'successful' | 'challenged' | 'failed';
}

const MOCK_PROFILE: UserProfile = {
  id: 'user-1',
  name: 'Sarah Chen',
  email: 'sarah.chen@investor.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  bio: 'Serial entrepreneur and angel investor with 15+ years of experience in tech acquisitions. Passionate about helping founders transition their businesses to the right buyers while maximizing value for all stakeholders.',
  profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200',
  userType: 'buyer',
  isVerified: true,
  joinedDate: new Date('2024-01-15'),
  lastActive: new Date('2024-08-15T14:30:00'),
  
  linkedinUrl: 'https://linkedin.com/in/sarahchen',
  twitterUrl: 'https://twitter.com/sarahchen',
  websiteUrl: 'https://sarahchen.com',
  
  buyerProfile: {
    interestedIndustries: ['Technology', 'SaaS', 'E-commerce', 'HealthTech', 'FinTech'],
    budgetRange: { min: 1000000, max: 10000000 },
    locationPreferences: ['California', 'New York', 'Texas', 'Remote'],
    acquisitionType: 'majority',
    investmentTimeline: '3-6-months',
    experienceLevel: 'serial-acquirer',
    preferredDealSize: 'medium',
    pastAcquisitions: [
      {
        id: 'acq-1',
        businessName: 'TechStart Solutions',
        industry: 'Technology',
        dealValue: 2500000,
        year: 2022,
        outcome: 'successful'
      },
      {
        id: 'acq-2',
        businessName: 'Green Energy Co',
        industry: 'CleanTech',
        dealValue: 5000000,
        year: 2021,
        outcome: 'successful'
      }
    ]
  },
  
  stats: {
    profileViews: 2847,
    matches: 23,
    dealsCompleted: 3,
    responseRate: 95
  }
};

function ProfileHeader({ profile, isEditing, onEdit, onSave, onCancel }: {
  profile: UserProfile;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-6">
          {/* Profile Image */}
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.profileImage} alt={profile.name} />
              <AvatarFallback className="text-2xl">
                {profile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full p-0"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>

          {/* Profile Info */}
          <div className="space-y-3">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-gray-900">{profile.name}</h1>
                {profile.isVerified && (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
                <Badge variant="outline" className="capitalize">
                  {profile.userType}
                </Badge>
              </div>
              <p className="text-gray-600 mt-1">{profile.bio}</p>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                {profile.email}
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                {profile.location}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Joined {profile.joinedDate.toLocaleDateString()}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {profile.linkedinUrl && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                    <Globe className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              )}
              {profile.websiteUrl && (
                <Button variant="ghost" size="sm" asChild>
                  <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer">
                    Website
                    <Globe className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={onCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={onSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={onEdit}>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

function ProfileStats({ stats }: { stats: UserProfile['stats'] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Profile Views</p>
            <p className="text-2xl font-bold text-gray-900">{stats.profileViews.toLocaleString()}</p>
          </div>
          <Eye className="w-8 h-8 text-blue-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Matches</p>
            <p className="text-2xl font-bold text-gray-900">{stats.matches}</p>
          </div>
          <Star className="w-8 h-8 text-pink-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Deals Completed</p>
            <p className="text-2xl font-bold text-gray-900">{stats.dealsCompleted}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-green-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Response Rate</p>
            <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
      </Card>
    </div>
  );
}

function BasicInfoTab({ profile, isEditing }: { profile: UserProfile; isEditing: boolean }) {
  const [formData, setFormData] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
    bio: profile.bio,
    linkedinUrl: profile.linkedinUrl || '',
    twitterUrl: profile.twitterUrl || '',
    websiteUrl: profile.websiteUrl || ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{profile.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{profile.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{profile.phone}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            {isEditing ? (
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
              />
            ) : (
              <p className="text-gray-900">{profile.location}</p>
            )}
          </div>
        </div>
        
        <div className="mt-6 space-y-2">
          <Label htmlFor="bio">Bio</Label>
          {isEditing ? (
            <Textarea
              id="bio"
              rows={4}
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-gray-900">{profile.bio}</p>
          )}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            {isEditing ? (
              <Input
                id="linkedin"
                value={formData.linkedinUrl}
                onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                placeholder="https://linkedin.com/in/yourprofile"
              />
            ) : (
              <p className="text-gray-900">{profile.linkedinUrl || 'Not provided'}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            {isEditing ? (
              <Input
                id="website"
                value={formData.websiteUrl}
                onChange={(e) => handleInputChange('websiteUrl', e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            ) : (
              <p className="text-gray-900">{profile.websiteUrl || 'Not provided'}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

function InvestmentPreferencesTab({ profile }: { profile: UserProfile }) {
  if (!profile.buyerProfile) return null;

  const { buyerProfile } = profile;

  const formatBudget = (min: number, max: number) => {
    const formatMillion = (num: number) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString()}`;
    };
    return `${formatMillion(min)} - ${formatMillion(max)}`;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Criteria</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-gray-600">Budget Range</Label>
            <p className="text-lg font-semibold text-green-600 mt-1">
              {formatBudget(buyerProfile.budgetRange.min, buyerProfile.budgetRange.max)}
            </p>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-600">Deal Size Preference</Label>
            <p className="text-gray-900 mt-1 capitalize">{buyerProfile.preferredDealSize}</p>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-600">Acquisition Type</Label>
            <p className="text-gray-900 mt-1 capitalize">{buyerProfile.acquisitionType} stake</p>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-600">Investment Timeline</Label>
            <p className="text-gray-900 mt-1 capitalize">{buyerProfile.investmentTimeline.replace('-', ' ')}</p>
          </div>
          
          <div>
            <Label className="text-sm font-medium text-gray-600">Experience Level</Label>
            <p className="text-gray-900 mt-1 capitalize">{buyerProfile.experienceLevel.replace('-', ' ')}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Industries of Interest</h3>
        <div className="flex flex-wrap gap-2">
          {buyerProfile.interestedIndustries.map((industry, index) => (
            <Badge key={index} variant="secondary" className="px-3 py-1">
              {industry}
            </Badge>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Preferences</h3>
        <div className="flex flex-wrap gap-2">
          {buyerProfile.locationPreferences.map((location, index) => (
            <Badge key={index} variant="outline" className="px-3 py-1">
              <MapPin className="w-3 h-3 mr-1" />
              {location}
            </Badge>
          ))}
        </div>
      </Card>

      {buyerProfile.pastAcquisitions.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Past Acquisitions</h3>
          <div className="space-y-4">
            {buyerProfile.pastAcquisitions.map((acquisition) => (
              <div key={acquisition.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{acquisition.businessName}</h4>
                  <p className="text-sm text-gray-600">{acquisition.industry} • {acquisition.year}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    ${(acquisition.dealValue / 1000000).toFixed(1)}M
                  </p>
                  <Badge 
                    variant={acquisition.outcome === 'successful' ? 'default' : 'secondary'}
                    className={acquisition.outcome === 'successful' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {acquisition.outcome}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}

function SecurityTab({ profile }: { profile: UserProfile }) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Security</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Password</h4>
              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
            </div>
            <Button variant="outline">Change Password</Button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Login Sessions</h4>
              <p className="text-sm text-gray-600">Manage your active sessions</p>
            </div>
            <Button variant="outline">View Sessions</Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Profile Visibility</h4>
              <p className="text-sm text-gray-600">Who can see your profile</p>
            </div>
            <Badge variant="outline">Public</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Contact Information</h4>
              <p className="text-sm text-gray-600">Who can see your contact details</p>
            </div>
            <Badge variant="outline">Matches Only</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Investment History</h4>
              <p className="text-sm text-gray-600">Show past acquisitions on profile</p>
            </div>
            <Badge variant="outline">Visible</Badge>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notifications</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Email Notifications</h4>
              <p className="text-sm text-gray-600">Receive updates via email</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Push Notifications</h4>
              <p className="text-sm text-gray-600">Receive updates on your device</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Marketing Communications</h4>
              <p className="text-sm text-gray-600">Receive tips and platform updates</p>
            </div>
            <Badge variant="secondary">Disabled</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile>(MOCK_PROFILE);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <ProfileHeader 
        profile={profile}
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
      />

      {/* Profile Stats */}
      <ProfileStats stats={profile.stats} />

      {/* Main Content */}
      <Tabs defaultValue="basic" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="preferences">Investment Preferences</TabsTrigger>
          <TabsTrigger value="security">Security & Privacy</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <BasicInfoTab profile={profile} isEditing={isEditing} />
        </TabsContent>

        <TabsContent value="preferences">
          <InvestmentPreferencesTab profile={profile} />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab profile={profile} />
        </TabsContent>

        <TabsContent value="activity">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Star className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium text-gray-900">New match with CloudFlow Analytics</p>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900">Reviewed financial documents</p>
                  <p className="text-sm text-gray-600">1 day ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-gray-900">Deal progressed to due diligence</p>
                  <p className="text-sm text-gray-600">3 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
