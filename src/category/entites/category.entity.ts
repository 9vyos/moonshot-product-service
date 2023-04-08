import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Category extends BaseEntity {

  @OneToMany(() => Product, product => product.category)
  products: Product;

  @Column({ nullable: false })
  name: string;

}
