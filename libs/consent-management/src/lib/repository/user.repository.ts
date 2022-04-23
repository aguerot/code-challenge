import { Consent } from '../domain/consent';
import { User } from '../domain/user';

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string):Promise< User | undefined>;
  create(user: User): Promise<User>;
  appendConsents(id: string, consents: Consent[]): Promise<boolean>;

  delete(id: string): Promise<boolean>;
}
