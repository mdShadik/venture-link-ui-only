import { Venture } from '@/lib/entities/venture';

export const mockVentures: Venture[] = [
  {
    id: '1',
    title: 'EcoTech Solutions',
    description: 'Revolutionary sustainable technology for clean energy',
    category: 'CleanTech',
    fundingGoal: 500000,
    currentFunding: 150000,
    images: [
      'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=400',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400'
    ],
    founderId: 'founder-1',
    tags: ['sustainability', 'energy', 'technology'],
    stage: 'prototype',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'HealthAI Platform',
    description: 'AI-powered healthcare diagnostics for early disease detection',
    category: 'HealthTech',
    fundingGoal: 1000000,
    currentFunding: 300000,
    images: [
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400',
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400'
    ],
    founderId: 'founder-2',
    tags: ['healthcare', 'AI', 'diagnostics'],
    stage: 'mvp',
    createdAt: new Date('2024-02-01'),
  },
];


