import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}
  async createPost(createPostDto: CreatePostDto) {
    const existingUser = await this.usersService.findOneById(
      createPostDto.userId,
    );

    if (!existingUser) {
      throw new Error('User does not exist');
    }

    const newPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        metaOption: createPostDto.metaOptions
          ? {
              create: createPostDto.metaOptions?.map((option) => ({
                key: option.key,
                value: !option.value,
              })),
            }
          : undefined,
      },
    });

    return newPost;
  }

  async findAll(userId: number) {
    const user = await this.prisma.post.findUnique({
      where: {
        id: userId,
      },
      include: {
        metaOption: true,
        user: true,
      },
    });
    return user;
  }
}
