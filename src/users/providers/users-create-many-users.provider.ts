import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateManyUsersDto } from '../dto/create-many-users.dto';

@Injectable()
export class UsersCreateManyUsersProvider {
  constructor(private readonly prisma: PrismaService) {}
  async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    try {
      const users = await this.prisma.$transaction(async (tx) => {
        const createdUsers = await tx.user.createMany({
          data: createManyUsersDto.users,
        });

        return createdUsers;
      });

      return users;
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }
  }
}
