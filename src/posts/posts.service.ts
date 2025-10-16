import { TagsService } from './../tags/tags.service';
import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Post } from '@prisma/client';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly prisma: PrismaService,
    private readonly paginationProvider: PaginationProvider,
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

  async createPost(createPostDto: CreatePostDto, user: ActiveUserData) {
    const existingUser = await this.usersService.findOneById(user.sub);

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

  async findPostsById(
    userId: number,
    postQuery: GetPostsDto,
  ): Promise<Paginated<Post>> {
    const posts = await this.paginationProvider.paginateQuery<Post>(
      postQuery,
      'post',
      {
        where: {
          userId,
        },
      },
    );
    return posts;
  }

  async updatePost(patchPostDto: PatchPostDto) {
    try {
      const existingTags = await this.tagsService.findMultipleTags(
        patchPostDto.tags ?? [],
      );

      const existingPost = await this.prisma.post.findUnique({
        where: {
          id: patchPostDto.id,
        },
      });

      if (!existingPost) {
        throw new BadRequestException('Post does not exist');
      }
      const updatedPost = await this.prisma.post.update({
        where: {
          id: patchPostDto.id,
        },
        data: {
          content: patchPostDto.content,
          title: patchPostDto.title,
          postType: patchPostDto.postType,
          featuredImageUrl: patchPostDto.featuredImageUrl,
          postStatus: patchPostDto.postStatus,
          slug: patchPostDto.slug,
          publishedOn: patchPostDto.publishedOn,
          tags: {
            connect: existingTags,
          },
        },
        include: {
          tags: true,
        },
      });

      return updatedPost;
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }
  }

  async deletePostById(id: number) {
    try {
      await this.prisma.post.delete({
        where: {
          id,
        },
      });

      return { deleted: true, id };
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException('Unable to process request', {
        description: 'Error connecting to the database',
      });
    }
  }
}
