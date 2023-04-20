import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthResponse } from './entities/auth.entity';
import { LoginAuthInput } from './dto/auth-input';
import { IsPublicRoute } from './decorators/is-public-route.decorator';

@IsPublicRoute()
@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  createAuth(@Args('loginAuthInput') loginAuthInput: LoginAuthInput) {
    return this.authService.validateUser(loginAuthInput);
  }
}
