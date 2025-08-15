'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Calendar, Target } from 'lucide-react';

interface Step4Props {
  onNext: (sellingInfo: {
    sellingReason: string;
    expectedTimeline: string;
  }) => void;
  onBack: () => void;
}

const SELLING_REASONS = [
  {
    id: 'retirement',
    title: 'Retirement',
    description: 'Ready to retire and enjoy life',
    icon: '🏖️'
  },
  {
    id: 'new-opportunity',
    title: 'New Opportunity',
    description: 'Pursuing a new business venture',
    icon: '🚀'
  },
  {
    id: 'financial-need',
    title: 'Financial Need',
    description: 'Need capital for personal reasons',
    icon: '💰'
  },
  {
    id: 'strategic-exit',
    title: 'Strategic Exit',
    description: 'Planned exit at optimal time',
    icon: '🎯'
  },
  {
    id: 'partnership',
    title: 'Partnership',
    description: 'Looking for strategic partnership',
    icon: '🤝'
  },
  {
    id: 'other',
    title: 'Other',
    description: 'Different reason not listed',
    icon: '💭'
  }
];

const TIMELINES = [
  {
    id: 'urgent',
    title: 'Urgent (1-3 months)',
    description: 'Need to sell quickly',
    color: 'text-red-700 bg-red-50 border-red-200'
  },
  {
    id: '3-6-months',
    title: '3-6 months',
    description: 'Reasonable timeline for due diligence',
    color: 'text-orange-700 bg-orange-50 border-orange-200'
  },
  {
    id: '6-12-months',
    title: '6-12 months',
    description: 'Standard timeline for optimal outcome',
    color: 'text-blue-700 bg-blue-50 border-blue-200'
  },
  {
    id: 'flexible',
    title: 'Flexible (12+ months)',
    description: 'No rush, waiting for right buyer',
    color: 'text-green-700 bg-green-50 border-green-200'
  }
];

export function Step4SellingReason({ onNext, onBack }: Step4Props) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');

  const handleNext = () => {
    if (selectedReason && selectedTimeline) {
      onNext({
        sellingReason: selectedReason,
        expectedTimeline: selectedTimeline
      });
    }
  };

  const isValid = selectedReason && selectedTimeline;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <Target className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Why are you selling?
        </h2>
        <p className="text-gray-600">
          Help us understand your motivation and timeline for the sale
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 4 of 6
        </Badge>
      </div>

      <div className="space-y-10">
        {/* Selling Reason */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-center">What's driving your decision to sell?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SELLING_REASONS.map((reason) => {
              const isSelected = selectedReason === reason.id;
              
              return (
                <motion.div
                  key={reason.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg relative ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedReason(reason.id)}
                  >
                    <div className="text-center space-y-3">
                      <div className="text-3xl">{reason.icon}</div>
                      <h4 className="font-semibold text-gray-900">{reason.title}</h4>
                      <p className="text-sm text-gray-600">{reason.description}</p>
                      <div className="absolute top-3 right-3">
                        {isSelected ? (
                          <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        ) : (
                          <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-center">What's your expected timeline?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIMELINES.map((timeline) => {
              const isSelected = selectedTimeline === timeline.id;
              
              return (
                <motion.div
                  key={timeline.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                      isSelected 
                        ? `ring-2 ring-blue-500 ${timeline.color}` 
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTimeline(timeline.id)}
                  >
                    <div className="text-center space-y-3">
                      <Calendar className={`w-6 h-6 mx-auto ${
                        isSelected ? timeline.color.split(' ')[0] : 'text-gray-600'
                      }`} />
                      <h4 className="font-semibold text-gray-900">{timeline.title}</h4>
                      <p className="text-sm text-gray-600">{timeline.description}</p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-10">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        
        <div className="text-sm text-gray-500">
          {isValid ? 'Reason and timeline selected' : 'Please select both reason and timeline'}
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
