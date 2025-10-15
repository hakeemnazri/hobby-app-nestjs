import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('tags')
@ApiTags('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new tag',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response when The record has been successfully created.',
  })
  create(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @Get()
  findAll() {
    return this.tagsService.findAll();
  }

  @ApiOperation({
    summary: 'Delete a tag',
  })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response when The record has been successfully deleted.',
  })
  @Delete(':tagId')
  async deleteTagById(@Param('tagId') id: number) {
    return await this.tagsService.deleteTagById(id);
  }
}
