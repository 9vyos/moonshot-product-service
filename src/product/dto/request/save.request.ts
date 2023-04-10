import { Field, InputType } from '@nestjs/graphql';
import { ProductImageRequest } from '../../../product-image/dto/request/product-image.request';
import { Product } from '../../entities/product.entity';
import { Category } from '../../../category/entites/category.entity';

@InputType()
export class ProductSaveRequest {

  @Field(() => String)
  name: string;
  @Field(() => Number)
  price: number;
  @Field(() => String)
  description: string;
  @Field(() => Number)
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
