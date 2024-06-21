import { IUseCase } from '~/@shared/application';
import { UpdateProductInput, UpdateProductOutput } from './update-product.dto';
import { IProductRepository, Product } from '~/modules/product/domain';
import { Category, ICategoryRepository } from '~/modules/category/domain';
import { NotFoundError } from '~/@shared/domain';
import { ProductOutputMapper } from '../../common';

export class UpdateProductUseCase
  implements IUseCase<UpdateProductInput, UpdateProductOutput>
{
  constructor(
    private productRepository: IProductRepository,
    private categoryRepository: ICategoryRepository
  ) {}
  async execute(input: UpdateProductInput): Promise<UpdateProductOutput> {
    const product = await this.productRepository.findById(input.id);

    if (!product) {
      throw new NotFoundError(input.id, Product);
    }

    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new NotFoundError(input.categoryId, Category);
    }

    product.update(input);

    await this.productRepository.update(product);

    return ProductOutputMapper.toOutput(product, category);
  }
}
