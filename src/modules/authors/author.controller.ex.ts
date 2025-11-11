import { Controller, Get, Param } from '@nestjs/common';
import { AuthorServiceEx } from './author.service.ex';

@Controller('authors-ext')
export class AuthorControllerEx {
  constructor(private readonly service: AuthorServiceEx) {}

  // List with booksCount
  @Get()
  list() {
    return this.service.listWithBooksCount();
  }

  // Details with averageSales
  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.getDetails(id);
  }
}
