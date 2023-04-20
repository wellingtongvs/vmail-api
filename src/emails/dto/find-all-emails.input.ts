import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { Email } from '../entities/email.entity';

@InputType()
export class FindAllEmailsInput extends Email {
  @Field({ nullable: true })
  sender: string;

  @Field({ nullable: true })
  recipient: string;

  @Field({ nullable: true })
  isDraft: boolean;

  @Field({ nullable: true })
  isSent: boolean;

  @Field({ nullable: true })
  isTrash: boolean;

  @Field({ nullable: true })
  first: number;

  @Field({ nullable: true })
  after: string;
}
