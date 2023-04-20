import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Email {
  @ObjectIdColumn()
  @Field(() => ID)
  id: string;

  @Column()
  @Field({ nullable: true })
  subject: string;

  @Column()
  @Field({ nullable: true })
  body: string;

  @Column()
  @Field({ nullable: true })
  recipient: string;

  @Column()
  @Field()
  sender: string;

  @Column()
  @Field()
  isDraft: boolean;

  @Column()
  @Field()
  isSent: boolean;

  @Column()
  @Field()
  isTrash: boolean;

  @Column()
  @Field()
  createdAt: number;

  @Column({ nullable: true })
  @Field()
  sentAt: number;

  @Column()
  @Field()
  copyOwnerId: string;
}
