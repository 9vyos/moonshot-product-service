import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Category } from '../../category/entites/category.entity';

@Entity()
export class Product extends BaseEntity {

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: string;

  @OneToMany(type => Category, category => category.product)
  categories: Category[];

}
