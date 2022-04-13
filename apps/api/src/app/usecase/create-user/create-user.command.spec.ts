import Substitute, { Arg, SubstituteOf } from '@fluffy-spoon/substitute';
import { IUserRepository } from '../../repository/user.repository';
import { CreateUser, CreateUserHandler } from './create-user.command';

describe('create-user', () => {
  let userRepository: SubstituteOf<IUserRepository>;
  let handler: CreateUserHandler;

  beforeEach(() => {
    userRepository = Substitute.for<IUserRepository>();
    handler = new CreateUserHandler(userRepository);
  });

  it('should create new user', async () => {
    // Arrange
    const command = new CreateUser('user1@inter.net');
    userRepository.findByEmail(Arg.any()).resolves(undefined);

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result).toMatchObject({
      email: command.email,
      consents: []
    });
  });
});
