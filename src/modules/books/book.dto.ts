import { IsInt, IsOptional, IsString, IsUUID, Max, Min } from 'class-validator';
import type { AuthorId } from '../authors/author.entity';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsUUID(4)
  authorId: AuthorId;

  @IsInt()
  @Min(1500)
  @Max(2025)
  yearPublished: number;

  @IsOptional()
  @IsString()
  photoUrl?: string;
}

export class UpdateBookDto {
  @IsOptional() @IsString() title?: string;
  @IsOptional() @IsUUID(4) authorId?: AuthorId;
  @IsOptional() @IsInt() @Min(1500) @Max(2025) yearPublished?: number;
  @IsOptional() @IsString() photoUrl?: string;
}

export class GetBooksDto {
  @IsInt() @Min(1) @Max(100) limit: number;
  @IsInt() @Min(0) offset: number;
  @IsString() @IsOptional() sort?: string;
}
