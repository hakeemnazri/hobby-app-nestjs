import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersParamDto } from './dto/get-users-param.dto';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,

    private readonly prisma: PrismaService,
  ) {}
  async createUser(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new Error('User already exists');
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
  }

  getUsers() {
    return `This action returns all users`;
  }

  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    console.log(getUsersParamDto);
    console.log(limit);
    console.log(page);
    const isAuth = this.authService.isAuthenticated();
    console.log(isAuth);
    return [
      {
        name: 'John Doe',
        email: 'johnDoe@example.com',
      },
      {
        name: 'Jane Doe',
        email: 'janeDoe@example.com',
      },
    ];
  }

  findOneById(id: string) {
    return {
      id: id,
      name: 'John Doe',
      email: 'johnDoe@example.com',
    };
  }
}
