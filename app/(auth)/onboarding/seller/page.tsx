'use client';

import { useRouter } from 'next/navigation';
import { SellerOnboarding } from '@/components/onboarding/seller-flow/seller-onboarding';
import { toast } from 'sonner';

interface OnboardingData {
  businessName: string;
  businessDescription: string;
  location: string;
  foundedYear: number;
  industry: string;
  businessStage: string;
  revenueRange: { min: number; max: number };
  employeeCount: number;
  assetValue: number;
  hasDebts: boolean;
  debtAmount?: number;
  sellingReason: string;
  expectedTimeline: string;
  idealBuyerProfile: string;
}

export default function SellerOnboardingPage() {
  const router = useRouter();

  const handleOnboardingComplete = async (data: OnboardingData) => {
    try {
      console.log('Seller onboarding completed:', data);
      
      // Save to localStorage for demo purposes
      localStorage.setItem('sellerProfile', JSON.stringify(data));
      localStorage.setItem('userType', 'seller');
      localStorage.setItem('onboardingComplete', 'true');
      
      toast.success('Welcome to VentureLink!', {
        description: 'Your business profile has been created successfully.'
      });
      
      // Redirect to dashboard
      router.push('/dashboard');
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again or contact support.'
      });
    }
  };

  const handleSkip = () => {
    // Allow skipping but mark as incomplete
    localStorage.setItem('userType', 'seller');
    localStorage.setItem('onboardingComplete', 'false');
    
    toast.info('Onboarding skipped', {
      description: 'You can complete your business profile later in settings.'
    });
    
    router.push('/dashboard');
  };

  return (
    <SellerOnboarding 
      onComplete={handleOnboardingComplete}
      onSkip={handleSkip}
    />
  );
}
