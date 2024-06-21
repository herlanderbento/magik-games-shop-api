import jwt from 'jsonwebtoken';
import { IGeneratorToken } from '~/@shared/application';

export class JwtEncrypter implements IGeneratorToken {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, String(process.env.MIRANTES_JWT_SECRET), {
      expiresIn: '1h',
    });
  }

  async decrypt<JwtPayload>(payload: Record<string, any>): Promise<JwtPayload> {
    return Promise.resolve(
      jwt.verify(
        String(payload),
        String(process.env.MIRANTES_JWT_SECRET)
      ) as JwtPayload
    );
  }
}
