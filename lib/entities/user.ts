export type UserType = 'buyer' | 'seller';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: UserType;
  profileImage: string;
  bio: string;
  location: string;
  isVerified: boolean;
  createdAt: Date;
  
  // Buyer-specific fields
  buyerProfile?: BuyerProfile;
  
  // Seller-specific fields  
  sellerProfile?: SellerProfile;
}

export interface BuyerProfile {
  interestedIndustries: string[];
  budgetRange: {
    min: number;
    max: number;
  };
  locationPreferences: string[];
  acquisitionType: 'majority' | 'minority' | 'both';
  investmentTimeline: 'immediate' | '3-6-months' | '6-12-months' | 'flexible';
  pastAcquisitions: PastAcquisition[];
  experienceLevel: 'first-time' | 'experienced' | 'serial-acquirer';
  preferredDealSize: 'small' | 'medium' | 'large' | 'enterprise';
}

export interface SellerProfile {
  businessName: string;
  industry: string;
  revenueRange: {
    min: number;
    max: number;
  };
  businessStage: 'startup' | 'growth' | 'mature' | 'declining';
  sellingReason: 'retirement' | 'new-opportunity' | 'financial-need' | 'strategic-exit' | 'other';
  idealBuyerProfile: string;
  businessDescription: string;
  foundedYear: number;
  employeeCount: number;
  assetValue: number;
  hasDebts: boolean;
  debtAmount?: number;
  expectedTimeline: 'urgent' | '3-6-months' | '6-12-months' | 'flexible';
}

export interface PastAcquisition {
  id: string;
  businessName: string;
  industry: string;
  dealValue: number;
  year: number;
  outcome: 'successful' | 'challenged' | 'failed';
}
