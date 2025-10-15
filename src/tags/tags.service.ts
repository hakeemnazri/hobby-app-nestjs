import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TagsService {
  constructor(private readonly prisma: PrismaService) {}
  async createTag(createTagDto: CreateTagDto) {
    const newTag = await this.prisma.tag.create({
      data: {
        ...createTagDto,
      },
    });

    return newTag;
  }

  async findMultipleTags(tags: number[]) {
    const existingTags = await this.prisma.tag.findMany({
      where: {
        id: {
          in: tags,
        },
      },
    });

    return existingTags;
  }

  findAll() {
    return `This action returns all tags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }
}
