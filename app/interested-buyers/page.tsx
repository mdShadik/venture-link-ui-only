'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search,
  Filter,
  Heart,
  MessageSquare,
  Eye,
  Phone,
  Video,
  MoreVertical,
  Star,
  MapPin,
  Building,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  Calendar,
  ArrowRight,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

interface InterestedBuyer {
  id: string;
  name: string;
  title: string;
  profileImage: string;
  location: string;
  buyerType: 'individual' | 'pe-firm' | 'strategic' | 'family-office' | 'competitor';
  interestedIndustries: string[];
  budgetRange: { min: number; max: number };
  experienceLevel: 'first-time' | 'experienced' | 'serial-acquirer';
  pastAcquisitions: number;
  lastViewed: Date;
  firstViewed: Date;
  isVerified: boolean;
  isOnline: boolean;
  hasMessaged: boolean;
  interestLevel: 'low' | 'medium' | 'high' | 'very-high';
  compatibilityScore: number;
  viewDuration: number; // minutes
  pagesViewed: number;
  documentsRequested: string[];
  status: 'new' | 'contacted' | 'in-discussion' | 'declined' | 'offer-made';
}

const MOCK_INTERESTED_BUYERS: InterestedBuyer[] = [
  {
    id: 'buyer-1',
    name: 'Sarah Chen',
    title: 'Serial Entrepreneur & Angel Investor',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100',
    location: 'San Francisco, CA',
    buyerType: 'individual',
    interestedIndustries: ['Technology', 'SaaS', 'E-commerce'],
    budgetRange: { min: 1000000, max: 10000000 },
    experienceLevel: 'serial-acquirer',
    pastAcquisitions: 5,
    lastViewed: new Date('2024-08-15T14:30:00'),
    firstViewed: new Date('2024-08-10T09:15:00'),
    isVerified: true,
    isOnline: true,
    hasMessaged: true,
    interestLevel: 'very-high',
    compatibilityScore: 95,
    viewDuration: 45,
    pagesViewed: 12,
    documentsRequested: ['Financial Statements', 'Customer List'],
    status: 'in-discussion'
  },
  {
    id: 'buyer-2',
    name: 'TechVenture Partners',
    title: 'Private Equity Firm',
    profileImage: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100',
    location: 'Boston, MA',
    buyerType: 'pe-firm',
    interestedIndustries: ['Technology', 'SaaS', 'FinTech'],
    budgetRange: { min: 5000000, max: 50000000 },
    experienceLevel: 'experienced',
    pastAcquisitions: 15,
    lastViewed: new Date('2024-08-15T11:20:00'),
    firstViewed: new Date('2024-08-12T14:30:00'),
    isVerified: true,
    isOnline: false,
    hasMessaged: false,
    interestLevel: 'high',
    compatibilityScore: 88,
    viewDuration: 28,
    pagesViewed: 8,
    documentsRequested: ['Due Diligence Package'],
    status: 'new'
  },
  {
    id: 'buyer-3',
    name: 'Michael Rodriguez',
    title: 'Corporate Development Director',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    location: 'Austin, TX',
    buyerType: 'strategic',
    interestedIndustries: ['Technology', 'Analytics', 'Enterprise Software'],
    budgetRange: { min: 2000000, max: 15000000 },
    experienceLevel: 'experienced',
    pastAcquisitions: 8,
    lastViewed: new Date('2024-08-14T16:45:00'),
    firstViewed: new Date('2024-08-11T10:20:00'),
    isVerified: true,
    isOnline: true,
    hasMessaged: true,
    interestLevel: 'high',
    compatibilityScore: 82,
    viewDuration: 35,
    pagesViewed: 10,
    documentsRequested: ['Technical Architecture', 'Customer Contracts'],
    status: 'contacted'
  },
  {
    id: 'buyer-4',
    name: 'Emily Watson',
    title: 'Family Office Investment Manager',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    location: 'New York, NY',
    buyerType: 'family-office',
    interestedIndustries: ['Technology', 'Real Estate', 'Services'],
    budgetRange: { min: 500000, max: 5000000 },
    experienceLevel: 'experienced',
    pastAcquisitions: 3,
    lastViewed: new Date('2024-08-13T13:10:00'),
    firstViewed: new Date('2024-08-13T13:10:00'),
    isVerified: false,
    isOnline: false,
    hasMessaged: false,
    interestLevel: 'medium',
    compatibilityScore: 66,
    viewDuration: 12,
    pagesViewed: 4,
    documentsRequested: [],
    status: 'new'
  },
  {
    id: 'buyer-5',
    name: 'DataCorp Analytics',
    title: 'Competitor Analysis Team',
    profileImage: 'https://images.unsplash.com/photo-1553484771-cc0d9b8c2b33?w=100',
    location: 'Chicago, IL',
    buyerType: 'competitor',
    interestedIndustries: ['Analytics', 'Business Intelligence'],
    budgetRange: { min: 3000000, max: 20000000 },
    experienceLevel: 'experienced',
    pastAcquisitions: 6,
    lastViewed: new Date('2024-08-12T09:30:00'),
    firstViewed: new Date('2024-08-09T15:45:00'),
    isVerified: true,
    isOnline: false,
    hasMessaged: false,
    interestLevel: 'medium',
    compatibilityScore: 75,
    viewDuration: 18,
    pagesViewed: 6,
    documentsRequested: [],
    status: 'new'
  }
];

