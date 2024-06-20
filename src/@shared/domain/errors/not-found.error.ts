import { StatusCodes } from 'http-status-codes';
import { Entity } from '../entities/entity';
import { ApplicationError } from './application.error';

export class NotFoundError extends ApplicationError {
  constructor(id: any[] | any, entityClass: new (...args: any[]) => Entity) {
    const idsMessage = Array.isArray(id) ? id.join(',') : id;
    super(`${entityClass.name} Not Found using ID ${idsMessage}`);
    this.name = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
