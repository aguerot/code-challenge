import Substitute, { Arg, SubstituteOf } from '@fluffy-spoon/substitute';
import { IUserRepository } from '../../repository/user.repository';
import { AppendConsents, AppendConsentsHandler } from './append-consent.command';

describe('append-consent', () => {
  let userRepository: SubstituteOf<IUserRepository>;
  let handler: AppendConsentsHandler;

  beforeEach(() => {
    userRepository = Substitute.for<IUserRepository>();
    handler = new AppendConsentsHandler(userRepository);
  });

  it('should append consent to existing user', async () => {
    // Arrange
    const command = new AppendConsents('id1', [
      { id: 'email_notifications', enabled: true },
      { id: 'sms_notifications', enabled: true },
    ]);
    userRepository.appendConsents(Arg.all()).resolves(true);

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result).toStrictEqual(true);
  });

  it('should skip appending consents to unknown user', async () => {
    // Arrange
    const command = new AppendConsents('id1', [
      { id: 'email_notifications', enabled: true },
      { id: 'sms_notifications', enabled: true },
    ]);
    userRepository.appendConsents(Arg.all()).resolves(false);

    // Act
    const result = await handler.execute(command);

    // Assert
    expect(result).toStrictEqual(false);

  });
});
