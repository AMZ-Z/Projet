import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SaleEntity } from './sale.entity';
import { CreateSaleModel } from './sale.model';

type SalesByBook = { bookId: string; title: string; count: number };
type SalesByClient = { clientId: string; firstName: string; lastName: string; count: number };

@Injectable()
export class SaleRepository {
  constructor(
    @InjectRepository(SaleEntity)
    private readonly repo: Repository<SaleEntity>,
  ) {}

  public async createSale(input: CreateSaleModel) {
    const entity = this.repo.create({
      ...input,
      purchasedAt: new Date(input.purchasedAt),
    });
    return this.repo.save(entity);
  }

  public async listSales(clientId?: string, bookId?: string) {
    const qb = this.repo
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.client', 'c')
      .leftJoinAndSelect('s.book', 'b')
      .select([
        's.id',
        's.purchasedAt',
        'c.id',
        'c.firstName',
        'c.lastName',
        'b.id',
        'b.title',
      ]);

    if (clientId) qb.andWhere('s.client_id = :clientId', { clientId });
    if (bookId) qb.andWhere('s.book_id = :bookId', { bookId });

    return qb.getMany();
  }

  public async getStats(): Promise<{ byBook: SalesByBook[]; byClient: SalesByClient[] }> {
    const byBookRaw = await this.repo
      .createQueryBuilder('s')
      .innerJoin('s.book', 'b')
      .select('s.book_id', 'bookId')
      .addSelect('b.title', 'title')
      .addSelect('COUNT(s.id)', 'count')
      .groupBy('s.book_id')
      .addGroupBy('b.title')
      .orderBy('COUNT(s.id)', 'DESC')
      .getRawMany();

    const byClientRaw = await this.repo
      .createQueryBuilder('s')
      .innerJoin('s.client', 'c')
      .select('s.client_id', 'clientId')
      .addSelect('c.first_name', 'firstName')
      .addSelect('c.last_name', 'lastName')
      .addSelect('COUNT(s.id)', 'count')
      .groupBy('s.client_id')
      .addGroupBy('c.first_name')
      .addGroupBy('c.last_name')
      .orderBy('COUNT(s.id)', 'DESC')
      .getRawMany();

    const byBook: SalesByBook[] = byBookRaw.map((r: any) => ({
      bookId: r.bookId,
      title: r.title,
      count: Number(r.count),
    }));
    const byClient: SalesByClient[] = byClientRaw.map((r: any) => ({
      clientId: r.clientId,
      firstName: r.firstName,
      lastName: r.lastName,
      count: Number(r.count),
    }));

    return { byBook, byClient };
  }
}
