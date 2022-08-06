import { IsBase64, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Category } from '../../../enums/category.enum';

export class UpdateProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  category: Category;

  @IsNotEmpty()
  @IsNumber()
  stock: number;

  @IsNotEmpty()
  @IsBase64()
  image: string;

  updatedAt: Date;
}
