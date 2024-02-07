import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
} from 'class-validator';

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
