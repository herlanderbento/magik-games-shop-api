import { Request } from 'express';
import * as Yup from 'yup';

export async function getCategoryValidated(request: Request) {
  const schema = Yup.object().shape({
    categoryId: Yup.string().required(),
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
