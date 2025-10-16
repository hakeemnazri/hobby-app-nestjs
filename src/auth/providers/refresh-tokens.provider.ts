import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { GenerateTokensProviders } from './generate-tokens.providers';
import { UsersService } from 'src/users/users.service';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    /**
     * inject UsersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    /**
     * inject Jwt Config
     */
    private readonly jwtService: JwtService,

    /**
     * Inject prisma service
     */
    private readonly prisma: PrismaService,

    /**
     * Inject generateTokensProvider
     */
    private readonly generateTokenProvider: GenerateTokensProviders,

    /**
     * inject Jwt Config
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync<
        Pick<JwtPayload, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
      });

      const user = await this.usersService.findOneById(sub);

      const { accessToken } =
        await this.generateTokenProvider.generateTokens(user);

      return { accessToken };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
