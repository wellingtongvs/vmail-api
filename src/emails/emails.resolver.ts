import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EmailsService } from './emails.service';
import { Email } from './entities/email.entity';
import { CreateEmailInput } from './dto/create-email.input';
import { UpdateEmailInput } from './dto/update-email.input';
import { PubSub } from 'graphql-subscriptions';
import { FindAllEmailsInput } from './dto/find-all-emails.input';
import { FindAllEmailsOutput } from './dto/find-all-emails.output';

const pubSub = new PubSub();

@Resolver(() => Email)
export class EmailsResolver {
  constructor(private readonly emailsService: EmailsService) {}

  @Mutation(() => Email)
  async createEmail(@Args('input') createEmailInput: CreateEmailInput) {
    const draft = this.emailsService.create(createEmailInput);
    pubSub.publish('emailDraftAdded', draft);
    return draft;
  }

  @Mutation(() => Email)
  async sendEmail(@Args('id', { type: () => ID }) id: string) {
    const sentEmail = await this.emailsService.sendEmail(id);
    pubSub.publish('emailSent', sentEmail);
  }

  @Mutation(() => Email)
  async updateEmail(
    @Args('updateEmailInput') updateEmailInput: UpdateEmailInput,
  ) {
    return this.emailsService.update(`updateEmailInput.id`, updateEmailInput);
  }

  @Query(() => FindAllEmailsOutput, { name: 'emails' })
  async findAll(@Args('filters') filters: FindAllEmailsInput) {
    const response = await this.emailsService.findAll(filters);
    return response;
  }

  @Query(() => Email, { name: 'email' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    return this.emailsService.findOne(id);
  }

  @Mutation(() => Email)
  async deleteEmail(@Args('id', { type: () => ID }) id: string) {
    return this.emailsService.deleteEmail(id);
  }

  @Mutation(() => Email)
  async trashEmail(@Args('id', { type: () => ID }) id: string) {
    const trashedEmail = this.emailsService.trashEmail(id);
    pubSub.publish('trashedEmail', trashedEmail);
    return trashedEmail;
  }
}
