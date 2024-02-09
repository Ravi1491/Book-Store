class AuthorInput {
  name: string;
  username: string;
}

export class CreateBookInput {
  title: string;
  authors: [AuthorInput];
  description: string;
  sellCount?: number;
  price: number;
}

export class CreateBookAuthorInput {
  bookId: string;
  authorId: string;
}
