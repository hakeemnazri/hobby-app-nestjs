import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  login(email: string, password: string) {
    const user = this.usersService.findOneById('1234');

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
