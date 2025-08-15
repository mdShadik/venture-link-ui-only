'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Search,
  Filter,
  Heart,
  X,
  MapPin,
  DollarSign,
  Building,
  Users,
  Calendar,
  TrendingUp,
  Star,
  RotateCcw,
  Settings,
  Zap,
  Info
} from 'lucide-react';
import { motion, useMotionValue, useTransform, useAnimation, PanInfo } from 'framer-motion';
import { toast } from 'sonner';

interface SwipeableUser {
  id: string;
  name: string;
  title: string;
  profileImage: string;
  location: string;
  userType: 'buyer' | 'seller';
  isVerified: boolean;
  isOnline: boolean;
  
  // For buyers
  buyerProfile?: {
    interestedIndustries: string[];
    budgetRange: { min: number; max: number };
    experienceLevel: string;
    pastAcquisitions: number;
  };
  
  // For sellers
  businessProfile?: {
    businessName: string;
    industry: string;
    revenue: number;
    employees: number;
    founded: number;
    askingPrice: number;
  };
  
  compatibilityScore: number;
  matchReasons: string[];
}

const MOCK_SWIPE_USERS: SwipeableUser[] = [
  {
    id: 'buyer-1',
    name: 'Sarah Chen',
    title: 'Serial Entrepreneur & Angel Investor',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200',
    location: 'San Francisco, CA',
    userType: 'buyer',
    isVerified: true,
    isOnline: true,
    buyerProfile: {
      interestedIndustries: ['Technology', 'SaaS', 'E-commerce'],
      budgetRange: { min: 1000000, max: 10000000 },
      experienceLevel: 'Serial Acquirer',
      pastAcquisitions: 5
    },
    compatibilityScore: 95,
    matchReasons: ['Industry match', 'Budget alignment', 'Location preference']
  },
  {
    id: 'buyer-2',
    name: 'Michael Rodriguez',
    title: 'Private Equity Partner',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    location: 'Austin, TX',
    userType: 'buyer',
    isVerified: true,
    isOnline: false,
    buyerProfile: {
      interestedIndustries: ['Manufacturing', 'CleanTech', 'FinTech'],
      budgetRange: { min: 5000000, max: 50000000 },
      experienceLevel: 'Experienced',
      pastAcquisitions: 12
    },
    compatibilityScore: 88,
    matchReasons: ['Budget fit', 'Growth stage focus', 'B2B experience']
  },
  {
    id: 'buyer-3',
    name: 'Emily Watson',
    title: 'Family Office Investment Manager',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    location: 'New York, NY',
    userType: 'buyer',
    isVerified: true,
    isOnline: true,
    buyerProfile: {
      interestedIndustries: ['Real Estate', 'Services', 'Retail'],
      budgetRange: { min: 500000, max: 5000000 },
      experienceLevel: 'First-time Buyer',
      pastAcquisitions: 0
    },
    compatibilityScore: 82,
    matchReasons: ['Service industry match', 'Size compatibility']
  },
  {
    id: 'buyer-4',
    name: 'James Park',
    title: 'Growth Capital Investor',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    location: 'Seattle, WA',
    userType: 'buyer',
    isVerified: false,
    isOnline: true,
    buyerProfile: {
      interestedIndustries: ['SaaS', 'Technology', 'Healthcare'],
      budgetRange: { min: 2000000, max: 15000000 },
      experienceLevel: 'Experienced',
      pastAcquisitions: 8
    },
    compatibilityScore: 91,
    matchReasons: ['Perfect industry fit', 'Ideal budget range', 'Growth focus']
  },
  {
    id: 'buyer-5',
    name: 'Lisa Zhang',
    title: 'Venture Capital Partner',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    location: 'Boston, MA',
    userType: 'buyer',
    isVerified: true,
    isOnline: true,
    buyerProfile: {
      interestedIndustries: ['HealthTech', 'BioTech', 'Medical Devices'],
      budgetRange: { min: 3000000, max: 25000000 },
      experienceLevel: 'Serial Acquirer',
      pastAcquisitions: 15
    },
    compatibilityScore: 87,
    matchReasons: ['Healthcare focus', 'Strong track record', 'Strategic fit']
  }
];

