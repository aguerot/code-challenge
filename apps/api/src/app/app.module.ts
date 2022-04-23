import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './repository/mongo/user.model';
import { CqrsModule } from '@nestjs/cqrs';
import { ConsentController } from './consent.controller';
import { CreateUserHandler } from './usecase/create-user/create-user.command';
import { GetUsersHandler } from './usecase/get-users/get-users.query';
import { GetUserByIdHandler } from './usecase/get-user-by-id/get-user-by-id.query';
import { DeleteUserHandler } from './usecase/delete-user/delete-user.command';
import { AppendConsentsHandler } from './usecase/append-consent/append-consent.command';
import { UserRepositoryMongo } from './repository/mongo/user.repository.mongo';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/consent-management'),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ]),
    CqrsModule,
  ],
  controllers: [UserController, ConsentController],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepositoryMongo },
    CreateUserHandler,
    GetUsersHandler,
    GetUserByIdHandler,
    DeleteUserHandler,
    AppendConsentsHandler,
  ],
})
export class AppModule { }
