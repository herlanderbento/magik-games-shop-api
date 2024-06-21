import { Request } from 'express';
import * as Yup from 'yup';

export async function getProductValidated(request: Request) {
  const schema = Yup.object().shape({
    slug: Yup.string().required(),
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
