import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class AuthorRepositoryEx {
  constructor(private readonly dataSource: DataSource) {}

  public async listWithBooksCount() {
    const rows = await this.dataSource
      .createQueryBuilder()
      .select('a.id', 'id')
      .addSelect('a.first_name', 'firstName')
      .addSelect('a.last_name', 'lastName')
      .addSelect('a.photo_url', 'photoUrl')
      .addSelect('COUNT(b.id)', 'booksCount')
      .from('authors', 'a')
      .leftJoin('books', 'b', 'b.author_id = a.id')
      .groupBy('a.id')
      .getRawMany();

    return rows.map(r => ({
      id: r.id,
      firstName: r.firstName,
      lastName: r.lastName,
      photoUrl: r.photoUrl ?? undefined,
      booksCount: Number(r.booksCount ?? 0),
    }));
  }

  public async getDetails(authorId: string) {
    const basic = await this.dataSource
      .createQueryBuilder()
      .select('a.id', 'id')
      .addSelect('a.first_name', 'firstName')
      .addSelect('a.last_name', 'lastName')
      .addSelect('a.photo_url', 'photoUrl')
      .from('authors', 'a')
      .where('a.id = :authorId', { authorId })
      .getRawOne();

    if (!basic) return null;

    const booksCountRow = await this.dataSource
      .createQueryBuilder()
      .select('COUNT(b.id)', 'booksCount')
      .from('books', 'b')
      .where('b.author_id = :authorId', { authorId })
      .getRawOne();

    // average sales per book (0 if author has no books)
    const perBook = await this.dataSource
      .createQueryBuilder()
      .select('b.id', 'bookId')
      .addSelect('COUNT(s.id)', 'salesCount')
      .from('books', 'b')
      .leftJoin('sales', 's', 's.book_id = b.id')
      .where('b.author_id = :authorId', { authorId })
      .groupBy('b.id')
      .getRawMany();

    const nums = perBook.map(r => Number(r.salesCount));
    const averageSales = nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;

    return {
      id: basic.id,
      firstName: basic.firstName,
      lastName: basic.lastName,
      photoUrl: basic.photoUrl ?? undefined,
      booksCount: Number(booksCountRow.booksCount ?? 0),
      averageSales: Number(averageSales.toFixed(2)),
    };
  }
}
