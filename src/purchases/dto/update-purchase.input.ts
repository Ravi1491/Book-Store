import { CreatePurchaseInput } from './create-purchase.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePurchaseInput extends PartialType(CreatePurchaseInput) {
  id: string;
}
