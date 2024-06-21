import { hash, compare } from 'bcryptjs';
import { ICryptography } from '~/@shared/application';

export class BcryptHasher implements ICryptography {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
