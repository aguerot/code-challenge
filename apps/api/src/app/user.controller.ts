import { Body, Controller, Delete, Get, Param, Post, UnprocessableEntityException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from './domain/user';
import { CreateUser } from './usecase/create-user/create-user.command';
import { DeleteUser } from './usecase/delete-user/delete-user.command';
import { GetUserById } from './usecase/get-user-by-id/get-user-by-id.command';
import { GetUsers } from './usecase/get-users/get-users.query';

@Controller('users')
export class UserController {

  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus) {
  }

  @Get()
  getAll(): Promise<User[]> {
    return this._queryBus.execute<GetUsers, User[]>(new GetUsers());
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this._queryBus.execute<GetUserById, User>(new GetUserById(id));
    if (!user) {
      throw new UnprocessableEntityException();
    }

    return user;
  }

  @Post()
  async create(@Body() { email }: { email: string }) {
    const user = await this._commandBus.execute<CreateUser, User>(new CreateUser(email));

    if (!user) {
      throw new UnprocessableEntityException();
    }

    return user;
  }

  @Delete(':id')
  async deleteByid(@Param('id') id: string) {
    const success = await this._commandBus.execute<DeleteUser, boolean>(new DeleteUser(id));
    if (!success) {
      throw new UnprocessableEntityException();
    }

    return success;
  }
}
