import { Auth } from '../decorators/auth.decorator';
import { AuthType } from '../enums/auth-type.enum';
import { GoogleTokenDto } from './dtos/google-token.dto';
import { GoogleAuthenticationService } from './google-authentication.service';
import { Body, Controller, Post } from '@nestjs/common';

@Auth(AuthType.None)
@Controller('auth/google-authentication')
export class GoogleAuthenticationController {
  constructor(
    /**
     * inject google authentication service
     */
    private readonly googleAuthenticationService: GoogleAuthenticationService,
  ) {}

  @Post()
  authentication(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleAuthenticationService.authentication(googleTokenDto);
  }
}
