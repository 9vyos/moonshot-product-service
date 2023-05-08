import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductSaveRequest } from './dto/request/save.request';
import { Category } from '../category/entites/category.entity';
import { ProductImage } from '../product-image/entities/product-image.entity';
import { ProductResponse } from './dto/response/response';
import { ProductUpdateRequest } from './dto/request/update.request';
import { Transactional } from 'typeorm-transactional';

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

  @Transactional()
  async saveProduct(request: ProductSaveRequest) {
    const category = await this.categoryRepository.findOneBy({ id: request.categoryId });
    const product = await this.productRepository.save(request.toEntity(category));
    const productImages = await this.productImageRepository.save(
      request.productImages.map(
        (productImage) => ProductImage.of(productImage, product)
      ));
    return ProductResponse.of(category, product, productImages);
  }

  @Transactional()
  async updateProduct(productId: number, request: ProductUpdateRequest) {
    const product: Product = await this.productRepository
      .findOne({ where: { id: productId }, relations: ['category', 'productImages'] });
    product.update(request);
    await this.productRepository.save(product);
    return product;
  }

  async deleteProduct(productId: number) {
    await this.productRepository.delete({ id: productId });
    return 'success';
  }

  async getProducts() {
    return await this.productRepository
      .find({ relations: ['category', 'productImages'] });
  }

  async getOneProduct(productId: number) {
    return await this.productRepository
      .findOne({ where: { id: productId }, relations: ['category', 'productImages'] });
  }

}
