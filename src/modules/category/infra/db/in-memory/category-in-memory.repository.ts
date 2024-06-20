import { EntityID } from '~/@shared/domain';
import { InMemoryRepository } from '~/@shared/infra';
import {
  Category,
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from '~/modules/category/domain';

export class CategoryInMemoryRepository
  extends InMemoryRepository<Category>
  implements ICategoryRepository
{
  async findByName(name: string): Promise<Category | null> {
    const item = this.items.find((item) => item.id.equals(new EntityID(name)));
    return typeof item === 'undefined' ? null : item;
  }
  search(props: CategorySearchParams): Promise<CategorySearchResult> {
    throw new Error('Method not implemented.');
  }

  getEntity(): new (...args: any[]) => Category {
    return Category;
  }
}
