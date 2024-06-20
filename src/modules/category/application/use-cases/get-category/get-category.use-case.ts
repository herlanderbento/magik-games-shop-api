import { IUseCase } from '~/@shared/application';
import { Category, ICategoryRepository } from '~/modules/category/domain';
import { CategoryOutputMapper } from '../../common';
import { NotFoundError } from '~/@shared/domain';
import { GetCategoryInput, GetCategoryOutput } from './get-category.dto';

export class GetCategoryUseCase
  implements IUseCase<GetCategoryInput, GetCategoryOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new NotFoundError(input.categoryId, Category);
    }

    return CategoryOutputMapper.toOutput(category);
  }
}
