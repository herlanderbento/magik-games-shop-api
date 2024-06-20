import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '~/@shared/domain';

export class CategoryAlreadyExistsError extends ApplicationError {
  constructor() {
    super('Category already exists');
    this.name = 'CategoryAlreadyExistsError';
    this.statusCode = StatusCodes.CONFLICT;
  }
}
