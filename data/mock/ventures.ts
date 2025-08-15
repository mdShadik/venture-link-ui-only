// data/mock/ventures.ts
import { Venture, BusinessAsset, BusinessLiability, BusinessDocument } from '@/lib/entities/venture';

export const mockVentures: Venture[] = [
  {
    id: 'venture-1',
    sellerId: 'seller-1',
    businessName: 'CloudFlow Analytics',
    title: 'Profitable SaaS Analytics Platform',
    description: 'Growing B2B SaaS platform serving 500+ enterprise clients',
    detailedDescription: 'CloudFlow Analytics is a comprehensive business intelligence platform that helps enterprises make data-driven decisions. With 3x revenue growth over the past 2 years and strong customer retention, this is an excellent strategic acquisition opportunity.',
    industry: 'SaaS',
    category: 'Technology',
    
    // Financial Information
    currentRevenue: 2500000,
    revenueGrowth: 45, 
    askingPrice: 12500000,
    ebitda: 800000,
    assets: [
      {
        id: 'asset-1',
        type: 'intellectual-property',
        name: 'Software Platform & IP',
        value: 5000000,
        description: 'Core analytics platform, algorithms, and proprietary technology'
      },
      {
        id: 'asset-2', 
        type: 'equipment',
        name: 'Servers & Infrastructure',
        value: 200000,
        description: 'Cloud infrastructure and development equipment'
      }
    ],
    liabilities: [
      {
        id: 'liability-1',
        type: 'lease',
        name: 'Office Lease',
        amount: 120000,
        monthlyPayment: 10000,
        description: '24-month remaining lease on Seattle office space'
      }
    ],
    
    // Business Details
    foundedYear: 2019,
    employeeCount: 25,
    location: 'Seattle, WA',
    businessModel: 'SaaS Subscription',
    keyProducts: ['Analytics Dashboard', 'Data Integration API', 'Custom Reports'],
    targetMarket: 'Enterprise B2B',
    
    // Deal Information
    sellingReason: 'Founder pursuing new venture opportunity',
    idealBuyer: 'Strategic acquirer in data analytics or growth equity firm',
    timeline: '6-12-months',
    includedInSale: ['Software platform', 'Customer contracts', 'IP rights', 'Team'],
    notIncludedInSale: ['Founder personal assets', 'Unrelated investments'],
    
    // Media
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500'
    ],
    documents: [
      {
        id: 'doc-1',
        name: '2023 Financial Statements',
        type: 'financial-statement',
        url: '/documents/financials-2023.pdf',
        uploadedAt: new Date('2024-01-15'),
        isPublic: false,
        requiresNDA: true
      }
    ],
    
    // Metadata
    stage: 'growth',
    isVerified: true,
    confidenceScore: 85,
    tags: ['SaaS', 'B2B', 'Analytics', 'High Growth', 'Profitable'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: 'venture-2',
    sellerId: 'seller-2',
    businessName: 'CloudFlow Analytics',
    title: 'Profitable SaaS Analytics Platform',
    description: 'Growing B2B SaaS platform serving 500+ enterprise clients',
    detailedDescription: 'CloudFlow Analytics is a comprehensive business intelligence platform that helps enterprises make data-driven decisions. With 3x revenue growth over the past 2 years and strong customer retention, this is an excellent strategic acquisition opportunity.',
    industry: 'SaaS',
    category: 'Technology',
    
    // Financial Information
    currentRevenue: 2500000,
    revenueGrowth: 45, 
    askingPrice: 12500000,
    ebitda: 800000,
    assets: [
      {
        id: 'asset-1',
        type: 'intellectual-property',
        name: 'Software Platform & IP',
        value: 5000000,
        description: 'Core analytics platform, algorithms, and proprietary technology'
      },
      {
        id: 'asset-2', 
        type: 'equipment',
        name: 'Servers & Infrastructure',
        value: 200000,
        description: 'Cloud infrastructure and development equipment'
      }
    ],
    liabilities: [
      {
        id: 'liability-1',
        type: 'lease',
        name: 'Office Lease',
        amount: 120000,
        monthlyPayment: 10000,
        description: '24-month remaining lease on Seattle office space'
      }
    ],
    
    // Business Details
    foundedYear: 2019,
    employeeCount: 25,
    location: 'Seattle, WA',
    businessModel: 'SaaS Subscription',
    keyProducts: ['Analytics Dashboard', 'Data Integration API', 'Custom Reports'],
    targetMarket: 'Enterprise B2B',
    
    // Deal Information
    sellingReason: 'Founder pursuing new venture opportunity',
    idealBuyer: 'Strategic acquirer in data analytics or growth equity firm',
    timeline: '6-12-months',
    includedInSale: ['Software platform', 'Customer contracts', 'IP rights', 'Team'],
    notIncludedInSale: ['Founder personal assets', 'Unrelated investments'],
    
    // Media
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500'
    ],
    documents: [
      {
        id: 'doc-1',
        name: '2023 Financial Statements',
        type: 'financial-statement',
        url: '/documents/financials-2023.pdf',
        uploadedAt: new Date('2024-01-15'),
        isPublic: false,
        requiresNDA: true
      }
    ],
    
    // Metadata
    stage: 'growth',
    isVerified: true,
    confidenceScore: 85,
    tags: ['SaaS', 'B2B', 'Analytics', 'High Growth', 'Profitable'],
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-02-15')
  },
  
];
