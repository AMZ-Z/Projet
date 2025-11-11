import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrder, Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';
import type { BookModel, CreateBookModel, FilterBooksModel, UpdateBookModel } from './book.model';

function makeOrder(sort?: string): FindOptionsOrder<BookEntity> | undefined {
  if (!sort) return undefined;
  const [fieldRaw, dirRaw] = sort.split(',');
  const field = (fieldRaw ?? '').trim();
  const dir = (dirRaw ?? 'ASC').trim().toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  if (!field) return undefined;
  return { [field]: dir } as FindOptionsOrder<BookEntity>;
}

function mapEntity(b: any): BookModel {
  return {
    id: b.id,
    title: b.title,
    authorId: b.author?.id ?? b.authorId,
    yearPublished: b.yearPublished ?? b.year_published,
    photoUrl: b.photoUrl ?? b.photo_url,
  };
}

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly repo: Repository<BookEntity>,
  ) {}

  /** Compatibility with existing service expecting getAllBooks(FilterBooksModel) */
  public async getAllBooks(input: FilterBooksModel): Promise<BookModel[]> {
    return this.listBooks(input);
  }

  /** New internal implementation with sorting/pagination */
  public async listBooks(input: FilterBooksModel): Promise<BookModel[]> {
    const items = await this.repo.find({
      relations: ['author'],
      take: input.limit,
      skip: input.offset,
      order: makeOrder(input.sort),
    });
    return items.map(mapEntity);
  }

  public async getBookById(id: string): Promise<BookModel | undefined> {
    const b = await this.repo.findOne({ where: { id: id as any }, relations: ['author'] });
    return b ? mapEntity(b) : undefined;
  }

  public async createBook(book: CreateBookModel): Promise<BookModel> {
    const entity = this.repo.create({
      title: book.title,
      yearPublished: book.yearPublished as any,
      photoUrl: book.photoUrl,
      author: { id: book.authorId } as any,
    });
    const saved = await this.repo.save(entity);
    return mapEntity(saved);
  }

  public async updateBook(id: string, input: UpdateBookModel): Promise<BookModel> {
    const partial: any = {
      ...(input.title ? { title: input.title } : {}),
      ...(typeof input.yearPublished === 'number' ? { yearPublished: input.yearPublished } : {}),
      ...(input.photoUrl ? { photoUrl: input.photoUrl } : {}),
      ...(input.authorId ? { author: { id: input.authorId } } : {}),
    };
    await this.repo.update({ id: id as any }, partial);
    const updated = await this.repo.findOne({ where: { id: id as any }, relations: ['author'] });
    if (!updated) throw new Error('Book not found');
    return mapEntity(updated);
  }

  /** Compatibility with existing service */
  public async deleteBook(id: string): Promise<void> {
    await this.repo.delete({ id: id as any });
  }
}
