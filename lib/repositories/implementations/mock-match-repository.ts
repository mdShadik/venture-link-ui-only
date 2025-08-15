// lib/repositories/implementations/mock-match-repository.ts

import { Match } from '../../entities/match';
import { MatchRepository } from '../interfaces/match-repository';

const mockMatches: Match[] = [];

export class MockMatchRepository implements MatchRepository {
  async create(match: Match): Promise<Match> {
    mockMatches.push(match);
    return match;
  }

  async getMatchesForUser(userId: string): Promise<Match[]> {
    return mockMatches.filter(match => match.userId === userId);
  }

  async getMatchesByVenture(ventureId: string): Promise<Match[]> {
    return mockMatches.filter(match => match.ventureId === ventureId);
  }

  async getMutualMatches(userId: string): Promise<Match[]> {
    return mockMatches.filter(
      match => match.userId === userId && match.isMatch === true
    );
  }

  async deleteMatch(matchId: string): Promise<void> {
    const index = mockMatches.findIndex(match => match.id === matchId);
    if (index > -1) {
      mockMatches.splice(index, 1);
    }
  }
}
