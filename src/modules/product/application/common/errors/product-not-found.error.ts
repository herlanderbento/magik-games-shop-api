import { ApplicationError } from '~/@shared/domain';

export class ProductNotFoundError extends ApplicationError {
  constructor() {
    super('Product not found');
    this.name = 'ProductNotFoundError';
    this.statusCode = 404;
  }
}
