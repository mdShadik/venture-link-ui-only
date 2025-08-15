// app/deals/[dealId]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle2,
  Clock,
  AlertTriangle,
  DollarSign,
  Calendar,
  FileText,
  MessageSquare,
  TrendingUp,
  Building,
  Users,
  MapPin,
  Phone,
  Video,
  MoreVertical,
  Download,
  Upload,
  Edit,
  ArrowLeft,
  Activity,
  Target,
  AlertCircle,
  ChevronRight,
  Plus
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

interface DealDetail {
  id: string;
  businessName: string;
  businessDescription: string;
  businessImage: string;
  buyerId: string;
  buyerName: string;
  buyerImage: string;
  buyerTitle: string;
  sellerId: string;
  sellerName: string;
  sellerTitle: string;
  currentStage: DealStage;
  progress: number;
  proposedPrice: number;
  finalPrice?: number;
  expectedClosingDate: Date;
  createdAt: Date;
  lastActivity: Date;
  status: 'active' | 'paused' | 'completed' | 'cancelled';
  riskLevel: 'low' | 'medium' | 'high';
  milestones: DealMilestone[];
  documents: DealDocument[];
  timeline: TimelineEvent[];
  financials: BusinessFinancials;
  nextActions: NextAction[];
  industry: string;
  location: string;
  revenue: number;
  ebitda: number;
  employees: number;
  riskFactors: string[];
  keyMetrics: KeyMetric[];
}

type DealStage = 
  | 'initial-interest'
  | 'nda-signing' 
  | 'document-sharing'
  | 'due-diligence'
  | 'negotiation'
  | 'legal-review'
  | 'closing'
  | 'completed';

interface DealMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completedAt?: Date;
  isCompleted: boolean;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
}

interface DealDocument {
  id: string;
  name: string;
  type: 'financial' | 'legal' | 'technical' | 'other';
  uploadedAt: Date;
  uploadedBy: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  size: string;
  comments: string[];
}

interface TimelineEvent {
  id: string;
  type: 'milestone' | 'document' | 'meeting' | 'communication' | 'stage-change';
  title: string;
  description: string;
  timestamp: Date;
  userId: string;
  userName: string;
}

interface BusinessFinancials {
  revenue: number;
  revenueGrowth: number;
  ebitda: number;
  ebitdaMargin: number;
  cashFlow: number;
  valuation: number;
  debt: number;
}

interface NextAction {
  id: string;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: Date;
  priority: 'low' | 'medium' | 'high';
  category: 'legal' | 'financial' | 'technical' | 'administrative';
}

interface KeyMetric {
  label: string;
  value: string;
  change?: string;
  trend: 'up' | 'down' | 'stable';
}

const DEAL_STAGES: { stage: DealStage; label: string; percentage: number }[] = [
  { stage: 'initial-interest', label: 'Initial Interest', percentage: 10 },
  { stage: 'nda-signing', label: 'NDA Signing', percentage: 20 },
  { stage: 'document-sharing', label: 'Document Sharing', percentage: 35 },
  { stage: 'due-diligence', label: 'Due Diligence', percentage: 50 },
  { stage: 'negotiation', label: 'Negotiation', percentage: 70 },
  { stage: 'legal-review', label: 'Legal Review', percentage: 85 },
  { stage: 'closing', label: 'Closing', percentage: 95 },
  { stage: 'completed', label: 'Completed', percentage: 100 }
];

