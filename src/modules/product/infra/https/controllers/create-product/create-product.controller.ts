import { Request, Response } from 'express';
import { CreateProductUseCase } from '~/modules/product/application';
import { createProductValidated } from './validator';
import { StatusCodes } from 'http-status-codes';
import { sendErrorResponse } from '~/@shared/domain';

export class CreateProductController {
  constructor(private createProductUseCase: CreateProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = await createProductValidated(request);

      const output = await this.createProductUseCase.execute(input);

      return response.status(StatusCodes.CREATED).json({ data: output });
    } catch (err) {
      return sendErrorResponse(err, response);
    }
  }
}
