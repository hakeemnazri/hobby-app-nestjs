import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateTagDto {
  @ApiProperty({
    description: 'Name of the tag',
    example: 'my tag',
  })
  @IsNotEmpty()
  @MinLength(3)
  @IsString()
  name: string;

  @ApiProperty({
    description: 'For example- my-url',
    example: 'my-post-schema',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/[a-z0-9]+/g, {
    message: 'Slug must be a combination of letters and numbers',
  })
  @MaxLength(256)
  slug: string;

  @ApiPropertyOptional({
    description: 'Description of the tag',
    example: 'This is a description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'scehma of a tag',
    example:
      '{ "type": "object", "properties": { "name": { "type": "string" } } }',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image of a tag',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  @IsOptional()
  @MaxLength(1024)
  featuredImageUrl?: string;
}
