import Substitute, { Arg, SubstituteOf } from '@fluffy-spoon/substitute';
import { IUserRepository } from '../../repository/user.repository';
import { UserBuilder } from '../../test/user.builder';
import { GetUserById, GetUserByIdHandler } from './get-user-by-id.command';

describe('get-user-by-id', () => {
  let handler: GetUserByIdHandler;
  let userRepository: SubstituteOf<IUserRepository>;

  beforeEach(() => {
    userRepository = Substitute.for<IUserRepository>();
    handler = new GetUserByIdHandler(userRepository);
  });

  it('should get user by id', async () => {
    // Arrange
    const command = new GetUserById('id');
    const user = UserBuilder.create(command.id);
    userRepository.findById(command.id).resolves(user);

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result).toStrictEqual(user);
  });

  it('should get undefined for unknown user', async () => {
    // Arrange
    const command = new GetUserById('id');
    userRepository.findById(Arg.any()).resolves(undefined);

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result).toBeUndefined();

  });
});
