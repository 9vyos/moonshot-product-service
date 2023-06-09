import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductImage } from 'src/product-image/entities/product-image.entity';

@ObjectType()
export class ProductImageResponse {

  @Field(() => Int)
  id: number;
  @Field(() => String)
  imageUrl: string;
  @Field(() => Boolean)
  isMain: boolean;

  static of(productImage: ProductImage) {
    const response = new ProductImageResponse();
    response.id = productImage.id;
    response.imageUrl = productImage.imageUrl;
    response.isMain = productImage.isMain;
    return response;
  }
}
