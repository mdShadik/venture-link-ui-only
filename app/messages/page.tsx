'use client';

import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Paperclip, 
  Phone, 
  Video, 
  MoreVertical,
  Search,
  Smile,
  Image as ImageIcon,
  FileText,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'image' | 'document';
  isRead: boolean;
}

interface Conversation {
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

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    userId: 'buyer-1',
    userName: 'Sarah Chen',
    userImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=200',
    userTitle: 'Serial Entrepreneur',
    isOnline: true,
    lastMessage: 'I\'d love to learn more about your revenue projections for the next 3 years.',
    lastMessageTime: new Date('2024-08-15T14:20:00'),
    unreadCount: 2,
    businessName: 'CloudFlow Analytics',
    dealStage: 'Due Diligence'
  },
  {
    id: 'conv-2',
    userId: 'buyer-2',
    userName: 'Michael Rodriguez',
    userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    userTitle: 'Private Equity Partner',
    isOnline: false,
    lastMessage: 'Thanks for sharing the documents. Our team will review them.',
    lastMessageTime: new Date('2024-08-15T11:45:00'),
    unreadCount: 0,
    businessName: 'EcoCraft Manufacturing',
    dealStage: 'Initial Review'
  }
];

const MOCK_MESSAGES: { [key: string]: Message[] } = {
  'conv-1': [
    {
      id: 'msg-1',
      senderId: 'buyer-1',
      content: 'Hi! I\'m very interested in CloudFlow Analytics. Your business model looks impressive.',
      timestamp: new Date('2024-08-15T10:00:00'),
      type: 'text',
      isRead: true
    },
    {
      id: 'msg-2',
      senderId: 'seller-1',
      content: 'Thank you for your interest, Sarah! I\'d be happy to discuss the opportunity with you.',
      timestamp: new Date('2024-08-15T10:15:00'),
      type: 'text',
      isRead: true
    }
  ]
};

function ConversationList({ 
  conversations, 
  activeConversation, 
  onSelectConversation,
  isClient 
}: { 
  conversations: Conversation[];
  activeConversation: string | null;
  onSelectConversation: (conversationId: string) => void;
  isClient: boolean;
}) {
  // Fix: Use consistent formatting that doesn't rely on current time
  const formatTime = (date: Date) => {
    if (!isClient) return ''; // Don't render time on server
    
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Now';
    if (diffInHours < 24) return `${diffInHours}h`;
    return `${Math.floor(diffInHours / 24)}d`;
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-10"
          />
        </div>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
              activeConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
            }`}
            onClick={() => onSelectConversation(conversation.id)}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conversation.userImage} alt={conversation.userName} />
                  <AvatarFallback>{conversation.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                {conversation.isOnline && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {conversation.userName}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500" suppressHydrationWarning>
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                    {conversation.unreadCount > 0 && (
                      <Badge className="bg-blue-500 text-white text-xs px-1.5 py-0.5 min-w-[1.2rem] h-5">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
                
                <p className="text-xs text-gray-600 mb-1">{conversation.userTitle}</p>
                <p className="text-sm text-gray-600 truncate mb-1">{conversation.lastMessage}</p>
                
                {conversation.businessName && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-600 font-medium">
                      {conversation.businessName}
                    </span>
                    {conversation.dealStage && (
                      <Badge variant="outline" className="text-xs">
                        {conversation.dealStage}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatArea({ 
  conversation, 
  messages, 
  onSendMessage,
  isClient 
}: { 
  conversation: Conversation | null;
  messages: Message[];
  onSendMessage: (message: string) => void;
  isClient: boolean;
}) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentUserId = 'seller-1';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage.trim());
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Fix: Consistent time formatting
  const formatMessageTime = (date: Date) => {
    if (!isClient) return ''; // Don't render on server
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No conversation selected</h3>
          <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={conversation.userImage} alt={conversation.userName} />
                <AvatarFallback>{conversation.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              {conversation.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">{conversation.userName}</h3>
              <p className="text-xs text-gray-600">
                {conversation.isOnline ? 'Online now' : 'Last seen 2h ago'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {conversation.businessName && (
          <div className="mt-2 p-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              Discussing: <span className="font-medium">{conversation.businessName}</span>
              {conversation.dealStage && (
                <span className="ml-2">• {conversation.dealStage}</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => {
            const isOwn = message.senderId === currentUserId;
            
            return (
              <div key={message.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md ${isOwn ? 'order-2' : 'order-1'}`}>
                  <div className={`px-4 py-2 rounded-2xl ${
                    isOwn 
                      ? 'bg-blue-500 text-white rounded-br-md' 
                      : 'bg-white text-gray-900 rounded-bl-md shadow-sm'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <div className={`flex items-center mt-1 space-x-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
                    <span className="text-xs text-gray-500" suppressHydrationWarning>
                      {formatMessageTime(message.timestamp)}
                    </span>
                    {isOwn && (
                      <div className="w-3 h-3">
                        {message.isRead ? (
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        ) : (
                          <Clock className="w-3 h-3 text-gray-400" />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <div className="flex items-end space-x-3">
          <div className="flex space-x-1">
            <Button variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <ImageIcon className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <FileText className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex-1 relative">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="pr-12"
            />
            <Button variant="ghost" size="sm" className="absolute right-1 top-1">
              <Smile className="w-4 h-4" />
            </Button>
          </div>
          
          <Button onClick={handleSend} disabled={!newMessage.trim()} className="px-4">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [conversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConversation, setActiveConversation] = useState<string | null>('conv-1');
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES['conv-1'] || []);
  
  // Fix: Client-side hydration flag
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentConversation = conversations.find(c => c.id === activeConversation) || null;

  const handleSelectConversation = (conversationId: string) => {
    setActiveConversation(conversationId);
    setMessages(MOCK_MESSAGES[conversationId] || []);
  };

  const handleSendMessage = (content: string) => {
    if (!activeConversation) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: 'seller-1',
      content,
      timestamp: new Date(),
      type: 'text',
      isRead: false
    };

    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      <ConversationList 
        conversations={conversations}
        activeConversation={activeConversation}
        onSelectConversation={handleSelectConversation}
        isClient={isClient}
      />
      <ChatArea 
        conversation={currentConversation}
        messages={messages}
        onSendMessage={handleSendMessage}
        isClient={isClient}
      />
    </div>
  );
}
