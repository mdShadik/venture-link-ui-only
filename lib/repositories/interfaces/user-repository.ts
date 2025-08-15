import { User } from '../../entities/user';

export interface UserRepository {
  create(user: User): Promise<User>;
  getById(id: string): Promise<User | null>;
  update(id: string, data: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
}
