import { Product } from '~/modules/product/domain';

export type ProductOutputProps = {
  categoryId: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export class ProductOutputMapper {
  static toOutput(entity: Product): ProductOutputProps {
    return {
      ...entity.toJSON(),
    };
  }
}
