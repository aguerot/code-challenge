import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../domain/user';
import { IUserRepository } from '../../repository/user.repository';

export class GetUserById {
  constructor(public readonly id: string) {
  }
}

@QueryHandler(GetUserById)
export class GetUserByIdHandler implements IQueryHandler<GetUserById, User> {
  constructor(@Inject('IUserRepository') private readonly _repo: IUserRepository) {
  }

  execute({ id }: GetUserById): Promise<User> {
    return this._repo.findById(id);
  }

}
