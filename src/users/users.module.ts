import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/users.repository';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
