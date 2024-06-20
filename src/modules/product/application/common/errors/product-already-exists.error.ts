import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '~/@shared/domain';

export class ProductAlreadyExistsError extends ApplicationError {
  constructor() {
    super('Product already exists');
    this.name = 'ProductAlreadyExistsError';
    this.statusCode = StatusCodes.CONFLICT;
  }
}
