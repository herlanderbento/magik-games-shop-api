import { IUseCase } from '~/@shared/application';
import { Category, ICategoryRepository } from '~/modules/category/domain';
import { NotFoundError } from '~/@shared/domain';
import {
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from './update-category.dto';
import { CategoryOutputMapper } from '../../common';

export class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new NotFoundError(input.categoryId, Category);
    }

    category.update(input);

    await this.categoryRepository.update(category);

    return CategoryOutputMapper.toOutput(category);
  }
}
