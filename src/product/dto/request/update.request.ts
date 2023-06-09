import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class ProductUpdateRequest {

  @Field(() => String)
  name: string;
  @Field(() => Int)
  price: number;
  @Field(() => String)
  description: string;

}
