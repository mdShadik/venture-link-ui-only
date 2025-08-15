'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Heart,
  MessageSquare,
  DollarSign,
  Users,
  Clock,
  Calendar,
  MapPin,
  Download,
  Filter,
  RefreshCw,
  Target,
  Zap,
  Award,
  Activity,
  Globe,
  Smartphone,
  Monitor
} from 'lucide-react';
import { toast } from 'sonner';

interface AnalyticsData {
  period: string;
  views: number;
  uniqueVisitors: number;
  likes: number;
  inquiries: number;
  messages: number;
  profileViews: number;
  documentDownloads: number;
  averageTimeSpent: number; // in minutes
}

interface GeographicData {
  location: string;
  views: number;
  percentage: number;
}

interface DeviceData {
  device: string;
  views: number;
  percentage: number;
  icon: React.ComponentType<any>;
}

interface BuyerInsight {
  buyerType: string;
  count: number;
  percentage: number;
  averageInterest: number;
}

const MOCK_ANALYTICS_DATA: AnalyticsData[] = [
  { period: 'Aug 9', views: 45, uniqueVisitors: 32, likes: 3, inquiries: 1, messages: 2, profileViews: 28, documentDownloads: 0, averageTimeSpent: 4.2 },
  { period: 'Aug 10', views: 52, uniqueVisitors: 38, likes: 4, inquiries: 2, messages: 3, profileViews: 35, documentDownloads: 1, averageTimeSpent: 5.1 },
  { period: 'Aug 11', views: 48, uniqueVisitors: 34, likes: 2, inquiries: 1, messages: 1, profileViews: 30, documentDownloads: 0, averageTimeSpent: 3.8 },
  { period: 'Aug 12', views: 67, uniqueVisitors: 45, likes: 6, inquiries: 3, messages: 4, profileViews: 42, documentDownloads: 2, averageTimeSpent: 6.3 },
  { period: 'Aug 13', views: 73, uniqueVisitors: 51, likes: 5, inquiries: 2, messages: 3, profileViews: 48, documentDownloads: 1, averageTimeSpent: 5.7 },
  { period: 'Aug 14', views: 81, uniqueVisitors: 58, likes: 7, inquiries: 4, messages: 5, profileViews: 55, documentDownloads: 3, averageTimeSpent: 7.2 },
  { period: 'Aug 15', views: 95, uniqueVisitors: 67, likes: 9, inquiries: 5, messages: 6, profileViews: 62, documentDownloads: 4, averageTimeSpent: 8.1 }
];

const MOCK_GEOGRAPHIC_DATA: GeographicData[] = [
  { location: 'California', views: 156, percentage: 35 },
  { location: 'New York', views: 89, percentage: 20 },
  { location: 'Texas', views: 67, percentage: 15 },
  { location: 'Florida', views: 45, percentage: 10 },
  { location: 'Other', views: 89, percentage: 20 }
];

const MOCK_DEVICE_DATA: DeviceData[] = [
  { device: 'Desktop', views: 234, percentage: 52, icon: Monitor },
  { device: 'Mobile', views: 178, percentage: 40, icon: Smartphone },
  { device: 'Tablet', views: 34, percentage: 8, icon: Smartphone }
];

const MOCK_BUYER_INSIGHTS: BuyerInsight[] = [
  { buyerType: 'Individual Investor', count: 8, percentage: 40, averageInterest: 78 },
  { buyerType: 'PE Firm', count: 5, percentage: 25, averageInterest: 85 },
  { buyerType: 'Strategic Buyer', count: 4, percentage: 20, averageInterest: 92 },
  { buyerType: 'Family Office', count: 3, percentage: 15, averageInterest: 71 }
];

