import { Body, Controller, Delete, Get, Param, Post, UnprocessableEntityException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { User } from './domain/user';
import { CreateUser } from './usecase/create-user/create-user.command';
import { DeleteUser } from './usecase/delete-user/delete-user.command';
import { GetUserById } from './usecase/get-user-by-id/get-user-by-id.query';
import { GetUsers } from './usecase/get-users/get-users.query';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty } from '@nestjs/swagger';

class CreateUserDto {
  @ApiProperty({ type: String, required: true })
  email: string;
}


@Controller('users')
@ApiTags('users')
export class UserController {

  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus) {
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'list of users', type: User, isArray: true })
  @ApiResponse({ status: 422, description: 'unprocessable entity' })
  getAll(): Promise<User[]> {
    return this._queryBus.execute<GetUsers, User[]>(new GetUsers());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Requested user', type: User })
  @ApiResponse({ status: 422, description: 'User does not exsit' })
  async getById(@Param('id') id: string): Promise<User> {
    const user = await this._queryBus.execute<GetUserById, User>(new GetUserById(id));

    if (!user) {
      throw new UnprocessableEntityException();
    }

    return user;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user with an email' })
  @ApiBody({ type: CreateUserDto, required: true })
  @ApiResponse({ status: 201, description: 'New user details', type: User })
  @ApiResponse({ status: 422, description: 'Duplicate email' })
  async create(@Body() { email }: { email: string }) {
    try {

      const user = await this._commandBus.execute<CreateUser, User>(new CreateUser(email));

      if (!user) {
        throw new UnprocessableEntityException();
      }

      return user;
    } catch (err) {
      console.log(err);
      throw new UnprocessableEntityException(err);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by id'})
  @ApiResponse({ status: 200, description: 'user deleted'})
  @ApiResponse({ status: 422, description: 'user has not been deleted'})
  async deleteByid(@Param('id') id: string) {
    const success = await this._commandBus.execute<DeleteUser, boolean>(new DeleteUser(id));
    if (!success) {
      throw new UnprocessableEntityException();
    }

    return success;
  }
}
