import { Request, Response } from 'express';
import { ListProductsUseCase } from '~/modules/product/application';
import { StatusCodes } from 'http-status-codes';
import { listProductValidated, productFiltered } from './validator';
import { sendErrorResponse } from '~/@shared/domain';

export class ListProductsController {
  constructor(private listProductsUseCase: ListProductsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const requestQuery = await listProductValidated(request);

      const input = await productFiltered(requestQuery);

      const output = await this.listProductsUseCase.execute(input);

      return response.status(StatusCodes.OK).json({ data: output });
    } catch (err) {
      return sendErrorResponse(err, response);
    }
  }
}
