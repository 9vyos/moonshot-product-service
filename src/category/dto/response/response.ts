import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../../entites/category.entity';

@ObjectType()
export class CategoryResponse {

  constructor(
    id: number,
    name: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  @Field(() => Number)
  id: number;
  @Field(() => String)
  name: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;

  static of(category: Category) {
    return new CategoryResponse(category.id, category.name, category.createdAt, category.updatedAt);
  }
}
