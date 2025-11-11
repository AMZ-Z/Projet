import { Injectable } from '@nestjs/common';
import { BookRepositoryEx } from './book.repository.ex';

@Injectable()
export class BookServiceEx {
  constructor(private readonly repo: BookRepositoryEx) {}

  public listWithBuyersCount() {
    return this.repo.listWithBuyersCount();
  }

  public getDetails(id: string) {
    return this.repo.getDetails(id);
  }
}
