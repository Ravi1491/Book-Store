import { IsNumber } from 'class-validator';
import { CreateBookInput } from './create-book.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateBookInput extends PartialType(CreateBookInput) {
  id: string;

  SellCount: number;
}
