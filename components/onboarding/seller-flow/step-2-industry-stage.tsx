'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, TrendingUp } from 'lucide-react';

interface Step2Props {
  onNext: (industryStage: {
    industry: string;
    businessStage: string;
  }) => void;
  onBack: () => void;
}

const INDUSTRIES = [
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'saas', name: 'SaaS', icon: '☁️' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'fintech', name: 'FinTech', icon: '💳' },
  { id: 'cleantech', name: 'CleanTech', icon: '🌱' },
  { id: 'manufacturing', name: 'Manufacturing', icon: '🏭' },
  { id: 'real-estate', name: 'Real Estate', icon: '🏢' },
  { id: 'retail', name: 'Retail', icon: '🏪' },
  { id: 'food-beverage', name: 'Food & Beverage', icon: '🍽️' },
  { id: 'services', name: 'Services', icon: '🤝' },
  { id: 'education', name: 'Education', icon: '📚' }
];

const BUSINESS_STAGES = [
  {
    id: 'startup',
    name: 'Startup',
    description: 'Early stage, proving concept',
    icon: '🚀'
  },
  {
    id: 'growth',
    name: 'Growth',
    description: 'Scaling operations and revenue',
    icon: '📈'
  },
  {
    id: 'mature',
    name: 'Mature',
    description: 'Established with steady revenue',
    icon: '🏛️'
  },
  {
    id: 'declining',
    name: 'Declining',
    description: 'Revenue decreasing, needs turnaround',
    icon: '📉'
  }
];

export function Step2IndustryStage({ onNext, onBack }: Step2Props) {
  const [selectedIndustry, setSelectedIndustry] = useState<string>('');
  const [selectedStage, setSelectedStage] = useState<string>('');

  const handleNext = () => {
    if (selectedIndustry && selectedStage) {
      const industryName = INDUSTRIES.find(i => i.id === selectedIndustry)?.name || '';
      const stageName = BUSINESS_STAGES.find(s => s.id === selectedStage)?.id || '';
      
      onNext({
        industry: industryName,
        businessStage: stageName
      });
    }
  };

  const isValid = selectedIndustry && selectedStage;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Industry & Business Stage
        </h2>
        <p className="text-gray-600">
          Help buyers find you by categorizing your business
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 2 of 6
        </Badge>
      </div>

      <div className="space-y-8">
        {/* Industry Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-4">What industry are you in?</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map((industry) => {
              const isSelected = selectedIndustry === industry.id;
              
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
                    onClick={() => setSelectedIndustry(industry.id)}
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
        </div>

        {/* Business Stage Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-4">What stage is your business in?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {BUSINESS_STAGES.map((stage) => {
              const isSelected = selectedStage === stage.id;
              
              return (
                <motion.div
                  key={stage.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedStage(stage.id)}
                  >
                    <div className="text-center space-y-3">
                      <div className="text-3xl">{stage.icon}</div>
                      <h4 className="font-semibold">{stage.name}</h4>
                      <p className="text-sm text-gray-600">{stage.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        
        <div className="text-sm text-gray-500">
          {isValid ? 'Industry and stage selected' : 'Please select both industry and business stage'}
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
