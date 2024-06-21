import { Request, Response } from 'express';
import { UpdateProductUseCase } from '~/modules/product/application';
import { StatusCodes } from 'http-status-codes';
import { updateProductValidated } from './validator';
import { sendErrorResponse } from '~/@shared/domain';

export class UpdateProductsController {
  constructor(private updateProductUseCase: UpdateProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = await updateProductValidated(request);

      const output = await this.updateProductUseCase.execute(input);

      return response.status(StatusCodes.OK).json({ data: output });
    } catch (err) {
      return sendErrorResponse(err, response);
    }
  }
}
