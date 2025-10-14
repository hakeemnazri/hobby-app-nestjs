import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  findAll(userId: string) {
    return userId;
  }
}
