export type ClientModel = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  photoUrl?: string;
  purchasesCount?: number;
};

export type ClientPurchaseRow = {
  saleId: string;
  bookId: string;
  bookTitle: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  purchasedAt: string; // ISO
};

export type ClientDetailsModel = {
  client: ClientModel;
  purchases: ClientPurchaseRow[];
};

export type CreateClientModel = Omit<ClientModel, 'id' | 'purchasesCount'>;
export type UpdateClientModel = Partial<CreateClientModel>;