function SwipeCard({ 
  user, 
  onSwipe, 
  onExpandProfile,
  isActive 
}: { 
  user: SwipeableUser; 
  onSwipe: (direction: 'left' | 'right') => void;
  onExpandProfile: () => void;
  isActive: boolean;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const controls = useAnimation();

  const handleDragEnd = async (event: any, info: PanInfo) => {
    if (!isActive) return;
    
    const threshold = 100;
    const direction = info.offset.x > 0 ? 'right' : 'left';

    if (Math.abs(info.offset.x) > threshold) {
      await controls.start({
        x: info.offset.x > 0 ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.2 }
      });
      onSwipe(direction);
    } else {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } });
    }
  };

  const handleAccept = async () => {
    if (!isActive) return;
    
    await controls.start({
      x: 1000,
      opacity: 0,
      transition: { duration: 0.2 }
    });
    onSwipe('right');
  };

  const handleReject = async () => {
    if (!isActive) return;
    
    await controls.start({
      x: -1000,
      opacity: 0,
      transition: { duration: 0.2 }
    });
    onSwipe('left');
  };

  const formatBudget = (min: number, max: number) => {
    const formatMillion = (num: number) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString()}`;
    };
    return `${formatMillion(min)} - ${formatMillion(max)}`;
  };

  return (
    <motion.div
      className={`absolute w-80 h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden ${
        isActive ? 'cursor-grab active:cursor-grabbing' : ''
      }`}
      style={{ x, rotate, opacity }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: -300, right: 300 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ x: 0, rotate: 0, opacity: 1 }}
      whileHover={isActive ? { scale: 1.02 } : {}}
      whileTap={isActive ? { scale: 0.98 } : {}}
    >
      {/* Header with gradient */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Verification & Online Status */}
        <div className="absolute top-4 right-4 flex space-x-2">
          {user.isVerified && (
            <Badge className="bg-green-500 hover:bg-green-600 text-xs">
              Verified
            </Badge>
          )}
          {user.isOnline && (
            <Badge className="bg-blue-500 hover:bg-blue-600 text-xs">
              Online
            </Badge>
          )}
        </div>

        {/* Compatibility Score */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <Star className="w-4 h-4 text-yellow-300" />
            <span className="text-white font-medium text-sm">{user.compatibilityScore}% match</span>
          </div>
        </div>

        {/* Profile Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-16 h-16 border-2 border-white">
                <AvatarImage src={user.profileImage} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {user.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div className="text-white flex-1">
              <h3 className="text-xl font-bold">{user.name}</h3>
              <p className="text-sm opacity-90">{user.title}</p>
              <div className="flex items-center text-sm opacity-75 mt-1">
                <MapPin className="w-3 h-3 mr-1" />
                {user.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4 h-[280px] overflow-y-auto">
        {/* Match Reasons */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Why you're a match</h4>
          <div className="space-y-1">
            {user.matchReasons.map((reason, index) => (
              <div key={index} className="flex items-center text-sm text-green-700 bg-green-50 px-2 py-1 rounded">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                {reason}
              </div>
            ))}
          </div>
        </div>

        {/* Buyer Profile Info */}
        {user.buyerProfile && (
          <div className="space-y-3">
            <Card className="p-3 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Investment Range</span>
                </div>
                <span className="text-sm font-bold text-blue-600">
                  {formatBudget(user.buyerProfile.budgetRange.min, user.buyerProfile.budgetRange.max)}
                </span>
              </div>
            </Card>

            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Industries of Interest</h4>
              <div className="flex flex-wrap gap-1">
                {user.buyerProfile.interestedIndustries.slice(0, 3).map((industry, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {industry}
                  </Badge>
                ))}
                {user.buyerProfile.interestedIndustries.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{user.buyerProfile.interestedIndustries.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <TrendingUp className="w-4 h-4 mr-1 text-purple-500" />
                <span>{user.buyerProfile.experienceLevel}</span>
              </div>
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1 text-orange-500" />
                <span>{user.buyerProfile.pastAcquisitions} acquisitions</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons - Fixed at bottom */}
      <div className="absolute bottom-4 left-4 right-4 bg-white">
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onExpandProfile}
            className="w-full"
            disabled={!isActive}
          >
            <Info className="w-4 h-4 mr-1" />
            View Full Profile
          </Button>
          
          <div className="flex items-center justify-center space-x-6">
            <Button
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full border-red-200 hover:bg-red-50 hover:border-red-300"
              onClick={handleReject}
              disabled={!isActive}
            >
              <X className="w-6 h-6 text-red-500" />
            </Button>
            
            <Button
              size="icon"
              className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600"
              onClick={handleAccept}
              disabled={!isActive}
            >
              <Heart className="w-6 h-6 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Swipe Indicators */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
      >
        <div className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-lg transform rotate-12 shadow-lg">
          INTERESTED
        </div>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: useTransform(x, [0, -100], [0, 1]) }}
      >
        <div className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold text-lg transform -rotate-12 shadow-lg">
          PASS
        </div>
      </motion.div>
    </motion.div>
  );
}

function SwipeStack({ 
  users, 
  onSwipe, 
  onExpandProfile 
}: { 
  users: SwipeableUser[]; 
  onSwipe: (userId: string, direction: 'left' | 'right') => void;
  onExpandProfile: (user: SwipeableUser) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<{ userId: string; direction: 'left' | 'right' }[]>([]);

  const handleSwipe = (direction: 'left' | 'right') => {
    const currentUser = users[currentIndex];
    if (currentUser) {
      // Add to history
      setSwipeHistory(prev => [...prev, { userId: currentUser.id, direction }]);
      
      // Call parent handler
      onSwipe(currentUser.id, direction);
      
      // Move to next card after a short delay
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
    }
  };

  const handleUndo = () => {
    if (swipeHistory.length > 0 && currentIndex > 0) {
      // Remove last entry from history
      setSwipeHistory(prev => prev.slice(0, -1));
      
      // Go back to previous card
      setCurrentIndex(prev => prev - 1);
      
      toast.info('Undid last swipe');
    }
  };

  if (currentIndex >= users.length) {
    return (
      <div className="flex flex-col items-center justify-center h-[600px] space-y-6">
        <div className="text-center">
          <Zap className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            You've seen everyone!
          </h3>
          <p className="text-gray-600 mb-6 max-w-md">
            Great job exploring! Check back later for new potential matches, or adjust your preferences to see more people.
          </p>
          <div className="flex space-x-3">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Adjust Preferences
            </Button>
            <Button>
              <RotateCcw className="w-4 h-4 mr-2" />
              View Matches
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[600px] w-80 mx-auto">
      {/* Background Cards */}
      {users.slice(currentIndex + 1, currentIndex + 3).map((user, index) => (
        <div
          key={user.id}
          className="absolute inset-0"
          style={{
            zIndex: 2 - index,
            transform: `scale(${1 - (index + 1) * 0.05}) translateY(${(index + 1) * 8}px)`,
          }}
        >
          <SwipeCard 
            user={user}
            onSwipe={() => {}}
            onExpandProfile={() => {}}
            isActive={false}
          />
        </div>
      ))}

      {/* Active Card */}
      {users[currentIndex] && (
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          <SwipeCard
            user={users[currentIndex]}
            onSwipe={handleSwipe}
            onExpandProfile={() => onExpandProfile(users[currentIndex])}
            isActive={true}
          />
        </div>
      )}

      {/* Undo Button */}
      {swipeHistory.length > 0 && (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleUndo}
            className="shadow-lg bg-white"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Undo
          </Button>
        </div>
      )}

      {/* Cards Counter */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-full shadow-sm border">
          {currentIndex + 1} of {users.length}
        </div>
      </div>
    </div>
  );
}

export default function DiscoverPage() {
  const [users] = useState<SwipeableUser[]>(MOCK_SWIPE_USERS);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSwipe = (userId: string, direction: 'left' | 'right') => {
    console.log(`Swiped ${direction} on user ${userId}`);
    
    if (direction === 'right') {
      toast.success('Interested!', {
        description: 'We\'ll notify you if they\'re interested too.'
      });
    } else {
      toast.info('Passed', {
        description: 'This profile has been skipped.'
      });
    }
  };

  const handleExpandProfile = (user: SwipeableUser) => {
    // In real app, navigate to profile page
    window.location.href = `/profile/${user.id}`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Discover Potential Buyers
        </h1>
        <p className="text-gray-600">
          Swipe right if you're interested, left to pass
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4 max-w-md mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search by location, industry..." 
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

      {/* Swipe Stack */}
      <div className="flex justify-center">
        <SwipeStack
          users={users}
          onSwipe={handleSwipe}
          onExpandProfile={handleExpandProfile}
        />
      </div>

      {/* Tips */}
      <div className="max-w-md mx-auto">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Info className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Pro Tip</h4>
              <p className="text-sm text-blue-800">
                Take time to read profiles carefully. Quality matches lead to better deals than quantity.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
