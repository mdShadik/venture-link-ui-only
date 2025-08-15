'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User,
  Mail,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  Building,
  DollarSign,
  Calendar,
  Award,
  CheckCircle2,
  TrendingUp,
  Globe,
  ArrowLeft,
  Heart,
  X,
  Shield,
  Flag
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';

interface PublicProfile {
  id: string;
  name: string;
  title: string;
  location: string;
  bio: string;
  profileImage: string;
  userType: 'buyer' | 'seller';
  isVerified: boolean;
  joinedDate: Date;
  isOnline: boolean;
  responseTime: string;
  
  // Social links (if public)
  linkedinUrl?: string;
  websiteUrl?: string;
  
  // Public stats
  stats: {
    profileViews: number;
    dealsCompleted: number;
    responseRate: number;
    rating: number;
    reviewCount: number;
  };
  
  // Investment info (for buyers)
  buyerInfo?: {
    interestedIndustries: string[];
    budgetRange: { min: number; max: number };
    locationPreferences: string[];
    experienceLevel: string;
    pastAcquisitions: Array<{
      businessName: string;
      industry: string;
      year: number;
      outcome: 'successful' | 'challenged' | 'failed';
    }>;
  };
  
  // Business info (for sellers)
  businessInfo?: {
    businessName: string;
    industry: string;
    businessStage: string;
    revenueRange: { min: number; max: number };
    employeeCount: number;
    foundedYear: number;
    businessDescription: string;
  };
  
  // Reviews/testimonials
  reviews: Array<{
    id: string;
    reviewerName: string;
    reviewerImage: string;
    rating: number;
    comment: string;
    dealName: string;
    date: Date;
  }>;
}

const MOCK_PUBLIC_PROFILE: PublicProfile = {
  id: 'buyer-1',
  name: 'Sarah Chen',
  title: 'Serial Entrepreneur & Angel Investor',
  location: 'San Francisco, CA',
  bio: 'Serial entrepreneur and angel investor with 15+ years of experience in tech acquisitions. Passionate about helping founders transition their businesses to the right buyers while maximizing value for all stakeholders.',
  profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200',
  userType: 'buyer',
  isVerified: true,
  joinedDate: new Date('2024-01-15'),
  isOnline: true,
  responseTime: 'Usually responds within 2 hours',
  
  linkedinUrl: 'https://linkedin.com/in/sarahchen',
  websiteUrl: 'https://sarahchen.com',
  
  stats: {
    profileViews: 2847,
    dealsCompleted: 5,
    responseRate: 95,
    rating: 4.8,
    reviewCount: 12
  },
  
  buyerInfo: {
    interestedIndustries: ['Technology', 'SaaS', 'E-commerce', 'HealthTech', 'FinTech'],
    budgetRange: { min: 1000000, max: 10000000 },
    locationPreferences: ['California', 'New York', 'Texas', 'Remote'],
    experienceLevel: 'Serial Acquirer',
    pastAcquisitions: [
      {
        businessName: 'TechStart Solutions',
        industry: 'Technology',
        year: 2023,
        outcome: 'successful'
      },
      {
        businessName: 'Green Energy Co',
        industry: 'CleanTech',
        year: 2022,
        outcome: 'successful'
      },
      {
        businessName: 'DataFlow Analytics',
        industry: 'SaaS',
        year: 2021,
        outcome: 'successful'
      }
    ]
  },
  
  reviews: [
    {
      id: 'rev-1',
      reviewerName: 'David Kim',
      reviewerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      rating: 5,
      comment: 'Sarah was professional throughout the entire process. She understood our business deeply and made the transition smooth for our team.',
      dealName: 'TechStart Solutions Acquisition',
      date: new Date('2024-02-15')
    },
    {
      id: 'rev-2',
      reviewerName: 'Maria Santos',
      reviewerImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
      rating: 5,
      comment: 'Excellent communication and fair negotiation. Sarah kept her promises and helped us achieve a great outcome for our business.',
      dealName: 'Green Energy Co Acquisition',
      date: new Date('2024-01-10')
    },
    {
      id: 'rev-3',
      reviewerName: 'Michael Torres',
      reviewerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      rating: 4,
      comment: 'Professional and knowledgeable. The due diligence process was thorough but respectful of our time.',
      dealName: 'DataFlow Analytics Acquisition',
      date: new Date('2023-12-05')
    }
  ]
};

