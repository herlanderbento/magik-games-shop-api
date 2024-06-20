import { IUseCase } from '~/@shared/application';
import { Category, ICategoryRepository } from '~/modules/category/domain';
import { NotFoundError } from '~/@shared/domain';
import { DeleteCategoryInput, DeleteCategoryOutput } from './delete-category.dto';

export class DeleteCategoryUseCase
  implements IUseCase<DeleteCategoryInput, DeleteCategoryOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const category = await this.categoryRepository.findById(input.categoryId);

    if (!category) {
      throw new NotFoundError(input.categoryId, Category);
    }

    await this.categoryRepository.delete(input.categoryId)
  }
}
