import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '~/@shared/domain';

export class UserNotFoundError extends ApplicationError {
  constructor() {
    super('User not found');
    this.name = 'UserNotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
