export interface Match {
    id: string;
    userId: string;
    userName: string;
    userImage: string;
    userTitle: string;
    location: string;
    matchedAt: Date;
    compatibility: number;
    hasMessaged: boolean;
    lastMessage?: string;
    lastMessageAt?: Date;
    isOnline: boolean;
    businessName?: string;
    investmentRange?: string;
    industry: string;
    dealStage?: 'interested' | 'talking' | 'due-diligence' | 'negotiation';
    matchReasons?: string[];
  }
  