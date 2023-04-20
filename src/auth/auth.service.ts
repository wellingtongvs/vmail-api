import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginAuthInput } from './dto/auth-input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(loginAuthInput: LoginAuthInput) {
    const { email, password } = loginAuthInput;
    const user = await this.usersService.findOneBy({ where: { email: email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return this.login(user);
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id };
    return {
      user,
      accessToken: this.jwtService.signAsync(payload),
    };
  }
}
