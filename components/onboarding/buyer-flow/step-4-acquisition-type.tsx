// components/onboarding/buyer-flow/step-4-acquisition-type.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, Users, Building } from 'lucide-react';

interface Step4Props {
  onNext: (acquisitionType: 'majority' | 'minority' | 'both') => void;
  onBack: () => void;
}

const ACQUISITION_TYPES = [
  {
    id: 'majority' as const,
    title: 'Majority Stake',
    description: 'Own more than 50% and have controlling interest',
    icon: Building,
    benefits: ['Full control', 'Strategic decisions', 'Operational oversight']
  },
  {
    id: 'minority' as const,
    title: 'Minority Stake',
    description: 'Own less than 50% as strategic investment',
    icon: Users,
    benefits: ['Lower investment', 'Strategic partnership', 'Growth participation']
  },
  {
    id: 'both' as const,
    title: 'Both Options',
    description: 'Open to both majority and minority deals',
    icon: Target,
    benefits: ['Maximum flexibility', 'More opportunities', 'Varied portfolio']
  }
];

export function Step4AcquisitionType({ onNext, onBack }: Step4Props) {
  const [selectedType, setSelectedType] = useState<'majority' | 'minority' | 'both' | ''>('');

  const handleNext = () => {
    if (selectedType) {
      onNext(selectedType);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What type of acquisition interests you?
        </h2>
        <p className="text-gray-600">
          Choose your preferred ownership structure
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 4 of 6
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {ACQUISITION_TYPES.map((type) => {
          const isSelected = selectedType === type.id;
          const Icon = type.icon;
          
          return (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className="text-center space-y-4">
                  <div className={`inline-flex p-3 rounded-full ${
                    isSelected ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      isSelected ? 'text-blue-600' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{type.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    {type.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <div className="text-sm text-gray-500">
          {selectedType ? `${selectedType} selected` : 'Select one option'}
        </div>
        <Button 
          onClick={handleNext} 
          disabled={!selectedType} 
          className="min-w-[120px]"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
