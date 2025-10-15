import {
  IsArray,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { postStatus } from '../enums/status.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dto/create-meta-options-dto.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    description: 'User ID',
    example: 1,
  })
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @ApiProperty({
    example: 'This is a title',
    description: 'Post title',
  })
  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: postType,
    description: "Possible values, 'post', 'page', 'story', 'series'",
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: 'For example- my-url',
    example: 'my-post-schema',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/[a-z0-9]+/g, {
    message: 'Slug must be a combination of letters and numbers',
  })
  slug: string;

  @ApiProperty({
    enum: postStatus,
    description: "Possible values, 'draft', 'published', 'review', 'scheduled'",
    example: 'published',
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  postStatus: postStatus;

  @ApiPropertyOptional({
    description: 'Post content',
    example: 'Post content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: "Post's schema",
    example: '{"type": "object"}',
  })
  @IsString()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image url',
    example: 'https://example.com/image.jpg',
  })
  @IsString()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: "Post's publish date",
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsISO8601()
  @IsOptional()
  publishedOn?: Date;

  @ApiPropertyOptional({
    description: 'Post tags',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags: number[];

  @ApiPropertyOptional({
    type: 'array',
    required: false,
    items: {
      type: 'object',
      properties: {
        key: {
          type: 'string',
          description: 'Meta key',
          example: 'author',
        },
        value: {
          type: 'any',
          description: 'Any value you want to store',
          example: true,
        },
      },
    },
  })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOption?: CreatePostMetaOptionsDto[];
}
