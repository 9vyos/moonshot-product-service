import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class ProductImage extends BaseEntity {

  @ManyToOne(() => Product, product => product.productImages)
  product: Product;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ nullable: false })
  isMain: boolean;

}
