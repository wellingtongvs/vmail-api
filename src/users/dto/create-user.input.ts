import { InputType, Field } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsString } from 'class-validator';

@InputType()
export class CreateUserInput extends User {
  @Field(() => String)
  @IsString()
  email: string;

  @Field(() => String)
  @IsString()
  password: string;
}
