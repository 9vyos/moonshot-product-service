import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Category } from 'src/category/entites/category.entity';
import { ProductImage } from "src/product-image/entities/product-image.entity";

@Entity()
export class Product extends BaseEntity {

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  price: string;

  @OneToMany(() => Category, category => category.product)
  categories: Category[];

  @OneToMany(() => ProductImage, productImage => productImage.product)
  productImages: ProductImage[];

}
