'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, MapPin } from 'lucide-react';

interface Step3Props {
  onNext: (locations: string[]) => void;
  onBack: () => void;
}

const LOCATIONS = [
  'California', 'New York', 'Texas', 'Florida', 'Illinois', 
  'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 
  'Michigan', 'Washington', 'Remote'
];

export function Step3Location({ onNext, onBack }: Step3Props) {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location) 
        ? prev.filter(loc => loc !== location) 
        : [...prev, location]
    );
  };

  const handleNext = () => {
    if (selectedLocations.length > 0) {
      onNext(selectedLocations);
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
          Where are you looking to acquire businesses?
        </h2>
        <p className="text-gray-600">
          Choose all preferred locations for potential acquisitions
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 3 of 6
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {LOCATIONS.map(location => {
          const isSelected = selectedLocations.includes(location);
          return (
            <motion.div
              key={location}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md relative ${
                  isSelected 
                    ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                    : 'hover:border-gray-300'
                }`}
                onClick={() => toggleLocation(location)}
              >
                <div className="flex items-center justify-center space-x-2">
                  <MapPin className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-sm">{location}</span>
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
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        <div className="text-sm text-gray-500">
          {selectedLocations.length} selected
        </div>
        <Button 
          onClick={handleNext} 
          disabled={selectedLocations.length === 0} 
          className="min-w-[120px]"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
