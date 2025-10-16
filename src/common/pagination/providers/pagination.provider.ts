import { Inject, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PaginationQueryDto } from '../dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import type { Request } from 'express';
import { Paginated } from '../interfaces/paginated.interface';

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
  constructor(
    private readonly prisma: PrismaClient,
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  public async paginateQuery<T>(
    paginationQuery: PaginationQueryDto,
    model: PrismaModel,
    options?: {
      where?: any;
      include?: any;
      orderBy?: any;
      select?: any;
    },
  ): Promise<Paginated<T>> {
    const page = paginationQuery.page ?? 1;
    const limit = paginationQuery.limit ?? 10;
    const skip = (page - 1) * limit;

    const prismaModel = this.prisma[model] as PrismaModelDelegate;

    const [data, total] = await Promise.all([
      prismaModel.findMany({
        ...options,
        skip,
        take: limit,
      }),
      prismaModel.count({
        ...options,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPreviousPage = page > 1;

    /**
     * Getting the base url
     */

    const baseURL =
      this.request.protocol + '://' + this.request.headers.host + '/';

    const newUrl = new URL(this.request.url, baseURL);

    /**
     * Creating the final response
     */

    const finalResponse: Paginated<T> = {
      data: data as T[],
      meta: {
        itemsPerPage: limit,
        totalItems: total,
        currentPage: page,
        totalPages,
        hasNextPage,
        hasPreviousPage,
      },
      links: {
        first: newUrl.origin + newUrl.pathname + '?page=1&limit=' + limit,
        previous:
          newUrl.origin +
          newUrl.pathname +
          '?page=' +
          (page - 1) +
          '&limit=' +
          limit,
        current:
          newUrl.origin + newUrl.pathname + '?page=' + page + '&limit=' + limit,
        next:
          newUrl.origin +
          newUrl.pathname +
          '?page=' +
          (page + 1) +
          '&limit=' +
          limit,
        last:
          newUrl.origin +
          newUrl.pathname +
          '?page=' +
          totalPages +
          '&limit=' +
          limit,
      },
    };

    return finalResponse;
  }
}
