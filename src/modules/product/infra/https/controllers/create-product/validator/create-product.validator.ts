import { Request } from 'express';
import * as Yup from 'yup';

export async function createProductValidated(request: Request) {
  const schema = Yup.object().shape({
    categoryId: Yup.string().required(),
    name: Yup.string().required(),
    description: Yup.string(),
    image: Yup.string(),
    price: Yup.number().required(),
  });

  return await schema.validate(request.body, {
    abortEarly: false,
    stripUnknown: true,
  });
}
