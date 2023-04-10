import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { Product } from './entities/product.entity';
import { Category } from '../category/entites/category.entity';
import { ProductImage } from '../product-image/entities/product-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductImage])],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
