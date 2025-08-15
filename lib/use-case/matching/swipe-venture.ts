import { Match } from '../../entities/match';
import { MatchRepository } from '../../repositories/interfaces/match-repository';

export class SwipeVentureUseCase {
  constructor(private matchRepository: MatchRepository) {}

  async execute(
    userId: string,
    ventureId: string,
    direction: 'left' | 'right'
  ): Promise<Match> {
    const compatibilityScore = direction === 'right' ? this.calculateCompatibilityScore(userId, ventureId) : 0;
    const matchReasons = direction === 'right' ? this.generateMatchReasons(userId, ventureId) : [];

    const match: Match = {
      id: crypto.randomUUID(),
      userId,
      ventureId,
      swipeDirection: direction,
      timestamp: new Date(),
      isMatch: direction === 'right',
      compatibilityScore,
      matchReasons,
      hasMessaged: false,
    };

    return await this.matchRepository.create(match);
  }

  private calculateCompatibilityScore(userId: string, ventureId: string): number {
    return Math.floor(Math.random() * 26) + 70;
  }

  private generateMatchReasons(userId: string, ventureId: string): string[] {
    
    const possibleReasons = [
      'Industry alignment',
      'Budget compatibility', 
      'Location preference match',
      'Growth stage alignment',
      'Investment timeline fit',
      'Risk profile match',
      'Experience level compatibility',
      'Strategic value alignment'
    ];

    const numReasons = Math.floor(Math.random() * 3) + 2;
    const shuffled = possibleReasons.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numReasons);
  }
}
