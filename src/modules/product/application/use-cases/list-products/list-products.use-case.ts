import { IUseCase, PaginationOutputMapper } from '~/@shared/application';
import { ListProductInput, ListProductsOutput } from './list-products.dto';
import {
  ProductSearchParams,
  ProductSearchResult,
  IProductRepository,
} from '~/modules/product/domain';
import { ProductOutputMapper } from '../../common';
import { Category, ICategoryRepository } from '~/modules/category/domain';
import { NotFoundError } from '~/@shared/domain';

export class ListProductsUseCase
  implements IUseCase<ListProductInput, ListProductsOutput>
{
  constructor(
    private productRepository: IProductRepository,
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(input: ListProductInput): Promise<ListProductsOutput> {
    const params = ProductSearchParams.create(input);
    const searchResult = await this.productRepository.search(params);
    return this.toOutput(searchResult);
  }

  private async toOutput(
    searchResult: ProductSearchResult
  ): Promise<ListProductsOutput> {
    const { items: _items } = searchResult;

    const categoryIds = _items.map((item) => item.categoryId);
    const categories = await this.categoryRepository.findByIds(categoryIds);

    const items = _items.map((item) => {
      const category = categories.find(
        (c) => c.id.toString() === item.categoryId
      );
      if (!category) {
        throw new NotFoundError(item.categoryId, Category);
      }
      return ProductOutputMapper.toOutput(item, category);
    });

    return PaginationOutputMapper.toOutput(items, searchResult);
  }
}