function BuyerCard({ buyer, onMessage, onViewProfile }: { 
  buyer: InterestedBuyer; 
  onMessage: (buyerId: string) => void;
  onViewProfile: (buyerId: string) => void;
}) {
  const getBuyerTypeInfo = (type: string) => {
    switch (type) {
      case 'individual': return { icon: '👤', label: 'Individual Investor', color: 'bg-blue-100 text-blue-800' };
      case 'pe-firm': return { icon: '🏢', label: 'PE Firm', color: 'bg-purple-100 text-purple-800' };
      case 'strategic': return { icon: '🎯', label: 'Strategic Buyer', color: 'bg-green-100 text-green-800' };
      case 'family-office': return { icon: '🏛️', label: 'Family Office', color: 'bg-yellow-100 text-yellow-800' };
      case 'competitor': return { icon: '⚔️', label: 'Competitor', color: 'bg-red-100 text-red-800' };
      default: return { icon: '👤', label: 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getInterestColor = (level: string) => {
    switch (level) {
      case 'very-high': return 'bg-green-500';
      case 'high': return 'bg-blue-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-gray-400';
      default: return 'bg-gray-400';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-green-100 text-green-800';
      case 'in-discussion': return 'bg-purple-100 text-purple-800';
      case 'offer-made': return 'bg-orange-100 text-orange-800';
      case 'declined': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatBudget = (min: number, max: number) => {
    const formatMillion = (num: number) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString()}`;
    };
    return `${formatMillion(min)} - ${formatMillion(max)}`;
  };

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const buyerTypeInfo = getBuyerTypeInfo(buyer.buyerType);

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className="relative">
              <Avatar className="w-12 h-12">
                <AvatarImage src={buyer.profileImage} alt={buyer.name} />
                <AvatarFallback>{buyer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {buyer.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-gray-900">{buyer.name}</h3>
                {buyer.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
              </div>
              <p className="text-sm text-gray-600 mb-2">{buyer.title}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {buyer.location}
                </div>
                <div className="flex items-center">
                  <Building className="w-3 h-3 mr-1" />
                  {buyer.pastAcquisitions} acquisitions
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={buyerTypeInfo.color}>
              {buyerTypeInfo.icon} {buyerTypeInfo.label}
            </Badge>
            <div className="text-right">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium">{buyer.compatibilityScore}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interest Level */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Interest Level</span>
            <span className="text-sm text-gray-600 capitalize">{buyer.interestLevel.replace('-', ' ')}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${getInterestColor(buyer.interestLevel)}`}
              style={{ 
                width: buyer.interestLevel === 'very-high' ? '100%' : 
                       buyer.interestLevel === 'high' ? '75%' : 
                       buyer.interestLevel === 'medium' ? '50%' : '25%'
              }}
            />
          </div>
        </div>

        {/* Budget & Industries */}
        <div className="space-y-3">
          <div>
            <span className="text-sm font-medium text-gray-700">Budget Range</span>
            <p className="text-sm text-green-600 font-medium">{formatBudget(buyer.budgetRange.min, buyer.budgetRange.max)}</p>
          </div>
          
          <div>
            <span className="text-sm font-medium text-gray-700">Industries</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {buyer.interestedIndustries.slice(0, 2).map((industry, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {industry}
                </Badge>
              ))}
              {buyer.interestedIndustries.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{buyer.interestedIndustries.length - 2} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Activity Stats */}
        <div className="grid grid-cols-3 gap-4 py-3 border-t border-gray-100">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{buyer.viewDuration}m</div>
            <div className="text-xs text-gray-500">Time Spent</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{buyer.pagesViewed}</div>
            <div className="text-xs text-gray-500">Pages Viewed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-900">{buyer.documentsRequested.length}</div>
            <div className="text-xs text-gray-500">Docs Requested</div>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className={getStatusColor(buyer.status)}>
              {buyer.status.replace('-', ' ')}
            </Badge>
            <span className="text-xs text-gray-500">
              Last viewed {formatTimeAgo(buyer.lastViewed)}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onViewProfile(buyer.id)}>
              <Eye className="w-4 h-4" />
            </Button>
            <Button size="sm" onClick={() => onMessage(buyer.id)}>
              <MessageSquare className="w-4 h-4 mr-2" />
              {buyer.hasMessaged ? 'Reply' : 'Message'}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function StatsOverview({ buyers }: { buyers: InterestedBuyer[] }) {
  const totalBuyers = buyers.length;
  const newBuyers = buyers.filter(b => b.status === 'new').length;
  const activeBuyers = buyers.filter(b => b.status === 'in-discussion' || b.status === 'contacted').length;
  const avgCompatibility = Math.round(buyers.reduce((sum, b) => sum + b.compatibilityScore, 0) / buyers.length);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Interested</p>
            <p className="text-2xl font-bold text-gray-900">{totalBuyers}</p>
          </div>
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">New This Week</p>
            <p className="text-2xl font-bold text-gray-900">{newBuyers}</p>
          </div>
          <Users className="w-8 h-8 text-blue-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Discussions</p>
            <p className="text-2xl font-bold text-gray-900">{activeBuyers}</p>
          </div>
          <MessageSquare className="w-8 h-8 text-green-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg. Compatibility</p>
            <p className="text-2xl font-bold text-gray-900">{avgCompatibility}%</p>
          </div>
          <Star className="w-8 h-8 text-yellow-500" />
        </div>
      </Card>
    </div>
  );
}

export default function InterestedBuyersPage() {
  const [buyers, setBuyers] = useState<InterestedBuyer[]>(MOCK_INTERESTED_BUYERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredBuyers = buyers.filter(buyer => {
    const matchesSearch = buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         buyer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         buyer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || buyer.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const handleMessage = (buyerId: string) => {
    const buyer = buyers.find(b => b.id === buyerId);
    if (buyer) {
      toast.success(`Opening conversation with ${buyer.name}`);
      // Navigate to messages
      window.location.href = `/messages?buyer=${buyerId}`;
    }
  };

  const handleViewProfile = (buyerId: string) => {
    // Navigate to buyer's profile
    window.location.href = `/profile/${buyerId}`;
  };

  const statusCounts = {
    all: buyers.length,
    new: buyers.filter(b => b.status === 'new').length,
    contacted: buyers.filter(b => b.status === 'contacted').length,
    'in-discussion': buyers.filter(b => b.status === 'in-discussion').length,
    'offer-made': buyers.filter(b => b.status === 'offer-made').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Interested Buyers</h1>
          <p className="text-gray-600">See who's interested in acquiring your business</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline">
            <Send className="w-4 h-4 mr-2" />
            Message All
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview buyers={buyers} />

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search buyers..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={filterStatus} onValueChange={setFilterStatus} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({statusCounts.all})</TabsTrigger>
          <TabsTrigger value="new">New ({statusCounts.new})</TabsTrigger>
          <TabsTrigger value="contacted">Contacted ({statusCounts.contacted})</TabsTrigger>
          <TabsTrigger value="in-discussion">In Discussion ({statusCounts['in-discussion']})</TabsTrigger>
          <TabsTrigger value="offer-made">Offers ({statusCounts['offer-made']})</TabsTrigger>
        </TabsList>

        <TabsContent value={filterStatus} className="space-y-4">
          {filteredBuyers.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredBuyers.map((buyer) => (
                <BuyerCard 
                  key={buyer.id} 
                  buyer={buyer} 
                  onMessage={handleMessage}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No buyers found</h3>
              <p className="text-gray-600">
                {searchQuery ? 'Try adjusting your search criteria' : 'No buyers have shown interest yet'}
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
