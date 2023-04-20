import { InputType, Int, Field } from '@nestjs/graphql';
import { Email } from '../entities/email.entity';
import { IsString } from 'class-validator';

@InputType()
export class CreateEmailInput extends Email {
  @Field(() => String)
  @IsString()
  sender: string;
}
