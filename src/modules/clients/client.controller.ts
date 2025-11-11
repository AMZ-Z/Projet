import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateClientDto, UpdateClientDto } from './client.dto';
import { ClientService } from './client.service';

@Controller('clients')
export class ClientController {
  constructor(private readonly service: ClientService) {}

  @Get()
  list() {
    return this.service.listClients();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.service.getClientDetails(id);
  }

  @Post()
  create(@Body() dto: CreateClientDto) {
    return this.service.createClient(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateClientDto) {
    return this.service.updateClient(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.deleteClient(id);
  }
}
