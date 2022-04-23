import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ConsentController } from './consent.controller';
import { ConsentManagementModule } from '@aguerot/consent-management';

@Module({
  imports: [
    ConsentManagementModule,
    CqrsModule,
  ],
  controllers: [UserController, ConsentController],
})
export class AppModule { }
