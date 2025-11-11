import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleEntity } from './sale.entity';
import { SaleRepository } from './sale.repository';
import { SaleService } from './sale.service';
import { SaleController } from './sale.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SaleEntity])],
  controllers: [SaleController],
  providers: [SaleRepository, SaleService],
  exports: [SaleService],
})
export class SaleModule {}
