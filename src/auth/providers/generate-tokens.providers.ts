import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { User } from '@prisma/client';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokensProviders {
  constructor(
    /**
     * inject Jwt Config
     */
    private readonly jwtService: JwtService,
    /**
     * inject Jwt Config
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        secret: this.jwtConfiguration.secret,
        audience: this.jwtConfiguration.audience,
        issuer: this.jwtConfiguration.issuer,
        expiresIn,
      },
    );
  }

  async generateTokens(user: User) {
    //generate Access token

    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
        },
      ),
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.refreshTokenTtl,
        {
          email: user.email,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
