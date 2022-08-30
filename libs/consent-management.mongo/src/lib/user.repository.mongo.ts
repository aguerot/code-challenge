import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, Email, Consent, IUserRepository } from '@aguerot/consent-management';
import { Model } from 'mongoose';
import { UserModel } from './user.model';

@Injectable()
export class UserRepositoryMongo implements IUserRepository {

  constructor(@InjectModel(UserModel.name) private readonly _userRepo: Model<UserModel>) {
  }
  async delete(id: string): Promise<boolean> {
    const result = await this._userRepo.deleteOne({ id })
    return	result.deletedCount === 1;
  }

  async findAll(): Promise<User[]> {
    const items = await this._userRepo.find()
      .lean()
      .exec();

    return items.map(i => new User(i.id, Email.create(i.email), i.consentHistory));
  }

  findById(id: string): Promise<User | undefined> {
    return this.findOne({ id });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }

  private async findOne(userFilter: Partial<User>): Promise<User | undefined> {
    const user = await this._userRepo.findOne(userFilter)
      .lean()
      .exec();

    if (!user) {
      return undefined;
    }

    return new User(user.id, Email.create(user.email), user.consentHistory);

  }

  async create(user: User): Promise<User> {
    await this._userRepo.create({ id: user.id, email: user.email });
    return user;
  }

  async appendConsents(id: string, consents: Consent[]): Promise<boolean> {
    const result = await this._userRepo.updateOne({
      id
    }, {
      $push: { consentHistory: consents }
    }).exec();

    return result.matchedCount === 1 && result.modifiedCount === 1;
  }


}
