import { Venture } from '../../entities/venture';
import { VentureRepository } from '../../repositories/interfaces/venture-repository';

export class GetVenturesUseCase {
  constructor(private ventureRepository: VentureRepository) {}

  async execute(userId: string, limit: number = 10): Promise<Venture[]> {
    return await this.ventureRepository.getUnswipedVentures(userId, limit);
  }
}

