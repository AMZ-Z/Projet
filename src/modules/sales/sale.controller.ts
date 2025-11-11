import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { SaleService } from './sale.service';
import { CreateSaleDto } from './sale.dto';

@Controller('sales')
export class SaleController {
  constructor(private readonly service: SaleService) {}

  @Post()
  create(@Body() dto: CreateSaleDto) {
    return this.service.createSale({
      clientId: dto.clientId,
      bookId: dto.bookId,
      purchasedAt: new Date(dto.purchasedAt),
    });
  }

  @Get()
  list(@Query('clientId') clientId?: string, @Query('bookId') bookId?: string) {
    return this.service.listSales(clientId, bookId);
  }

  @Get('stats')
  stats() {
    return this.service.stats();
  }
}
