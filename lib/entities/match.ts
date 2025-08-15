export interface Match {
    id: string;
    userId: string;
    ventureId: string;
    swipeDirection: 'left' | 'right';
    timestamp: Date;
    isMatch: boolean;
    isMutual?: boolean;
    
    // Enhanced matching data
    compatibilityScore: number; // 0-100
    matchReasons: string[];
    
    // Communication
    hasMessaged: boolean;
    lastMessageAt?: Date;
    
    // Deal progression
    dealId?: string;
    dealStatus?: 'interested' | 'in-progress' | 'completed' | 'cancelled';
  }
  