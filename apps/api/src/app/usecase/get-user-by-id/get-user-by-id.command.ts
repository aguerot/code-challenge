import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { User } from '../../domain/user';
import { IUserRepository } from '../../repository/user.repository';

export class GetUserById {
  constructor(public readonly id: string) {
  }
}

@CommandHandler(GetUserById)
export class GetUserByIdHandler implements ICommandHandler<GetUserById, User> {
  constructor(private readonly _repo: IUserRepository) {
  }

  execute({ id }: GetUserById): Promise<User> {
    return this._repo.findById(id);
  }

}
