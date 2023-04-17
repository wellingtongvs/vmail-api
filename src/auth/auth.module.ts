import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './auth.local';
import { AuthResolver } from './auth.resolver';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  providers: [AuthService, AuthResolver, LocalStrategy, UsersService],
})
export class AuthModule {}
