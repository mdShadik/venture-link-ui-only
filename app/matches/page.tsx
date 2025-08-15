'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageSquare, 
  Heart, 
  Clock, 
  MapPin,
  DollarSign,
  Building,
  Star,
  Send,
  Filter
} from 'lucide-react';

interface Match {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  userTitle: string;
  location: string;
  matchedAt: Date;
  compatibility: number;
  hasMessaged: boolean;
  lastMessage?: string;
  lastMessageAt?: Date;
  isOnline: boolean;
  businessName?: string;
  investmentRange?: string;
  industry: string;
  dealStage?: 'interested' | 'talking' | 'due-diligence' | 'negotiation';
}

const MOCK_MATCHES: Match[] = [
  {
    id: '1',
    userId: 'buyer-1',
    userName: 'Sarah Chen',
    userImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200',
    userTitle: 'Serial Entrepreneur & Angel Investor',
    location: 'San Francisco, CA',
    matchedAt: new Date('2024-08-15T10:30:00'),
    compatibility: 95,
    hasMessaged: true,
    lastMessage: 'I\'d love to learn more about your revenue projections...',
    lastMessageAt: new Date('2024-08-15T14:20:00'),
    isOnline: true,
    investmentRange: '$1M - $10M',
    industry: 'Technology',
    dealStage: 'talking'
  },
  {
    id: '2',
    userId: 'buyer-2',
    userName: 'Michael Rodriguez',
    userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    userTitle: 'Private Equity Partner',
    location: 'Austin, TX',
    matchedAt: new Date('2024-08-15T09:15:00'),
    compatibility: 88,
    hasMessaged: false,
    isOnline: false,
    investmentRange: '$5M - $50M',
    industry: 'Manufacturing',
    dealStage: 'interested'
  },
  {
    id: '3',
    userId: 'buyer-3',
    userName: 'Emily Watson',
    userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    userTitle: 'Family Office Investment Manager',
    location: 'New York, NY',
    matchedAt: new Date('2024-08-14T16:45:00'),
    compatibility: 82,
    hasMessaged: true,
    lastMessage: 'The financial statements look promising. Can we schedule a call?',
    lastMessageAt: new Date('2024-08-15T11:30:00'),
    isOnline: true,
    investmentRange: '$500K - $5M',
    industry: 'Services',
    dealStage: 'due-diligence'
  },
  {
    id: '4',
    userId: 'buyer-4',
    userName: 'James Park',
    userImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    userTitle: 'Growth Capital Investor',
    location: 'Seattle, WA',
    matchedAt: new Date('2024-08-14T11:20:00'),
    compatibility: 91,
    hasMessaged: false,
    isOnline: false,
    investmentRange: '$2M - $15M',
    industry: 'SaaS',
    dealStage: 'interested'
  }
];

function MatchCard({ match, onStartConversation }: { match: Match; onStartConversation: (matchId: string) => void }) {
  const getStageColor = (stage?: string) => {
    switch (stage) {
      case 'interested': return 'bg-blue-100 text-blue-800';
      case 'talking': return 'bg-green-100 text-green-800';
      case 'due-diligence': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Avatar with online indicator */}
        <div className="relative">
          <Avatar className="w-16 h-16">
            <AvatarImage src={match.userImage} alt={match.userName} />
            <AvatarFallback>{match.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          {match.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{match.userName}</h3>
              <p className="text-sm text-gray-600 mb-2">{match.userTitle}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {match.location}
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {match.investmentRange}
                </div>
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {match.industry}
                </div>
              </div>

              {/* Last message preview */}
              {match.hasMessaged && match.lastMessage && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <p className="text-sm text-gray-700 line-clamp-2">{match.lastMessage}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatTimeAgo(match.lastMessageAt!)}</p>
                </div>
              )}
            </div>

            {/* Match info */}
            <div className="text-right ml-4">
              <div className="flex items-center mb-2">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium text-gray-900">{match.compatibility}% match</span>
              </div>
              <Badge variant="secondary" className={getStageColor(match.dealStage)}>
                {match.dealStage?.replace('-', ' ')}
              </Badge>
              <p className="text-xs text-gray-500 mt-2">{formatTimeAgo(match.matchedAt)}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-3 mt-4">
            <Button 
              onClick={() => onStartConversation(match.id)}
              className="flex-1"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              {match.hasMessaged ? 'Continue Chat' : 'Start Conversation'}
            </Button>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function MatchesList({ matches, onStartConversation }: { matches: Match[]; onStartConversation: (matchId: string) => void }) {
  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <MatchCard 
          key={match.id} 
          match={match} 
          onStartConversation={onStartConversation} 
        />
      ))}
    </div>
  );
}

function MatchesStats({ matches }: { matches: Match[] }) {
  const totalMatches = matches.length;
  const activeChats = matches.filter(m => m.hasMessaged).length;
  const newMatches = matches.filter(m => 
    new Date().getTime() - m.matchedAt.getTime() < 24 * 60 * 60 * 1000
  ).length;
  const avgCompatibility = Math.round(
    matches.reduce((sum, m) => sum + m.compatibility, 0) / matches.length
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Matches</p>
            <p className="text-2xl font-bold text-gray-900">{totalMatches}</p>
          </div>
          <Heart className="w-8 h-8 text-pink-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Chats</p>
            <p className="text-2xl font-bold text-gray-900">{activeChats}</p>
          </div>
          <MessageSquare className="w-8 h-8 text-blue-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">New (24h)</p>
            <p className="text-2xl font-bold text-gray-900">{newMatches}</p>
          </div>
          <Clock className="w-8 h-8 text-green-500" />
        </div>
      </Card>
      
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg. Match</p>
            <p className="text-2xl font-bold text-gray-900">{avgCompatibility}%</p>
          </div>
          <Star className="w-8 h-8 text-yellow-500" />
        </div>
      </Card>
    </div>
  );
}

export default function MatchesPage() {
  const [matches] = useState<Match[]>(MOCK_MATCHES);

  const allMatches = matches;
  const newMatches = matches.filter(m => 
    new Date().getTime() - m.matchedAt.getTime() < 24 * 60 * 60 * 1000
  );
  const activeChats = matches.filter(m => m.hasMessaged);
  const potentialDeals = matches.filter(m => 
    m.dealStage === 'due-diligence' || m.dealStage === 'negotiation'
  );

  const handleStartConversation = (matchId: string) => {
    // Navigate to messages page with specific match
    window.location.href = `/messages?match=${matchId}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
          <p className="text-gray-600">Connect with interested buyers and explore opportunities</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Send className="w-4 h-4 mr-2" />
            Message All
          </Button>
        </div>
      </div>

      {/* Stats */}
      <MatchesStats matches={matches} />

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Matches ({allMatches.length})</TabsTrigger>
          <TabsTrigger value="new">New ({newMatches.length})</TabsTrigger>
          <TabsTrigger value="active">Active Chats ({activeChats.length})</TabsTrigger>
          <TabsTrigger value="deals">Potential Deals ({potentialDeals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <MatchesList matches={allMatches} onStartConversation={handleStartConversation} />
        </TabsContent>

        <TabsContent value="new" className="space-y-4">
          <MatchesList matches={newMatches} onStartConversation={handleStartConversation} />
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <MatchesList matches={activeChats} onStartConversation={handleStartConversation} />
        </TabsContent>

        <TabsContent value="deals" className="space-y-4">
          <MatchesList matches={potentialDeals} onStartConversation={handleStartConversation} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
