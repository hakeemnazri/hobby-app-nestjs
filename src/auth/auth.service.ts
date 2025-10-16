import { RefreshTokenDto } from './dto/refresh-token.dto';
import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { SignInProvider } from './providers/sign-in.provider';
import { RefreshTokensProvider } from './providers/refresh-tokens.provider';

@Injectable()
export class AuthService {
  constructor(
    /**
     * inject SignInProvider
     */
    private readonly signInProvider: SignInProvider,

    /**
     * inject RefreshTokensProvider
     */
    private readonly refreshTokensProvider: RefreshTokensProvider,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.signInProvider.signIn(signInDto);
    return user;
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const { accessToken } =
      await this.refreshTokensProvider.refreshToken(refreshTokenDto);

    return {
      accessToken,
    };
  }

  isAuthenticated() {
    return true;
  }
}
