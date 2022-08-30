import { ConsentManagementModule } from '@aguerot/consent-management';
import { ConsentManagementMongoModule } from '@aguerot/consent-management.mongo';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ConsoleModule } from 'nestjs-console';
import { ConsentController } from './consent.controller';

import { UserController } from './user.controller';

@Module({
  imports: [
    ConsentManagementMongoModule,
    ConsentManagementModule,
    ConsoleModule,
    CqrsModule,
  ],
  controllers: [],
  providers: [
    UserController,
    ConsentController,
  ],
})
export class AppModule {}
