import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersCreateManyUsersProvider } from './providers/users-create-many-users.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateManyUsersProvider,
    FindOneUserByEmailProvider,
    FindOneByGoogleIdProvider,
  ],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule)],
})
export class UsersModule {}
