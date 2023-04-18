import { Module } from '@nestjs/common';
import { EmailsService } from './emails.service';
import { EmailsResolver } from './emails.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Email } from './entities/email.entity';
import { EmailRepository } from './repositories/emails.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Email, EmailRepository])],
  providers: [EmailsResolver, EmailsService],
})
export class EmailsModule {}
