'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign, TrendingUp } from 'lucide-react';

interface Step2Props {
  onNext: (budgetRange: { min: number; max: number }) => void;
  onBack: () => void;
}

const PRESET_RANGES = [
  { id: 'small', label: 'Small Business', range: { min: 100000, max: 1000000 }, description: 'Local businesses, small operations' },
  { id: 'medium', label: 'Mid-Market', range: { min: 1000000, max: 10000000 }, description: 'Established companies, proven track record' },
  { id: 'large', label: 'Large Enterprise', range: { min: 10000000, max: 50000000 }, description: 'Major acquisitions, market leaders' },
  { id: 'enterprise', label: 'Enterprise+', range: { min: 50000000, max: 500000000 }, description: 'Strategic acquisitions, conglomerates' }
];

export function Step2Budget({ onNext, onBack }: Step2Props) {
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const [customRange, setCustomRange] = useState({ min: '', max: '' });
  const [useCustom, setUseCustom] = useState(false);

  const handlePresetSelect = (preset: typeof PRESET_RANGES[0]) => {
    setSelectedPreset(preset.id);
    setUseCustom(false);
  };

  const handleCustomToggle = () => {
    setUseCustom(!useCustom);
    setSelectedPreset('');
  };

  const handleNext = () => {
    if (useCustom) {
      const min = parseInt(customRange.min.replace(/,/g, ''));
      const max = parseInt(customRange.max.replace(/,/g, ''));
      if (min > 0 && max > min) {
        onNext({ min, max });
      }
    } else if (selectedPreset) {
      const preset = PRESET_RANGES.find(p => p.id === selectedPreset);
      if (preset) {
        onNext(preset.range);
      }
    }
  };

  const formatNumber = (value: string) => {
    const num = value.replace(/,/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const isValid = useCustom 
    ? customRange.min && customRange.max && parseInt(customRange.min.replace(/,/g, '')) < parseInt(customRange.max.replace(/,/g, ''))
    : selectedPreset !== '';

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          What's your budget range?
        </h2>
        <p className="text-gray-600">
          This helps us show you businesses within your investment capacity
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 2 of 6
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {PRESET_RANGES.map((preset) => {
          const isSelected = selectedPreset === preset.id;
          
          return (
            <motion.div
              key={preset.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => handlePresetSelect(preset)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{preset.label}</h3>
                    <DollarSign className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold text-green-600">
                    ${(preset.range.min / 1000000).toFixed(preset.range.min < 1000000 ? 0 : 1)}M - ${(preset.range.max / 1000000).toFixed(0)}M
                  </div>
                  <p className="text-sm text-gray-600">{preset.description}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="mb-8">
        <Card className={`p-6 ${useCustom ? 'ring-2 ring-blue-500 bg-blue-50' : ''}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Custom Range</h3>
            <Button
              variant={useCustom ? "default" : "outline"}
              size="sm"
              onClick={handleCustomToggle}
            >
              {useCustom ? 'Selected' : 'Use Custom'}
            </Button>
          </div>
          
          {useCustom && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="min-budget">Minimum Budget</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="min-budget"
                    placeholder="100,000"
                    value={customRange.min}
                    onChange={(e) => setCustomRange(prev => ({ 
                      ...prev, 
                      min: formatNumber(e.target.value) 
                    }))}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="max-budget">Maximum Budget</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="max-budget"
                    placeholder="5,000,000"
                    value={customRange.max}
                    onChange={(e) => setCustomRange(prev => ({ 
                      ...prev, 
                      max: formatNumber(e.target.value) 
                    }))}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-between items-center">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <TrendingUp className="w-4 h-4" />
          <span>Avg. deal size: $2.5M</span>
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
