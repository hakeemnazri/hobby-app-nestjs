import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

type PrismaModelDelegate = {
  findMany: (args?: any) => Promise<any[]>;
  count: (args?: any) => Promise<number>;
};

type PrismaModel = {
  [K in keyof PrismaClient]: PrismaClient[K] extends PrismaModelDelegate
    ? K
    : never;
}[keyof PrismaClient];

@Injectable()
export class PaginationProvider {
  constructor(private readonly prisma: PrismaClient) {}

  public async paginateQuery<T>(
    paginationQuery: PaginationQueryDto,
    model: PrismaModel,
    options?: {
      where?: any;
      include?: any;
      orderBy?: any;
      select?: any;
    },
  ): Promise<T[]> {
    const page = paginationQuery.page ?? 1;
    const limit = paginationQuery.limit ?? 10;
    const skip = (page - 1) * limit;

    const prismaModel = this.prisma[model] as PrismaModelDelegate;

    const data = await prismaModel.findMany({
      ...options,
      skip,
      take: limit,
    });

    return data as T[];
  }
}
