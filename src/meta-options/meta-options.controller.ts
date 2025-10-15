import { Controller, Get, Post, Body } from '@nestjs/common';
import { MetaOptionsService } from './meta-options.service';
import { CreatePostMetaOptionsDto } from './dto/create-meta-options-dto.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Post()
  create(@Body() createMetaOptionDto: CreatePostMetaOptionsDto) {
    return this.metaOptionsService.create(createMetaOptionDto);
  }

  @Get()
  findAll() {
    return this.metaOptionsService.findAll();
  }
}
