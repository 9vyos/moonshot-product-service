import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductResponse } from './dto/response/response';
import { ProductSaveRequest } from './dto/request/save.request';
import { ProductUpdateRequest } from './dto/request/update.request';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService,
  ) {}

  @Mutation(() => ProductResponse)
  async saveProduct(@Args('request') request: ProductSaveRequest) {
    return await this.productService.saveProduct(request);
  }

  @Mutation(() => ProductResponse)
  async updateProduct(@Args('productId') productId: number, @Args('request') request: ProductUpdateRequest) {
    return await this.productService.updateProduct(productId, request);
  }

  @Mutation(() => String)
  async deleteProduct(@Args('productId') productId: number) {
    return await this.productService.deleteProduct(productId);
  }

  @Query(() => [ProductResponse])
  async getProducts() {
    return await this.productService.getProducts();
  }

}
