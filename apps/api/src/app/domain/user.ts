import { Consent } from './consent';
import { Email } from './email';

export class User {
  consents: ReadonlyArray<Consent>;

  constructor(
    readonly id: string,
    readonly email: Email,
    consentHistory: Consent[] = []) {
      this.consents = consentHistory.splice(2);
  }

  appendConsents(newConsents: Consent[]) {
    return new User(this.id, this.email, [
      ...this.consents,
      ...newConsents,
    ]);
  }

}
