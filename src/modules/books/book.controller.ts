import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BookService } from './book.service';
import type { GetBooksModel, CreateBookModel } from './book.model';

function normalizeQuery(limit?: any, offset?: any, sort?: any): GetBooksModel {
  const lim = Number(limit ?? 20);
  const off = Number(offset ?? 0);
  const s = typeof sort === 'string' ? sort : undefined; // e.g., 'title,ASC'
  return { limit: isNaN(lim) ? 20 : lim, offset: isNaN(off) ? 0 : off, sort: s };
}

@Controller('books')
export class BookController {
  constructor(private readonly service: BookService) {}

  @Get()
  async list(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
    @Query('sort') sort?: string,
  ) {
    const query = normalizeQuery(limit, offset, sort);
    return this.service.listBooks(query);
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.getBookById(id);
  }

  @Post()
  create(@Body() body: CreateBookModel) {
    return this.service.createBook(body);
  }
}
