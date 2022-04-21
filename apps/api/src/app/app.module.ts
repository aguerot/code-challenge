import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { MongooseModule }  from '@nestjs/mongoose';
import { UserModel, UserSchema } from './repository/mongo/user.model';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/consent-management'),
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ])
  ],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
