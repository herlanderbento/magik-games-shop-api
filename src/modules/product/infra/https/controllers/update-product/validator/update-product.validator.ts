import { Request } from 'express';
import * as Yup from 'yup';
import { UpdateProductInput } from '~/modules/product/application';

export async function updateProductValidated(request: Request) {
  const schema = Yup.object().shape({
    id: Yup.string().required(),
    categoryId: Yup.string().required(),
    name: Yup.string().required(),
    description: Yup.string(),
    price: Yup.number().required(),
  });

  return await schema.validate(
    {
      ...request.params,
      ...request.body,
    },
    {
      abortEarly: false,
      stripUnknown: true,
    }
  ) as UpdateProductInput
}
