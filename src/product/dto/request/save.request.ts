import { Field, InputType, Int } from '@nestjs/graphql';
import { ProductImageRequest } from 'src/product-image/dto/request/product-image.request';
import { Product } from 'src/product/entities/product.entity';
import { Category } from 'src/category/entites/category.entity';

@InputType()
export class ProductSaveRequest {

  @Field(() => String)
  name: string;
  @Field(() => Int)
  price: number;
  @Field(() => String)
  description: string;
  @Field(() => Int)
  categoryId: number;
  @Field(() => [ProductImageRequest])
  productImages: ProductImageRequest[];

  toEntity(category: Category) {
    const product = new Product();
    product.name = this.name;
    product.price = this.price;
    product.description = this.description;
    product.category = category;
    return product;
  }
}
