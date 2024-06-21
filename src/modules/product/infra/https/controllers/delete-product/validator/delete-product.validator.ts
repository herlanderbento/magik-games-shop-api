import { Request } from 'express';
import * as Yup from 'yup';

export async function deleteProductValidated(request: Request) {
  const schema = Yup.object().shape({
    productId: Yup.string().required(),
  });

  return await schema.validate(
    {
      ...request.params,
    },
    {
      abortEarly: false,
      stripUnknown: true,
    }
  );
}
