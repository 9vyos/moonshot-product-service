import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategoryResponse } from './dto/response/response';
import { CategoryRequest } from './dto/request/request';

@Resolver()
export class CategoryResolver {
  constructor(
    private readonly categoryService: CategoryService,
  ) {}

  @Mutation(() => CategoryResponse)
  async saveCategory(@Args('request') request: CategoryRequest) {
    return await this.categoryService.saveCategory(request);
  }

  @Mutation(() => CategoryResponse)
  async updateCategory(@Args('categoryId') categoryId: number, @Args('request') request: CategoryRequest) {
    return await this.categoryService.updateCategory(categoryId, request);
  }

  @Mutation(() => String)
  async deleteCategory(@Args('categoryId') categoryId: number) {
    await this.categoryService.deleteCategory(categoryId);
    return 'success';
  }

  @Query(() => [CategoryResponse])
  async getCategories() {
    return await this.categoryService.getCategories();
  }

}
