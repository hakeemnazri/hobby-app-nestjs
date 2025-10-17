import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    /**
     * inject prisma service
     */
    private readonly prisma: PrismaService,
  ) {}
  async findOneByGoogleId(googleId: string) {
    return await this.prisma.user.findUnique({
      where: {
        googleId,
      },
    });
  }
}
