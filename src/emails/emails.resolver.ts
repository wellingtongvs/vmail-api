import {
  Resolver,
  Query,
  Mutation,
  Args,
  ID,
  Subscription,
} from '@nestjs/graphql';
import { EmailsService } from './emails.service';
import { Email } from './entities/email.entity';
import { CreateEmailInput } from './dto/create-email.input';
import { UpdateEmailInput } from './dto/update-email.input';
import { PubSub } from 'graphql-subscriptions';
import { SubscriptionOutput } from './dto/subscription-draft-added.output';
import { FindAllEmailsInput } from './dto/find-all-emails.input';
import { FindAllEmailsOutput } from './dto/find-all-emails.output';
import { IsPublicRoute } from 'src/auth/decorators/is-public-route.decorator';

const pubSub = new PubSub();

@Resolver(() => Email)
export class EmailsResolver {
  constructor(private readonly emailsService: EmailsService) {}

  @Mutation(() => Email)
  async createEmail(@Args('input') createEmailInput: CreateEmailInput) {
    return this.emailsService.create(createEmailInput);
  }

  @Mutation(() => Email)
  async sendEmail(@Args('id', { type: () => ID }) id: string) {
    return this.emailsService.sendEmail(id);
  }

  @Mutation(() => Email)
  async updateEmail(
    @Args('updateEmailInput') updateEmailInput: UpdateEmailInput,
  ) {
    return this.emailsService.update(updateEmailInput.id, updateEmailInput);
  }

  @IsPublicRoute()
  @Query(() => [Email], { name: 'emails' })
  async findAll(@Args('filters') filters: FindAllEmailsInput) {
    const paginatedEmails = await this.emailsService.findAll(filters);
    return paginatedEmails.emails;
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
    return this.emailsService.trashEmail(id);
  }

  @Subscription(() => SubscriptionOutput, {
    resolve: (payload) => payload,
  })
  @Subscription(() => Email)
  async emailSent() {
    return pubSub.asyncIterator('emailSent');
  }

  @Subscription(() => SubscriptionOutput, {
    resolve: (payload) => payload,
  })
  @Subscription(() => Email)
  async emailTrashed() {
    return pubSub.asyncIterator('emailTrashed');
  }

  @Subscription(() => SubscriptionOutput, {
    resolve: (payload) => payload,
  })
  emailDraftAdded() {
    return pubSub.asyncIterator('emailDraftAdded');
  }
}
