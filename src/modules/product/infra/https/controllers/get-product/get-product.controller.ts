import { Request, Response } from 'express';
import { GetProductUseCase } from '~/modules/product/application';
import { StatusCodes } from 'http-status-codes';
import { getProductValidated } from './validator';
import { sendErrorResponse } from '~/@shared/domain';

export class GetProductController {
  constructor(private getProductUseCase: GetProductUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const input = await getProductValidated(request);

      const output = await this.getProductUseCase.execute(input);

      return response.status(StatusCodes.OK).json({ data: output });
    } catch (err) {
      return sendErrorResponse(err, response);
    }
  }
}
