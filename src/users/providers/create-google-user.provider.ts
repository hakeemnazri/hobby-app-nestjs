import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GoogleUser } from '../interfaces/google-user.interface';

@Injectable()
export class CreateGoogleUserProvider {
  constructor(private readonly prisma: PrismaService) {}

  async createGoogleUser(googleUser: GoogleUser) {
    try {
      return await this.prisma.user.create({
        data: googleUser,
      });
    } catch (error) {
      console.error(error);
      throw new ConflictException('User already exists');
    }
  }
}
