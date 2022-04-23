import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Consent } from '../../domain/consent';
import { IUserRepository } from '../../repository/user.repository';

export class AppendConsents {
  constructor(public readonly id: string, public readonly consents: Consent[]) {
  }
}

@CommandHandler(AppendConsents)
export class AppendConsentsHandler implements ICommandHandler<AppendConsents, boolean> {
  constructor(@Inject('IUserRepository') private readonly _repo: IUserRepository) {
  }

  execute( { id, consents }: AppendConsents): Promise<boolean> {
    return this._repo.appendConsents(id, consents);
  }

}
