import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../domain/user';
import { IUserRepository } from '../../repository/user.repository';

export class GetUsers {
}

export type GetUsersResponse = User[];

@QueryHandler(GetUsers)
export class GetUsersHandler implements IQueryHandler<GetUsers, GetUsersResponse> {
  constructor(@Inject('IUserRepository') private readonly _userRepository: IUserRepository) {
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  execute(_: GetUsers): Promise<GetUsersResponse> {
    return this._userRepository.findAll();
  }

}
