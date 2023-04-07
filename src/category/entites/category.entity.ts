import { BaseEntity } from '../../common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class Category extends BaseEntity {

  @ManyToOne(() => Product, product => product.categories)
  product: Product;

  @Column({ nullable: false })
  name: string;

}
