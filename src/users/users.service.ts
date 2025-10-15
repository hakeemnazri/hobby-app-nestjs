import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersParamDto } from './dto/get-users-param.dto';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'nestjs-prisma';
import { UsersCreateManyUsersProvider } from './providers/users-create-many-users.provider';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    private readonly prisma: PrismaService,

    private readonly usersCreateManyUsersProvider: UsersCreateManyUsersProvider,
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
    throw new HttpException(
      {
        statusCode: HttpStatus.NOT_IMPLEMENTED,
        error: 'Not implemented',
        message: 'Not implemented',
      },
      HttpStatus.NOT_IMPLEMENTED,
      {
        description: 'Occured because not implemented',
        cause: new Error(),
      },
    );
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

  async createManyUsers(createUsersDto: CreateUserDto[]) {
    return await this.usersCreateManyUsersProvider.createManyUsers(
      createUsersDto,
    );
  }
}
