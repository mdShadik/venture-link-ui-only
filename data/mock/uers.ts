import { User } from '@/lib/entities/user';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'John Investor',
    email: 'john@investor.com',
    bio: 'Angel investor focused on early-stage tech startups',
    interests: ['technology', 'sustainability', 'healthcare'],
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
    location: 'San Francisco, CA',
    createdAt: new Date('2024-01-01'),
  },
];