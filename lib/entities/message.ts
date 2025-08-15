export interface Message {
    id: string;
    matchId: string;
    senderId: string;
    content: string;
    timestamp: Date;
    messageType: 'text' | 'image' | 'document' | 'system';
    isRead: boolean;
    readAt?: Date;
  }
  

  