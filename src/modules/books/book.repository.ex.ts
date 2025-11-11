import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { BookEntity } from './entities/book.entity';

@Injectable()
export class BookRepositoryEx {
  constructor(
    @InjectRepository(BookEntity) private readonly repo: Repository<BookEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async listWithBuyersCount() {
    const rows = await this.dataSource
      .createQueryBuilder()
      .select('b.id', 'id')
      .addSelect('b.title', 'title')
      .addSelect('b.year_published', 'yearPublished')
      .addSelect('b.photo_url', 'photoUrl')
      .addSelect('a.id', 'authorId')
      .addSelect('a.first_name', 'authorFirstName')
      .addSelect('a.last_name', 'authorLastName')
      .addSelect('COUNT(s.id)', 'buyersCount')
      .from('books', 'b')
      .innerJoin('authors', 'a', 'a.id = b.author_id')
      .leftJoin('sales', 's', 's.book_id = b.id')
      .groupBy('b.id')
      .getRawMany();

    return rows.map(r => ({
      ...r,
      buyersCount: Number(r.buyersCount ?? 0),
      yearPublished: Number(r.yearPublished),
    }));
  }

  public async getDetails(bookId: string) {
    const book = await this.dataSource
      .createQueryBuilder()
      .select('b.id', 'id')
      .addSelect('b.title', 'title')
      .addSelect('b.year_published', 'yearPublished')
      .addSelect('b.photo_url', 'photoUrl')
      .addSelect('a.id', 'authorId')
      .addSelect('a.first_name', 'authorFirstName')
      .addSelect('a.last_name', 'authorLastName')
      .from('books', 'b')
      .innerJoin('authors', 'a', 'a.id = b.author_id')
      .where('b.id = :bookId', { bookId })
      .getRawOne();

    if (!book) return null;

    const buyers = await this.dataSource
      .createQueryBuilder()
      .select('c.id', 'clientId')
      .addSelect('c.first_name', 'firstName')
      .addSelect('c.last_name', 'lastName')
      .from('sales', 's')
      .innerJoin('clients', 'c', 'c.id = s.client_id')
      .where('s.book_id = :bookId', { bookId })
      .orderBy('c.last_name', 'ASC')
      .getRawMany();

    return {
      id: book.id,
      title: book.title,
      yearPublished: Number(book.yearPublished),
      photoUrl: book.photoUrl ?? undefined,
      author: {
        id: book.authorId,
        firstName: book.authorFirstName,
        lastName: book.authorLastName,
      },
      buyers,
      buyersCount: buyers.length,
    };
  }
}
