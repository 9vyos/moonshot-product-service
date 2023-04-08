import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Category } from 'src/category/entites/category.entity';
import { ProductImage } from 'src/product-image/entities/product-image.entity';

@Entity()
export class Product extends BaseEntity {

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: string;

  @ManyToOne(() => Category, category => category.products)
  category: Category;

  @OneToMany(() => ProductImage, productImage => productImage.product)
  productImages: ProductImage[];

}
