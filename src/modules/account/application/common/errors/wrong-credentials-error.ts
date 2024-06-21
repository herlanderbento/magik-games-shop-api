import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '~/@shared/domain';

export class WrongCredentialsError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? 'Email or password incorrect!');
    this.name = 'WrongCredentialsError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
