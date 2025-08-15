// components/onboarding/seller-flow/step-3-financials.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DollarSign, Users, TrendingUp } from 'lucide-react';

interface Step3Props {
  onNext: (financials: {
    revenueRange: { min: number; max: number };
    employeeCount: number;
    assetValue: number;
    hasDebts: boolean;
    debtAmount?: number;
  }) => void;
  onBack: () => void;
}

const REVENUE_RANGES = [
  { id: 'under-100k', label: 'Under $100K', range: { min: 0, max: 100000 } },
  { id: '100k-500k', label: '$100K - $500K', range: { min: 100000, max: 500000 } },
  { id: '500k-1m', label: '$500K - $1M', range: { min: 500000, max: 1000000 } },
  { id: '1m-5m', label: '$1M - $5M', range: { min: 1000000, max: 5000000 } },
  { id: '5m-10m', label: '$5M - $10M', range: { min: 5000000, max: 10000000 } },
  { id: 'over-10m', label: 'Over $10M', range: { min: 10000000, max: 100000000 } }
];

export function Step3Financials({ onNext, onBack }: Step3Props) {
  const [selectedRevenueRange, setSelectedRevenueRange] = useState<string>('');
  const [employeeCount, setEmployeeCount] = useState<number>(1);
  const [assetValue, setAssetValue] = useState<string>('');
  const [hasDebts, setHasDebts] = useState<boolean>(false);
  const [debtAmount, setDebtAmount] = useState<string>('');

  const formatNumber = (value: string) => {
    const num = value.replace(/,/g, '');
    return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const handleAssetValueChange = (value: string) => {
    setAssetValue(formatNumber(value));
  };

  const handleDebtAmountChange = (value: string) => {
    setDebtAmount(formatNumber(value));
  };

  const handleNext = () => {
    const range = REVENUE_RANGES.find(r => r.id === selectedRevenueRange)?.range;
    const parsedAssetValue = parseInt(assetValue.replace(/,/g, '')) || 0;
    const parsedDebtAmount = hasDebts ? (parseInt(debtAmount.replace(/,/g, '')) || 0) : undefined;

    if (range && employeeCount && assetValue) {
      onNext({
        revenueRange: range,
        employeeCount,
        assetValue: parsedAssetValue,
        hasDebts,
        debtAmount: parsedDebtAmount
      });
    }
  };

  const isValid = selectedRevenueRange && employeeCount && assetValue && (!hasDebts || debtAmount);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-3xl mx-auto p-6"
    >
      <div className="text-center mb-8">
        <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          Financial Overview
        </h2>
        <p className="text-gray-600">
          Help buyers understand your business size and financial health
        </p>
        <Badge variant="secondary" className="mt-2">
          Step 3 of 6
        </Badge>
      </div>

      <div className="space-y-8">
        {/* Revenue Range */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Annual Revenue Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {REVENUE_RANGES.map((range) => {
              const isSelected = selectedRevenueRange === range.id;
              
              return (
                <Card
                  key={range.id}
                  className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected 
                      ? 'ring-2 ring-green-500 bg-green-50 border-green-200' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedRevenueRange(range.id)}
                >
                  <div className="text-center">
                    <div className="font-semibold text-green-600">{range.label}</div>
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>

        {/* Employee Count */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Users className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold">Number of Employees</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <Label htmlFor="employeeCount">Employee Count</Label>
              <Input
                id="employeeCount"
                type="number"
                min="1"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(parseInt(e.target.value) || 1)}
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        {/* Asset Value */}
        <Card className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <TrendingUp className="w-6 h-6 text-purple-500" />
            <h3 className="text-lg font-semibold">Business Assets</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="assetValue">Total Asset Value</Label>
              <div className="relative mt-2">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="assetValue"
                  placeholder="500,000"
                  value={assetValue}
                  onChange={(e) => handleAssetValueChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Include equipment, inventory, property, etc.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <Label className="text-base font-medium">Business Debts</Label>
                  <p className="text-sm text-gray-500">Do you have any outstanding business debts?</p>
                </div>
                <Switch
                  checked={hasDebts}
                  onCheckedChange={setHasDebts}
                />
              </div>

              {hasDebts && (
                <div>
                  <Label htmlFor="debtAmount">Total Debt Amount</Label>
                  <div className="relative mt-2">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="debtAmount"
                      placeholder="100,000"
                      value={debtAmount}
                      onChange={(e) => handleDebtAmountChange(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between items-center mt-8">
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
        
        <div className="text-sm text-gray-500">
          {isValid ? 'Financial information complete' : 'Please fill in all financial details'}
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
