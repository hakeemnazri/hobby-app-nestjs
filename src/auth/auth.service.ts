import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/sign-in.dto';
import { SignInProvider } from './providers/sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    private readonly signInProvider: SignInProvider,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.signInProvider.signIn(signInDto);
    return user;
  }
  login(email: string, password: string) {
    const user = this.usersService.findOneById(1234);

    return {
      user: user,
      email: email,
      password: password,
    };
  }

  isAuthenticated() {
    return true;
  }
}
