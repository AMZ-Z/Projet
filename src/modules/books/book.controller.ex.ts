import { Controller, Get, Param } from '@nestjs/common';
import { BookServiceEx } from './book.service.ex';

@Controller('books-ext')
export class BookControllerEx {
  constructor(private readonly service: BookServiceEx) {}

  // List with buyersCount; preserves original /books endpoints
  @Get()
  list() {
    return this.service.listWithBuyersCount();
  }

  // Details with buyers list + count; preserves original /books/:id endpoints
  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.getDetails(id);
  }
}
