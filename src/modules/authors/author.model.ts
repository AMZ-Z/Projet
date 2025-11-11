// Restore original expected exports + keep extended models
export type AuthorModel = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
};

export type CreateAuthorModel = Omit<AuthorModel, 'id'>;

// Extended list/detail models with aggregates
export type AuthorListRow = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  booksCount: number;
};

export type AuthorDetailsModel = {
  id: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  booksCount: number;
  averageSales: number;
};
