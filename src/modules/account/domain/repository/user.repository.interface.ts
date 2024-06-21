import {
  SearchParams,
  SearchResult,
  ISearchableRepository,
  SearchParamsConstructorProps,
} from '~/@shared/domain';
import { User } from '../entities';

export type UserFilter = {
  name?: string;
  email?: string;
};

export class UserSearchParams extends SearchParams<UserFilter> {
  private constructor(props: SearchParamsConstructorProps<UserFilter> = {}) {
    super(props);
  }

  static create(
    props: Omit<SearchParamsConstructorProps<UserFilter>, 'filter'> & {
      filter?: {
        name?: string;
        email?: string;
      };
    } = {}
  ) {
    return new UserSearchParams({
      ...props,
      filter: {
        name: props.filter?.name,
        email: props.filter?.email,
      },
    });
  }

  get filter(): UserFilter | null {
    return this._filter;
  }

  protected set filter(value: UserFilter | null) {
    const _value =
      !value || (value as unknown) === '' || typeof value !== 'object'
        ? null
        : value;

    const filter = {
      ...(_value?.name && { name: `${_value.name}` }),
      ...(_value?.email && { email: `${_value.email}` }),
    };

    this._filter = Object.keys(filter).length === 0 ? null : filter;
  }
}

export class UserSearchResult extends SearchResult<User> {}

export interface IUserRepository
  extends ISearchableRepository<
    User,
    UserFilter,
    UserSearchParams,
    UserSearchResult
  > {
  findByEmail(email: string): Promise<User | null>;
  findByPhone(phone: string): Promise<User | null>;
  findBySlug(slug: string): Promise<User | null>;
}
