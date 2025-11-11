import { Injectable } from '@nestjs/common';
import { SaleRepository } from './sale.repository';
import { CreateSaleModel } from './sale.model';

@Injectable()
export class SaleService {
  constructor(private readonly repo: SaleRepository) {}

  public async createSale(input: CreateSaleModel) {
    return this.repo.createSale(input);
  }

  public async listSales(clientId?: string, bookId?: string) {
    return this.repo.listSales(clientId, bookId);
  }

  public async stats() {
    return this.repo.getStats();
  }
}
