export type ConsentIDs = 'email_notifications' | 'sms_notifications'

export class Consent {
  constructor(
    public readonly id: ConsentIDs,
    public readonly enabled: boolean,
  ) {
  }
}
