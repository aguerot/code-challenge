import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';

describe('user controller', () => {
  let app: TestingModule;
  let controller: UserController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [UserController],
    }).compile();

    controller = app.get<UserController>(UserController);
  });


  it('should get all users', () => {

    // Act
    const result = controller.getAll();

    // Assert
    expect(result).toHaveLength(2);
  });

  describe('get by id', () => {
    it('should get user by id', () => {
      // Act
      const result = controller.getById('user1');

      // Assert
      expect(result).toStrictEqual({ id: 'user1', email: 'user1@inter.net' });
    });

  });

  describe('create new user', () => {
    it('should create new user', () => {
      // Act
      const result = controller.create({ email: 'user1@inter.net' });

      // Assert
      expect(result).toStrictEqual({
        id: '000000',
        email: 'user1@inter.net',
        consents: []
      });
    });
  });

  describe('delete user', () => {
    it('should delete existing user', () => {
      // Act
      const result = controller.deleteByid('user1');

      // Assert
      expect(result).toBeTruthy();
    });
  });
});
