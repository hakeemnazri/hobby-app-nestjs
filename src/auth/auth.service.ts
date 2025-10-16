import {
  forwardRef,
  HttpCode,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
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

  @HttpCode(HttpStatus.OK)
  async signIn(signInDto: SignInDto) {
    const user = await this.signInProvider.signIn(signInDto);
    return user;
  }

  isAuthenticated() {
    return true;
  }
}
