import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SubscriptionOutput {
  @Field(() => String)
  sender: string;
}
