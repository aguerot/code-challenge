import { Body, Controller, Delete, Get, Param, Post, UnprocessableEntityException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiProperty } from '@nestjs/swagger';
import { User, Consent, GetUsers, GetUserById, CreateUser, DeleteUser } from '@aguerot/consent-management';

class CreateUserDto {
  @ApiProperty({ type: String, required: true })
  email: string;
}

class UserDto {
  constructor(user: User) {
    this.id = user.id;
    this.email = user.email;
    this.consents = [...user.consents];
  }

  @ApiProperty({ type: String, readOnly: true, required: true })
  readonly id: string;
  @ApiProperty({ type: String, readOnly: true, required: true })
  readonly email: string;
  @ApiProperty({ type: Consent, readOnly: true, required: true, isArray: true, minItems: 0 })
  readonly consents: Consent[]
}

@Controller('users')
@ApiTags('Users')
export class UserController {

  constructor(
    private readonly _commandBus: CommandBus,
    private readonly _queryBus: QueryBus) {
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'list of users', type: UserDto, isArray: true })
  @ApiResponse({ status: 422, description: 'unprocessable entity' })
  async getAll(): Promise<UserDto[]> {
    const users = await this._queryBus.execute<GetUsers, User[]>(new GetUsers());

    return users.map(u => new UserDto(u));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, description: 'Requested user', type: UserDto })
  @ApiResponse({ status: 422, description: 'User does not exsit' })
  async getById(@Param('id') id: string): Promise<UserDto> {
    const user = await this._queryBus.execute<GetUserById, User>(new GetUserById(id));

    if (!user) {
      throw new UnprocessableEntityException();
    }

    return new UserDto(user);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user with an email' })
  @ApiBody({ type: CreateUserDto, required: true })
  @ApiResponse({ status: 201, description: 'New user details', type: UserDto })
  @ApiResponse({ status: 422, description: 'Duplicate email' })
  async create(@Body() { email }: { email: string }): Promise<UserDto> {
    try {

      const user = await this._commandBus.execute<CreateUser, User>(new CreateUser(email));

      if (!user) {
        throw new UnprocessableEntityException();
      }

      return new UserDto(user);
    } catch (err) {
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
