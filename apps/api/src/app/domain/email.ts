export class Email {
  private constructor(private readonly _email: string) {
  }

  get value() {
    return this._email;
  }

  public static create(email: string): Email {
    if (!email) {
      throw new Error('email-required');
    }

    if (!/(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
      throw new Error('invalid-email');
    }

    return new Email(email);
  }
}
