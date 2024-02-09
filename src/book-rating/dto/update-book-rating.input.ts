import { CreateBookRatingInput } from './create-book-rating.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBookRatingInput extends PartialType(CreateBookRatingInput) {
  id: string;
}
