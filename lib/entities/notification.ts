export interface Notification {
    id: string;
    userId: string;
    type: 'match' | 'message' | 'deal-update' | 'document-request' | 'system';
    title: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
    actionUrl?: string;
    metadata?: Record<string, any>;
  }