import { InputType, Int, Field, ID } from '@nestjs/graphql';

@InputType()
export class FindAllEmailsInput {
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
