import { Field, InputType } from '@nestjs/graphql';
import { Category } from '../../entites/category.entity';

@InputType()
export class CategoryRequest {

  @Field(() => String)
  name: string;

  toEntity() {
    const category = new Category();
    category.name = this.name;
    return category;
  }

}
