import { Email } from '../entities/email.entity';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateEmailInput extends Email {
  @Field({ nullable: true })
  id: string;

  @Field({ nullable: true })
  sender: string;

  @Field({ nullable: true })
  recipient: string;

  @Field({ nullable: true })
  subject: string;

  @Field({ nullable: true })
  body: string;
}
