import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;

  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  >;
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // get authTypes keys
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AthenticationGuard.defaultAuthType];

    //array of guards CanActivate method
    const guards = authTypes
      .map((authType) => this.authTypeGuardMap[authType])
      .flat();

    //Loop guards canActivate method
    for (const guard of guards) {
      try {
        const canActivate = await guard.canActivate(context);

        if (!canActivate) {
          throw new UnauthorizedException('Unauthorized');
        }
      } catch (error) {
        console.error(error);
        throw new UnauthorizedException('Invalid authentication type');
      }
    }
    return true;
  }
}
