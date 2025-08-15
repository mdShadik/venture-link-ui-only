'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Building, MapPin, Calendar } from 'lucide-react';

interface Step1Props {
  onNext: (businessInfo: {
    businessName: string;
    businessDescription: string;
    location: string;
    foundedYear: number;
  }) => void;
  onBack?: () => void;
}

export function Step1BusinessInfo({ onNext, onBack }: Step1Props) {
  const [formData, setFormData] = useState({
    businessName: '',
    businessDescription: '',
    location: '',
    foundedYear: new Date().getFullYear()
  });

  const handleNext = () => {
    if (formData.businessName && formData.businessDescription && formData.location) {
      onNext(formData);
    }
  };

  const isValid = formData.businessName && formData.businessDescription && formData.location;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <Building className="w-12 h-12 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Tell us about your business
        </h2>
        <p className="text-gray-600">
          Help potential buyers understand what makes your business special
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 1 of 6
        </Badge>
      </div>

      <Card className="p-8">
        <div className="space-y-6">
          <div>
            <Label htmlFor="businessName" className="text-base font-medium">
              Business Name *
            </Label>
            <Input
              id="businessName"
              placeholder="e.g., CloudFlow Analytics"
              value={formData.businessName}
              onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
              className="mt-2 text-lg"
            />
          </div>

          <div>
            <Label htmlFor="businessDescription" className="text-base font-medium">
              Business Description *
            </Label>
            <Textarea
              id="businessDescription"
              placeholder="Describe what your business does, your target market, and what makes you unique..."
              value={formData.businessDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, businessDescription: e.target.value }))}
              className="mt-2 min-h-[120px]"
            />
            <p className="text-sm text-gray-500 mt-1">
              {formData.businessDescription.length}/500 characters
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="location" className="text-base font-medium">
                Location *
              </Label>
              <div className="relative mt-2">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="location"
                  placeholder="e.g., San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="pl-10"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="foundedYear" className="text-base font-medium">
                Founded Year
              </Label>
              <div className="relative mt-2">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="foundedYear"
                  type="number"
                  min="1900"
                  max={new Date().getFullYear()}
                  value={formData.foundedYear}
                  onChange={(e) => setFormData(prev => ({ ...prev, foundedYear: parseInt(e.target.value) }))}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="ghost" 
          onClick={onBack}
          disabled={!onBack}
        >
          Back
        </Button>
        
        <div className="text-sm text-gray-500">
          {isValid ? 'Ready to continue' : 'Please fill in all required fields'}
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
