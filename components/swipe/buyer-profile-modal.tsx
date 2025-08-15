'use client';

import { User } from '@/lib/entities/user';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  DollarSign, 
  Calendar, 
  TrendingUp, 
  Award, 
  CheckCircle2,
  Building,
  Target,
  Clock,
  Heart,
  X
} from 'lucide-react';

interface BuyerProfileModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onReject: () => void;
}

export function BuyerProfileModal({ user, isOpen, onClose, onAccept, onReject }: BuyerProfileModalProps) {
  if (!user || !user.buyerProfile) return null;

  const formatBudget = (min: number, max: number) => {
    const formatMillion = (num: number) => {
      if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
      if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
      return `$${num.toLocaleString()}`;
    };
    return `${formatMillion(min)} - ${formatMillion(max)}`;
  };

  const formatDealValue = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value.toLocaleString()}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={user.profileImage} alt={user.name} />
              <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold">{user.name}</span>
                {user.isVerified && (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin className="w-3 h-3 mr-1" />
                {user.location}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Bio */}
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-gray-600 leading-relaxed">{user.bio}</p>
          </div>

          {/* Investment Profile */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
              Investment Profile
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Budget Range</div>
                <div className="font-semibold text-green-600">
                  {formatBudget(user.buyerProfile.budgetRange.min, user.buyerProfile.budgetRange.max)}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Deal Size Preference</div>
                <div className="font-semibold capitalize">{user.buyerProfile.preferredDealSize}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Acquisition Type</div>
                <div className="font-semibold capitalize">{user.buyerProfile.acquisitionType}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Timeline</div>
                <div className="font-semibold capitalize">{user.buyerProfile.investmentTimeline.replace('-', ' ')}</div>
              </div>
            </div>
          </Card>

          {/* Experience Level */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Experience
            </h3>
            <div className="flex items-center space-x-2 mb-3">
              <Badge variant="outline" className="capitalize">
                {user.buyerProfile.experienceLevel.replace('-', ' ')}
              </Badge>
              <span className="text-sm text-gray-500">
                {user.buyerProfile.pastAcquisitions.length} past acquisition{user.buyerProfile.pastAcquisitions.length !== 1 ? 's' : ''}
              </span>
            </div>
            
            {user.buyerProfile.pastAcquisitions.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Past Acquisitions</h4>
                <div className="space-y-2">
                  {user.buyerProfile.pastAcquisitions.map((acquisition) => (
                    <div key={acquisition.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <div>
                        <div className="font-medium text-sm">{acquisition.businessName}</div>
                        <div className="text-xs text-gray-500">{acquisition.industry} • {acquisition.year}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-sm">{formatDealValue(acquisition.dealValue)}</div>
                        <Badge 
                          variant={acquisition.outcome === 'successful' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {acquisition.outcome}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Industries of Interest */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Building className="w-5 h-5 mr-2 text-blue-500" />
              Industries of Interest
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.buyerProfile.interestedIndustries.map((industry, index) => (
                <Badge key={index} variant="secondary">
                  {industry}
                </Badge>
              ))}
            </div>
          </div>

          {/* Geographic Preferences */}
          <div>
            <h3 className="font-semibold mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-500" />
              Geographic Preferences
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.buyerProfile.locationPreferences.map((location, index) => (
                <Badge key={index} variant="outline">
                  {location}
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <Button
              variant="outline"
              className="flex-1 border-red-200 hover:bg-red-50 hover:border-red-300"
              onClick={() => {
                onReject();
                onClose();
              }}
            >
              <X className="w-4 h-4 mr-2 text-red-500" />
              Pass
            </Button>
            <Button
              className="flex-1 bg-green-500 hover:bg-green-600"
              onClick={() => {
                onAccept();
                onClose();
              }}
            >
              <Heart className="w-4 h-4 mr-2" />
              Interested
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
