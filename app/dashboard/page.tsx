import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  TrendingUp, 
  Heart, 
  MessageSquare, 
  Briefcase,
  ArrowUpRight,
  ArrowRight,
  Calendar
} from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your investments.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Profile Views */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Profile Views</p>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">+12% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-500">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        {/* New Matches */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">New Matches</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">+8% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-pink-500">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        {/* Active Conversations */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Conversations</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">+4% from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-500">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        {/* Deals in Progress */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Deals in Progress</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-600">+1 from last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-500">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=40" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">New Match!</p>
                    <Badge className="bg-blue-100 text-blue-800">New</Badge>
                  </div>
                  <p className="text-sm text-gray-600">Sarah Chen is interested in your CloudFlow Analytics business</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40" />
                  <AvatarFallback>MR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">New Message</p>
                  <p className="text-sm text-gray-600">Michael Rodriguez sent you a message about EcoCraft Manufacturing</p>
                  <p className="text-xs text-gray-500 mt-1">4 hours ago</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40" />
                  <AvatarFallback>EW</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">Document Request</p>
                  <p className="text-sm text-gray-600">Emily Watson requested your financial statements</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Upcoming Deadlines */}
        <div>
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Upcoming Deadlines
              </h3>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Due Diligence Review</h4>
                  <p className="text-xs text-gray-600">CloudFlow Analytics</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-red-100 text-red-800">high</Badge>
                  <p className="text-xs text-gray-500 mt-1">Tomorrow</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Financial Review</h4>
                  <p className="text-xs text-gray-600">EcoCraft Manufacturing</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-yellow-100 text-yellow-800">medium</Badge>
                  <p className="text-xs text-gray-500 mt-1">3 days</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Contract Signing</h4>
                  <p className="text-xs text-gray-600">TechStart Solutions</p>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800">low</Badge>
                  <p className="text-xs text-gray-500 mt-1">1 week</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
