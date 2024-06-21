import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '~/@shared/domain';

export class UserAlreadyExistsError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? 'User already exists');
    this.name = 'UserAlreadyExistsError';
    this.statusCode = StatusCodes.CONFLICT;
  }
}
