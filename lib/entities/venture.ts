export interface Venture {
    id: string;
    title: string;
    description: string;
    category: string;
    fundingGoal: number;
    currentFunding: number;
    images: string[];
    founderId: string;
    tags: string[];
    stage: 'idea' | 'prototype' | 'mvp' | 'growth';
    createdAt: Date;
  }

  