// components/swipe/enhanced-swipe-card.tsx
'use client';

import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion';
import { useState } from 'react';
import { User } from '@/lib/entities/user';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Award, 
  CheckCircle2,
  X,
  Heart,
  Info
} from 'lucide-react';

interface EnhancedSwipeCardProps {
  user: User;
  onSwipe: (direction: 'left' | 'right') => void;
  onSwipeComplete: () => void;
  onExpandProfile: () => void;
}

export function EnhancedSwipeCard({ user, onSwipe, onSwipeComplete, onExpandProfile }: EnhancedSwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);
  
  const controls = useAnimation();

  const handleDragEnd = async (event: any, info: any) => {
    const threshold = 150;
    const direction = info.offset.x > 0 ? 'right' : 'left';

    if (Math.abs(info.offset.x) > threshold) {
      await controls.start({
        x: info.offset.x > 0 ? 1000 : -1000,
        opacity: 0,
        transition: { duration: 0.3 }
      });
      
      onSwipe(direction);
      onSwipeComplete();
    } else {
      controls.start({ x: 0, transition: { type: 'spring', stiffness: 300 } });
    }
  };

  const handleAccept = async () => {
    await controls.start({
      x: 1000,
      opacity: 0,
      transition: { duration: 0.3 }
    });
    onSwipe('right');
    onSwipeComplete();
  };

  const handleReject = async () => {
    await controls.start({
      x: -1000,
      opacity: 0,
      transition: { duration: 0.3 }
    });
    onSwipe('left');
    onSwipeComplete();
  };

  const formatBudget = (min: number, max: number) => {
    const formatMillion = (num: number) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString()}`;
    };
    return `${formatMillion(min)} - ${formatMillion(max)}`;
  };

  if (!user.buyerProfile) return null;

  return (
    <motion.div
      className="absolute w-80 h-[600px] bg-white rounded-2xl shadow-xl overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: -300, right: 300 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Profile Header */}
      <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Verification Badge */}
        {user.isVerified && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-green-500 hover:bg-green-600">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified
            </Badge>
          </div>
        )}

        {/* Profile Info */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-16 h-16 border-2 border-white">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            
            <div className="text-white">
              <h3 className="text-xl font-bold">{user.name}</h3>
              <div className="flex items-center text-sm opacity-90">
                <MapPin className="w-3 h-3 mr-1" />
                {user.location}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content - Fixed spacing */}
      <div className="p-4 pb-24 space-y-3 h-[352px] overflow-y-auto">
        {/* Experience Level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Award className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium capitalize">
              {user.buyerProfile.experienceLevel.replace('-', ' ')}
            </span>
          </div>
          <Badge variant="outline">
            {user.buyerProfile.preferredDealSize}
          </Badge>
        </div>

        {/* Budget Range */}
        <Card className="p-3 bg-green-50 border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Investment Range</span>
            </div>
            <span className="text-sm font-bold text-green-600">
              {formatBudget(user.buyerProfile.budgetRange.min, user.buyerProfile.budgetRange.max)}
            </span>
          </div>
        </Card>

        {/* Industries */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Interested Industries</h4>
          <div className="flex flex-wrap gap-1">
            {user.buyerProfile.interestedIndustries.slice(0, 4).map((industry, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {industry}
              </Badge>
            ))}
            {user.buyerProfile.interestedIndustries.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{user.buyerProfile.interestedIndustries.length - 4} more
              </Badge>
            )}
          </div>
        </div>

        {/* Timeline */}
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-blue-500" />
          <span className="text-sm text-gray-600">
            Timeline: <span className="font-medium capitalize">{user.buyerProfile.investmentTimeline.replace('-', ' ')}</span>
          </span>
        </div>

        {/* Past Acquisitions */}
        {user.buyerProfile.pastAcquisitions.length > 0 && (
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-purple-500" />
            <span className="text-sm text-gray-600">
              {user.buyerProfile.pastAcquisitions.length} past acquisition{user.buyerProfile.pastAcquisitions.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Bio - Truncated to prevent overflow */}
        <div>
          <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
            {user.bio}
          </p>
        </div>
      </div>

      {/* Action Buttons - Fixed position */}
      <div className="absolute bottom-4 left-4 right-4 bg-white">
        <div className="space-y-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onExpandProfile}
            className="w-full"
          >
            <Info className="w-4 h-4 mr-1" />
            View Full Profile
          </Button>
          
          <div className="flex items-center justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              className="w-12 h-12 rounded-full border-red-200 hover:bg-red-50 hover:border-red-300"
              onClick={handleReject}
            >
              <X className="w-5 h-5 text-red-500" />
            </Button>
            
            <Button
              size="icon"
              className="w-12 h-12 rounded-full bg-green-500 hover:bg-green-600"
              onClick={handleAccept}
            >
              <Heart className="w-5 h-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Swipe Indicators */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: useTransform(x, [0, 100], [0, 1]) }}
      >
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold transform rotate-12">
          INTERESTED
        </div>
      </motion.div>
      
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: useTransform(x, [0, -100], [0, 1]) }}
      >
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold transform -rotate-12">
          PASS
        </div>
      </motion.div>
    </motion.div>
  );
}
