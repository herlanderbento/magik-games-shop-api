import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '~/@shared/domain';

export class UserPasswordMatchError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? 'Password should be different from old password!');
    this.name = 'UserPasswordMatchError';
    this.statusCode = StatusCodes.CONFLICT;
  }
}
