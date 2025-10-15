import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from './dto/create-meta-options-dto.dto';

@Injectable()
export class MetaOptionsService {
  create(createMetaOptionDto: CreatePostMetaOptionsDto) {
    console.log(createMetaOptionDto);
    return 'This action adds a new metaOption';
  }

  findAll() {
    return `This action returns all metaOptions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} metaOption`;
  }
}
