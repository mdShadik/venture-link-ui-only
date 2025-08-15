// data/mock/users.ts
import { User, BuyerProfile, SellerProfile, PastAcquisition } from '@/lib/entities/user';

const pastAcquisitions: PastAcquisition[] = [
  {
    id: 'acq-1',
    businessName: 'TechStart Solutions',
    industry: 'Technology',
    dealValue: 2500000,
    year: 2022,
    outcome: 'successful'
  },
  {
    id: 'acq-2', 
    businessName: 'Green Energy Co',
    industry: 'CleanTech',
    dealValue: 5000000,
    year: 2021,
    outcome: 'successful'
  }
];

export const mockUsers: User[] = [
  // Buyer Users
  {
    id: 'buyer-1',
    name: 'Sarah Chen',
    email: 'sarah.chen@investor.com',
    userType: 'buyer',
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200',
    bio: 'Serial entrepreneur and angel investor with 15+ years experience in tech acquisitions.',
    location: 'San Francisco, CA',
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    buyerProfile: {
      interestedIndustries: ['Technology', 'SaaS', 'E-commerce', 'HealthTech'],
      budgetRange: { min: 1000000, max: 10000000 },
      locationPreferences: ['California', 'New York', 'Texas', 'Remote'],
      acquisitionType: 'majority',
      investmentTimeline: '3-6-months',
      pastAcquisitions: pastAcquisitions,
      experienceLevel: 'serial-acquirer',
      preferredDealSize: 'medium'
    }
  },
  {
    id: 'buyer-2',
    name: 'Michael Rodriguez',
    email: 'michael@privateequity.com',
    userType: 'buyer',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    bio: 'Private equity partner focused on growth-stage companies in emerging markets.',
    location: 'Austin, TX',
    isVerified: true,
    createdAt: new Date('2024-02-01'),
    buyerProfile: {
      interestedIndustries: ['FinTech', 'CleanTech', 'Manufacturing', 'Healthcare'],
      budgetRange: { min: 5000000, max: 50000000 },
      locationPreferences: ['Texas', 'Colorado', 'Arizona'],
      acquisitionType: 'both',
      investmentTimeline: 'immediate',
      pastAcquisitions: [],
      experienceLevel: 'experienced',
      preferredDealSize: 'large'
    }
  },
  {
    id: 'buyer-3',
    name: 'Emily Watson',
    email: 'emily.watson@familyoffice.com',
    userType: 'buyer',
    profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
    bio: 'Family office investment manager seeking stable, profitable businesses.',
    location: 'New York, NY',
    isVerified: true,
    createdAt: new Date('2024-01-20'),
    buyerProfile: {
      interestedIndustries: ['Real Estate', 'Retail', 'Food & Beverage', 'Services'],
      budgetRange: { min: 500000, max: 5000000 },
      locationPreferences: ['New York', 'New Jersey', 'Connecticut'],
      acquisitionType: 'majority',
      investmentTimeline: 'flexible',
      pastAcquisitions: [],
      experienceLevel: 'first-time',
      preferredDealSize: 'small'
    }
  },

  // Seller Users
  {
    id: 'seller-1',
    name: 'David Kim',
    email: 'david@techsolutions.com',
    userType: 'seller',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
    bio: 'Founder of a successful SaaS platform looking for strategic exit.',
    location: 'Seattle, WA',
    isVerified: true,
    createdAt: new Date('2024-02-10'),
    sellerProfile: {
      businessName: 'CloudFlow Analytics',
      industry: 'SaaS',
      revenueRange: { min: 2000000, max: 3000000 },
      businessStage: 'growth',
      sellingReason: 'new-opportunity',
      idealBuyerProfile: 'Strategic acquirer in data analytics space or growth equity firm',
      businessDescription: 'B2B SaaS platform for real-time data analytics and business intelligence',
      foundedYear: 2019,
      employeeCount: 25,
      assetValue: 1500000,
      hasDebts: false,
      expectedTimeline: '6-12-months'
    }
  },
  {
    id: 'seller-2',
    name: 'Maria Santos',
    email: 'maria@ecocraft.com',
    userType: 'seller',
    profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
    bio: 'Owner of sustainable manufacturing business, ready for retirement.',
    location: 'Portland, OR',
    isVerified: true,
    createdAt: new Date('2024-01-25'),
    sellerProfile: {
      businessName: 'EcoCraft Manufacturing',
      industry: 'Manufacturing',
      revenueRange: { min: 1500000, max: 2000000 },
      businessStage: 'mature',
      sellingReason: 'retirement',
      idealBuyerProfile: 'Environmentally conscious buyer who will maintain sustainable practices',
      businessDescription: 'Sustainable packaging and eco-friendly product manufacturing',
      foundedYear: 2015,
      employeeCount: 40,
      assetValue: 3200000,
      hasDebts: true,
      debtAmount: 500000,
      expectedTimeline: '3-6-months'
    }
  }
];
