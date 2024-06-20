import {
  SearchParams,
  SearchParamsConstructorProps,
  SearchResult,
  ISearchableRepository,
} from '~/@shared/domain';
import { Product } from '../entities';

export type ProductFilter = {
  name?: string;
  categoryId?: string;
  price?: number;
};

export class ProductSearchParams extends SearchParams<ProductFilter> {
  private constructor(props: SearchParamsConstructorProps<ProductFilter> = {}) {
    super(props);
  }

  static create(
    props: Omit<SearchParamsConstructorProps<ProductFilter>, 'filter'> & {
      filter?: {
        name?: string;
        categoryId?: string;
        price?: number;
      };
    } = {}
  ) {
    return new ProductSearchParams({
      ...props,
      filter: {
        name: props.filter?.name,
        categoryId: props.filter?.categoryId,
        price: props.filter?.price,
      },
    });
  }

  get filter(): ProductFilter | null {
    return this._filter;
  }

  protected set filter(value: ProductFilter | null) {
    const _value =
      !value || (value as unknown) === '' || typeof value !== 'object'
        ? null
        : value;

    const filter = {
      ...(_value?.name && { name: `${_value.name}` }),
      ...(_value?.categoryId && { categoryId: `${_value.categoryId}` }),
      ...(_value?.price && { price: _value.price }),
    };

    this._filter = Object.keys(filter).length === 0 ? null : filter;
  }
}

export class ProductSearchResult extends SearchResult<Product> {}

export interface IProductRepository
  extends Omit<
    ISearchableRepository<
      Product,
      ProductFilter,
      ProductSearchParams,
      ProductSearchResult
    >,
    'findByIds'
  > {
  findByName(name: string): Promise<Product | null>;
}
