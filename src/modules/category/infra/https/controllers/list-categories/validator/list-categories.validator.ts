import { Request } from 'express';
import * as Yup from 'yup';
import { CategoryFilter } from '~/modules/category/domain';

export async function listCategoriesValidated(request: Request) {
  const schema = Yup.object().shape({
    page: Yup.number(),
    perPage: Yup.number(),
    filter: Yup.mixed<CategoryFilter>(),
  });

  return await schema.validate(request.query, {
    abortEarly: false,
    stripUnknown: true,
  });
}
