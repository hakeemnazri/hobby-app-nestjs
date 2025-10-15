import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Min(10)
  limit?: number = 11;

  @IsOptional()
  @IsPositive()
  @Min(1)
  page: number = 2;
}
