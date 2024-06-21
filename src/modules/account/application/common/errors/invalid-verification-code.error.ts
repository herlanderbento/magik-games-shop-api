import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '~/@shared/domain';

export class InvalidVerificationCodeError extends ApplicationError {
  constructor(message?: string) {
    super(message ?? 'Invalid verification code');
    this.name = 'InvalidVerificationCodeError';
    this.statusCode = StatusCodes.CONFLICT;
  }
}
