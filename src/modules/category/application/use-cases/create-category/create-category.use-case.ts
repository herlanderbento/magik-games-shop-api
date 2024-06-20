import { IUseCase } from '~/@shared/application';
import {
  CreateCategoryInput,
  CreateCategoryOutput,
} from './create-category.dto';
import {
  CategoryAlreadyExistsError,
  CategoryOutputMapper,
  CategoryOutputProps,
} from '../../common';
import { Category, ICategoryRepository } from '~/modules/category/domain';

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryInput, CreateCategoryOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}
  
  async execute(input: CreateCategoryInput): Promise<CategoryOutputProps> {
    const categoryWithSameName = await this.categoryRepository.findByName(
      input.name
    );

    if (categoryWithSameName) {
      throw new CategoryAlreadyExistsError();
    }

    const entity = Category.create(input);

    await this.categoryRepository.insert(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}
