import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class LoginAuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
