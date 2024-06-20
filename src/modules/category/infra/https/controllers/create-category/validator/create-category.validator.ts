import { Request } from 'express';
import * as Yup from 'yup';

export async function createCategoryValidated(request: Request) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    description: Yup.string(),
  });

  return await schema.validate(request.body, {
    abortEarly: false,
    stripUnknown: true,
  });
}
