import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ConsentController } from './consent.controller';
import { ConsentManagementModule } from '@aguerot/consent-management';
import { ConsentManagementMongoModule } from '@aguerot/consent-management.mongo';
import { UserRepositoryMongo } from '@aguerot/consent-management.mongo';

@Module({
  imports: [
    ConsentManagementMongoModule,
    ConsentManagementModule,
    CqrsModule,
  ],
  providers: [
    { provide: 'IUserRepository', useClass: UserRepositoryMongo }
  ],
  controllers: [UserController, ConsentController],
})
export class AppModule { }
