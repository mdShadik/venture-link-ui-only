// app/(auth)/onboarding/buyer/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { BuyerOnboarding } from '@/components/onboarding/buyer-flow/buyer-onboarding';
import { toast } from 'sonner';

interface OnboardingData {
  industries: string[];
  budgetRange: { min: number; max: number };
  locationPreferences: string[];
  acquisitionType: 'majority' | 'minority' | 'both';
  timeline: string;
  experience: string;
}

export default function BuyerOnboardingPage() {
  const router = useRouter();

  const handleOnboardingComplete = async (data: OnboardingData) => {
    try {
      console.log('Onboarding completed:', data);
      
      localStorage.setItem('buyerProfile', JSON.stringify(data));
      localStorage.setItem('userType', 'buyer');
      localStorage.setItem('onboardingComplete', 'true');
      
      toast.success('Welcome to VentureLink!', {
        description: 'Your buyer profile has been set up successfully.'
      });
      
      router.push('/dashboard');
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again or contact support.'
      });
    }
  };

  const handleSkip = () => {
    localStorage.setItem('userType', 'buyer');
    localStorage.setItem('onboardingComplete', 'false');
    
    toast.info('Onboarding skipped', {
      description: 'You can complete your profile later in settings.'
    });
    
    router.push('/dashboard');
  };

  return (
    <BuyerOnboarding 
      onComplete={handleOnboardingComplete}
      onSkip={handleSkip}
    />
  );
}
