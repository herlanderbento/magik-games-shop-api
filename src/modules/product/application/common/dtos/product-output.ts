import { Slug } from '~/@shared/domain';
import { Category } from '~/modules/category/domain';
import { Product } from '~/modules/product/domain';

export type ProductCategoryOutput = {
  id: string;
  name: string;
  createdAt: Date;
};

export type ProductOutput = {
  id: string;
  categoryId: string;
  category: ProductCategoryOutput;
  name: string;
  slug: Slug; 
  description?: string | null;
  price: number;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};
export class ProductOutputMapper {
  static toOutput(product: Product, category: Category): ProductOutput {
    return {
      id: product.id.toString(),
      categoryId: product.categoryId,
      category: {
        id: category.id.toString(),
        name: category.name,
        createdAt: category.createdAt,
      },
      name: product.name,
      //@ts-ignore
      slug: product.slug.value,
      description: product.description,
      price: product.price,
      image: product.image,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };
  }
}
