import { Consent } from './consent';
import { Email } from './email';

export class User {
  consents: ReadonlyArray<Consent>;

  constructor(
    readonly id: string,
    private readonly _email: Email,
    consentHistory: Consent[] = []) {
      this.consents = consentHistory.splice(0, 2);
  }

  get email() {
    return this._email.value;
  }

  appendConsents(newConsents: Consent[]): User {
    return new User(this.id, this._email, [
      ...this.consents,
      ...newConsents,
    ]);
  }

}
