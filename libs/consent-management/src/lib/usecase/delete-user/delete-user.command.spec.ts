import Substitute, { Arg, SubstituteOf } from '@fluffy-spoon/substitute';
import { IUserRepository } from '../../repository/user.repository';
import { DeleteUser, DeleteUserHandler } from './delete-user.command';

describe('delete-user', () => {
  let userRepository: SubstituteOf<IUserRepository>;
  let handler: DeleteUserHandler;

  beforeEach(() => {
    userRepository = Substitute.for<IUserRepository>();
    handler = new DeleteUserHandler(userRepository);
  });

  it('should delete existing user', async () => {
    // Arrange
    const command = new DeleteUser('id');
    userRepository.delete(Arg.any()).resolves(true);

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result).toBe(true);
  });

  it('should not delete unknown user', async () => {
    // Arrange
    const command = new DeleteUser('id');
    userRepository.delete(Arg.any()).resolves(false);

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result).toBe(false);
  });

});
