import Substitute, { SubstituteOf } from '@fluffy-spoon/substitute';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUser, DeleteUser, GetUserById, GetUsers, UserBuilder } from '@aguerot/consent-management';
import { UserController } from './user.controller';

describe('user controller', () => {
  let app: TestingModule;
  let controller: UserController;
  let queryBus: SubstituteOf<QueryBus>;
  let commandBus: SubstituteOf<CommandBus>;

  beforeEach(async () => {
    queryBus = Substitute.for<QueryBus>();
    commandBus = Substitute.for<CommandBus>();

    app = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: QueryBus, useValue: queryBus },
        { provide: CommandBus, useValue: commandBus },
      ]
    }).compile();

    controller = app.get<UserController>(UserController);
  });

  describe('get all', () => {
    it('should get all users', async () => {
      // Arrange
      queryBus.execute(new GetUsers()).resolves([
        UserBuilder.create('id1'),
        UserBuilder.create('id2')
      ]);

      // Act
      const result = await controller.getAll();

      // Assert
      expect(result).toHaveLength(2);
    });

  });

  describe('get by id', () => {
    it('should get user by id', async () => {
      // Arrange
      queryBus.execute(new GetUserById('user1'))
        .resolves(UserBuilder.create('user1'));

      // Act
      const result = await controller.getById('user1');

      // Assert
      expect(result).toMatchObject({
        id: 'user1',
        email: 'user1@inter.net',
        consents: []
      });
    });

    it('should throw 422 on unknown user', async () => {
      // Arrange
      queryBus.execute(new GetUserById('user1'))
        .resolves(undefined);

      // Act
      const getById = () => controller.getById('user1');

      // Assert
      expect(getById())
        .rejects
        .toThrow('Unprocessable Entity');
    });

  });

  describe('create new user', () => {
    it('should create new user', async () => {
      // Arrange
      commandBus.execute(new CreateUser('user1@inter.net'))
        .resolves(UserBuilder.create('user1'));

      // Act
      const result = await controller.create({ email: 'user1@inter.net' });

      // Assert
      expect(result).toMatchObject({
        id: 'user1',
        email: 'user1@inter.net',
        consents: []
      });
    });

    it('should throw 422 on duplicate email', async () => {
      // Arrange
      commandBus.execute(new CreateUser('user1@inter.net'))
        .resolves(undefined);

      // Act
      const result = () => controller.create({ email: 'user1@inter.net' });

      // Assert
      expect(result())
        .rejects
        .toThrow('Unprocessable Entity');
    });
  });

  describe('delete user', () => {
    it('should delete existing user', async () => {
      // Arrange
      commandBus.execute(new DeleteUser('user1')).resolves(true);

      // Act
      const result = await controller.deleteByid('user1');

      // Assert
      expect(result).toBe(true);
    });

    it('should throw 422 on unknown userId', async () => {
      // Arrange
      commandBus.execute(new DeleteUser('user1')).resolves(false);

      // Act
      const result = () => controller.deleteByid('user1');

      // Assert
      expect(result())
        .rejects
        .toThrow('Unprocessable Entity');
    });
  });
});
