import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { GoogleAuthenticationService } from './google-authentication.service';
import { Body, Controller, Post } from '@nestjs/common';

@Auth(AuthType.None)
@Controller('auth')
export class GoogleAuthenticationController {
  constructor(
    /**
     * inject google authentication service
     */
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post('meow')
  async authentication(@Body() googleTokenDto: GoogleTokenDto) {
    const { accessToken, refreshToken } =
      await this.googleAuthenticationService.authentication(googleTokenDto);

    return {
      accessToken,
      refreshToken,
    };
  }
}
