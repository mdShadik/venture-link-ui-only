'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Building,
  Eye,
  Heart,
  MessageSquare,
  TrendingUp,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Edit,
  Save,
  X,
  AlertTriangle,
  CheckCircle2,
  Camera,
  Upload,
  Download,
  Share,
  Settings,
  Activity,
  Star,
  Clock,
  Filter,
  Search,
  MoreVertical
} from 'lucide-react';
import { toast } from 'sonner';

interface BusinessListing {
  id: string;
  businessName: string;
  businessDescription: string;
  industry: string;
  location: string;
  foundedYear: number;
  employeeCount: number;
  annualRevenue: number;
  askingPrice: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  views: number;
  likes: number;
  inquiries: number;
  images: string[];
  status: 'draft' | 'active' | 'paused' | 'sold';
  completionScore: number;
}

interface ViewerActivity {
  id: string;
  viewerName: string;
  viewerImage: string;
  viewerType: 'individual' | 'pe-firm' | 'strategic' | 'competitor';
  viewedAt: Date;
  timeSpent: string;
  pagesViewed: number;
  isInterested: boolean;
  hasMessaged: boolean;
}

const MOCK_LISTING: BusinessListing = {
  id: 'listing-1',
  businessName: 'CloudFlow Analytics',
  businessDescription: 'A comprehensive business intelligence platform that helps enterprises make data-driven decisions. With 3x revenue growth over the past 2 years and strong customer retention of 98%.',
  industry: 'SaaS',
  location: 'Seattle, WA',
  foundedYear: 2019,
  employeeCount: 25,
  annualRevenue: 2500000,
  askingPrice: 12500000,
  isPublished: true,
  createdAt: new Date('2024-07-01'),
  updatedAt: new Date('2024-08-15'),
  views: 1847,
  likes: 23,
  inquiries: 12,
  images: [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300',
    'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300',
    'https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?w=300'
  ],
  status: 'active',
  completionScore: 85
};

const MOCK_VIEWERS: ViewerActivity[] = [
  {
    id: 'viewer-1',
    viewerName: 'Sarah Chen',
    viewerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=50',
    viewerType: 'individual',
    viewedAt: new Date('2024-08-15T10:30:00'),
    timeSpent: '8 min',
    pagesViewed: 5,
    isInterested: true,
    hasMessaged: true
  },
  {
    id: 'viewer-2',
    viewerName: 'TechVenture Partners',
    viewerImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=50',
    viewerType: 'pe-firm',
    viewedAt: new Date('2024-08-15T09:15:00'),
    timeSpent: '12 min',
    pagesViewed: 8,
    isInterested: false,
    hasMessaged: false
  },
  {
    id: 'viewer-3',
    viewerName: 'Michael Rodriguez',
    viewerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50',
    viewerType: 'strategic',
    viewedAt: new Date('2024-08-14T16:45:00'),
    timeSpent: '15 min',
    pagesViewed: 12,
    isInterested: true,
    hasMessaged: true
  }
];

