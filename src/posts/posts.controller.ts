import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';
import { GetPostsDto } from './dto/get-posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-users.decorator.decorator';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Get all posts',
  })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response when all records have been successfully retrieved.',
  })
  @Get()
  getAllPosts() {
    return this.postsService.findAllPosts();
  }

  @ApiOperation({
    summary: 'Get posts by ID',
  })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response when all records have been successfully retrieved by id.',
  })
  @Get('/:userId')
  getPosts(@Param('userId') userId: number, @Query() postQuery: GetPostsDto) {
    console.log(postQuery);
    return this.postsService.findPostsById(userId, postQuery);
  }

  @ApiOperation({
    summary: 'Create a new post',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response when The record has been successfully created.',
  })
  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    console.log(user);
    return this.postsService.createPost(createPostDto, user);
  }

  @ApiOperation({
    summary: 'Updates an existing post',
  })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response when The record has been successfully updated.',
  })
  @Patch()
  async updatePost(@Body() patchPostDto: PatchPostDto) {
    return await this.postsService.updatePost(patchPostDto);
  }

  @Delete(':postId')
  async deletePost(@Param('postId') postId: number) {
    return this.postsService.deletePostById(postId);
  }
}
