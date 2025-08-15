'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Search,
  Heart,
  MessageSquare,
  Briefcase,
  User,
  Settings,
  Bell,
  Menu,
  X,
  Building,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface NavigationItem {
  href: string;
  label: string;
  icon: React.ComponentType<any>;
  count?: number;
}

interface DashboardLayoutClientProps {
  children: React.ReactNode;
}

export function DashboardLayoutClient({ children }: DashboardLayoutClientProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');
  const [userName, setUserName] = useState('John Doe');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const storedUserType = localStorage.getItem('userType') as 'buyer' | 'seller';
    const storedUserEmail = localStorage.getItem('userEmail');
    
    if (storedUserType) {
      setUserType(storedUserType);
    }
    
    if (storedUserEmail) {
      if (storedUserEmail.includes('buyer')) {
        setUserName('Sarah Chen');
      } else if (storedUserEmail.includes('seller')) {
        setUserName('David Kim');
      }
    }
  }, []);

  const getNavigationItems = (): NavigationItem[] => {
    if (userType === 'buyer') {
      return [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/discover', label: 'Discover', icon: Search },
        { href: '/matches', label: 'Matches', icon: Heart, count: 2 },
        { href: '/deals', label: 'My Deals', icon: Briefcase },
        { href: '/messages', label: 'Messages', icon: MessageSquare, count: 3 },
        { href: '/profile', label: 'Profile', icon: User },
        { href: '/settings', label: 'Settings', icon: Settings },
      ];
    } else {
      return [
        { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/my-listing', label: 'My Listing', icon: Building },
        { href: '/interested-buyers', label: 'Interested Buyers', icon: Heart, count: 5 },
        { href: '/deals', label: 'Active Deals', icon: Briefcase },
        { href: '/analytics', label: 'Analytics', icon: BarChart3 },
        { href: '/messages', label: 'Messages', icon: MessageSquare, count: 3 },
        { href: '/profile', label: 'Profile', icon: User },
        { href: '/settings', label: 'Settings', icon: Settings },
      ];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">VL</span>
            </div>
            <span className="text-xl font-bold text-gray-900">VentureLink</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* User Type Badge */}
        <div className="px-6 py-3 border-b border-gray-100">
          <Badge 
            variant="secondary" 
            className={userType === 'buyer' 
              ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' 
              : 'bg-green-100 text-green-800 hover:bg-green-200'
            }
          >
            {userType === 'buyer' ? '👤 Buyer Account' : '🏢 Seller Account'}
          </Badge>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              // Ensure href is valid
              if (!item.href || typeof item.href !== 'string') {
                console.warn('Invalid href for navigation item:', item);
                return null;
              }

              const Icon = item.icon;
              const isActive = pathname === item.href;
              
              return (
                <Link
                  key={item.href} // Use href as unique key
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-colors group ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <div className="flex items-center">
                    <Icon className={`w-5 h-5 mr-3 ${
                      isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.label}
                  </div>
                  {item.count && (
                    <Badge variant="secondary" className="bg-gray-100 text-gray-700 text-xs px-2 py-1">
                      {item.count}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Account Switcher (Optional) */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Switch account type</p>
            <div className="flex space-x-2">
              <Button 
                variant={userType === 'buyer' ? 'default' : 'outline'} 
                size="sm" 
                className="flex-1 text-xs"
                onClick={() => {
                  localStorage.setItem('userType', 'buyer');
                  setUserType('buyer');
                  setUserName('Sarah Chen');
                  router.push('/dashboard');
                }}
              >
                Buyer
              </Button>
              <Button 
                variant={userType === 'seller' ? 'default' : 'outline'} 
                size="sm" 
                className="flex-1 text-xs"
                onClick={() => {
                  localStorage.setItem('userType', 'seller');
                  setUserType('seller');
                  setUserName('David Kim');
                  router.push("/dashboard");
                }}
              >
                Seller
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </Button>
            
            <div className="flex items-center space-x-3">
              <Avatar className="w-8 h-8">
                <AvatarImage 
                  src={userType === 'buyer' 
                    ? 'https://images.unsplash.com/photo-1494790108755-2616b612b5bc?w=32' 
                    : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32'
                  } 
                  alt="User" 
                />
                <AvatarFallback>
                  {userName.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <div className="text-sm font-medium text-gray-900">{userName}</div>
                <div className="text-xs text-gray-500 capitalize flex items-center">
                  {userType}
                  {userType === 'buyer' ? (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                  ) : (
                    <div className="w-2 h-2 bg-green-500 rounded-full ml-2"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
