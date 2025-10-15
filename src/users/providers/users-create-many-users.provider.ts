import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersCreateManyUsersProvider {
  constructor(private readonly prisma: PrismaService) {}
  async createManyUsers(createUsersDto: CreateUserDto[]) {
    try {
      const users = await this.prisma.$transaction(async (tx) => {
        const createdUsers = await tx.user.createMany({
          data: createUsersDto,
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
