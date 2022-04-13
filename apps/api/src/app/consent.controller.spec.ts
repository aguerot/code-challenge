import { Test, TestingModule } from '@nestjs/testing';
import { ConsentController } from './consent.controller';

describe('consent controller', () => {
  let app: TestingModule;
  let controller: ConsentController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [ConsentController],
    }).compile();

    controller = app.get<ConsentController>(ConsentController);
  });


  it('should get all users', () => {

    // Act
    const result = controller.appendConsents({
      id: 'user1',
      consents: [
      ]
    });

    // Assert
    expect(result).toBeTruthy();
  });

});
