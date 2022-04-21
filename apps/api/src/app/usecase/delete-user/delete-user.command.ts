import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IUserRepository } from '../../repository/user.repository';

export class DeleteUser {
  constructor(public readonly id: string) {
  }
}

@CommandHandler(DeleteUser)
export class DeleteUserHandler implements ICommandHandler<DeleteUser, boolean> {
  constructor(private readonly _repo: IUserRepository) {
  }

  execute({ id }: DeleteUser): Promise<boolean> {
    return this._repo.delete(id);
  }
}
