import { ProductOutputProps } from '../../common';

export type CreateProductInput = {
  categoryId: string;
  name: string;
  description?: string | null;
  price: number;
  image?: string | null;
};

export type CreateProductOutput = ProductOutputProps;
