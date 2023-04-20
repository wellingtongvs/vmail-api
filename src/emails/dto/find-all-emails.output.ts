import { Field, ObjectType } from '@nestjs/graphql';
import { Email } from '../entities/email.entity';

@ObjectType()
export class FindAllEmailsOutput extends Email {
  @Field(() => [Email], { nullable: true })
  emails: Email[];

  @Field()
  hasMore: boolean;
}
