import { IUserRepository } from '../../repository/user.repository';
import { GetUsers, GetUsersHandler } from './get-users.query';
import { UserBuilder } from '../../test/user.builder';
import { Substitute, SubstituteOf } from '@fluffy-spoon/substitute';

describe('get-users', () => {
  let userRepository: SubstituteOf<IUserRepository>;
  let handler: GetUsersHandler;

  beforeEach(() => {
    userRepository = Substitute.for<IUserRepository>();
    handler = new GetUsersHandler(userRepository);
  });

  it('should get all users without consent', async () => {
    // Arrange
    const users = [
      UserBuilder.create('user1', 'user1@inter.net', [
        { id: 'email_notifications', enabled: true },
        { id: 'sms_notifications', enabled: true },
        { id: 'email_notifications', enabled: false }
      ]),
      UserBuilder.create('user2', 'user2@inter.net'),
    ];
    userRepository.findAll().resolves(users);

    // Act
    const result = await handler.execute(new GetUsers());

    // Assert
    expect(result).toHaveLength(users.length);
    expect(result[0].consents).toHaveLength(2);
    expect(result[0].consents[0]).toStrictEqual({ id: 'sms_notifications', enabled: true });
    expect(result[0].consents[1]).toStrictEqual({ id: 'email_notifications', enabled: false });
    expect(result[1].consents).toHaveLength(0);
    expect(result).toStrictEqual(users);
  });
});
