export type Paginated<T> = {
  data: T[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
  links: {
    first: string;
    previous: string | null;
    current: string;
    next: string | null;
    last: string;
  };
};
