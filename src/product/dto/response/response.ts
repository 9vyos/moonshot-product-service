import { Field, ObjectType } from '@nestjs/graphql';
import { CategoryResponse } from '../../../category/dto/response/response';
import { ProductImageResponse } from '../../../product-image/dto/response/product-image.response';
import { Category } from '../../../category/entites/category.entity';
import { Product } from '../../entities/product.entity';
import { ProductImage } from '../../../product-image/entities/product-image.entity';

@ObjectType()
export class ProductResponse {

  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => Number)
  price: number;
  @Field(() => String)
  description: string;
  @Field(() => CategoryResponse)
  category: CategoryResponse;
  @Field(() => [ProductImageResponse])
  productImages: ProductImageResponse[];

  static of(category: Category, product: Product, productImages: ProductImage[]) {
    const response = new ProductResponse();
    response.id = product.id;
    response.name = product.name;
    response.price = product.price;
    response.description = product.description;
    response.category = CategoryResponse.of(category);
    response.productImages = productImages.map((productImage) => ProductImageResponse.of(productImage));
    return response;
  }
}
