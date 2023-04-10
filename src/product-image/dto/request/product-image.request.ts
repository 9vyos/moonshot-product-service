import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ProductImageRequest {

  @Field(() => String)
  imageUrl: string;
  @Field(() => Boolean)
  isMain: boolean;

}
