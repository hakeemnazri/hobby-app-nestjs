import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  createPost() {
    return 'This action adds a new post';
  }
  constructor(private readonly usersService: UsersService) {}
  findAll(userId: string) {
    const user = this.usersService.findOneById(userId);
    return [
      {
        user: user,
        title: 'Post 1',
        content: 'Post 1 content',
      },
    ];
  }
}
