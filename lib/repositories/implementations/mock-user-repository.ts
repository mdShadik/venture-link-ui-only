import { mockUsers } from '@/data/mock/uers';
import { User } from '../../entities/user';
import { UserRepository } from '../interfaces/user-repository';

export class MockUserRepository implements UserRepository {
  async create(user: User): Promise<User> {
    mockUsers.push(user);
    return user;
  }

  async getById(id: string): Promise<User | null> {
    return mockUsers.find(u => u.id === id) || null;
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    const index = mockUsers.findIndex(u => u.id === id);
    if (index === -1) throw new Error('User not found');
    mockUsers[index] = { ...mockUsers[index], ...data };
    return mockUsers[index];
  }

  async delete(id: string): Promise<void> {
    const i = mockUsers.findIndex(u => u.id === id);
    if (i > -1) mockUsers.splice(i, 1);
  }

  async findByEmail(email: string): Promise<User | null> {
    return mockUsers.find(u => u.email === email) || null;
  }
}
