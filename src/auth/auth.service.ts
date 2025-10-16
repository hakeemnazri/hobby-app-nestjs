import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignInProvider } from './providers/sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    /**
     * inject SignInProvider
     */
    private readonly signInProvider: SignInProvider,
  ) {}

  @HttpCode(HttpStatus.OK)
  async signIn(signInDto: SignInDto) {
    const user = await this.signInProvider.signIn(signInDto);
    return user;
  }

  isAuthenticated() {
    return true;
  }
}