function ListingOverview({ listing }: { listing: BusinessListing }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'sold': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (price: number) => {
    return `$${(price / 1000000).toFixed(1)}M`;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Building className="w-8 h-8 text-white" />
              </div>
              <Button size="sm" className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full p-0">
                <Camera className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{listing.businessName}</h1>
              <p className="text-gray-600 mb-3 line-clamp-2">{listing.businessDescription}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {listing.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Founded {listing.foundedYear}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {listing.employeeCount} employees
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className={getStatusColor(listing.status)}>
              {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
            </Badge>
            <Switch 
              checked={listing.isPublished}
              onCheckedChange={(checked) => {
                toast.success(checked ? 'Listing published!' : 'Listing unpublished');
              }}
            />
            <span className="text-sm text-gray-600">
              {listing.isPublished ? 'Published' : 'Draft'}
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Eye className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-blue-600">{listing.views.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-600">Views</p>
          </div>
          
          <div className="text-center p-4 bg-pink-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <Heart className="w-5 h-5 text-pink-600 mr-2" />
              <span className="text-2xl font-bold text-pink-600">{listing.likes}</span>
            </div>
            <p className="text-sm text-gray-600">Interested</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <MessageSquare className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-green-600">{listing.inquiries}</span>
            </div>
            <p className="text-sm text-gray-600">Inquiries</p>
          </div>
          
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-purple-600">{formatPrice(listing.askingPrice)}</span>
            </div>
            <p className="text-sm text-gray-600">Asking Price</p>
          </div>
        </div>
      </Card>

      {/* Profile Completion */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Profile Completion</h3>
          <span className="text-sm font-medium text-gray-600">{listing.completionScore}%</span>
        </div>
        
        <Progress value={listing.completionScore} className="h-3 mb-4" />
        
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
              <span>Business Information</span>
            </div>
            <span className="text-green-600">Complete</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
              <span>Financial Details</span>
            </div>
            <span className="text-green-600">Complete</span>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
              <span>Business Photos</span>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              Add Photos
            </Button>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <AlertTriangle className="w-4 h-4 text-yellow-500 mr-2" />
              <span>Legal Documents</span>
            </div>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              Upload Documents
            </Button>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
            <Edit className="w-6 h-6 mb-2" />
            <span className="text-sm">Edit Listing</span>
          </Button>
          
          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
            <Share className="w-6 h-6 mb-2" />
            <span className="text-sm">Share Listing</span>
          </Button>
          
          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
            <Download className="w-6 h-6 mb-2" />
            <span className="text-sm">Download Report</span>
          </Button>
          
          <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
            <Settings className="w-6 h-6 mb-2" />
            <span className="text-sm">Settings</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

function RecentActivity({ viewers }: { viewers: ViewerActivity[] }) {
  const getViewerTypeIcon = (type: string) => {
    switch (type) {
      case 'individual': return '👤';
      case 'pe-firm': return '🏢';
      case 'strategic': return '🎯';
      case 'competitor': return '⚔️';
      default: return '👤';
    }
  };

  const getViewerTypeLabel = (type: string) => {
    switch (type) {
      case 'individual': return 'Individual Investor';
      case 'pe-firm': return 'PE Firm';
      case 'strategic': return 'Strategic Buyer';
      case 'competitor': return 'Competitor';
      default: return 'Unknown';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-lg flex items-center">
          <Activity className="w-5 h-5 mr-2 text-blue-500" />
          Recent Activity
        </h3>
        <Button variant="ghost" size="sm">
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {viewers.map((viewer) => (
          <div key={viewer.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={viewer.viewerImage} alt={viewer.viewerName} />
                <AvatarFallback>{viewer.viewerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 text-sm">
                {getViewerTypeIcon(viewer.viewerType)}
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{viewer.viewerName}</h4>
                <span className="text-sm text-gray-500">{formatTimeAgo(viewer.viewedAt)}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{getViewerTypeLabel(viewer.viewerType)}</p>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{viewer.timeSpent}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" />
                  <span>{viewer.pagesViewed} pages</span>
                </div>
                {viewer.isInterested && (
                  <Badge variant="secondary" className="bg-pink-100 text-pink-800 text-xs">
                    <Heart className="w-3 h-3 mr-1" />
                    Interested
                  </Badge>
                )}
                {viewer.hasMessaged && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Messaged
                  </Badge>
                )}
              </div>
            </div>
            
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}

function PerformanceAnalytics({ listing }: { listing: BusinessListing }) {
  const weeklyViews = [45, 52, 48, 61, 55, 67, 73];
  const weeklyInquiries = [2, 3, 1, 4, 2, 5, 3];
  
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Performance Overview</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-1">
              {listing.views.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600 mb-2">Total Views</p>
            <div className="flex items-center justify-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +12% this week
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-1">
              {((listing.likes / listing.views) * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600 mb-2">Interest Rate</p>
            <div className="flex items-center justify-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +3.2% this week
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {((listing.inquiries / listing.views) * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600 mb-2">Inquiry Rate</p>
            <div className="flex items-center justify-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              +1.8% this week
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">7-Day Trends</h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Views</span>
              <span className="text-sm text-gray-600">Daily Average: 58</span>
            </div>
            <div className="flex items-end space-x-1 h-20">
              {weeklyViews.map((views, index) => (
                <div
                  key={index}
                  className="bg-blue-500 rounded-t flex-1 opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${(views / Math.max(...weeklyViews)) * 100}%` }}
                  title={`${views} views`}
                />
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Inquiries</span>
              <span className="text-sm text-gray-600">Daily Average: 2.9</span>
            </div>
            <div className="flex items-end space-x-1 h-20">
              {weeklyInquiries.map((inquiries, index) => (
                <div
                  key={index}
                  className="bg-green-500 rounded-t flex-1 opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${(inquiries / Math.max(...weeklyInquiries)) * 100}%` }}
                  title={`${inquiries} inquiries`}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function MyListingPage() {
  const [listing] = useState<BusinessListing>(MOCK_LISTING);
  const [viewers] = useState<ViewerActivity[]>(MOCK_VIEWERS);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Business Listing</h1>
          <p className="text-gray-600">Manage your listing and track buyer interest</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button>
            <Edit className="w-4 h-4 mr-2" />
            Edit Listing
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <ListingOverview listing={listing} />
        </TabsContent>

        <TabsContent value="activity">
          <RecentActivity viewers={viewers} />
        </TabsContent>

        <TabsContent value="analytics">
          <PerformanceAnalytics listing={listing} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
