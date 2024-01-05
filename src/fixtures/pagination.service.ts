import { Injectable } from '@nestjs/common';
import {
  DEFAULT_START_PAGE,
  PAGE_KEY,
  PAGE_SIZE,
} from './constant/default-variable';

@Injectable()
export class PaginationService {
  buildPaginationLinks(
    root: string,
    params: Record<string, any>,
    page: number,
    size: number,
    total: number,
  ): Record<string, string> {
    page = Math.max(DEFAULT_START_PAGE, page);
    size = Math.max(1, size);

    const offset = (page - DEFAULT_START_PAGE) * size;
    const pages = Math.ceil(total / size);

    const createLink = (pageNumber: number) => {
      const url = new URL(root);
      Object.entries(params).forEach(([k, v]) =>
        url.searchParams.set(k, v.toString()),
      );
      url.searchParams.set(PAGE_SIZE, size.toString());
      url.searchParams.set(PAGE_KEY, pageNumber.toString());
      return url.toString();
    };

    const links: Record<string, string> = { self: createLink(page) };

    if (page > DEFAULT_START_PAGE) {
      links['first'] = createLink(DEFAULT_START_PAGE);
      links['prev'] = createLink(page - 1);
    }

    if (total > offset) {
      links['next'] = createLink(page + 1);
    }

    if (pages > page) {
      links['last'] = createLink(pages);
    }

    return links;
  }
}
