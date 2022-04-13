import { Consent } from '../domain/consent';
import { Email } from '../domain/email';
import { User } from '../domain/user';

export class UserBuilder {
  static create(id: string, email: string, consents: Consent[] = []) {
    return new User(id, Email.create(email), consents);
  }
}
