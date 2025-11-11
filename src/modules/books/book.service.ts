import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import type { BookModel, CreateBookModel, FilterBooksModel, UpdateBookModel } from './book.model';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  /** Old signature used by existing controller/service in your codebase */
  public async getAllBooks(input: FilterBooksModel): Promise<BookModel[]> {
    return this.bookRepository.getAllBooks(input);
  }

  /** New helper to satisfy updated controller (listBooks) */
  public async listBooks(input: FilterBooksModel): Promise<BookModel[]> {
    return this.bookRepository.getAllBooks(input);
  }

  public async getBookById(id: string): Promise<BookModel | undefined> {
    return this.bookRepository.getBookById(id);
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    return this.bookRepository.createBook(book);
  }

  public async updateBook(id: string, input: UpdateBookModel): Promise<BookModel> {
    return this.bookRepository.updateBook(id, input);
  }

  public async removeBook(id: string): Promise<void> {
    return this.bookRepository.deleteBook(id);
  }
}
