"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Plus,
  Filter,
  Download,
} from "lucide-react";

interface Deal {
  id: string;
  businessName: string;
  businessImage: string;
  buyerId: string;
  buyerName: string;
  buyerImage: string;
  sellerId: string;
  sellerName: string;
  currentStage: DealStage;
  progress: number;
  proposedPrice: number;
  finalPrice?: number;
  expectedClosingDate: Date;
  createdAt: Date;
  lastActivity: Date;
  status: "active" | "paused" | "completed" | "cancelled";
  riskLevel: "low" | "medium" | "high";
  milestones: DealMilestone[];
  documents: DealDocument[];
  nextAction: string;
  industry: string;
  location: string;
  revenue: number;
}

type DealStage =
  | "initial-interest"
  | "nda-signing"
  | "document-sharing"
  | "due-diligence"
  | "negotiation"
  | "legal-review"
  | "closing"
  | "completed";

interface DealMilestone {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completedAt?: Date;
  isCompleted: boolean;
  assignedTo: string;
}

interface DealDocument {
  id: string;
  name: string;
  type: string;
  uploadedAt: Date;
  uploadedBy: string;
  status: "pending" | "reviewed" | "approved" | "rejected";
}

const DEAL_STAGES: { stage: DealStage; label: string; percentage: number }[] = [
  { stage: "initial-interest", label: "Initial Interest", percentage: 10 },
  { stage: "nda-signing", label: "NDA Signing", percentage: 20 },
  { stage: "document-sharing", label: "Document Sharing", percentage: 35 },
  { stage: "due-diligence", label: "Due Diligence", percentage: 50 },
  { stage: "negotiation", label: "Negotiation", percentage: 70 },
  { stage: "legal-review", label: "Legal Review", percentage: 85 },
  { stage: "closing", label: "Closing", percentage: 95 },
  { stage: "completed", label: "Completed", percentage: 100 },
];

const MOCK_DEALS: Deal[] = [
  {
    id: "deal-1",
    businessName: "CloudFlow Analytics",
    businessImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100",
    buyerId: "buyer-1",
    buyerName: "Sarah Chen",
    buyerImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=100",
    sellerId: "seller-1",
    sellerName: "David Kim",
    currentStage: "due-diligence",
    progress: 50,
    proposedPrice: 12500000,
    expectedClosingDate: new Date("2024-10-15"),
    createdAt: new Date("2024-08-01"),
    lastActivity: new Date("2024-08-15T12:30:00"),
    status: "active",
    riskLevel: "low",
    milestones: [
      {
        id: "ms-1",
        title: "Financial Review",
        description: "Complete analysis of 3-year financial statements",
        dueDate: new Date("2024-08-20"),
        isCompleted: false,
        assignedTo: "buyer-1",
      },
      {
        id: "ms-2",
        title: "Technical Audit",
        description: "Review codebase and technical infrastructure",
        dueDate: new Date("2024-08-25"),
        isCompleted: false,
        assignedTo: "buyer-1",
      },
    ],
    documents: [
      {
        id: "doc-1",
        name: "Financial Statements 2021-2023",
        type: "financial",
        uploadedAt: new Date("2024-08-10"),
        uploadedBy: "seller-1",
        status: "reviewed",
      },
      {
        id: "doc-2",
        name: "Customer Contracts",
        type: "legal",
        uploadedAt: new Date("2024-08-12"),
        uploadedBy: "seller-1",
        status: "pending",
      },
    ],
    nextAction: "Complete financial review by Aug 20",
    industry: "SaaS",
    location: "Seattle, WA",
    revenue: 2500000,
  },
  {
    id: "deal-2",
    businessName: "EcoCraft Manufacturing",
    businessImage:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100",
    buyerId: "buyer-2",
    buyerName: "Michael Rodriguez",
    buyerImage:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    sellerId: "seller-2",
    sellerName: "Maria Santos",
    currentStage: "negotiation",
    progress: 70,
    proposedPrice: 4500000,
    finalPrice: 4200000,
    expectedClosingDate: new Date("2024-09-30"),
    createdAt: new Date("2024-07-15"),
    lastActivity: new Date("2024-08-15T10:15:00"),
    status: "active",
    riskLevel: "medium",
    milestones: [
      {
        id: "ms-3",
        title: "Price Negotiation",
        description: "Agree on final acquisition price",
        dueDate: new Date("2024-08-18"),
        isCompleted: false,
        assignedTo: "both",
      },
    ],
    documents: [
      {
        id: "doc-3",
        name: "Asset Valuation Report",
        type: "financial",
        uploadedAt: new Date("2024-08-05"),
        uploadedBy: "buyer-2",
        status: "approved",
      },
    ],
    nextAction: "Finalize purchase price agreement",
    industry: "Manufacturing",
    location: "Portland, OR",
    revenue: 1800000,
  },
  {
    id: "deal-3",
    businessName: "TechStart Solutions",
    businessImage:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100",
    buyerId: "buyer-3",
    buyerName: "Emily Watson",
    buyerImage:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    sellerId: "seller-3",
    sellerName: "John Smith",
    currentStage: "closing",
    progress: 95,
    proposedPrice: 3000000,
    finalPrice: 2850000,
    expectedClosingDate: new Date("2024-08-25"),
    createdAt: new Date("2024-06-01"),
    lastActivity: new Date("2024-08-15T15:45:00"),
    status: "active",
    riskLevel: "low",
    milestones: [
      {
        id: "ms-4",
        title: "Final Contracts",
        description: "Sign purchase agreement",
        dueDate: new Date("2024-08-22"),
        isCompleted: false,
        assignedTo: "both",
      },
    ],
    documents: [],
    nextAction: "Schedule contract signing",
    industry: "Technology",
    location: "Austin, TX",
    revenue: 1200000,
  },
];

