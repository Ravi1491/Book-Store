export class CreatePurchaseInput {
  bookPrice: number;
  totalPrice: number;

  bookId: string;

  userId: string;

  quantity: number;
  purchaseDate: Date;
}
