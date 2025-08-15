'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Step1Industries } from './step-1-industries';
import { Step2Budget } from './step-2-budget';
import { Step3Location } from './step-3-location';
import { Step4AcquisitionType } from './step-4-acquisition-type';
import { Step5TimelineExperience } from './step-5-timeline-experience';
import { Step6Summary } from './step-6-summary';

interface OnboardingData {
  industries: string[];
  budgetRange: { min: number; max: number };
  locationPreferences: string[];
  acquisitionType: 'majority' | 'minority' | 'both';
  timeline: string;
  experience: string;
}

interface BuyerOnboardingProps {
  onComplete: (data: OnboardingData) => void;
  onSkip?: () => void;
}

export function BuyerOnboarding({ onComplete, onSkip }: BuyerOnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<Partial<OnboardingData>>({});

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const updateData = (stepData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...stepData }));
  };

  const handleNext = (stepData: any) => {
    updateData(stepData);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    const completeData = onboardingData as OnboardingData;
    onComplete(completeData);
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Industries
            onNext={(industries) => handleNext({ industries })}
          />
        );
      case 2:
        return (
          <Step2Budget
            onNext={(budgetRange) => handleNext({ budgetRange })}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <Step3Location
            onNext={(locationPreferences) => handleNext({ locationPreferences })}
            onBack={handleBack}
          />
        );
      case 4:
        return (
          <Step4AcquisitionType
            onNext={(acquisitionType) => handleNext({ acquisitionType })}
            onBack={handleBack}
          />
        );
      case 5:
        return (
          <Step5TimelineExperience
            onNext={(data) => handleNext(data)}
            onBack={handleBack}
          />
        );
      case 6:
        return (
          <Step6Summary
            data={onboardingData as OnboardingData}
            onComplete={handleComplete}
            onBack={handleBack}
            onEdit={handleEdit}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">VentureLink</h1>
              <span className="text-sm text-gray-500">Buyer Setup</span>
            </div>
            
            {onSkip && currentStep < 6 && (
              <button
                onClick={onSkip}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Skip for now
              </button>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-gray-200 py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center">
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i + 1 <= currentStep 
                      ? 'bg-blue-500' 
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
