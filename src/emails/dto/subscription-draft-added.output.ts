import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Email } from '../entities/email.entity';

@ObjectType()
export class SubscriptionOutput extends Email {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  subject: string;

  @Field({ nullable: true })
  body: string;

  @Field({ nullable: true })
  recipient: string;

  @Field()
  sender: string;

  @Field()
  isDraft: boolean;

  @Field()
  isSent: boolean;

  @Field()
  isTrash: boolean;

  @Field()
  createdAt: number;

  @Field({ nullable: true })
  sentAt: number;
}
