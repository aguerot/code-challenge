import { DynamicModule, Module, Provider } from '@nestjs/common';
import { IUserRepository } from './repository/user.repository';
import { AppendConsentsHandler } from './usecase/append-consent/append-consent.command';
import { CreateUserHandler } from './usecase/create-user/create-user.command';
import { DeleteUserHandler } from './usecase/delete-user/delete-user.command';
import { GetUserByIdHandler } from './usecase/get-user-by-id/get-user-by-id.query';
import { GetUsersHandler } from './usecase/get-users/get-users.query';

@Module({
  controllers: [],
  providers: [
    CreateUserHandler,
    DeleteUserHandler,
    AppendConsentsHandler,
    GetUsersHandler,
    GetUserByIdHandler,
  ],
  exports: [],
})
export class ConsentManagementModule {
}
