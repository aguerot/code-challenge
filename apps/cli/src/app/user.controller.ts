import { CreateUser, CreateUserResponse, GetUserById, GetUsers, User } from '@aguerot/consent-management';
import { ConsoleLogger } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Command, Console } from 'nestjs-console';
import { serialise } from './utils';

@Console(
  {
    command: 'user',
    description: 'Manage User',
  }
)
export class UserController {
  private readonly _logger = new ConsoleLogger();

  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus,
  ) {
  }

  @Command({
    command: 'create <email>',
    description: 'Create a user',
  })
  async createUser(
    email: string,
  ): Promise<void> {
    const command = new CreateUser(email);

    const result = await this._commandBus.execute<CreateUser, CreateUserResponse>(command);

    this._logger.log(result.id, 'User created');
  }

  @Command({
    command: 'all',
    description: 'Get all registered users'
  })
  async getUsers(): Promise<void> {
    const query = new GetUsers();
    const result = await this._queryBus.execute<GetUsers, User[]>(query);

    this._logger.log(result.map(u => serialise(u)).join('\n'));
  }

  @Command({
    command: 'get <id>',
    description: 'Get registered user by id'
  })
  async getUser(userId: string): Promise<void> {
    const query = new GetUserById(userId);
    const result = await this._queryBus.execute<GetUserById, User>(query);

    this._logger.log(serialise(result));
  }
}
