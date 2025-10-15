import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dto/create-post.dto';
import { PatchPostDto } from './dto/patch-post.dto';

@Controller('posts')
@ApiTags('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId')
  getPosts(@Param('userId') userId: string) {
    return this.postsService.findAll(userId);
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
    return this.postsService.createPost();
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
  updatePost(@Body() patchPostDto: PatchPostDto) {
    console.log(patchPostDto);
  }
}
