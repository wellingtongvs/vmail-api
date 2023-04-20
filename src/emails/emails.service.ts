import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmailInput } from './dto/create-email.input';
import { UpdateEmailInput } from './dto/update-email.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import { FindAllEmailsInput } from './dto/find-all-emails.input';
import { FindAllEmailsOutput } from './dto/find-all-emails.output';
import { PubSub } from 'graphql-subscriptions';
import { UsersService } from 'src/users/users.service';

const pubSub = new PubSub();

@Injectable()
export class EmailsService {
  constructor(
    @InjectRepository(Email)
    private readonly emailRepository: Repository<Email>,
    private readonly usersService: UsersService,
  ) {}

  async create(createEmailInput: CreateEmailInput) {
    const user = await this.usersService.findOneBy({
      where: { email: createEmailInput.sender },
    });

    const email = new Email();
    email.sender = createEmailInput.sender;
    email.isDraft = true;
    email.isSent = false;
    email.isTrash = false;
    email.createdAt = Math.floor(Date.now() / 1000);
    email.copyOwnerId = user.id;
    return this.emailRepository.save(email);
  }

  async findAll(filters: FindAllEmailsInput) {
    const conditions: any = {};

    if (filters.sender) {
      conditions.sender = filters.sender;
    }

    if (filters.recipient) {
      conditions.recipient = filters.recipient;
    }

    if (filters.isDraft != undefined) {
      conditions.isDraft = filters.isDraft;
    }

    if (filters.isTrash != undefined) {
      conditions.isTrash = filters.isTrash;
    }

    if (filters.isSent != undefined) {
      conditions.isSent = filters.isSent;
    }

    const first = filters.first || 50;
    if (filters.after) {
      conditions.id = { $gt: filters.after };
    }
    const queryResult = await this.emailRepository.find({
      where: conditions,
      take: first + 1,
    });

    const hasMore = queryResult.length > first;
    const emails = hasMore ? queryResult.slice(0, -1) : queryResult;

    const paginatedEmails = new FindAllEmailsOutput();
    paginatedEmails.emails = emails;
    paginatedEmails.hasMore = hasMore;
    return paginatedEmails;
  }

  async findOne(id: string) {
    const email = await this.emailRepository.findOne({ where: { id: id } });
    return email;
  }

  async sendEmail(id: string) {
    const email = await this.findOne(id);

    if (!email) {
      throw new NotFoundException(`Email with ID ${id} not found`);
    }

    email.isDraft = false;
    email.isSent = true;
    email.sentAt = Math.floor(Date.now() / 1000);
    const sentEmail = await this.emailRepository.save(email);

    if (email.recipient != email.sender) {
      const recipient = await this.usersService.findOneBy({
        where: { email: email.recipient },
      });

      email.copyOwnerId = recipient.id;
      await this.emailRepository.save(email);
    }

    pubSub.publish('emailSent', sentEmail);
    return sentEmail;
  }

  async update(id: string, updateEmailInput: UpdateEmailInput) {
    let email = await this.findOne(id);

    if (!email) {
      email = await this.create(<CreateEmailInput>{
        sender: updateEmailInput.sender,
      });
    }

    email.recipient = updateEmailInput.recipient;
    email.subject = updateEmailInput.subject;
    email.body = updateEmailInput.body;

    const updatedEmail = await this.emailRepository.save(email);

    if (!id) {
      pubSub.publish('emailDraftAdded', email);
    }

    return updatedEmail;
  }

  async deleteEmail(id: string) {
    const email = await this.findOne(id);

    if (!email) {
      throw new NotFoundException(`Email with ID ${id} not found`);
    }

    const result = await this.emailRepository.delete(id);

    return result;
  }

  async trashEmail(id: string) {
    const email = await this.findOne(id);

    if (!email) {
      throw new NotFoundException(`Email with ID ${id} not found`);
    }

    email.isTrash = true;
    const result = await this.emailRepository.save(email);
    pubSub.publish('trashedEmail', email);

    return result;
  }
}
