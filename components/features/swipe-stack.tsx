// components/swipe/enhanced-swipe-stack.tsx
'use client';

import { useState, useEffect } from 'react';

import { User } from '@/lib/entities/user';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RotateCcw, Settings } from 'lucide-react';
import { EnhancedSwipeCard } from './swipe-card';

interface EnhancedSwipeStackProps {
  users: User[];
  currentUserId: string;
  onSwipe: (userId: string, direction: 'left' | 'right') => void;
  onExpandProfile: (user: User) => void;
}

export function EnhancedSwipeStack({ users, currentUserId, onSwipe, onExpandProfile }: EnhancedSwipeStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeHistory, setSwipeHistory] = useState<string[]>([]);

  const handleSwipe = async (direction: 'left' | 'right') => {
    const currentUser = users[currentIndex];
    if (currentUser) {
      await onSwipe(currentUser.id, direction);
      setSwipeHistory(prev => [...prev, currentUser.id]);
    }
  };

  const handleSwipeComplete = () => {
    setCurrentIndex(prev => prev + 1);
  };

  const handleUndo = () => {
    if (swipeHistory.length > 0 && currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setSwipeHistory(prev => prev.slice(0, -1));
    }
  };

  if (currentIndex >= users.length) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No more buyers to review!
          </h3>
          <p className="text-gray-600 mb-4">
            You've reviewed all available buyer profiles. Check back later for new matches.
          </p>
          <Button variant="outline">
            <Settings className="w-4 h-4 mr-2" />
            Adjust Preferences
          </Button>
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
            transform: `scale(${1 - index * 0.05}) translateY(${index * 10}px)`,
          }}
        >
          <Card className="w-full h-full bg-white opacity-50 rounded-2xl shadow-lg" />
        </div>
      ))}

      {/* Active Card */}
      {users[currentIndex] && (
        <div className="absolute inset-0" style={{ zIndex: 3 }}>
          <EnhancedSwipeCard
            user={users[currentIndex]}
            onSwipe={handleSwipe}
            onSwipeComplete={handleSwipeComplete}
            onExpandProfile={() => onExpandProfile(users[currentIndex])}
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
            className="shadow-lg"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Undo
          </Button>
        </div>
      )}

      {/* Cards Counter */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
        <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
          {currentIndex + 1} of {users.length}
        </div>
      </div>
    </div>
  );
}
