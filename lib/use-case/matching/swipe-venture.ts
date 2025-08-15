import { Match } from '../../entities/match';
import { MatchRepository } from '../../repositories/interfaces/match-repository';

export class SwipeVentureUseCase {
  constructor(private matchRepository: MatchRepository) {}

  async execute(
    userId: string,
    ventureId: string,
    direction: 'left' | 'right'
  ): Promise<Match> {
    const match: Match = {
      id: crypto.randomUUID(),
      userId,
      ventureId,
      swipeDirection: direction,
      timestamp: new Date(),
      isMatch: direction === 'right',
    };

    return await this.matchRepository.create(match);
  }
}