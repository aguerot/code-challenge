import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './mongo/user.model';
import { UserRepositoryMongo } from './mongo/user.repository.mongo';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/consent-management'),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ]),
  ],
  providers: [
    UserRepositoryMongo,
  ],
  exports: [
    UserRepositoryMongo,
  ],

})
export class ConsentManagementMongoModule {}
