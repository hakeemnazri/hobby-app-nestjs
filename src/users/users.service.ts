import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersParamDto } from './dto/get-users-param.dto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'This action adds a new user';
  }

  getUsers() {
    return `This action returns all users`;
  }

  findAll(getUsersParamDto: GetUsersParamDto, limit: number, page: number) {
    console.log(getUsersParamDto);
    console.log(limit);
    console.log(page);
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
