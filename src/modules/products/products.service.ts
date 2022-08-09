import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { GlobalService } from 'src/app.service';
import { ProductsEntity } from '../../entities/ProductsEntity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { uuid } from 'uuidv4';

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
    // aqui subimos la imagen
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
