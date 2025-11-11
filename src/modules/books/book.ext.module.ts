import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { BookRepositoryEx } from './book.repository.ex';
import { BookServiceEx } from './book.service.ex';
import { BookControllerEx } from './book.controller.ex';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  providers: [BookRepositoryEx, BookServiceEx],
  controllers: [BookControllerEx],
  exports: [BookServiceEx],
})
export class BookExtModule {}
