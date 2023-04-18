import { DataSource, Repository } from 'typeorm';
import { Email } from '../entities/email.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailRepository extends Repository<Email> {
  constructor(private dataSource: DataSource) {
    super(Email, dataSource.createEntityManager());
  }
}
