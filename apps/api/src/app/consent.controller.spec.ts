import Substitute, { Arg, SubstituteOf } from '@fluffy-spoon/substitute';
import { CommandBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { ConsentController } from './consent.controller';
import { Consent } from './domain/consent';
import { AppendConsents } from './usecase/append-consent/append-consent.command';

describe('consent controller', () => {
  let app: TestingModule;
  let controller: ConsentController;
  let commandBus: SubstituteOf<CommandBus>;
  let consents: Consent[];

  beforeEach(async () => {
    commandBus = Substitute.for<CommandBus>();

    app = await Test.createTestingModule({
      controllers: [ConsentController],
      providers: [
        { provide: CommandBus, useValue: commandBus }
      ]
    }).compile();

    controller = app.get<ConsentController>(ConsentController);

    consents = [
      { id: 'sms_notifications', enabled: true }
    ];
  });


  it('should append consents to existing user', async () => {
    // Arrange
    commandBus.execute(new AppendConsents('user1', consents))
      .resolves(true);

    // Act
    const result = await controller.appendConsents({
      user: { id: 'user1' },
      consents
    });

    // Assert
    expect(result).toBe(true);
  });

  it('should throw 422 on unknown userId', async () => {
    // Arrange
    commandBus.execute(new AppendConsents('user1', consents))
      .resolves(false);

    // Act
    const result = () => controller.appendConsents({
      user: { id: 'user1' },
      consents
    });

    // Assert
    expect(result()).rejects.toThrow('Unprocessable Entity');
  });

  it('should throw 422 on empty consents list', async () => {
    // Arrange
    commandBus.execute(new AppendConsents('user1', []))
      .resolves(true);

    // Act
    const result = () => controller.appendConsents({
      user: { id: 'user1' },
      consents: [
      ]
    });

    // Assert
    expect(result()).rejects.toThrow('Unprocessable Entity');
  });

});
