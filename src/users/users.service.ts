import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersParamDto } from './dto/get-users-param.dto';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'nestjs-prisma';
import { UsersCreateManyUsersProvider } from './providers/users-create-many-users.provider';
import { CreateManyUsersDto } from './dto/create-many-users.dto';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    private readonly prisma: PrismaService,

    private readonly usersCreateManyUsersProvider: UsersCreateManyUsersProvider,

    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,

    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      if (existingUser) {
        throw new BadRequestException('User already exists');
      }

      const newUswer = await this.prisma.user.create({
        data: {
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        },
      });

      return newUswer;
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }
  }

  getUsers() {
    return `This action returns all users`;
  }

  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    console.log(getUsersParamDto, limit, page);
    return limit;
  }

  async findOneById(id: number) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        throw new BadRequestException('User does not exist');
      }

      return user;
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }
  }

  async createManyUsers(createManyUsersDto: CreateManyUsersDto) {
    return await this.usersCreateManyUsersProvider.createManyUsers(
      createManyUsersDto,
    );
  }

  async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneUserByEmail(email);
  }

  async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }
}
