import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductImageRequest } from "../dto/request/product-image.request";

@Entity()
export class ProductImage extends BaseEntity {

  @ManyToOne(() => Product, product => product.productImages)
  product: Product;

  @Column({ nullable: false })
  imageUrl: string;

  @Column({ nullable: false })
  isMain: boolean;

  static of(productImage: ProductImageRequest, product: Product) {
    const entity = new ProductImage();
    entity.product = product;
    entity.imageUrl = productImage.imageUrl;
    entity.isMain = productImage.isMain;
    return entity;
  }

}
