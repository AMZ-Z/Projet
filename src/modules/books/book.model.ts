// Restore original expected exports + keep extended models

export type BookModel = {
  id: string;
  title: string;
  authorId: string;
  yearPublished: number;
  photoUrl?: string;
};

export type CreateBookModel = Omit<BookModel, 'id'>;
export type UpdateBookModel = Partial<CreateBookModel>;

export type FilterBooksModel = {
  limit: number;
  offset: number;
  sort?: string; // e.g., 'title,ASC'
};

export type GetBooksModel = FilterBooksModel;

// Extended models for list/details with buyers
export type BookListRow = {
  id: string;
  title: string;
  yearPublished: number;
  photoUrl?: string;
  authorId: string;
  authorFirstName: string;
  authorLastName: string;
  buyersCount: number;
};

export type BookBuyerRow = {
  clientId: string;
  firstName: string;
  lastName: string;
};

export type BookDetailsModel = {
  id: string;
  title: string;
  yearPublished: number;
  photoUrl?: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
  };
  buyers: BookBuyerRow[];
  buyersCount: number;
};
