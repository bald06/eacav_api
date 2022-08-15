import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
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

  @IsOptional()
  @IsString()
  image: string;

  updatedAt: Date;
}
