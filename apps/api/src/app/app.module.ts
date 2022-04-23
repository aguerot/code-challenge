import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ConsentController } from './consent.controller';
import { ConsentManagementModule } from '@aguerot/consent-management';
import { ConsentManagementMongoModule, UserRepositoryMongo } from '@aguerot/consent-management-mongo';

@Module({
  imports: [
    ConsentManagementMongoModule,
    ConsentManagementModule,
    CqrsModule,
  ],
  controllers: [UserController, ConsentController],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepositoryMongo }
  ],
})
export class AppModule { }
