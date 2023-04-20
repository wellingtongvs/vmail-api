import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class LoginAuthInput {
  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;
}
