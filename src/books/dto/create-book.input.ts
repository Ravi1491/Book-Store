import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';

export class CreateBookInput {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  authors: object;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  SellCount: number;

  @IsNumber()
  @Min(100)
  @Max(1000)
  price: number;
}
