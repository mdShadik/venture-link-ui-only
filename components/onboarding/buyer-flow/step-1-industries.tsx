'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';

interface Step1Props {
  onNext: (industries: string[]) => void;
  onBack?: () => void;
}

const INDUSTRIES = [
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'saas', name: 'SaaS', icon: '☁️' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'healthtech', name: 'HealthTech', icon: '🏥' },
  { id: 'fintech', name: 'FinTech', icon: '💳' },
  { id: 'cleantech', name: 'CleanTech', icon: '🌱' },
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
  { id: 'real-estate', name: 'Real Estate', icon: '🏢' },
  { id: 'retail', name: 'Retail', icon: '🏪' },
  { id: 'food-beverage', name: 'Food & Beverage', icon: '🍽️' },
  { id: 'services', name: 'Services', icon: '🤝' },
  { id: 'education', name: 'Education', icon: '📚' }
];

export function Step1Industries({ onNext, onBack }: Step1Props) {
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const toggleIndustry = (industryId: string) => {
    setSelectedIndustries(prev => 
      prev.includes(industryId)
        ? prev.filter(id => id !== industryId)
        : [...prev, industryId]
    );
  };

  const handleNext = () => {
    if (selectedIndustries.length > 0) {
      onNext(selectedIndustries);
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
          What industries interest you?
        </h2>
        <p className="text-gray-600">
          Select all industries you're interested in acquiring businesses from
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 1 of 6
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {INDUSTRIES.map((industry) => {
          const isSelected = selectedIndustries.includes(industry.id);
          
          return (
            <motion.div
              key={industry.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md relative ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => toggleIndustry(industry.id)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="text-2xl">{industry.icon}</div>
                  <h3 className="font-medium text-sm">{industry.name}</h3>
                  <div className="absolute top-2 right-2">
                    {isSelected ? (
                      <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-between items-center">
        <Button 
          variant="ghost" 
          onClick={onBack}
          disabled={!onBack}
        >
          Back
        </Button>
        
        <div className="text-sm text-gray-500">
          {selectedIndustries.length} selected
        </div>
        
        <Button 
          onClick={handleNext}
          disabled={selectedIndustries.length === 0}
          className="min-w-[120px]"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
