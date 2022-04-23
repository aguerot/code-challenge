import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { randomUUID } from 'crypto';
import { Email } from '../../domain/email';
import { User } from '../../domain/user';
import { IUserRepository } from '../../repository/user.repository';

export class CreateUser {
  constructor(public readonly email: string) {

  }
}

export type CreateUserResponse = User;

@CommandHandler(CreateUser)
export class CreateUserHandler implements ICommandHandler<CreateUser, CreateUserResponse> {

  constructor(@Inject('IUserRepository') private readonly _userRepository: IUserRepository) {
  }

  async execute({ email }: CreateUser): Promise<User> {
    const existingUser = await this._userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('duplicate email');
    }

    const user = new User(randomUUID(), Email.create(email));
    await this._userRepository.create(user);
    return user;
  }

}
