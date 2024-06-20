import { IUseCase, PaginationOutputMapper } from '~/@shared/application';
import {
  ListCategoriesInput,
  ListCategoriesOutput,
} from './list-categories.dto';
import { CategorySearchParams, CategorySearchResult, ICategoryRepository } from '~/modules/category/domain';
import { CategoryOutputMapper } from '../../common';

export class ListCategoriesUseCase
  implements IUseCase<ListCategoriesInput, ListCategoriesOutput>
{
  constructor(private categoryRepository: ICategoryRepository) {}

  async execute(input: ListCategoriesInput): Promise<ListCategoriesOutput> {
    const params = new CategorySearchParams(input)
    const searchResult = await this.categoryRepository.search(params)
    return this.toOutput(searchResult)
  }

  private toOutput(searchResult: CategorySearchResult): ListCategoriesOutput {
    const { items: _items } = searchResult;
    const items = _items.map((item) => {
      return CategoryOutputMapper.toOutput(item);
    });
    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}
