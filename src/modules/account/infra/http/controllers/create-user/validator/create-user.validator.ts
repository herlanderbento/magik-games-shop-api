import { type Request } from 'express';
import * as Yup from 'yup';

export async function createUserValidated(request: Request) {
  const schema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    identityCard: Yup.string().required(),
    phone: Yup.string(),
    password: Yup.string().required(),
  });

  return await schema.validate(request.body, {
    abortEarly: false,
    stripUnknown: true,
  });
}
