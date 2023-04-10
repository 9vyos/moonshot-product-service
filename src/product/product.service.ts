import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductSaveRequest } from './dto/request/save.request';
import { Category } from '../category/entites/category.entity';
import { ProductImage } from '../product-image/entities/product-image.entity';
import { ProductResponse } from './dto/response/response';
import { ProductUpdateRequest } from './dto/request/update.request';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(ProductImage)
    private readonly productImageRepository: Repository<ProductImage>,
  ) {}

  async saveProduct(request: ProductSaveRequest) {
    const category = await this.categoryRepository.findOneBy({ id: request.categoryId });
    const product = await this.productRepository.save(request.toEntity(category));
    const productImages = await this.productImageRepository.save(
      request.productImages.map(
        (productImage) => ProductImage.of(productImage, product)
      ));
    return ProductResponse.of(category, product, productImages);
  }

  async updateProduct(productId: number, request: ProductUpdateRequest) {
    return await this.productRepository.update({ id: productId }, request);
  }

  async deleteProduct(productId: number) {
    await this.productRepository.delete({ id: productId });
    return 'success';
  }

  async getProducts() {
    return await this.productRepository.find({ relations: ['category', 'productImages'] });
  }

}
