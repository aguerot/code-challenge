import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { User } from '../../domain/user';
import { IUserRepository } from '../../repository/user.repository';

export class GetUsers {
}

export type GetUsersResponse = User[];

@QueryHandler(GetUsers)
export class GetUsersHandler implements IQueryHandler<GetUsers, GetUsersResponse> {
  constructor(private readonly _userRepository: IUserRepository) {
  }

  execute(query: GetUsers): Promise<GetUsersResponse> {
    return this._userRepository.findAll();
  }

}
