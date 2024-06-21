import { PaginationOutput } from '~/@shared/application';
import {  ProductFilter } from '~/modules/product/domain';
import { ProductOutput } from '../../common';

export type ListProductInput = {
  page?: number;
  perPage?: number;
  filter?: ProductFilter;
};

export type ListProductsOutput = PaginationOutput<ProductOutput>