// components/onboarding/buyer-flow/step-6-summary.tsx
'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  MapPin, 
  Building, 
  Clock, 
  Award,
  CheckCircle2,
  Edit
} from 'lucide-react';

interface OnboardingData {
  industries: string[];
  budgetRange: { min: number; max: number };
  locationPreferences: string[];
  acquisitionType: 'majority' | 'minority' | 'both';
  timeline: string;
  experience: string;
}

interface Step6Props {
  data: OnboardingData;
  onComplete: () => void;
  onBack: () => void;
  onEdit: (step: number) => void;
}

export function Step6Summary({ data, onComplete, onBack, onEdit }: Step6Props) {
  const formatBudget = (min: number, max: number) => {
    const formatMillion = (num: number) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString()}`;
    };
    return `${formatMillion(min)} - ${formatMillion(max)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Review Your Profile
        </h2>
        <p className="text-gray-600">
          Make sure everything looks correct before completing your setup
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 6 of 6
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Industries */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-500" />
              Industries
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(1)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.industries.map((industry, index) => (
              <Badge key={index} variant="secondary">
                {industry}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Budget */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
              Budget Range
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(2)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {formatBudget(data.budgetRange.min, data.budgetRange.max)}
          </div>
        </Card>

        {/* Locations */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-purple-500" />
              Preferred Locations
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(3)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.locationPreferences.map((location, index) => (
              <Badge key={index} variant="outline">
                {location}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Acquisition Type */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Building className="w-5 h-5 mr-2 text-orange-500" />
              Acquisition Type
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(4)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <Badge variant="default" className="capitalize">
            {data.acquisitionType} stake
          </Badge>
        </Card>

        {/* Timeline & Experience */}
        <Card className="p-6 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Timeline & Experience
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(5)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Investment Timeline</div>
              <div className="font-medium capitalize">{data.timeline.replace('-', ' ')}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Experience Level</div>
              <div className="font-medium capitalize">{data.experience.replace('-', ' ')}</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Completion Message */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 mb-8">
        <div className="text-center">
          <h4 className="font-semibold text-lg mb-2">You're all set! 🎉</h4>
          <p className="text-gray-600">
            Your buyer profile is complete. You'll start seeing relevant business opportunities 
            that match your preferences and investment criteria.
          </p>
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onComplete} className="min-w-[160px] bg-gradient-to-r from-blue-500 to-purple-600">
          Complete Setup
        </Button>
      </div>
    </motion.div>
  );
}
