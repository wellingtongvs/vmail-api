import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsResolver } from './emails.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { EmailRepository } from './repositories/emails.repository';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/repositories/users.repository';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Email, EmailRepository]),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  providers: [EmailsResolver, EmailsService, UsersService],
})
export class EmailsModule {}
