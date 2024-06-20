import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '~/@shared/domain';

export class CategoryNotFoundError extends ApplicationError {
  constructor() {
    super('Category not found');
    this.name = 'CategoryNotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
