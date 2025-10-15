import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';

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
  getPosts(@Param('userId') userId: number) {
    return this.postsService.findPostsById(userId);
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
  createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
    return this.postsService.createPost(createPostDto);
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
