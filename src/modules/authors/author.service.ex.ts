import { Injectable } from '@nestjs/common';
import { AuthorRepositoryEx } from './author.repository.ex';

@Injectable()
export class AuthorServiceEx {
  constructor(private readonly repo: AuthorRepositoryEx) {}

  public listWithBooksCount() {
    return this.repo.listWithBooksCount();
  }

  public getDetails(id: string) {
    return this.repo.getDetails(id);
  }
}
