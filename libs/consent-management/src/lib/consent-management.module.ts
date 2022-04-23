import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './repository/mongo/user.model';
import { UserRepositoryMongo } from './repository/mongo/user.repository.mongo';
import { AppendConsentsHandler } from './usecase/append-consent/append-consent.command';
import { CreateUserHandler } from './usecase/create-user/create-user.command';
import { DeleteUserHandler } from './usecase/delete-user/delete-user.command';
import { GetUserByIdHandler } from './usecase/get-user-by-id/get-user-by-id.query';
import { GetUsersHandler } from './usecase/get-users/get-users.query';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/consent-management'),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ]),
  ],
  providers: [
    CreateUserHandler,
    DeleteUserHandler,
    AppendConsentsHandler,
    GetUsersHandler,
    GetUserByIdHandler,
    { provide: 'IUserRepository', useClass: UserRepositoryMongo }
  ],
  exports: [],
})
export class ConsentManagementModule {
}
