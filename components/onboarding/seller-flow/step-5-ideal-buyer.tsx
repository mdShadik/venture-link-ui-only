'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Users, Target } from 'lucide-react';

interface Step5Props {
  onNext: (idealBuyer: {
    idealBuyerProfile: string;
    buyerTypes: string[];
    dealBreakers: string[];
  }) => void;
  onBack: () => void;
}

const BUYER_TYPES = [
  {
    id: 'individual-investor',
    title: 'Individual Investor',
    description: 'High-net-worth individual looking to acquire businesses',
    icon: '👤'
  },
  {
    id: 'private-equity',
    title: 'Private Equity',
    description: 'PE firms focused on growth and returns',
    icon: '🏢'
  },
  {
    id: 'strategic-acquirer',
    title: 'Strategic Acquirer',
    description: 'Company in same/related industry seeking synergies',
    icon: '🔗'
  },
  {
    id: 'competitor',
    title: 'Competitor',
    description: 'Direct competitor looking to expand market share',
    icon: '⚔️'
  },
  {
    id: 'management-team',
    title: 'Management Team',
    description: 'Current or external management buyout',
    icon: '👥'
  },
  {
    id: 'family-office',
    title: 'Family Office',
    description: 'Wealthy family\'s investment arm',
    icon: '🏛️'
  }
];

const DEAL_BREAKERS = [
  'Layoffs or major staff reductions',
  'Changing company culture significantly',
  'Moving operations to different location',
  'Dismantling the business for parts',
  'Not honoring existing customer commitments',
  'Not maintaining product/service quality',
  'Aggressive cost-cutting that hurts operations',
  'Not respecting founder legacy'
];

export function Step5IdealBuyer({ onNext, onBack }: Step5Props) {
  const [idealBuyerProfile, setIdealBuyerProfile] = useState<string>('');
  const [selectedBuyerTypes, setSelectedBuyerTypes] = useState<string[]>([]);
  const [selectedDealBreakers, setSelectedDealBreakers] = useState<string[]>([]);

  const toggleBuyerType = (typeId: string) => {
    setSelectedBuyerTypes(prev =>
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  const toggleDealBreaker = (breaker: string) => {
    setSelectedDealBreakers(prev =>
      prev.includes(breaker) 
        ? prev.filter(b => b !== breaker)
        : [...prev, breaker]
    );
  };

  const handleNext = () => {
    if (idealBuyerProfile && selectedBuyerTypes.length > 0) {
      onNext({
        idealBuyerProfile,
        buyerTypes: selectedBuyerTypes,
        dealBreakers: selectedDealBreakers
      });
    }
  };

  const isValid = idealBuyerProfile && selectedBuyerTypes.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Describe Your Ideal Buyer
        </h2>
        <p className="text-gray-600">
          Help us find the right buyer who aligns with your vision and values
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 5 of 6
        </Badge>
      </div>

      <div className="space-y-8">
        {/* Ideal Buyer Description */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">What type of buyer are you looking for?</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="idealBuyer" className="text-base font-medium">
                Describe your ideal buyer *
              </Label>
              <Textarea
                id="idealBuyer"
                placeholder="Tell us about the type of buyer you'd prefer. For example: 'Looking for a strategic buyer who values our company culture and wants to grow the business rather than strip it for parts. Ideally someone with industry experience who can add value to our operations...'"
                value={idealBuyerProfile}
                onChange={(e) => setIdealBuyerProfile(e.target.value)}
                className="mt-2 min-h-[120px]"
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-1">
                {idealBuyerProfile.length}/500 characters
              </p>
            </div>
          </div>
        </Card>

        {/* Buyer Types */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">What types of buyers interest you? *</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {BUYER_TYPES.map((type) => {
              const isSelected = selectedBuyerTypes.includes(type.id);
              
              return (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md relative ${
                      isSelected 
                        ? 'ring-2 ring-purple-500 bg-purple-50 border-purple-200' 
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => toggleBuyerType(type.id)}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="text-2xl">{type.icon}</div>
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-purple-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 text-sm">{type.title}</h4>
                      <p className="text-xs text-gray-600">{type.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          <p className="text-sm text-gray-500 mt-3">Select all that apply</p>
        </Card>

        {/* Deal Breakers */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Any deal breakers? (Optional)</h3>
          <p className="text-gray-600 mb-4">Select things you absolutely don't want the buyer to do:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DEAL_BREAKERS.map((breaker, index) => {
              const isSelected = selectedDealBreakers.includes(breaker);
              
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div
                    className={`p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                      isSelected 
                        ? 'border-red-300 bg-red-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => toggleDealBreaker(breaker)}
                  >
                    <div className="flex items-center space-x-2">
                      {isSelected ? (
                        <CheckCircle2 className="w-4 h-4 text-red-500" />
                      ) : (
                        <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                      )}
                      <span className="text-sm text-gray-700">{breaker}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        
        <div className="text-sm text-gray-500">
          {isValid ? 'Buyer preferences completed' : 'Please describe your ideal buyer'}
        </div>
        
        <Button 
          onClick={handleNext}
          disabled={!isValid}
          className="min-w-[120px]"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
