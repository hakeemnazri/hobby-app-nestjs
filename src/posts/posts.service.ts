import { TagsService } from './../tags/tags.service';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly prisma: PrismaService,
  ) {}
  findAllPosts() {
    const posts = this.prisma.post.findMany({
      include: {
        tags: true,
        user: true,
      },
    });
    return posts;
  }

  async createPost(createPostDto: CreatePostDto) {
    const existingUser = await this.usersService.findOneById(
      createPostDto.userId,
    );

    if (!existingUser) {
      throw new Error('User does not exist');
    }

    const existingTags = await this.tagsService.findMultipleTags(
      createPostDto.tags,
    );
    const newPost = await this.prisma.post.create({
      data: {
        ...createPostDto,
        tags: {
          connect: existingTags,
        },
        metaOption: undefined,
      },
      include: {
        tags: true,
        user: true,
      },
    });

    return newPost;
  }

  async findPostsById(userId: number) {
    const user = await this.prisma.post.findMany({
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
