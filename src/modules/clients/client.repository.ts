import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ClientEntity } from './client.entity';
import { ClientDetailsModel, ClientModel, CreateClientModel, UpdateClientModel } from './client.model';

@Injectable()
export class ClientRepository {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly repo: Repository<ClientEntity>,
    private readonly dataSource: DataSource,
  ) {}

  public async listClientsWithCounts(): Promise<ClientModel[]> {
    const rows = await this.dataSource
      .createQueryBuilder()
      .select('c.id', 'id')
      .addSelect('c.first_name', 'firstName')
      .addSelect('c.last_name', 'lastName')
      .addSelect('c.email', 'email')
      .addSelect('c.photo_url', 'photoUrl')
      .addSelect('COUNT(s.id)', 'purchasesCount')
      .from('clients', 'c')
      .leftJoin('sales', 's', 's.client_id = c.id')
      .groupBy('c.id')
      .getRawMany();

    // normalize types
    return rows.map(r => ({
      id: r.id,
      firstName: r.firstName,
      lastName: r.lastName,
      email: r.email ?? undefined,
      photoUrl: r.photoUrl ?? undefined,
      purchasesCount: Number(r.purchasesCount ?? 0),
    }));
  }

  public async getClientDetails(id: string): Promise<ClientDetailsModel | null> {
    const client = await this.repo.findOne({ where: { id } });
    if (!client) return null;

    const purchases = await this.dataSource
      .createQueryBuilder()
      .select('s.id', 'saleId')
      .addSelect('b.id', 'bookId')
      .addSelect('b.title', 'bookTitle')
      .addSelect('a.id', 'authorId')
      .addSelect('a.first_name', 'authorFirstName')
      .addSelect('a.last_name', 'authorLastName')
      .addSelect('s.purchased_at', 'purchasedAt')
      .from('sales', 's')
      .innerJoin('books', 'b', 'b.id = s.book_id')
      .innerJoin('authors', 'a', 'a.id = b.author_id')
      .where('s.client_id = :id', { id })
      .orderBy('s.purchased_at', 'DESC')
      .getRawMany();

    return {
      client,
      purchases: purchases.map(p => ({
        ...p,
        purchasedAt: new Date(p.purchasedAt).toISOString(),
      })),
    };
  }

  public async createClient(input: CreateClientModel): Promise<ClientModel> {
    return this.repo.save(this.repo.create(input));
  }

  public async updateClient(id: string, input: UpdateClientModel): Promise<ClientModel> {
    await this.repo.update({ id }, input);
    const updated = await this.repo.findOne({ where: { id } });
    if (!updated) throw new Error('Client not found');
    return updated;
  }

  public async deleteClient(id: string): Promise<void> {
    await this.repo.delete({ id });
  }
}
