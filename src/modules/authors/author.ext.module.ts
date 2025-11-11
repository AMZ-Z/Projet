import { Module } from '@nestjs/common';
import { AuthorRepositoryEx } from './author.repository.ex';
import { AuthorServiceEx } from './author.service.ex';
import { AuthorControllerEx } from './author.controller.ex';

@Module({
  providers: [AuthorRepositoryEx, AuthorServiceEx],
  controllers: [AuthorControllerEx],
  exports: [AuthorServiceEx],
})
export class AuthorExtModule {}
