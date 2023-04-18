import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateEmailInput {
  @Field()
  sender: string;
}
