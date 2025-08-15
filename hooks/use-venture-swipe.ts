// hooks/use-venture-swipe.ts
import { useState } from 'react';
import { MockMatchRepository } from '@/lib/repositories/implementations/mock-match-repository';
import { SwipeVentureUseCase } from '@/lib/use-case/matching/swipe-venture';

export function useVentureSwipe() {
  const [loading, setLoading] = useState(false);
  
  const swipeVenture = async (userId: string, ventureId: string, direction: 'left' | 'right') => {
    setLoading(true);
    try {
      const useCase = new SwipeVentureUseCase(new MockMatchRepository());
      const result = await useCase.execute(userId, ventureId, direction);
      
      if (result.isMatch) {
        // Show match notification
        console.log('It\'s a match!');
      }
      
      return result;
    } finally {
      setLoading(false);
    }
  };

  return { swipeVenture, loading };
}
