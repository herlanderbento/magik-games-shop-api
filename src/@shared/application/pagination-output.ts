import { SearchResult } from "../domain/repository/search-result"

export type PaginationOutput<Item = any> = {
  items: Item[]
  total: number
  currentPage: number
  lastPage: number
  perPage: number
}

export class PaginationOutputMapper {
  static toOutput<Item = any>(
    items: Item[],
    props: Omit<SearchResult, 'items'>,
  ): PaginationOutput<Item> {
    return {
      items,
      total: props.total,
      currentPage: props.currentPage,
      lastPage: props.lastPage,
      perPage: props.perPage,
    }
  }
}