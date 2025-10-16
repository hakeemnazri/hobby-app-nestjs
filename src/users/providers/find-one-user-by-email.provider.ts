import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(private readonly prisma: PrismaService) {}

  async findOneUserByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }
  }
}
