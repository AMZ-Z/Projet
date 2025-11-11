export type SaleModel = {
  id: string;
  clientId: string;
  bookId: string;
  purchasedAt: Date;
};

export type CreateSaleModel = Omit<SaleModel, 'id'>;
