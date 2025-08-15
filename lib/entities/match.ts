export interface Match {
    id: string;
    userId: string;
    ventureId: string;
    swipeDirection: 'left' | 'right';
    timestamp: Date;
    isMatch: boolean;
  }