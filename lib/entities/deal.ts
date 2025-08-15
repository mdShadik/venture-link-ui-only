export interface Deal {
    id: string;
    buyerId: string;
    sellerId: string;
    ventureId: string;
    
    // Deal Status
    status: DealStatus;
    currentStage: DealStage;
    progress: number; // 0-100 percentage
    
    // Financial Terms
    proposedPrice: number;
    finalPrice?: number;
    paymentTerms: string;
    contingencies: string[];
    
    // Timeline
    createdAt: Date;
    expectedClosingDate: Date;
    actualClosingDate?: Date;
    
    // Documentation
    documentsShared: DealDocument[];
    ndaSigned: boolean;
    contractSigned: boolean;
    
    // Communication
    messages: DealMessage[];
    milestones: DealMilestone[];
    
    // AI Analysis
    riskAssessment: RiskAssessment;
    aiRecommendations: string[];
  }
  
  export type DealStatus = 'active' | 'paused' | 'completed' | 'cancelled';
  
  export type DealStage = 
    | 'initial-interest'
    | 'nda-signing' 
    | 'document-sharing'
    | 'due-diligence'
    | 'negotiation'
    | 'legal-review'
    | 'closing'
    | 'completed';
  
  export interface DealDocument {
    id: string;
    name: string;
    type: string;
    uploadedBy: string;
    uploadedAt: Date;
    reviewStatus: 'pending' | 'reviewed' | 'approved' | 'rejected';
    comments: string[];
  }
  
  export interface DealMessage {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
    messageType: 'text' | 'document' | 'system';
    isRead: boolean;
  }
  
  export interface DealMilestone {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    completedAt?: Date;
    isCompleted: boolean;
    assignedTo: string;
  }
  
  export interface RiskAssessment {
    overallRisk: 'low' | 'medium' | 'high';
    financialRisk: number; // 0-100
    legalRisk: number; // 0-100
    operationalRisk: number; // 0-100
    marketRisk: number; // 0-100
    riskFactors: string[];
    mitigationSuggestions: string[];
  }
  