export interface Venture {
    id: string;
    sellerId: string;
    businessName: string;
    title: string;
    description: string;
    detailedDescription: string;
    industry: string;
    category: string;
    
    // Financial Information
    currentRevenue: number;
    revenueGrowth: number; // percentage
    askingPrice: number;
    ebitda: number;
    assets: BusinessAsset[];
    liabilities: BusinessLiability[];
    
    // Business Details
    foundedYear: number;
    employeeCount: number;
    location: string;
    businessModel: string;
    keyProducts: string[];
    targetMarket: string;
    
    // Deal Information
    sellingReason: string;
    idealBuyer: string;
    timeline: 'urgent' | '3-6-months' | '6-12-months' | 'flexible';
    includedInSale: string[];
    notIncludedInSale: string[];
    
    // Media
    images: string[];
    documents: BusinessDocument[];
    
    // Metadata
    stage: 'idea' | 'prototype' | 'mvp' | 'growth' | 'mature';
    isVerified: boolean;
    confidenceScore: number; // AI-generated score 0-100
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface BusinessAsset {
    id: string;
    type: 'equipment' | 'property' | 'inventory' | 'intellectual-property' | 'other';
    name: string;
    value: number;
    description: string;
  }
  
  export interface BusinessLiability {
    id: string;
    type: 'loan' | 'lease' | 'accounts-payable' | 'other';
    name: string;
    amount: number;
    monthlyPayment?: number;
    description: string;
  }
  
  export interface BusinessDocument {
    id: string;
    name: string;
    type: 'financial-statement' | 'tax-return' | 'business-plan' | 'legal' | 'other';
    url: string;
    uploadedAt: Date;
    isPublic: boolean;
    requiresNDA: boolean;
  }
  