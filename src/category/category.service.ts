import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from "./entites/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryRequest } from "./dto/request/request";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async saveCategory(request: CategoryRequest) {
    const duplicate = this.categoryRepository.findOneBy( { name: request.name });
    if (duplicate) throw new HttpException('이미 존재하는 카테고리입니다.', 400);
    return await this.categoryRepository.save(request.toEntity());
  }

  async updateCategory(categoryId: number, request: CategoryRequest) {
    const duplicate = this.categoryRepository.findOneBy( { name: request.name });
    if (duplicate) throw new HttpException('이미 존재하는 카테고리입니다.', 400);
    return await this.categoryRepository.update({ id: categoryId }, { name: request.name });
  }

  async deleteCategory(categoryId: number) {
    return await this.categoryRepository.delete({ id: categoryId });
  }

  async getCategories() {
    return await this.categoryRepository.find();
  }

}
