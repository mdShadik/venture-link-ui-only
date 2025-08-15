'use client';
import { useState, useEffect } from 'react';
import { BuyerProfileModal } from '@/components/swipe/buyer-profile-modal';
import { User } from '@/lib/entities/user';
import { toast } from 'sonner';
import { mockUsers } from '@/data/mock/uers';
import { EnhancedSwipeStack } from '@/components/features/swipe-stack';

export default function DiscoverPage() {
  const [buyers, setBuyers] = useState<User[]>([]);
  const [selectedBuyer, setSelectedBuyer] = useState<User | null>(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const currentUserId = 'seller-1';

  useEffect(() => {
    const buyerUsers = mockUsers.filter(user => user.userType === 'buyer');
    setBuyers(buyerUsers);
  }, []);

  const handleSwipe = async (userId: string, direction: 'left' | 'right') => {
    // In real app, save to backend
    console.log(`Swiped ${direction} on user ${userId}`);
    
    if (direction === 'right') {
      toast.success('Interested!', {
        description: 'We\'ll notify you if they\'re interested too.'
      });
    }
  };

  const handleExpandProfile = (user: User) => {
    setSelectedBuyer(user);
    setShowProfileModal(true);
  };

  const handleAcceptFromModal = () => {
    if (selectedBuyer) {
      handleSwipe(selectedBuyer.id, 'right');
    }
  };

  const handleRejectFromModal = () => {
    if (selectedBuyer) {
      handleSwipe(selectedBuyer.id, 'left');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Discover Potential Buyers
          </h1>
          <p className="text-gray-600">
            Swipe right if you're interested, left to pass
          </p>
        </div>

        <EnhancedSwipeStack
          users={buyers}
          currentUserId={currentUserId}
          onSwipe={handleSwipe}
          onExpandProfile={handleExpandProfile}
        />

        <BuyerProfileModal
          user={selectedBuyer}
          isOpen={showProfileModal}
          onClose={() => setShowProfileModal(false)}
          onAccept={handleAcceptFromModal}
          onReject={handleRejectFromModal}
        />
      </div>
    </div>
  );
}
