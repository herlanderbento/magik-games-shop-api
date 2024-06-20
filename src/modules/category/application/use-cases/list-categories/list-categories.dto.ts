import { PaginationOutput } from '~/@shared/application';
import {  CategoryFilter } from '~/modules/category/domain';
import { CategoryOutputProps } from '../../common';

export type ListCategoriesInput = {
  page?: number;
  perPage?: number;
  filter?: CategoryFilter;
};

export type ListCategoriesOutput = PaginationOutput<CategoryOutputProps>