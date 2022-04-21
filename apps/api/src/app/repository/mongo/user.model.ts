import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Consent } from '../../domain/consent';

@Schema()
export class UserModel extends Document {
  @Prop()
  id: string;

  @Prop({ unique: true })
  email: string;

  @Prop({
    type: [
      { id: { type: String, required: true }, enabled: { type: Boolean, required: true }, }
    ]
  })
  consentHistory: Consent[];
}


export const UserSchema = SchemaFactory.createForClass(UserModel);
