import { IUseCase } from '~/@shared/application';
import { CreateProductInput, CreateProductOutput } from './create-product.dto';
import { Category, ICategoryRepository } from '~/modules/category/domain';
import { IProductRepository } from '~/modules/product/domain/repository';
import { Product } from '~/modules/product/domain';
import { NotFoundError } from '~/@shared/domain';
import { ProductOutputMapper } from '../../common';

export class CreateProductUseCase
  implements IUseCase<CreateProductInput, CreateProductOutput>
{
  constructor(
    private productRepository: IProductRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(input: CreateProductInput): Promise<CreateProductOutput> {
    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new NotFoundError(input.categoryId, Category);
    }

    const entity = Product.create(input);

    await this.productRepository.insert(entity);

    return ProductOutputMapper.toOutput(entity, category);
  }
}
