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
        userId: createPostDto.userId,
        title: createPostDto.title,
        content: createPostDto.content,
        postType: createPostDto.postType,
        slug: createPostDto.slug,
        postStatus: createPostDto.status,
        featuredImageUrl: createPostDto.featuredImageUrl,
        publishedOn: createPostDto.publishOn,
        schema: createPostDto.schema,
        tags: createPostDto.tags,
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
  findAll(userId: number) {
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
