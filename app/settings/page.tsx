'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Settings,
  User,
  Bell,
  Shield,
  Eye,
  CreditCard,
  Database,
  Smartphone,
  Mail,
  Globe,
  Lock,
  Key,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  X,
  Plus,
  Minus,
  Moon,
  Sun,
  Monitor,
  Save,
  Camera
} from 'lucide-react';
import { toast } from 'sonner';

interface UserSettings {
  // Account Settings
  account: {
    name: string;
    email: string;
    phone: string;
    timezone: string;
    language: string;
    currency: string;
  };
  
  // Privacy Settings
  privacy: {
    profileVisibility: 'public' | 'private' | 'matches-only';
    showContactInfo: 'everyone' | 'matches' | 'verified-only';
    showInvestmentHistory: boolean;
    showBusinessDetails: boolean;
    allowSearchEngineIndexing: boolean;
  };
  
  // Notification Settings
  notifications: {
    email: {
      newMatches: boolean;
      messages: boolean;
      dealUpdates: boolean;
      documentRequests: boolean;
      marketingEmails: boolean;
      weeklyDigest: boolean;
    };
    push: {
      newMatches: boolean;
      messages: boolean;
      dealUpdates: boolean;
      documentRequests: boolean;
    };
    frequency: 'instant' | 'daily' | 'weekly';
    quietHours: {
      enabled: boolean;
      startTime: string;
      endTime: string;
    };
  };
  
  // Preferences
  preferences: {
    theme: 'light' | 'dark' | 'system';
    autoMatchFilters: boolean;
    showTutorials: boolean;
    defaultDashboardView: 'overview' | 'deals' | 'matches';
    measurementUnits: 'metric' | 'imperial';
  };
  
  // Security Settings
  security: {
    twoFactorEnabled: boolean;
    loginNotifications: boolean;
    sessionTimeout: number; // minutes
    trustedDevices: Array<{
      id: string;
      name: string;
      lastUsed: Date;
      location: string;
    }>;
  };
}

const MOCK_SETTINGS: UserSettings = {
  account: {
    name: 'Sarah Chen',
    email: 'sarah.chen@investor.com',
    phone: '+1 (555) 123-4567',
    timezone: 'America/Los_Angeles',
    language: 'English',
    currency: 'USD'
  },
  privacy: {
    profileVisibility: 'public',
    showContactInfo: 'matches',
    showInvestmentHistory: true,
    showBusinessDetails: true,
    allowSearchEngineIndexing: true
  },
  notifications: {
    email: {
      newMatches: true,
      messages: true,
      dealUpdates: true,
      documentRequests: true,
      marketingEmails: false,
      weeklyDigest: true
    },
    push: {
      newMatches: true,
      messages: true,
      dealUpdates: true,
      documentRequests: false
    },
    frequency: 'instant',
    quietHours: {
      enabled: true,
      startTime: '22:00',
      endTime: '08:00'
    }
  },
  preferences: {
    theme: 'system',
    autoMatchFilters: true,
    showTutorials: false,
    defaultDashboardView: 'overview',
    measurementUnits: 'imperial'
  },
  security: {
    twoFactorEnabled: false,
    loginNotifications: true,
    sessionTimeout: 60,
    trustedDevices: [
      {
        id: 'device-1',
        name: 'MacBook Pro - Chrome',
        lastUsed: new Date('2024-08-15T14:30:00'),
        location: 'San Francisco, CA'
      },
      {
        id: 'device-2',
        name: 'iPhone 15 Pro - Safari',
        lastUsed: new Date('2024-08-15T10:15:00'),
        location: 'San Francisco, CA'
      }
    ]
  }
};

