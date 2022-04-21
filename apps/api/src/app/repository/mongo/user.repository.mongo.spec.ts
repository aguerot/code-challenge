import { Test } from '@nestjs/testing';
import { UserModel, UserSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';
import { rootMongooseTestModule, closeInMongodConnection } from '../../test/mongoose.utils';
import { IUserRepository } from '../user.repository';
import { UserRepositoryMongo } from './user.repository.mongo';
import { UserBuilder } from '../../test/user.builder';

describe('user mongo repository', () => {
  let userRepository: IUserRepository;

  beforeEach(async () => {

    const module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: UserModel.name, schema: UserSchema }
        ])
      ],
      providers: [
        { provide: 'IUserRepository', useClass: UserRepositoryMongo }
      ]
    }).compile();

    userRepository = module.get<IUserRepository>('IUserRepository')
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should create a user', async () => {
    // Arrange
    const user = UserBuilder.create('id');

    // Act
    await userRepository.create(user);

    // Assert
    const newUser = await userRepository.findById('id');

    expect(newUser).toBeDefined();
    expect(newUser.id).toBe('id');
    expect(newUser.email).toBe('id@inter.net');
    expect(newUser.consents).toHaveLength(0);
  });

  it('should find a user by email', async () => {
    // Arrange
    await userRepository.create(UserBuilder.create('id1'));

    // Act
    const user = await userRepository.findByEmail('id1@inter.net');

    // Assert
    expect(user).toMatchObject({
      id: 'id1',
      email: 'id1@inter.net',
    })
  });

  it('should find a user by id', async () => {
    // Arrange
    await userRepository.create(UserBuilder.create('id1'));

    // Act
    const user = await userRepository.findById('id1');

    // Assert
    expect(user).toMatchObject({
      id: 'id1',
      email: 'id1@inter.net',
    })
  });

  it('should find all users', async () => {
    // Arrange
    await userRepository.create(UserBuilder.create('id1'));
    await userRepository.create(UserBuilder.create('id2'));

    // Act
    const result = await userRepository.findAll();

    // Assert
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('id1');
    expect(result[1].id).toBe('id2');
  });

  it('should delete existing user', async () => {
    // Arrange
    await userRepository.create(UserBuilder.create('id1'));

    // Act
    const result = await userRepository.delete('id1');

    // Assert
    expect(result).toBe(true);
  });

  it('should not delete unknown user', async () => {

    // Act
    const result = await userRepository.delete('unknownId');

    // Assert
    expect(result).toBe(false);
  });

  it('should append consent', async () => {
    // Arrange
    await userRepository.create(UserBuilder.create('id1'));

    // Act
    const result = await userRepository.appendConsents('id1', [
      { id: 'email_notifications', enabled: true },
      { id: 'sms_notifications', enabled: true },
    ]);

    // Expect
    expect(result).toBeTruthy();

    const user = await userRepository.findById('id1');

    expect(user.consents).toHaveLength(2);
    expect(user.consents.every(c => c.enabled));

  });

  it('should fail to add consent on unknown user id', async () => {
    // Act
    const result = await userRepository.appendConsents('unknownId', [
      { id: 'email_notifications', enabled: true },
    ]);

    // Expect
    expect(result).toBeFalsy();
  });
});
