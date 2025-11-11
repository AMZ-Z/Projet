import { Injectable } from '@nestjs/common';
import { ClientRepository } from './client.repository';
import { ClientDetailsModel, ClientModel, CreateClientModel, UpdateClientModel } from './client.model';

@Injectable()
export class ClientService {
  constructor(private readonly repo: ClientRepository) {}

  public async listClients(): Promise<ClientModel[]> {
    return this.repo.listClientsWithCounts();
  }

  public async getClientDetails(id: string): Promise<ClientDetailsModel | null> {
    return this.repo.getClientDetails(id);
  }

  public async createClient(input: CreateClientModel): Promise<ClientModel> {
    return this.repo.createClient(input);
  }

  public async updateClient(id: string, input: UpdateClientModel): Promise<ClientModel> {
    return this.repo.updateClient(id, input);
  }

  public async deleteClient(id: string): Promise<void> {
    return this.repo.deleteClient(id);
  }
}
