import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Consent } from '@aguerot/consent-management';

@Schema()
export class UserModel extends Document {
  @Prop()
  override id!: string;

  @Prop({ unique: true })
  email!: string;

  @Prop({
    type: [
      { id: { type: String, required: true }, enabled: { type: Boolean, required: true }, _id: false }
    ]
  })
  consentHistory: Consent[] = [];
}


export const UserSchema = SchemaFactory.createForClass(UserModel);
