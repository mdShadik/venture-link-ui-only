'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Award, Zap, Calendar } from 'lucide-react';

interface Step5Props {
  onNext: (data: { timeline: string; experience: string }) => void;
  onBack: () => void;
}

const TIMELINES = [
  { id: 'immediate', label: 'Immediate', description: 'Ready to close within 30 days', icon: Zap },
  { id: '3-6-months', label: '3-6 Months', description: 'Comfortable timeline for due diligence', icon: Calendar },
  { id: '6-12-months', label: '6-12 Months', description: 'Thorough evaluation and preparation', icon: Clock },
  { id: 'flexible', label: 'Flexible', description: 'Timeline depends on the opportunity', icon: Award }
];

const EXPERIENCE_LEVELS = [
  { id: 'first-time', label: 'First-time Buyer', description: 'New to business acquisitions' },
  { id: 'experienced', label: 'Experienced', description: 'Have completed acquisitions before' },
  { id: 'serial-acquirer', label: 'Serial Acquirer', description: 'Regularly acquire businesses' }
];

export function Step5TimelineExperience({ onNext, onBack }: Step5Props) {
  const [selectedTimeline, setSelectedTimeline] = useState<string>('');
  const [selectedExperience, setSelectedExperience] = useState<string>('');

  const handleNext = () => {
    if (selectedTimeline && selectedExperience) {
      onNext({ timeline: selectedTimeline, experience: selectedExperience });
    }
  };

  const isValid = selectedTimeline && selectedExperience;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Timeline & Experience
        </h2>
        <p className="text-gray-600">
          Help us understand your acquisition timeline and experience level
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 5 of 6
        </Badge>
      </div>

      <div className="space-y-8">
        {/* Timeline Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-blue-500" />
            Investment Timeline
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TIMELINES.map((timeline) => {
              const isSelected = selectedTimeline === timeline.id;
              const Icon = timeline.icon;
              
              return (
                <motion.div
                  key={timeline.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected 
                        ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedTimeline(timeline.id)}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 ${
                        isSelected ? 'text-blue-600' : 'text-gray-600'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-semibold">{timeline.label}</h4>
                        <p className="text-sm text-gray-600">{timeline.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Experience Level Selection */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            Experience Level
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {EXPERIENCE_LEVELS.map((experience) => {
              const isSelected = selectedExperience === experience.id;
              
              return (
                <motion.div
                  key={experience.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Card
                    className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                      isSelected 
                        ? 'ring-2 ring-yellow-500 bg-yellow-50 border-yellow-200' 
                        : 'hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedExperience(experience.id)}
                  >
                    <div className="text-center">
                      <h4 className="font-semibold mb-2">{experience.label}</h4>
                      <p className="text-sm text-gray-600">{experience.description}</p>
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
          {isValid ? 'Ready to continue' : 'Select timeline and experience'}
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
