import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UsersCreateManyUsersProvider } from './providers/users-create-many-users.provider';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersCreateManyUsersProvider],
  exports: [UsersService],
  imports: [forwardRef(() => AuthModule)],
})
export class UsersModule {}
