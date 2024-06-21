import { Request } from 'express';
import * as Yup from 'yup';

export async function listProductValidated(request: Request) {
  const schema = Yup.object().shape({
    page: Yup.number(),
    perPage: Yup.number(),
    categoryId: Yup.string(),
    name: Yup.string(),
    price: Yup.number(),
  });

  return await schema.validate(request.query, {
    abortEarly: false,
    stripUnknown: true,
  });
}

export async function productFiltered(input: {
  page?: number;
  perPage?: number;
  categoryId?: string;
  name?: string;
  price?: number;
}) {
  return {
    page: input.page,
    perPage: input.perPage,
    filter: {
      name: input.name,
      categoryId: input.categoryId,
      price: input.price,
    },
  };
}
