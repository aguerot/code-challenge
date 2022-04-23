import { Consent } from './consent';
import { Email } from './email';

export class User {
  consents: ReadonlyArray<Consent>;

  constructor(
    readonly id: string,
    private readonly _email: Email,
    consentHistory: Consent[] = []) {
      this.consents = this.computelatestConsents(consentHistory);
  }

  private computelatestConsents(consentHistory: Consent[]): Consent[] {
    const [ latestSmsConsent ] = consentHistory.filter(c => c.id === 'sms_notifications').splice(-1);
    const [ latestEmailConsent ] = consentHistory.filter(c => c.id === 'email_notifications').splice(-1);

    return [
      latestSmsConsent,
      latestEmailConsent,
    ].filter(c => !!c);
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
