import { type Request, type Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createUserValidated } from './validator/create-user.validator';
import { CreateUserUseCase } from '~/modules/account/application';
import { sendErrorResponse } from '~/@shared/domain';

export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  public async handle(request: Request, response: Response) {
    try {
      const input = await createUserValidated(request);

      const output = await this.createUserUseCase.execute(input);

      return response.status(StatusCodes.CREATED).json(output);
    } catch (error) {
      return sendErrorResponse(error, response);
    }
  }
}
