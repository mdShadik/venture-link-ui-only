export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: Date;
    type: 'text' | 'image' | 'document';
    isRead: boolean;
  }
  
  export interface Conversation {
    id: string;
    userId: string;
    userName: string;
    userImage: string;
    userTitle: string;
    isOnline: boolean;
    lastMessage: string;
    lastMessageTime: Date;
    unreadCount: number;
    businessName?: string;
    dealStage?: string;
  }
  