function DealCard({ deal, onClick }: { deal: Deal; onClick: () => void }) {
  const getStageInfo = (stage: DealStage) => {
    return DEAL_STAGES.find((s) => s.stage === stage) || DEAL_STAGES[0];
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "high":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800";
      case "paused":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatPrice = (price: number) => {
    return `$${(price / 1000000).toFixed(1)}M`;
  };

  const formatTimeAgo = (date: Date) => {
    const hours = Math.floor(
      (new Date().getTime() - date.getTime()) / (1000 * 60 * 60)
    );
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const stageInfo = getStageInfo(deal.currentStage);

  return (
    <Card
      className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {deal.businessName}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{deal.location}</span>
                <span>•</span>
                <span>{deal.industry}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className={getRiskColor(deal.riskLevel)}>
              {deal.riskLevel} risk
            </Badge>
            <Badge variant="secondary" className={getStatusColor(deal.status)}>
              {deal.status}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-900">
              {stageInfo.label}
            </span>
            <span className="text-sm text-gray-600">{deal.progress}%</span>
          </div>
          <Progress value={deal.progress} className="h-2" />
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500">Proposed Price</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(deal.proposedPrice)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Revenue</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatPrice(deal.revenue)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Expected Close</p>
            <p className="text-sm font-semibold text-gray-900">
              {deal.expectedClosingDate.toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Last Activity</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatTimeAgo(deal.lastActivity)}
            </p>
          </div>
        </div>

        {/* Participants */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage src={deal.buyerImage} alt={deal.buyerName} />
                <AvatarFallback>
                  {deal.buyerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{deal.buyerName}</span>
            </div>
            <span className="text-gray-400">↔</span>
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarImage
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32"
                  alt={deal.sellerName}
                />
                <AvatarFallback>
                  {deal.sellerName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-gray-600">{deal.sellerName}</span>
            </div>
          </div>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="sm">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Next Action */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">
              Next Action:
            </span>
          </div>
          <p className="text-sm text-blue-800 mt-1">{deal.nextAction}</p>
        </div>
      </div>
    </Card>
  );
}

function DealsStats({ deals }: { deals: Deal[] }) {
  const activeDeals = deals.filter((d) => d.status === "active").length;
  const totalValue = deals.reduce(
    (sum, deal) => sum + (deal.finalPrice || deal.proposedPrice),
    0
  );
  const avgDealSize = totalValue / deals.length;
  const completedDeals = deals.filter((d) => d.status === "completed").length;

  const formatPrice = (price: number) => {
    return `$${(price / 1000000).toFixed(1)}M`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Deals</p>
            <p className="text-2xl font-bold text-gray-900">{activeDeals}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Pipeline</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(totalValue)}
            </p>
          </div>
          <DollarSign className="w-8 h-8 text-green-500" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg Deal Size</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(avgDealSize)}
            </p>
          </div>
          <Building className="w-8 h-8 text-purple-500" />
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-gray-900">{completedDeals}</p>
          </div>
          <CheckCircle2 className="w-8 h-8 text-emerald-500" />
        </div>
      </Card>
    </div>
  );
}

export default function DealsPage() {
  const [deals] = useState<Deal[]>(MOCK_DEALS);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const activeDeals = deals.filter((d) => d.status === "active");
  const completedDeals = deals.filter((d) => d.status === "completed");
  const pausedDeals = deals.filter((d) => d.status === "paused");

  const router = useRouter();

  const handleDealClick = (deal: Deal) => {
    setSelectedDeal(deal);
    router.push(`/deals/${deal.id}`);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
          <p className="text-gray-600">
            Track your acquisition deals from interest to closing
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Stats */}
      <DealsStats deals={deals} />

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="active">
            Active ({activeDeals.length})
          </TabsTrigger>
          <TabsTrigger value="all">All Deals ({deals.length})</TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedDeals.length})
          </TabsTrigger>
          <TabsTrigger value="paused">
            Paused ({pausedDeals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onClick={() => handleDealClick(deal)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {deals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onClick={() => handleDealClick(deal)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {completedDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onClick={() => handleDealClick(deal)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="paused" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {pausedDeals.map((deal) => (
              <DealCard
                key={deal.id}
                deal={deal}
                onClick={() => handleDealClick(deal)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
