export class Email {
  private constructor(private readonly _email: string) {
  }

  get value() {
    return this._email;
  }

  static create(email: string): Email {
    return new Email(email);
  }
}
