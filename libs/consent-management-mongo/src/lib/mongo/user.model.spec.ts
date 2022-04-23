import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel, UserSchema } from './user.model';
import { rootMongooseTestModule, closeInMongodConnection } from '../test/mongoose.utils';
import { Consent } from '@aguerot/consent-management';

describe('user mongoose model', () => {
  let userModel: Model<UserModel>;

  beforeEach(async () => {

    const module = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([
          { name: UserModel.name, schema: UserSchema }
        ])
      ],
      providers: [
      ]
    }).compile();

    userModel = module.get<Model<UserModel>>(getModelToken(UserModel.name))
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('should create new user with its history', async () => {
    // Arrange
    const id = 'id';
    const email = 'id@inter.net';
    const consentHistory: Consent[] = [
      { id: 'sms_notifications', enabled: false },
      { id: 'email_notifications', enabled: false },
      { id: 'sms_notifications', enabled: true },
    ];

    // Act
    await userModel.create({
      id,
      email,
      consentHistory
    });

    // Assert
    const newuser = await userModel.findOne({ id });

    expect(newuser).toBeDefined();
    expect(newuser.email).toBe(email);
    expect(newuser.consentHistory).toHaveLength(3);
    expect(newuser.consentHistory.every(consent =>
      consent.id !== undefined &&
      consent.enabled !== undefined)).toBeTruthy();
  });

  it('should not allow duplicate email', async () => {
    // Arrange
    await userModel.create({
      id: 'id1',
      email: 'email@inter.net',
      consentHistory: [],
    });

    // Act
    const createModelWithDuplicateEmail = () => userModel.create({
      id: 'id2',
      email: 'email@inter.net',
      consentHistory: [],
    });

    // Assert
    await expect(createModelWithDuplicateEmail())
      .rejects
      .toThrow(`E11000 duplicate key error collection: test.usermodels index: email_1 dup key: { email: "email@inter.net" }`);
  });

});