const MOCK_DEAL: DealDetail = {
  id: 'deal-1',
  businessName: 'CloudFlow Analytics',
  businessDescription: 'A comprehensive business intelligence platform that helps enterprises make data-driven decisions. With 3x revenue growth over the past 2 years and strong customer retention.',
  businessImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200',
  buyerId: 'buyer-1',
  buyerName: 'Sarah Chen',
  buyerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100',
  buyerTitle: 'Serial Entrepreneur & Angel Investor',
  sellerId: 'seller-1',
  sellerName: 'David Kim',
  sellerTitle: 'Founder & CEO',
  currentStage: 'due-diligence',
  progress: 50,
  proposedPrice: 12500000,
  expectedClosingDate: new Date('2024-10-15'),
  createdAt: new Date('2024-08-01'),
  lastActivity: new Date('2024-08-15T12:30:00'),
  status: 'active',
  riskLevel: 'low',
  industry: 'SaaS',
  location: 'Seattle, WA',
  revenue: 2500000,
  ebitda: 800000,
  employees: 25,
  riskFactors: [
    'Customer concentration risk (top 3 customers = 45% revenue)',
    'Key person dependency on founder',
    'Competitive market with new entrants'
  ],
  financials: {
    revenue: 2500000,
    revenueGrowth: 45,
    ebitda: 800000,
    ebitdaMargin: 32,
    cashFlow: 650000,
    valuation: 12500000,
    debt: 0
  },
  keyMetrics: [
    { label: 'ARR', value: '$2.5M', change: '+45%', trend: 'up' },
    { label: 'Customers', value: '500+', change: '+120', trend: 'up' },
    { label: 'Churn Rate', value: '3.2%', change: '-0.8%', trend: 'up' },
    { label: 'CAC', value: '$1,250', change: '-15%', trend: 'up' }
  ],
  milestones: [
    {
      id: 'ms-1',
      title: 'Financial Review Complete',
      description: 'Complete analysis of 3-year financial statements and projections',
      dueDate: new Date('2024-08-20'),
      isCompleted: false,
      assignedTo: 'buyer-1',
      priority: 'high'
    },
    {
      id: 'ms-2',
      title: 'Technical Audit',
      description: 'Review codebase, infrastructure, and technical debt',
      dueDate: new Date('2024-08-25'),
      isCompleted: false,
      assignedTo: 'buyer-1',
      priority: 'medium'
    },
    {
      id: 'ms-3',
      title: 'Customer Interviews',
      description: 'Interview top 10 customers about satisfaction and renewal likelihood',
      dueDate: new Date('2024-08-30'),
      isCompleted: false,
      assignedTo: 'buyer-1',
      priority: 'high'
    }
  ],
  documents: [
    {
      id: 'doc-1',
      name: 'Financial Statements 2021-2023.pdf',
      type: 'financial',
      uploadedAt: new Date('2024-08-10'),
      uploadedBy: 'seller-1',
      status: 'reviewed',
      size: '2.4 MB',
      comments: ['Looks comprehensive', 'Need clarification on Q3 2023 spike']
    },
    {
      id: 'doc-2',
      name: 'Customer Contracts Package.zip',
      type: 'legal',
      uploadedAt: new Date('2024-08-12'),
      uploadedBy: 'seller-1',
      status: 'pending',
      size: '15.7 MB',
      comments: []
    },
    {
      id: 'doc-3',
      name: 'Technical Architecture Overview.pdf',
      type: 'technical',
      uploadedAt: new Date('2024-08-14'),
      uploadedBy: 'seller-1',
      status: 'approved',
      size: '3.8 MB',
      comments: ['Well documented', 'Scalable architecture']
    }
  ],
  timeline: [
    {
      id: 'tl-1',
      type: 'stage-change',
      title: 'Moved to Due Diligence',
      description: 'Deal progressed from document sharing to due diligence phase',
      timestamp: new Date('2024-08-10T14:30:00'),
      userId: 'buyer-1',
      userName: 'Sarah Chen'
    },
    {
      id: 'tl-2',
      type: 'document',
      title: 'Financial Documents Uploaded',
      description: 'Seller uploaded 3-year financial statements',
      timestamp: new Date('2024-08-10T10:15:00'),
      userId: 'seller-1',
      userName: 'David Kim'
    },
    {
      id: 'tl-3',
      type: 'meeting',
      title: 'Initial Due Diligence Call',
      description: '90-minute call to discuss DD process and timeline',
      timestamp: new Date('2024-08-08T16:00:00'),
      userId: 'buyer-1',
      userName: 'Sarah Chen'
    }
  ],
  nextActions: [
    {
      id: 'na-1',
      title: 'Complete Financial Analysis',
      description: 'Review 3-year financials and create summary report',
      assignedTo: 'buyer-1',
      dueDate: new Date('2024-08-20'),
      priority: 'high',
      category: 'financial'
    },
    {
      id: 'na-2',
      title: 'Schedule Customer Calls',
      description: 'Set up interviews with top 5 customers',
      assignedTo: 'buyer-1',
      dueDate: new Date('2024-08-22'),
      priority: 'medium',
      category: 'administrative'
    }
  ]
};

