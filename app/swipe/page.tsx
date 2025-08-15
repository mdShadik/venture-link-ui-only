'use client';

import { useEffect, useState } from 'react';

import { MockVentureRepository } from '@/lib/repositories/implementations/mock-venture-repository';
import { Venture } from '@/lib/entities/venture';
import { GetVenturesUseCase } from '@/lib/use-case/venture/get-ventures';
import { EnhancedSwipeStack } from '@/components/features/swipe-stack';

export default function SwipePage() {
  const [ventures, setVentures] = useState<Venture[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadVentures = async () => {
      try {
        const useCase = new GetVenturesUseCase(new MockVentureRepository());
        const result = await useCase.execute('user-1', 10);
        setVentures(result);
      } finally {
        setLoading(false);
      }
    };

    loadVentures();
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Discover Ventures</h1>
      <EnhancedSwipeStack ventures={ventures} userId="user-1" />
    </div>
  );
}
