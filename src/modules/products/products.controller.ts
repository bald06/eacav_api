import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { CreateProductDto } from './dto/create-product.dto';

import { Response } from 'express';
import { ProductsService } from './products.service';
import { ProductsEntity } from '../../entities/ProductsEntity';
import { UpdateProductDto } from './dto/update-product.dto';
import { Category } from '../../enums/category.enum';

@Controller('products')
export class ProductsController extends AppController {
  constructor(private readonly productsService: ProductsService) {
    super();
  }

  @Post()
  async create(
    @Body() request: CreateProductDto,
    @Res() res: Response,
  ): Promise<ProductsEntity> {
    try {
      const product = await this.productsService.create(request);
      if (!product) {
        return this.responseErrorWithMessage(
          'La imagen tiene que ser de formato PNG, JPEG o JPG',
          res,
        );
      }
      return this.responseOk(Object(product), res);
    } catch (error) {
      console.log(error);
      return this.responseErrorWithMessage(error, res);
    }
  }

  @Get('/:id')
  async getProductById(@Param('id') id: number, @Res() res: Response) {
    try {
      const product = await this.productsService.findProductById(id);
      if (!product) {
        return this.responseErrorWithMessage('El producto no existe', res);
      }
      return this.responseOk(Object(product), res);
    } catch (error) {
      return this.responseErrorWithMessage(error, res);
    }
  }

  @Post('/list/:category?')
  async getProducts(
    @Res() res: Response,
    @Param('category') category: Category,
  ): Promise<ProductsEntity[]> {
    try {
      const product = await this.productsService.findProducts(category);
      return this.responseOk(Object(product), res);
    } catch (error) {
      return this.responseErrorWithMessage(error, res);
    }
  }

  @Patch('/:id')
  async updateProductById(
    @Param('id') id: number,
    @Body() request: UpdateProductDto,
    @Res() res: Response,
  ): Promise<ProductsEntity> {
    try {
      const product = await this.productsService.updateProductById(id, request);
      if (!product) {
        return this.responseErrorWithMessage('El producto no existe', res);
      }
      return this.responseOk(Object(product), res);
    } catch (error) {
      return this.responseErrorWithMessage(error, res);
    }
  }

  @Delete('/:id')
  async deleteProductById(
    @Param('id') id: number,
    @Res() res: Response,
  ): Promise<ProductsEntity> {
    try {
      const product = await this.productsService.deleteProductById(id);
      if (!product) {
        return this.responseErrorWithMessage('El producto no existe', res);
      }
      return this.responseOk(Object(product), res);
    } catch (error) {
      return this.responseErrorWithMessage(error, res);
    }
  }
}
