import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from '../dto/sign-in.dto';
import { HashingProvider } from './hashing.provider';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { GenerateTokensProviders } from './generate-tokens.providers';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * inject UsersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * inject HashingProvider
     */
    private readonly hashingProvider: HashingProvider,

    /**
     * inject generateTokensProvider
     */
    private readonly generateTokenProvider: GenerateTokensProviders,
    /**
     * inject Jwt Config
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.usersService.findOneByEmail(signInDto.email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isEqual = await this.hashingProvider.comparePassword(
      signInDto.password,
      user.password,
    );

    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials');
    }
    /**
     * send JWT in cookies
     */

    const { accessToken, refreshToken } =
      await this.generateTokenProvider.generateTokens(user);

    return {
      accessToken,
      refreshToken,
    };
  }
}