function ProfileHeader({ profile, currentUserId }: { 
  profile: PublicProfile; 
  currentUserId?: string;
}) {
  const router = useRouter();
  const isOwnProfile = profile.id === currentUserId;

  const handleMessage = () => {
    // Navigate to messages with this user
    router.push(`/messages?user=${profile.id}`);
  };

  const handleConnect = () => {
    toast.success('Connection request sent!');
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Flag className="w-4 h-4 mr-2" />
            Report
          </Button>
        </div>
      </div>

      <div className="flex items-start space-x-6">
        {/* Profile Image */}
        <div className="relative">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.profileImage} alt={profile.name} />
            <AvatarFallback className="text-2xl">
              {profile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {profile.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
          )}
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3">
          <div>
            <div className="flex items-center space-x-3 mb-2">
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
            <p className="text-lg text-gray-700 font-medium">{profile.title}</p>
            <p className="text-gray-600 mt-2">{profile.bio}</p>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {profile.location}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Joined {profile.joinedDate.toLocaleDateString()}
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-2 text-yellow-500" />
              {formatRating(profile.stats.rating)} ({profile.stats.reviewCount} reviews)
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <span className={`px-2 py-1 rounded-full text-xs ${
              profile.isOnline 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {profile.isOnline ? 'Online now' : 'Last seen 2h ago'}
            </span>
            <span className="text-gray-600">{profile.responseTime}</span>
          </div>

          {/* Social Links */}
          {(profile.linkedinUrl || profile.websiteUrl) && (
            <div className="flex items-center space-x-3">
              {profile.linkedinUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
                    LinkedIn
                    <Globe className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              )}
              {profile.websiteUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={profile.websiteUrl} target="_blank" rel="noopener noreferrer">
                    Website
                    <Globe className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        {!isOwnProfile && (
          <div className="flex flex-col space-y-3">
            <Button onClick={handleMessage} className="min-w-[120px]">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" onClick={handleConnect}>
              <Heart className="w-4 h-4 mr-2" />
              Connect
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

function PublicStats({ stats }: { stats: PublicProfile['stats'] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.profileViews.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Profile Views</p>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.dealsCompleted}</p>
          <p className="text-sm text-gray-600">Deals Completed</p>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{stats.responseRate}%</p>
          <p className="text-sm text-gray-600">Response Rate</p>
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-1">
            <Star className="w-5 h-5 text-yellow-500" />
            <p className="text-2xl font-bold text-gray-900">{stats.rating.toFixed(1)}</p>
          </div>
          <p className="text-sm text-gray-600">{stats.reviewCount} Reviews</p>
        </div>
      </Card>
    </div>
  );
}

function AboutTab({ profile }: { profile: PublicProfile }) {
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
      {/* Investment/Business Info */}
      {profile.buyerInfo && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Investment Focus</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label className="text-sm font-medium text-gray-600">Investment Range</Label>
              <p className="text-lg font-semibold text-green-600 mt-1">
                {formatBudget(profile.buyerInfo.budgetRange.min, profile.buyerInfo.budgetRange.max)}
              </p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-600">Experience Level</Label>
              <p className="text-gray-900 mt-1">{profile.buyerInfo.experienceLevel}</p>
            </div>
          </div>

          <div className="mb-6">
            <Label className="text-sm font-medium text-gray-600 mb-2 block">Industries of Interest</Label>
            <div className="flex flex-wrap gap-2">
              {profile.buyerInfo.interestedIndustries.map((industry, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-600 mb-2 block">Preferred Locations</Label>
            <div className="flex flex-wrap gap-2">
              {profile.buyerInfo.locationPreferences.map((location, index) => (
                <Badge key={index} variant="outline" className="px-3 py-1">
                  <MapPin className="w-3 h-3 mr-1" />
                  {location}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}

      {profile.businessInfo && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-sm font-medium text-gray-600">Business Name</Label>
              <p className="text-gray-900 mt-1">{profile.businessInfo.businessName}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-600">Industry</Label>
              <p className="text-gray-900 mt-1">{profile.businessInfo.industry}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-600">Business Stage</Label>
              <p className="text-gray-900 mt-1">{profile.businessInfo.businessStage}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-600">Employees</Label>
              <p className="text-gray-900 mt-1">{profile.businessInfo.employeeCount} people</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-600">Founded</Label>
              <p className="text-gray-900 mt-1">{profile.businessInfo.foundedYear}</p>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-600">Revenue Range</Label>
              <p className="text-gray-900 mt-1">
                {formatBudget(profile.businessInfo.revenueRange.min, profile.businessInfo.revenueRange.max)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Label className="text-sm font-medium text-gray-600 mb-2 block">Business Description</Label>
            <p className="text-gray-900">{profile.businessInfo.businessDescription}</p>
          </div>
        </Card>
      )}
    </div>
  );
}

function ExperienceTab({ profile }: { profile: PublicProfile }) {
  if (!profile.buyerInfo?.pastAcquisitions.length) {
    return (
      <Card className="p-6">
        <div className="text-center py-8">
          <Building className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No public acquisition history</h3>
          <p className="text-gray-600">This user hasn't shared their acquisition experience publicly.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Past Acquisitions</h3>
      
      <div className="space-y-4">
        {profile.buyerInfo.pastAcquisitions.map((acquisition, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900">{acquisition.businessName}</h4>
                <p className="text-sm text-gray-600">{acquisition.industry} • {acquisition.year}</p>
              </div>
              <Badge 
                variant={acquisition.outcome === 'successful' ? 'default' : 'secondary'}
                className={acquisition.outcome === 'successful' ? 'bg-green-100 text-green-800' : ''}
              >
                {acquisition.outcome}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ReviewsTab({ reviews }: { reviews: PublicProfile['reviews'] }) {
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Reviews & Testimonials</h3>
        <p className="text-sm text-gray-600">{reviews.length} reviews</p>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src={review.reviewerImage} alt={review.reviewerName} />
                <AvatarFallback>
                  {review.reviewerName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{review.reviewerName}</h4>
                    <p className="text-sm text-gray-600">{review.dealName}</p>
                  </div>
                  <div className="text-right">
                    {renderStars(review.rating)}
                    <p className="text-xs text-gray-500 mt-1">
                      {review.date.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function PublicProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const currentUserId = 'seller-1'; // In real app, get from auth
  
  // In real app, fetch profile data based on userId
  const [profile] = useState<PublicProfile>(MOCK_PUBLIC_PROFILE);

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Profile not found</h3>
          <p className="text-gray-600">This user's profile doesn't exist or is private.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <ProfileHeader profile={profile} currentUserId={currentUserId} />
      
      <PublicStats stats={profile.stats} />

      <Tabs defaultValue="about" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <AboutTab profile={profile} />
        </TabsContent>

        <TabsContent value="experience">
          <ExperienceTab profile={profile} />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsTab reviews={profile.reviews} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