function DealHeader({ deal }: { deal: DealDetail }) {
  const router = useRouter();
  
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const currentStageInfo = DEAL_STAGES.find(s => s.stage === deal.currentStage) || DEAL_STAGES[0];

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" onClick={() => router.back()} className="mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Deals
      </Button>

      {/* Main header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center">
            <Building className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{deal.businessName}</h1>
            <p className="text-gray-600 max-w-2xl">{deal.businessDescription}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {deal.location}
              </div>
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                {deal.industry}
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {deal.employees} employees
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Badge variant="secondary" className={getRiskColor(deal.riskLevel)}>
            {deal.riskLevel} risk
          </Badge>
          <Badge variant="secondary" className={getStatusColor(deal.status)}>
            {deal.status}
          </Badge>
          <Button variant="outline">
            <Edit className="w-4 h-4 mr-2" />
            Edit Deal
          </Button>
          <Button variant="outline">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Deal progress */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Deal Progress</h3>
            <span className="text-sm text-gray-600">{deal.progress}% Complete</span>
          </div>
          
          <div className="space-y-2">
            <Progress value={deal.progress} className="h-3" />
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-900">{currentStageInfo.label}</span>
              <span className="text-gray-600">
                Expected close: {deal.expectedClosingDate.toLocaleDateString()}
              </span>
            </div>
          </div>

          {/* Stage timeline */}
          <div className="flex items-center justify-between mt-4">
            {DEAL_STAGES.map((stage, index) => {
              const isCompleted = stage.percentage <= deal.progress;
              const isCurrent = stage.stage === deal.currentStage;
              
              return (
                <div key={stage.stage} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted 
                      ? 'bg-blue-500 text-white' 
                      : isCurrent 
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-500'
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  {index < DEAL_STAGES.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 ${
                      isCompleted ? 'bg-blue-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Card>

      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Proposed Price</p>
            <p className="text-2xl font-bold text-gray-900">
              ${(deal.proposedPrice / 1000000).toFixed(1)}M
            </p>
            {deal.finalPrice && (
              <p className="text-sm text-green-600">
                Final: ${(deal.finalPrice / 1000000).toFixed(1)}M
              </p>
            )}
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Revenue</p>
            <p className="text-2xl font-bold text-gray-900">
              ${(deal.revenue / 1000000).toFixed(1)}M
            </p>
            <p className="text-sm text-green-600">
              +{deal.financials.revenueGrowth}% YoY
            </p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">EBITDA</p>
            <p className="text-2xl font-bold text-gray-900">
              ${(deal.ebitda / 1000).toFixed(0)}K
            </p>
            <p className="text-sm text-gray-600">
              {deal.financials.ebitdaMargin}% margin
            </p>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-600">Multiple</p>
            <p className="text-2xl font-bold text-gray-900">
              {(deal.proposedPrice / deal.revenue).toFixed(1)}x
            </p>
            <p className="text-sm text-gray-600">Revenue multiple</p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function MilestonesTab({ milestones }: { milestones: DealMilestone[] }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Milestones</h3>
        <Button size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Milestone
        </Button>
      </div>

      <div className="space-y-4">
        {milestones.map((milestone) => (
          <Card key={milestone.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mt-1 ${
                  milestone.isCompleted 
                    ? 'bg-green-500' 
                    : new Date() > milestone.dueDate 
                      ? 'bg-red-500' 
                      : 'bg-gray-300'
                }`}>
                  {milestone.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : (
                    <Clock className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span>Due: {milestone.dueDate.toLocaleDateString()}</span>
                    <span>Assigned to: {milestone.assignedTo}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={getPriorityColor(milestone.priority)}>
                  {milestone.priority}
                </Badge>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function DocumentsTab({ documents }: { documents: DealDocument[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'reviewed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'financial': return <DollarSign className="w-5 h-5 text-green-600" />;
      case 'legal': return <FileText className="w-5 h-5 text-blue-600" />;
      case 'technical': return <Activity className="w-5 h-5 text-purple-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Documents</h3>
        <Button size="sm">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="space-y-4">
        {documents.map((document) => (
          <Card key={document.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getTypeIcon(document.type)}
                <div>
                  <h4 className="font-medium text-gray-900">{document.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>Uploaded by {document.uploadedBy}</span>
                    <span>{document.uploadedAt.toLocaleDateString()}</span>
                    <span>{document.size}</span>
                  </div>
                  {document.comments.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">
                        Latest: "{document.comments[document.comments.length - 1]}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className={getStatusColor(document.status)}>
                  {document.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TimelineTab({ timeline }: { timeline: TimelineEvent[] }) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Target className="w-4 h-4 text-blue-600" />;
      case 'document': return <FileText className="w-4 h-4 text-green-600" />;
      case 'meeting': return <Video className="w-4 h-4 text-purple-600" />;
      case 'communication': return <MessageSquare className="w-4 h-4 text-yellow-600" />;
      case 'stage-change': return <TrendingUp className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Timeline</h3>
      
      <div className="space-y-4">
        {timeline.map((event, index) => (
          <div key={event.id} className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center">
                {getEventIcon(event.type)}
              </div>
              {index < timeline.length - 1 && (
                <div className="w-px h-8 bg-gray-200 mt-2" />
              )}
            </div>
            
            <div className="flex-1 pb-8">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">{event.title}</h4>
                <span className="text-sm text-gray-500">
                  {event.timestamp.toLocaleDateString()} {event.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              <p className="text-xs text-gray-500 mt-2">by {event.userName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DealDetailPage() {
  const params = useParams();
  const dealId = params.dealId as string;
  
  // In real app, fetch deal data based on dealId
  const [deal] = useState<DealDetail>(MOCK_DEAL);

  if (!deal) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900">Deal not found</h3>
          <p className="text-gray-600">The deal you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <DealHeader deal={deal} />

      {/* Participants */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Deal Participants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={deal.buyerImage} alt={deal.buyerName} />
              <AvatarFallback>{deal.buyerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{deal.buyerName}</h4>
                  <p className="text-sm text-gray-600">{deal.buyerTitle}</p>
                  <Badge variant="outline" className="mt-1">Buyer</Badge>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt={deal.sellerName} />
              <AvatarFallback>{deal.sellerName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{deal.sellerName}</h4>
                  <p className="text-sm text-gray-600">{deal.sellerTitle}</p>
                  <Badge variant="outline" className="mt-1">Seller</Badge>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Main content tabs */}
      <Tabs defaultValue="milestones" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="milestones">
          <MilestonesTab milestones={deal.milestones} />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab documents={deal.documents} />
        </TabsContent>

        <TabsContent value="timeline">
          <TimelineTab timeline={deal.timeline} />
        </TabsContent>

        <TabsContent value="analysis">
          <div className="space-y-6">
            {/* Key Metrics */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Business Metrics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {deal.keyMetrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                    {metric.change && (
                      <p className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* Risk Factors */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Factors</h3>
              <div className="space-y-3">
                {deal.riskFactors.map((risk, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <p className="text-sm text-gray-600">{risk}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
