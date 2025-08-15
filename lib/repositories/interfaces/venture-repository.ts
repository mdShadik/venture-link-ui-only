import { Venture } from '../../entities/venture';

export interface VentureRepository {
  getUnswipedVentures(userId: string, limit: number): Promise<Venture[]>;
  getById(id: string): Promise<Venture | null>;
  create(venture: Venture): Promise<Venture>;
  update(id: string, venture: Partial<Venture>): Promise<Venture>;
}