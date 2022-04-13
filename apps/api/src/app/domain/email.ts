export class Email {
  private constructor(private readonly _email: string) {
  }

  get value() {
    return this._email;
  }

  public static create(email: string): Email {
    return new Email(email);
  }
}
