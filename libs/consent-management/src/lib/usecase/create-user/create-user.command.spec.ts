import Substitute, { Arg, SubstituteOf } from '@fluffy-spoon/substitute';
import { User } from '../../domain/user';
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
    expect(result.id).toBeDefined();
  });

  it('should not create new user if email duplicated', async () => {
    // Arrange
    const command = new CreateUser('user1@inter.net');
    userRepository.findByEmail(Arg.any()).resolves({ } as User);

    // Act
    const createUserAction = () => handler.execute(command);

    // Assert
    expect(createUserAction).rejects.toThrow('duplicate email');

  });

  it('should not create new user with empty email', async () => {
    // Arrange
    const command = new CreateUser(undefined);
    userRepository.findByEmail(Arg.any()).resolves(undefined);

    // Act
    const createUserAction = () => handler.execute(command);

    // Assert
    expect(createUserAction).rejects.toThrow('email-required');
  });

  it('should not create new user with invalid email', async () => {
    // Arrange
    const command = new CreateUser('not-an-email');
    userRepository.findByEmail(Arg.any()).resolves(undefined);

    // Act
    const createUserAction = () => handler.execute(command);

    // Assert
    expect(createUserAction).rejects.toThrow('invalid-email');
  });

});
