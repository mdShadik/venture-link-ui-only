import { Match } from '../../entities/match';

export interface MatchRepository {
  create(match: Match): Promise<Match>;
  getMatchesForUser(userId: string): Promise<Match[]>;
  getMatchesByVenture(ventureId: string): Promise<Match[]>;
  getMutualMatches(userId: string): Promise<Match[]>;
  deleteMatch(matchId: string): Promise<void>;
}
