import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GlobalService } from 'src/app.service';
import { ProductsEntity } from '../../entities/ProductsEntity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { uuid } from 'uuidv4';
import { environments } from 'src/config/environments';

const globalService = new GlobalService();
@Injectable()
export class ProductsService {
  extension: any[] = ['png', 'jpg', 'jpeg'];
  constructor(
    @InjectRepository(ProductsEntity)
    private productEntity: Repository<ProductsEntity>,
  ) {}

  async create(req: CreateProductDto) {
    const type = req.image != null ? req.image.split(';')[0].split('/')[1] : '';
    if (!this.extension.includes(type)) {
      return false;
    }
    const fileName = `${uuid()}.${type}`;
    await globalService.uploadFile(
      fileName,
      req.image.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
    );
    req.image = fileName;
    const product = this.productEntity.create(req);
    return await this.productEntity.save(product);
  }

  async findProductById(id: number) {
    const product = await this.productEntity.findOne({
      where: { id, deletedAt: null },
    });
    product.image = `${environments.PATH_IMAGES}${product.image}`;
    if (!product) {
      return false;
    }
    return product;
  }

  async findProducts(category: string) {
    let products: any;
    if (!category) {
      products = await this.productEntity.find({
        where: { deletedAt: null },
      });
    } else {
      products = await this.productEntity.find({
        where: { deletedAt: null, category },
      });
    }
    for (const product of products) {
      product.image = `${environments.PATH_IMAGES}${product.image}`;
    }
    return products;
  }

  async updateProductById(id: number, req: UpdateProductDto) {
    const product = await this.findProductById(id);
    const type = req.image != null ? req.image.split(';')[0].split('/')[1] : '';
    if (!this.extension.includes(type)) {
      return false;
    }
    if (!product) {
      return false;
    }
    const fileName = `${uuid()}.${type}`;
    req.image = fileName;
    req.updatedAt = new Date(Date.now());
    return await this.productEntity.update({ id }, req);
  }

  async deleteProductById(id: number) {
    const product = await this.findProductById(id);
    if (!product) {
      return false;
    }
    return await this.productEntity.update(
      { id },
      { deletedAt: new Date(Date.now()) },
    );
  }
}
