import { Request } from 'express';
import * as Yup from 'yup';

export async function updateCategoryValidated(request: Request) {
  const schema = Yup.object().shape({
    categoryId: Yup.string().required(),
    name: Yup.string().required(),
    description: Yup.string(),
  });

  return await schema.validate({
    ...request.params,
    ...request.body
  }, {
    abortEarly: false,
    stripUnknown: true,
  });
}
