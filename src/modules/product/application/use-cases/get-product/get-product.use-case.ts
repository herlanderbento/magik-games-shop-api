import { IUseCase } from '~/@shared/application';
import { NotFoundError } from '~/@shared/domain';
import {
  IProductRepository,
  Product,
  ProductProps,
} from '~/modules/product/domain';
import { ProductNotFoundError, ProductOutputMapper } from '../../common';
import { Category, ICategoryRepository } from '~/modules/category/domain';

export interface GetProductInput {
  slug: string;
}

export class GetProductUseCase
  implements IUseCase<GetProductInput, GetProductOutput>
{
  constructor(
    private productRepository: IProductRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(input: GetProductInput): Promise<ProductProps> {
    const product = await this.productRepository.findBySlug(input.slug);

    if (!product) {
      throw new ProductNotFoundError();
    }

    const category = await this.categoryRepository.findById(product.categoryId);

    if (!category) {
      throw new NotFoundError(product.categoryId, Category);
    }

    return ProductOutputMapper.toOutput(product, category);
  }
}

export type GetProductOutput = ProductProps;
