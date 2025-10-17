import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { UsersService } from 'src/users/users.service';
import { GenerateTokensProviders } from '../providers/generate-tokens.providers';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    /**
     * inject Jwt Config
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**
     * Inject users service
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * Inject generate tokens provider
     */
    private readonly generateTokenProvider: GenerateTokensProviders,
  ) {}
  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  async authentication(googleTokenDto: GoogleTokenDto) {
    const loginTicket = await this.oauthClient.verifyIdToken({
      idToken: googleTokenDto.token,
    });

    if (!loginTicket) {
      throw new UnauthorizedException('Invalid token');
    }

    const payload = loginTicket.getPayload();

    if (!payload || !payload.email) {
      throw new UnauthorizedException('Invalid token payload');
    }

    const {
      email,
      sub: googleId,
      given_name: firstName,
      family_name: lastName,
    } = payload;

    const user = await this.usersService.findOneByGoogleId(googleId);

    if (user) {
      const { accessToken, refreshToken } =
        await this.generateTokenProvider.generateTokens(user);

      return { accessToken, refreshToken };
    }

    console.log(email);
  }
}
