import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { AuthorModule } from './modules/authors/author.module';
import { BookModule } from './modules/books/book.module';
import { ClientModule } from './modules/clients/client.module';
import { SaleModule } from './modules/sales/sale.module';

// New extended modules providing aggregated endpoints
import { BookExtModule } from './modules/books/book.ext.module';
import { AuthorExtModule } from './modules/authors/author.ext.module';
imports: [DatabaseModule, AuthorModule, BookModule, ClientModule, SaleModule]


@Module({
  imports: [
    DatabaseModule,
    AuthorModule,
    BookModule,
    ClientModule,
    SaleModule,
    // extended endpoints (counts/aggregates)
    BookExtModule,
    AuthorExtModule,
  ],
})
export class AppModule {}
