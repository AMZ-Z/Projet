import { IsDateString, IsUUID } from 'class-validator';

export class CreateSaleDto {
  @IsUUID(4)
  clientId: string;

  @IsUUID(4)
  bookId: string;

  @IsDateString()
  purchasedAt: string;
}
