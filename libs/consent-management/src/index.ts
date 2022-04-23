export * from './lib/consent-management.module';

export * from './lib/domain/consent';
export * from './lib/domain/email';
export * from './lib/domain/user';

export * from './lib/repository/user.repository';

export { CreateUser, CreateUserResponse } from './lib/usecase/create-user/create-user.command';
export { DeleteUser } from './lib/usecase/delete-user/delete-user.command';
export { AppendConsents } from './lib/usecase/append-consent/append-consent.command';

export { GetUsers, GetUsersResponse } from './lib/usecase/get-users/get-users.query';
export { GetUserById } from './lib/usecase/get-user-by-id/get-user-by-id.query';

export * from './lib/test/user.builder';