function AccountTab({ settings, onUpdate }: { 
  settings: UserSettings['account']; 
  onUpdate: (updates: Partial<UserSettings['account']>) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(settings);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
    toast.success('Account settings updated successfully!');
  };

  const handleCancel = () => {
    setFormData(settings);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Account Information</h3>
          {isEditing ? (
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleCancel}>
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              <User className="w-4 h-4 mr-2" />
              Edit
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            {isEditing ? (
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            ) : (
              <p className="text-gray-900 py-2">{settings.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            ) : (
              <p className="text-gray-900 py-2">{settings.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              />
            ) : (
              <p className="text-gray-900 py-2">{settings.phone}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            {isEditing ? (
              <Select 
                value={formData.timezone}
                onValueChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                  <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                  <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                  <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900 py-2">Pacific Time (PT)</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            {isEditing ? (
              <Select 
                value={formData.language}
                onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900 py-2">{settings.language}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            {isEditing ? (
              <Select 
                value={formData.currency}
                onValueChange={(value) => setFormData(prev => ({ ...prev, currency: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="CAD">CAD ($)</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="text-gray-900 py-2">USD ($)</p>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Actions</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Export Account Data</h4>
              <p className="text-sm text-gray-600">Download all your account data and activity</p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Delete Account</h4>
              <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function NotificationsTab({ settings, onUpdate }: { 
  settings: UserSettings['notifications']; 
  onUpdate: (updates: Partial<UserSettings['notifications']>) => void;
}) {
  const handleEmailToggle = (key: keyof UserSettings['notifications']['email'], value: boolean) => {
    onUpdate({
      email: { ...settings.email, [key]: value }
    });
    toast.success('Notification preferences updated');
  };

  const handlePushToggle = (key: keyof UserSettings['notifications']['push'], value: boolean) => {
    onUpdate({
      push: { ...settings.push, [key]: value }
    });
    toast.success('Push notification preferences updated');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Email Notifications</h3>
        
        <div className="space-y-4">
          {Object.entries(settings.email).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'newMatches' && 'Get notified when someone is interested in your business'}
                  {key === 'messages' && 'Receive notifications for new messages'}
                  {key === 'dealUpdates' && 'Stay updated on deal progress and milestones'}
                  {key === 'documentRequests' && 'Get alerted when documents are requested'}
                  {key === 'marketingEmails' && 'Receive platform updates and tips'}
                  {key === 'weeklyDigest' && 'Weekly summary of your activity'}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked: any) => handleEmailToggle(key as keyof UserSettings['notifications']['email'], checked)}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Push Notifications</h3>
        
        <div className="space-y-4">
          {Object.entries(settings.push).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'newMatches' && 'Push notifications for new matches'}
                  {key === 'messages' && 'Instant alerts for new messages'}
                  {key === 'dealUpdates' && 'Real-time deal progress updates'}
                  {key === 'documentRequests' && 'Immediate document request alerts'}
                </p>
              </div>
              <Switch
                checked={value}
                onCheckedChange={(checked: any) => handlePushToggle(key as keyof UserSettings['notifications']['push'], checked)}
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Schedule</h3>
        
        <div className="space-y-6">
          <div>
            <Label className="text-sm font-medium text-gray-600 mb-3 block">Notification Frequency</Label>
            <Select 
              value={settings.frequency}
              onValueChange={(value) => onUpdate({ frequency: value as 'instant' | 'daily' | 'weekly' })}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="instant">Instant</SelectItem>
                <SelectItem value="daily">Daily Summary</SelectItem>
                <SelectItem value="weekly">Weekly Summary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-medium text-gray-900">Quiet Hours</h4>
                <p className="text-sm text-gray-600">Pause notifications during these hours</p>
              </div>
              <Switch
                checked={settings.quietHours.enabled}
                onCheckedChange={(checked: any) => onUpdate({
                  quietHours: { ...settings.quietHours, enabled: checked }
                })}
              />
            </div>

            {settings.quietHours.enabled && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-time">Start Time</Label>
                  <Input
                    id="start-time"
                    type="time"
                    value={settings.quietHours.startTime}
                    onChange={(e) => onUpdate({
                      quietHours: { ...settings.quietHours, startTime: e.target.value }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="end-time">End Time</Label>
                  <Input
                    id="end-time"
                    type="time"
                    value={settings.quietHours.endTime}
                    onChange={(e) => onUpdate({
                      quietHours: { ...settings.quietHours, endTime: e.target.value }
                    })}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

function PrivacyTab({ settings, onUpdate }: { 
  settings: UserSettings['privacy']; 
  onUpdate: (updates: Partial<UserSettings['privacy']>) => void;
}) {
  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Visibility</h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-600 mb-3 block">Who can see your profile</Label>
            <Select 
              value={settings.profileVisibility}
              onValueChange={(value) => onUpdate({ profileVisibility: value as 'public' | 'private' | 'matches-only' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can view</SelectItem>
                <SelectItem value="matches-only">Matches Only - Only matched users</SelectItem>
                <SelectItem value="private">Private - Only me</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-600 mb-3 block">Contact Information Visibility</Label>
            <Select 
              value={settings.showContactInfo}
              onValueChange={(value) => onUpdate({ showContactInfo: value as 'everyone' | 'matches' | 'verified-only' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="everyone">Everyone</SelectItem>
                <SelectItem value="matches">Matches Only</SelectItem>
                <SelectItem value="verified-only">Verified Users Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Information Sharing</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Show Investment History</h4>
              <p className="text-sm text-gray-600">Display past acquisitions on your profile</p>
            </div>
            <Switch
              checked={settings.showInvestmentHistory}
              onCheckedChange={(checked: any) => onUpdate({ showInvestmentHistory: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Show Business Details</h4>
              <p className="text-sm text-gray-600">Display your business information publicly</p>
            </div>
            <Switch
              checked={settings.showBusinessDetails}
              onCheckedChange={(checked: any) => onUpdate({ showBusinessDetails: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Search Engine Indexing</h4>
              <p className="text-sm text-gray-600">Allow search engines to index your profile</p>
            </div>
            <Switch
              checked={settings.allowSearchEngineIndexing}
              onCheckedChange={(checked: any) => onUpdate({ allowSearchEngineIndexing: checked })}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data & Privacy</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Download My Data</h4>
              <p className="text-sm text-gray-600">Get a copy of all your data</p>
            </div>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Data Retention</h4>
              <p className="text-sm text-gray-600">Manage how long we keep your data</p>
            </div>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Manage
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

function SecurityTab({ settings, onUpdate }: { 
  settings: UserSettings['security']; 
  onUpdate: (updates: Partial<UserSettings['security']>) => void;
}) {
  const handleRemoveDevice = (deviceId: string) => {
    const updatedDevices = settings.trustedDevices.filter(device => device.id !== deviceId);
    onUpdate({ trustedDevices: updatedDevices });
    toast.success('Device removed successfully');
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Authentication</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center space-x-2">
              {settings.twoFactorEnabled ? (
                <Badge className="bg-green-100 text-green-800">Enabled</Badge>
              ) : (
                <Badge variant="secondary">Disabled</Badge>
              )}
              <Button 
                variant="outline" 
                onClick={() => onUpdate({ twoFactorEnabled: !settings.twoFactorEnabled })}
              >
                {settings.twoFactorEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Login Notifications</h4>
              <p className="text-sm text-gray-600">Get notified of new login attempts</p>
            </div>
            <Switch
              checked={settings.loginNotifications}
              onCheckedChange={(checked: any) => onUpdate({ loginNotifications: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Session Timeout</h4>
              <p className="text-sm text-gray-600">Auto-logout after inactivity</p>
            </div>
            <Select 
              value={settings.sessionTimeout.toString()}
              onValueChange={(value) => onUpdate({ sessionTimeout: parseInt(value) })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="60">1 hour</SelectItem>
                <SelectItem value="240">4 hours</SelectItem>
                <SelectItem value="0">Never</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Password & Access</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
            </div>
            <Button variant="outline">
              <Key className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Login History</h4>
              <p className="text-sm text-gray-600">View your recent login activity</p>
            </div>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              View History
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Trusted Devices</h3>
        
        <div className="space-y-4">
          {settings.trustedDevices.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Smartphone className="w-5 h-5 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">{device.name}</h4>
                  <p className="text-sm text-gray-600">
                    {device.location} • Last used {device.lastUsed.toLocaleDateString()}
                  </p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleRemoveDevice(device.id)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function PreferencesTab({ settings, onUpdate }: { 
  settings: UserSettings['preferences']; 
  onUpdate: (updates: Partial<UserSettings['preferences']>) => void;
}) {
  const getThemeIcon = (theme: string) => {
    switch (theme) {
      case 'light': return <Sun className="w-4 h-4" />;
      case 'dark': return <Moon className="w-4 h-4" />;
      case 'system': return <Monitor className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Appearance</h3>
        
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-600 mb-3 block">Theme</Label>
            <div className="grid grid-cols-3 gap-4">
              {['light', 'dark', 'system'].map((theme) => (
                <Card
                  key={theme}
                  className={`p-4 cursor-pointer transition-all ${
                    settings.theme === theme 
                      ? 'ring-2 ring-blue-500 bg-blue-50' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => onUpdate({ theme: theme as 'light' | 'dark' | 'system' })}
                >
                  <div className="flex flex-col items-center space-y-2">
                    {getThemeIcon(theme)}
                    <span className="text-sm font-medium capitalize">{theme}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Auto-Apply Match Filters</h4>
              <p className="text-sm text-gray-600">Automatically filter matches based on your preferences</p>
            </div>
            <Switch
              checked={settings.autoMatchFilters}
              onCheckedChange={(checked: any) => onUpdate({ autoMatchFilters: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Show Tutorials</h4>
              <p className="text-sm text-gray-600">Display helpful tips and tutorials</p>
            </div>
            <Switch
              checked={settings.showTutorials}
              onCheckedChange={(checked: any) => onUpdate({ showTutorials: checked })}
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-600 mb-3 block">Default Dashboard View</Label>
            <Select 
              value={settings.defaultDashboardView}
              onValueChange={(value) => onUpdate({ defaultDashboardView: value as 'overview' | 'deals' | 'matches' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Overview</SelectItem>
                <SelectItem value="deals">Deals</SelectItem>
                <SelectItem value="matches">Matches</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-600 mb-3 block">Measurement Units</Label>
            <Select 
              value={settings.measurementUnits}
              onValueChange={(value) => onUpdate({ measurementUnits: value as 'metric' | 'imperial' })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="imperial">Imperial (ft, lb, °F)</SelectItem>
                <SelectItem value="metric">Metric (m, kg, °C)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reset Preferences</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Reset All Settings</h4>
              <p className="text-sm text-gray-600">Restore all settings to default values</p>
            </div>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>(MOCK_SETTINGS);

  const updateAccountSettings = (updates: Partial<UserSettings['account']>) => {
    setSettings(prev => ({
      ...prev,
      account: { ...prev.account, ...updates }
    }));
  };

  const updateNotificationSettings = (updates: Partial<UserSettings['notifications']>) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, ...updates }
    }));
  };

  const updatePrivacySettings = (updates: Partial<UserSettings['privacy']>) => {
    setSettings(prev => ({
      ...prev,
      privacy: { ...prev.privacy, ...updates }
    }));
  };

  const updateSecuritySettings = (updates: Partial<UserSettings['security']>) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, ...updates }
    }));
  };

  const updatePreferences = (updates: Partial<UserSettings['preferences']>) => {
    setSettings(prev => ({
      ...prev,
      preferences: { ...prev.preferences, ...updates }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <AccountTab settings={settings.account} onUpdate={updateAccountSettings} />
        </TabsContent>

        <TabsContent value="notifications">
          <NotificationsTab settings={settings.notifications} onUpdate={updateNotificationSettings} />
        </TabsContent>

        <TabsContent value="privacy">
          <PrivacyTab settings={settings.privacy} onUpdate={updatePrivacySettings} />
        </TabsContent>

        <TabsContent value="security">
          <SecurityTab settings={settings.security} onUpdate={updateSecuritySettings} />
        </TabsContent>

        <TabsContent value="preferences">
          <PreferencesTab settings={settings.preferences} onUpdate={updatePreferences} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
