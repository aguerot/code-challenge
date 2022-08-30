import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';
import { UserRepositoryMongo } from './user.repository.mongo';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/consent-management'),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ]),
  ],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepositoryMongo }
  ],
  exports: [
    'IUserRepository'
  ]
})
export class ConsentManagementMongoModule {}
