'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  MapPin, 
  Calendar, 
  Users,
  DollarSign,
  TrendingUp,
  Target,
  CheckCircle2,
  Edit,
  Rocket
} from 'lucide-react';

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
  buyerTypes: string[];
  dealBreakers: string[];
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

  const formatSellingReason = (reason: string) => {
    return reason.charAt(0).toUpperCase() + reason.slice(1).replace('-', ' ');
  };

  const formatTimeline = (timeline: string) => {
    return timeline.charAt(0).toUpperCase() + timeline.slice(1).replace('-', ' ');
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
          Review Your Business Profile
        </h2>
        <p className="text-gray-600">
          Make sure everything looks perfect before we launch your listing
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 6 of 6
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Business Information */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-500" />
              Business Information
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(1)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Business Name</p>
              <p className="font-medium text-gray-900">{data.businessName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="font-medium text-gray-900 text-sm line-clamp-3">{data.businessDescription}</p>
            </div>
            <div className="flex space-x-4">
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-medium text-gray-900">{data.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Founded</p>
                <p className="font-medium text-gray-900">{data.foundedYear}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Industry & Stage */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Industry & Stage
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(2)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Industry</p>
              <p className="font-medium text-gray-900">{data.industry}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Business Stage</p>
              <Badge variant="outline" className="capitalize">
                {data.businessStage}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Financial Information */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-purple-500" />
              Financial Overview
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(3)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Annual Revenue</p>
              <p className="font-medium text-gray-900">{formatBudget(data.revenueRange.min, data.revenueRange.max)}</p>
            </div>
            <div className="flex space-x-4">
              <div>
                <p className="text-sm text-gray-600">Employees</p>
                <p className="font-medium text-gray-900">{data.employeeCount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Assets</p>
                <p className="font-medium text-gray-900">${data.assetValue.toLocaleString()}</p>
              </div>
            </div>
            {data.hasDebts && (
              <div>
                <p className="text-sm text-gray-600">Outstanding Debt</p>
                <p className="font-medium text-red-600">${data.debtAmount?.toLocaleString()}</p>
              </div>
            )}
          </div>
        </Card>

        {/* Selling Information */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold flex items-center">
              <Target className="w-5 h-5 mr-2 text-orange-500" />
              Selling Details
            </h3>
            <Button variant="ghost" size="sm" onClick={() => onEdit(4)}>
              <Edit className="w-4 h-4" />
            </Button>
          </div>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Reason for Selling</p>
              <p className="font-medium text-gray-900">{formatSellingReason(data.sellingReason)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Expected Timeline</p>
              <p className="font-medium text-gray-900">{formatTimeline(data.expectedTimeline)}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Ideal Buyer Profile */}
      <Card className="p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center">
            <Users className="w-5 h-5 mr-2 text-blue-500" />
            Ideal Buyer Profile
          </h3>
          <Button variant="ghost" size="sm" onClick={() => onEdit(5)}>
            <Edit className="w-4 h-4" />
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Description</p>
            <p className="text-gray-900 leading-relaxed">{data.idealBuyerProfile}</p>
          </div>
          
          <div>
            <p className="text-sm text-gray-600 mb-2">Preferred Buyer Types</p>
            <div className="flex flex-wrap gap-2">
              {data.buyerTypes.map((type, index) => (
                <Badge key={index} variant="secondary">
                  {type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
              ))}
            </div>
          </div>

          {data.dealBreakers.length > 0 && (
            <div>
              <p className="text-sm text-gray-600 mb-2">Deal Breakers</p>
              <div className="flex flex-wrap gap-2">
                {data.dealBreakers.slice(0, 3).map((breaker, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {breaker}
                  </Badge>
                ))}
                {data.dealBreakers.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{data.dealBreakers.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Launch Message */}
      <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-8">
        <div className="text-center">
          <Rocket className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-lg mb-2">Ready to Launch! 🎉</h4>
          <p className="text-gray-600 mb-4">
            Your business profile is complete and looks fantastic. We'll start matching you with qualified buyers who fit your criteria.
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
              <span>Profile Complete</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
              <span>Ready for Matching</span>
            </div>
            <div className="flex items-center">
              <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
              <span>Secure & Private</span>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        
        <Button 
          onClick={onComplete} 
          className="min-w-[160px] bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
        >
          <Rocket className="w-4 h-4 mr-2" />
          Launch My Business
        </Button>
      </div>
    </motion.div>
  );
}
