import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ProductsEntity } from '../../entities/ProductsEntity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private productEntity: Repository<ProductsEntity>,
  ) {}

  async create(req: CreateProductDto) {
    const product = this.productEntity.create(req);
    return await this.productEntity.save(product);
  }

  async findProductById(id: number) {
    const product = await this.productEntity.findOne({
      where: { id, deletedAt: null },
    });
    if (!product) {
      return false;
    }
    return product;
  }

  async findProducts() {
    return await this.productEntity.findOne({
      where: { deletedAt: null },
    });
  }

  async updateProductById(id: number, req: UpdateProductDto) {
    const product = await this.findProductById(id);
    if (!product) {
      return false;
    }
    req.updatedAt = new Date(Date.now());
    return await this.productEntity.update({ id }, req);
  }

  async deleteProductById(id: number) {
    const product = await this.findProductById(id);
    if (!product) {
      return false;
    }
    return await this.productEntity.update({ id }, { deletedAt: Date.now() });
  }
}