function PerformanceOverview({ data }: { data: AnalyticsData[] }) {
  const currentPeriod = data[data.length - 1];
  const previousPeriod = data[data.length - 2];
  
  const calculateChange = (current: number, previous: number) => {
    return previous ? Math.round(((current - previous) / previous) * 100) : 0;
  };

  const metrics = [
    {
      label: 'Total Views',
      value: currentPeriod.views,
      change: calculateChange(currentPeriod.views, previousPeriod.views),
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      label: 'Unique Visitors',
      value: currentPeriod.uniqueVisitors,
      change: calculateChange(currentPeriod.uniqueVisitors, previousPeriod.uniqueVisitors),
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      label: 'Inquiries',
      value: currentPeriod.inquiries,
      change: calculateChange(currentPeriod.inquiries, previousPeriod.inquiries),
      icon: MessageSquare,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      label: 'Avg. Time',
      value: `${currentPeriod.averageTimeSpent.toFixed(1)}m`,
      change: calculateChange(currentPeriod.averageTimeSpent, previousPeriod.averageTimeSpent),
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.change >= 0;
        
        return (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${metric.bgColor}`}>
                <Icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className={`flex items-center text-sm ${
                isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {isPositive ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                {Math.abs(metric.change)}%
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
              <p className="text-sm text-gray-600">{metric.label}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

function PerformanceChart({ data }: { data: AnalyticsData[] }) {
  const maxViews = Math.max(...data.map(d => d.views));
  const maxInquiries = Math.max(...data.map(d => d.inquiries));

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">7-Day Performance Trend</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Views</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Inquiries</span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Views Chart */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Daily Views</span>
            <span className="text-sm text-gray-600">Peak: {maxViews}</span>
          </div>
          <div className="flex items-end space-x-2 h-24">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ height: `${(item.views / maxViews) * 100}%` }}
                  title={`${item.views} views on ${item.period}`}
                />
                <span className="text-xs text-gray-500 mt-2">{item.period.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Inquiries Chart */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Daily Inquiries</span>
            <span className="text-sm text-gray-600">Peak: {maxInquiries}</span>
          </div>
          <div className="flex items-end space-x-2 h-16">
            {data.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-green-500 rounded-t opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                  style={{ height: `${maxInquiries > 0 ? (item.inquiries / maxInquiries) * 100 : 0}%` }}
                  title={`${item.inquiries} inquiries on ${item.period}`}
                />
                <span className="text-xs text-gray-500 mt-2">{item.period.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function AudienceInsights({ 
  geoData, 
  deviceData, 
  buyerData 
}: { 
  geoData: GeographicData[];
  deviceData: DeviceData[];
  buyerData: BuyerInsight[];
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Geographic Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <MapPin className="w-5 h-5 mr-2 text-blue-500" />
          Top Locations
        </h3>
        <div className="space-y-4">
          {geoData.map((location, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{location.location}</span>
                  <span className="text-sm text-gray-600">{location.views}</span>
                </div>
                <Progress value={location.percentage} className="h-2" />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Device Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Monitor className="w-5 h-5 mr-2 text-green-500" />
          Device Types
        </h3>
        <div className="space-y-4">
          {deviceData.map((device, index) => {
            const Icon = device.icon;
            return (
              <div key={index} className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-gray-600" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">{device.device}</span>
                    <span className="text-sm text-gray-600">{device.percentage}%</span>
                  </div>
                  <Progress value={device.percentage} className="h-2" />
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Buyer Types */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-purple-500" />
          Buyer Types
        </h3>
        <div className="space-y-4">
          {buyerData.map((buyer, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{buyer.buyerType}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{buyer.count}</span>
                  <Badge variant="outline" className="text-xs">
                    {buyer.averageInterest}% interest
                  </Badge>
                </div>
              </div>
              <Progress value={buyer.percentage} className="h-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function KeyInsights({ data }: { data: AnalyticsData[] }) {
  const totalViews = data.reduce((sum, d) => sum + d.views, 0);
  const totalInquiries = data.reduce((sum, d) => sum + d.inquiries, 0);
  const conversionRate = totalViews > 0 ? ((totalInquiries / totalViews) * 100).toFixed(1) : '0';
  const avgTimeSpent = (data.reduce((sum, d) => sum + d.averageTimeSpent, 0) / data.length).toFixed(1);

  const insights = [
    {
      title: 'Strong Engagement',
      description: `Visitors spend an average of ${avgTimeSpent} minutes viewing your listing`,
      icon: Zap,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Conversion Rate',
      description: `${conversionRate}% of viewers submit inquiries - above industry average`,
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Growth Trend',
      description: 'Your listing views have increased 23% over the past week',
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Quality Leads',
      description: '78% of interested buyers match your ideal buyer profile',
      icon: Award,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Activity className="w-5 h-5 mr-2 text-blue-500" />
        Key Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${insight.bgColor}`}>
                <Icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

export default function AnalyticsPage() {
  const [analyticsData] = useState<AnalyticsData[]>(MOCK_ANALYTICS_DATA);
  const [geoData] = useState<GeographicData[]>(MOCK_GEOGRAPHIC_DATA);
  const [deviceData] = useState<DeviceData[]>(MOCK_DEVICE_DATA);
  const [buyerData] = useState<BuyerInsight[]>(MOCK_BUYER_INSIGHTS);
  const [timeRange, setTimeRange] = useState('7d');

  const handleExport = () => {
    toast.success('Analytics report exported successfully!');
  };

  const handleRefresh = () => {
    toast.success('Analytics data refreshed!');
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Track your business listing performance and buyer engagement</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-600">Time Range:</span>
        {['7d', '30d', '90d'].map((range) => (
          <Button
            key={range}
            variant={timeRange === range ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTimeRange(range)}
          >
            {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
          </Button>
        ))}
      </div>

      {/* Performance Overview */}
      <PerformanceOverview data={analyticsData} />

      {/* Performance Chart */}
      <PerformanceChart data={analyticsData} />

      {/* Audience Insights */}
      <AudienceInsights 
        geoData={geoData}
        deviceData={deviceData}
        buyerData={buyerData}
      />

      {/* Key Insights */}
      <KeyInsights data={analyticsData} />
    </div>
  );
}
