import {
  ISearchableRepository,
  SearchParams,
  SearchResult,
} from '~/@shared/domain';
import { Category } from '../entities';

export type CategoryFilter = string;

export class CategorySearchParams extends SearchParams<CategoryFilter> {}

export class CategorySearchResult extends SearchResult<Category> {}

export interface ICategoryRepository
  extends Omit<
    ISearchableRepository<
      Category,
      CategoryFilter,
      CategorySearchParams,
      CategorySearchResult
    >,
    'findByIds'
  > {
  findByName(name: string): Promise<Category | null>;
}
