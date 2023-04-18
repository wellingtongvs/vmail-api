import { Field, ObjectType } from '@nestjs/graphql';
import { Email } from '../entities/email.entity';

@ObjectType()
export class FindAllEmailsOutput {
  @Field(() => [Email], { nullable: true })
  emails: Email[];

  @Field()
  hasMore: boolean;
}
