// lib/repositories/implementations/mock-venture-repository.ts
import { Venture } from '../../entities/venture';
import { VentureRepository } from '../interfaces/venture-repository';
import { mockVentures } from '../../../data/mock/ventures';

export class MockVentureRepository implements VentureRepository {
  async getUnswipedVentures(userId: string, limit = 10): Promise<Venture[]> {
    return mockVentures.slice(0, limit);
  }

  async getById(id: string): Promise<Venture | null> {
    return mockVentures.find(v => v.id === id) || null;
  }

  async create(venture: Venture): Promise<Venture> {
    mockVentures.push(venture);
    return venture;
  }

  async update(id: string, data: Partial<Venture>): Promise<Venture> {
    const i = mockVentures.findIndex(v => v.id === id);
    if (i === -1) throw new Error('Venture not found');
    mockVentures[i] = { ...mockVentures[i], ...data };
    return mockVentures[i];
  }

  async delete(id: string): Promise<void> {
    const i = mockVentures.findIndex(v => v.id === id);
    if (i > -1) mockVentures.splice(i, 1);
  }
}
