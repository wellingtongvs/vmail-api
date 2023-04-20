import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import { UsersService } from 'src/users/users.service';
import { UserRepository } from 'src/users/repositories/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        };
      },
    }),
    TypeOrmModule.forFeature([User, UserRepository]),
  ],
  providers: [AuthService, AuthResolver, UsersService, JwtStrategy],
})
export class AuthModule {}
