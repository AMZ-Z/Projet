import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientEntity } from './client.entity';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  controllers: [ClientController],
  providers: [ClientRepository, ClientService],
  exports: [ClientService],
})
export class ClientModule {}
