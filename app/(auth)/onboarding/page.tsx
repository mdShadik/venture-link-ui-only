// app/(auth)/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Search, 
  Building, 
  TrendingUp, 
  Users, 
  DollarSign,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface UserType {
  id: 'buyer' | 'seller';
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
}

const USER_TYPES: UserType[] = [
  {
    id: 'buyer',
    title: 'I want to buy a business',
    subtitle: 'Investor / Acquirer',
    description: 'Looking to acquire businesses, invest in companies, or expand your portfolio.',
    features: [
      'Discover businesses for sale',
      'Connect with sellers directly',
      'Manage deal pipeline',
      'Access financial documents',
      'Track acquisition progress'
    ],
    icon: Search,
    color: 'text-blue-700',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 'seller',
    title: 'I want to sell my business',
    subtitle: 'Business Owner / Entrepreneur',
    description: 'Ready to sell your business, looking for strategic buyers, or planning an exit.',
    features: [
      'List your business for sale',
      'Find qualified buyers',
      'Manage buyer communications',
      'Share business documents securely',
      'Track deal negotiations'
    ],
    icon: Building,
    color: 'text-green-700',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  }
];

export default function OnboardingTypePage() {
  const [selectedType, setSelectedType] = useState<'buyer' | 'seller' | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleTypeSelect = (type: 'buyer' | 'seller') => {
    setSelectedType(type);
  };

  const handleContinue = async () => {
    if (!selectedType) return;

    setIsLoading(true);
    
    try {
      // Store user type selection
      localStorage.setItem('selectedUserType', selectedType);
      
      // Navigate to appropriate onboarding flow
      if (selectedType === 'buyer') {
        router.push('/onboarding/buyer');
      } else {
        router.push('/onboarding/seller');
      }
    } catch (error) {
      console.error('Error starting onboarding:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">VL</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">VentureLink</h1>
                <p className="text-sm text-gray-600">Business Acquisition Platform</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to VentureLink
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The premier platform for business acquisitions. Connect buyers and sellers, 
              streamline deals, and grow your portfolio.
            </p>
          </motion.div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 text-center mb-8">
            What would you like to do?
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {USER_TYPES.map((userType, index) => {
              const Icon = userType.icon;
              const isSelected = selectedType === userType.id;
              
              return (
                <motion.div
                  key={userType.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card
                    className={`p-8 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      isSelected 
                        ? `ring-2 ring-offset-2 ${userType.color.replace('text-', 'ring-')} ${userType.bgColor} ${userType.borderColor}` 
                        : 'hover:shadow-lg hover:-translate-y-1'
                    }`}
                    onClick={() => handleTypeSelect(userType.id)}
                  >
                    <div className="space-y-6">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`p-3 rounded-full ${userType.bgColor}`}>
                            <Icon className={`w-8 h-8 ${userType.color}`} />
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900">{userType.title}</h4>
                            <p className={`text-sm font-medium ${userType.color}`}>{userType.subtitle}</p>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className={`w-6 h-6 ${userType.color}`} />
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed">
                        {userType.description}
                      </p>

                      {/* Features */}
                      <div className="space-y-3">
                        <h5 className="font-semibold text-gray-900">What you can do:</h5>
                        <ul className="space-y-2">
                          {userType.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                              <CheckCircle2 className={`w-4 h-4 mr-3 ${userType.color}`} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Stats Preview */}
                      <div className={`p-4 rounded-lg ${userType.bgColor} border ${userType.borderColor}`}>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {userType.id === 'buyer' ? 'Active Businesses' : 'Successful Sales'}
                          </span>
                          <span className={`font-bold ${userType.color}`}>
                            {userType.id === 'buyer' ? '2,500+' : '850+'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              onClick={handleContinue}
              disabled={!selectedType || isLoading}
              size="lg"
              className="px-8 py-3 text-lg font-semibold min-w-[200px]"
            >
              {isLoading ? (
                'Starting...'
              ) : selectedType ? (
                <>
                  Continue as {selectedType === 'buyer' ? 'Buyer' : 'Seller'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                'Select an option above'
              )}
            </Button>
          </motion.div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 space-y-4">
          <p className="text-gray-600">
            Don't worry, you can always switch or add the other role later.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              <span>10,000+ Users</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>$2.5B+ Deals</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
